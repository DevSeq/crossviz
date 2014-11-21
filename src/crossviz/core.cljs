(ns crossviz.core

  (:require [crossviz.three :as three]
            [crossviz.rp2 :as rp2]
            [crossviz.obj3 :as obj3 :refer [vector3]]
            [crossviz.geom :as geom]
            [crossviz.math :as math]
            [crossviz.constants :as constants]

            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true])
  (:require-macros [crossviz.macros :as mymacros])
)

(def app-state (atom {:text "Hell Chestnut No!"}))

(defn main []
  (om/root
    (fn [app owner]
      (reify
        om/IRender
        (render [_]
          (dom/h2 nil (:text app)))))
    app-state
    {:target (. js/document (getElementById "om-ui"))}))

;(main)


(enable-console-print!)

(def add-actions)
(def refresh)
(def eventTracker)

(defn log [msg] (.log js/console msg))

(defn stop-transform-action []
  {
   :type :transform
   :func (fn [] nil)
   }
)

; `scene-root` is the js/THREE object which gets rendered by the WebGL renderer below; it's the
; root object in our scene graph.
;(def scene-root (js/THREE.Scene.))
(def scene-root (three/Scene))

; @geoms is the master list of all the geoms to be displayed
(def geoms (atom []))

; insert a geom into the master list
(defn insert-geom [g]
  (swap! geoms (fn [gs] (conj gs g)))
  (refresh)
)

; remove a geom from the master list
(defn remove-geom [g]
  (swap! geoms
         (fn [gs] (filter #(not= % g) gs)))
  (refresh)
)

; @texts is a list of all the text objects in the world; this is a list of obj3
; objects which need to be kept camera-facing
(def texts (atom []))

(def WORLD (three/Object3D.))
(set! (.-matrixAutoUpdate WORLD) false)

; @world is an obj3 object that gets added to `scene-root`; it's updated with a new
; value (and replaced in `scene-root`) whenever the value of @geoms changes, i.e.
; whenever anything is inserted into or removed from @geoms.
;(def world (atom (js.THREE.Object3D.)))
(def world (atom (three/Object3D)))

(defn add-geom-to-world [g]
  ; convert the geom `g` to an obj3 and add it to the @world
  ; if `g` is a :text geom, add it to the @texts vector
  ; if `g` is a vector rather than a geom, recursively run add-geom-to-world
  ; on each element of it
  ; return nil
  (if (vector? g)
    (doall (map add-geom-to-world g))
    (let [obj (geom/to-obj3 g)]
      (if (= (:type g) :text) (swap! texts (fn [ts] (conj ts obj))))
      (.add @world obj)))
  nil)

; The following arranges for the enclosed function (fn ...) to be called whenever
; the value of the world-state atom changes.  The function (fn ...) is called with
; 4 args, the last of which is the new value of world-state.
(add-watch geoms :geoms-watch
  (fn [_ _ _ new-geoms]
    (.remove WORLD @world)
    (reset! world (js.THREE.Object3D.))
    (reset! texts [])
    (doseq [g new-geoms] (add-geom-to-world g))
    (.add WORLD @world)
   ))

; if @animating is true, the world is always spinning
(def animating (atom false))

; single variable linear interpolation:
(defn finterp [x0 x1 t]
  (+ x0 (* t (- x1 x0)))
)

; linear interpolation of js/THREE.Vector3 objects:
(defn v3interp [v0 v1 t]
  (js/THREE.Vector3.
   (finterp (.-x v0) (.-x v1) t)
   (finterp (.-y v0) (.-y v1) t)
   (finterp (.-z v0) (.-z v1) t)
  )
)

; Animate an object transformation, in n steps, by interpolating
; its quaternion, position, and scale.  If only one
; set of q/p/s values is given, interpolate between the target's
; current values and the given values.
(defn anim-transform-action
  ([target q1 p1 s1 n]  (let [q0 (js/THREE.Quaternion.)
                              p0 (js/THREE.Vector3.)
                              s0 (js/THREE.Vector3.)]
                          (.decompose (.-matrix target) p0 q0 s0)
                          (anim-transform-action target q0 p0 s0 q1 p1 s1 n)))
  ([target q0 p0 s0 q1 p1 s1 n] (anim-transform-action target q0 p0 s0 q1 p1 s1 n 0))
  ([target q0 p0 s0 q1 p1 s1 n t]
     {
      :type :anim-transform
      :func (if (>= t 1)
              ; if t >= 1, do one last step of setting the target pos/quat/scale
              ; exactly to p1/q1/s1
              (fn []
                (set! (.-quaternion target) q1)
                (set! (.-position target) p1)
                (set! (.-scale target) s1)
                (.updateMatrix target)
                (set! (.-matrixWorldNeedsUpdate target) true)
                nil
                )
              (fn []
                (set! (.-quaternion target) (.slerp q0 q1 t))
                (set! (.-position target) (v3interp p0 p1 t))
                (set! (.-scale target) (v3interp s0 s1 t))
                (.updateMatrix target)
                (set! (.-matrixWorldNeedsUpdate target) true)
                (anim-transform-action target q0 p0 s0 q1 p1 s1 n (+ t (/ 1.0 n)))))
      }))

; animate resetting an object's position to the identity, over 100 steps
(defn anim-reset-action [target]
  (let [p1 (js/THREE.Vector3. 0 0 0)
        q1 (js/THREE.Quaternion. 0 0 0 1)
        s1 (js/THREE.Vector3. 1 1 1)]
    (anim-transform-action target q1 p1 s1 100)))

(defn resetWorld []
  (add-actions 
   (stop-transform-action)
   (anim-reset-action WORLD)
   )
)

;; this function exists so that we can append the renderer dom element ("canvas", in the case
;; of the WebGL renderer) to the container immediately as soon as we define it, so that it will
;; exist (and be properly sized) later on when needed (e.g. by createCameraControls)
(defn prepareContainer [domElement renderer]
  (let [container (.getElementById js/document "container")]
    (.appendChild container (.-domElement renderer))
    container)
)

(def actions (atom ()))

; The `actions` atom has a value which is a list of actions.  Each action is a
; map with keys :type and :func.  The :type of an action can be any value, and
; is used to determine if two actions are similar.  The :func should be a function
; that returns either another action, or nil.  On each refresh, we
; replace each action in this list with the result calling its :func, eliminating
; any that return nil.  The `take-actions` function below implements this.

(defn take-actions []
  (let [action-taken (seq @actions)]
    (swap! actions
           (fn [actions] (doall (filter #(not (nil? %)) (map #((:func %)) actions)))))
    action-taken))

(defn actions-similar [a1 a2]
  (= (:type a1) (:type a2)))

(defn action-similar-to-any [a actions]
  (some #(actions-similar a %) actions))

; Add one or more actions to the `actions` list, after first removing any
; existing actions which are "similar" to any new ones
(defn add-actions [& new-actions]
  (swap! actions
         (fn [actions]
           (apply conj (cons
                        (filter #(not (action-similar-to-any % new-actions)) actions)
                        new-actions))))
  (refresh)
)


(defn oneshot-transform-action [target M]
  {
   :type :transform
   :func (fn []
           (.multiply (.-matrix target) M)
           (set! (.-matrixWorldNeedsUpdate target) true)
           nil)
   }
)

(defn repeating-transform-action [target M]
  {
   :type :transform
   :func (fn []
           (.multiply (.-matrix target) M)
           (set! (.-matrixWorldNeedsUpdate target) true)
           (repeating-transform-action target M))
   }
)

;;;controls ; This atom determines whether the trackball controls are active; we have to disable
;;;controls ; them in order to take control of the camera for animating camera motions.  Not sure
;;;controls ; yet how to re-enable them in a way that retains the new camera position/orientation.
;;;controls (def trackballing (atom true))

(defn drag-rotation-matrix [dx dy button eventTracker width height moving center frame]
  (if (= dx dy 0) nil
      (if (= button 1)
        (let [v     (js/THREE.Vector3. 0 0 1)
              d     (+ dx dy)
              angle (* (/ d width) js/Math.PI)
              R     (.makeRotationAxis (js/THREE.Matrix4.) v angle)
              M     (.computeTransform eventTracker moving center frame R)]
          M)
        (let [v     (.normalize (js/THREE.Vector3. dy dx 0))
              d     (js/Math.sqrt (+ (* dx dx) (* dy dy)))
              angle (* (/ d width) js/Math.PI)
              R     (.makeRotationAxis (js/THREE.Matrix4.) v angle)
              M     (.computeTransform eventTracker moving center frame R)]
          M))))

(defn drag-scale-matrix [delta eventTracker width height moving center frame]
  (if (= delta 0) nil
      (let [s (js/Math.exp (/ delta 20.0))
            R (.makeScale (js/THREE.Matrix4.) s s s)
            M (.computeTransform eventTracker moving center frame R)]
        (.log js/console delta)
        M)))


(defn do-if-not-nil [value f] (if (not (nil? value)) (f value)))

(def  renderer  (js/THREE.WebGLRenderer. #js{:antialias true}))
(def  container (prepareContainer (.getElementById js/document "container") renderer))
(def  width     (.-offsetWidth container))
(def  height    (.-offsetHeight container))
(def  camera    (js/THREE.PerspectiveCamera. 45   (/ width height)   1  4000 ))
(def  light1    (js/THREE.DirectionalLight.  0xffffff  0.5))
(def  light2    (js/THREE.DirectionalLight.  0xffffff  0.7))
(def  light3    (js/THREE.DirectionalLight.  0xffffff  0.7))
(def  light4    (js/THREE.DirectionalLight.  0xffffff  0.7))
(def  eventTracker
  (js/EventTracker (.-domElement renderer)
                   #js{
                       :mouseDown (fn [p]
                                    (add-actions (stop-transform-action)))
                       :mouseDrag (fn [p dp button]
                                        ; Note: the axis of rotation for a mouse displacement of
                                        ; (dp.x,dp.y) would normally be (-dp.y, dp.x, 0), but
                                        ; since the y direction of screen coords is reversed
                                        ; (increasing towards the bottom of the screen), we need
                                        ; to negate the y coord here; therefore we use (dp.y,
                                        ; dp.x, 0):
                                    (do-if-not-nil
                                     (drag-rotation-matrix (.-x dp) (.-y dp) button
                                                           eventTracker
                                                           width height
                                                           WORLD WORLD camera)
                                     #(add-actions (oneshot-transform-action WORLD %))))
                       :mouseUp (fn [p dt dp button]
                                  (if (< dt 100)
                                    (do-if-not-nil
                                     (drag-rotation-matrix (.-x dp) (.-y dp) button
                                                           eventTracker
                                                           width height
                                                           WORLD WORLD camera)
                                     #(add-actions (repeating-transform-action WORLD %)))))
                       :mouseWheel (fn [delta]
                                     (do-if-not-nil
                                      (drag-scale-matrix delta
                                                         eventTracker
                                                         width height
                                                         WORLD WORLD camera)
                                     #(add-actions (oneshot-transform-action WORLD %))))
      }))

(defn realign-labels-camera-facing []
  "Set the orientation of all labels (in the @texts list) to be camera-facing"
  (.updateMatrixWorld WORLD)
  (.updateMatrixWorld camera)
  (let [M (->
           (js/THREE.Matrix4.) ; create a new matrix
           (.getInverse (.-matrixWorld WORLD)) ; load it with the inverse of WORLD's matrixWorld matrix
           (.multiply (.-matrixWorld camera)))] ; multiply it by the camera's matrixWorld matrix
    ; So now M = (inverse of WORLD's matrixWorld) * (camera's matrixWorld)
    ; Apply the rotational component of M to all text objects
    (dorun (map #(.setFromRotationMatrix  (.-rotation %) M) @texts))))

(defn refresh []
  (js/requestAnimationFrame
   (fn []
     (realign-labels-camera-facing)
     (.render renderer scene-root camera)
     (if (take-actions) (refresh)))))

  (.setSize renderer width height)
  (.setClearColor renderer constants/bgcolor 1)
  (.set (.-position camera) 0 0 8)
  (.set (.-up camera) 0 1 0)
  (.lookAt camera (vector3 0 0 0))
  (.set (.-position light1) 100 0 0)
  (.set (.-position light2) 0 -100 0)
  (.set (.-position light3) 0  100 0)
  (.set (.-position light3) 0  0 -10)
  (.add camera light1)
  (.add camera light2)
  (.add camera light3)
  (.add camera light4)
  (.add scene-root camera)
  (.add scene-root WORLD)
  (.add WORLD @world)
  (refresh)


;(def v1 (geom/vector (rp2/rp2 1 1 3) { :color 0xFFFF00 }))
;(insert-geom v1)
;(remove-geom v1)

(def disc-radius (math/sqrt (- (* constants/univDiam constants/univDiam) 1)))

(def rp2-v1 (rp2/rp2 1 1 3))
(def rp2-v2 (rp2/rp2 1 -1 2))
(def rp2-v1v2 (rp2/cross rp2-v1 rp2-v2))

(def geom-vector-v1 (geom/vector rp2-v1 ))
(def geom-vector-v2 (geom/vector rp2-v2 ))
(def geom-vector-v1v2 (geom/vector rp2-v1v2 ))

(def rp2-a (rp2/rp2 2  4 2))
(def rp2-b (rp2/rp2 3 -6 2))
;(def rp2-b (rp2/rp2 2  4 3))
(def rp2-ab (rp2/cross rp2-b rp2-a))

(def geom-2d-axes
  [ (geom/segment3 [(- disc-radius) 0 1] [disc-radius 0 1] { :color 0xFF0000 })
    (geom/segment3 [0 (- disc-radius) 1] [0 disc-radius 1] { :color 0x00FF00 })
    (geom/text [disc-radius 0 1] "x")
    (geom/text [0 disc-radius 1] "y") ])

(def geom-line-a (geom/line rp2-a ))
(def geom-line-a-label (geom/text (first (obj3/segment-endpoints rp2-a))
                                  (str (:x rp2-a) "x + " (:y rp2-a) "y + " (:z rp2-a) " = 0")
                                  ))
(def geom-plane-a (geom/plane rp2-a { :transparent true, :color constants/planecolor }))
(def geom-vector-a (geom/vector rp2-a ))
(def geom-vector-a-label (geom/text [(:x rp2-a) (:y rp2-a) (:z rp2-a)]
                                  (str "(" (:x rp2-a) "," (:y rp2-a) "," (:z rp2-a) ")")
                                  ))

(def geom-line-b (geom/line rp2-b ))
(def geom-line-b-label (geom/text (first (obj3/segment-endpoints rp2-b))
                                  (str (:x rp2-b) "x + " (:y rp2-b) "y + " (:z rp2-b) " = 0")
                                  ))
(def geom-plane-b (geom/plane rp2-b { :transparent true, :color constants/planecolor }))
(def geom-vector-b (geom/vector rp2-b ))
(def geom-vector-b-label (geom/text [(:x rp2-b) (:y rp2-b) (:z rp2-b)]
                                  (str "(" (:x rp2-b) "," (:y rp2-b) "," (:z rp2-b) ")")
                                  ))

(def geom-point-ab (geom/point rp2-ab))
(def geom-point-ab-label
  (let [p (rp2/normalize rp2-ab)]
    (geom/text [(:x p) (+ (:y p) 0.2) (:z p)] "?" )))
(def geom-vector-ab (geom/vector rp2-ab ))
(def geom-vector-ab-label (geom/text [(:x rp2-ab) (:y rp2-ab) (:z rp2-ab)]
                                  (str "a X b")))


(def geom-3d-x-axis (geom/segment3 [0 0 0] [2 0 0] { :color 0xFF0000, :linewidth 2 }))
(def geom-3d-y-axis (geom/segment3 [0 0 0] [0 2 0] { :color 0x00FF00, :linewidth 2 }))
(def geom-3d-z-axis (geom/segment3 [0 0 0] [0 0 2] { :color 0x0000FF, :linewidth 2 }))

(def geom-z1-disc (geom/zdisc disc-radius constants/z-disc-height
                              { :color constants/planecolor, :transparent true }))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(def steps (atom []))

(defn create-step [f] (swap! steps (fn [steps] (conj steps f))))

(defn takeStep []
  ((first @steps))
  (swap! steps (fn [steps] (rest steps))))

; (insert-geom geom-2d-axes)

(insert-geom geom-3d-x-axis)
(insert-geom geom-3d-y-axis)
(insert-geom geom-3d-z-axis)

(create-step #(do
  (insert-geom geom-vector-v1)
))
(create-step #(do
  (insert-geom geom-vector-v2)
))
(create-step #(do
  (insert-geom geom-vector-v1v2)
))

(create-step #(do
  (remove-geom geom-vector-v1)
  (remove-geom geom-vector-v2)
  (remove-geom geom-vector-v1v2)
  (remove-geom geom-3d-x-axis)
  (remove-geom geom-3d-y-axis)
  (remove-geom geom-3d-z-axis)
))



(create-step #(do
  (insert-geom geom-2d-axes)
))


  (insert-geom geom-3d-x-axis)
  (insert-geom geom-3d-y-axis)
  (insert-geom geom-3d-z-axis)

(create-step #(do
 (insert-geom geom-line-a)
 (insert-geom geom-line-a-label)
))

(create-step #(do
 (insert-geom geom-line-b)
 (insert-geom geom-line-b-label)
))

(create-step #(do
  (insert-geom geom-point-ab)
  (insert-geom geom-point-ab-label)
))

(create-step #(do
  (insert-geom geom-3d-x-axis)
  (insert-geom geom-3d-y-axis)
  (insert-geom geom-3d-z-axis)
))

(create-step #(do
  (insert-geom geom-z1-disc)
))

(create-step #(do
  (remove-geom geom-point-ab)
  (remove-geom geom-point-ab-label)
  (remove-geom geom-line-b)
  (remove-geom geom-line-b-label)
))

(create-step #(do
  (insert-geom geom-plane-a)
))

(create-step #(do
  (remove-geom geom-z1-disc)
  (remove-geom geom-2d-axes)
))

(create-step #(do
  (insert-geom geom-vector-a)
  (insert-geom geom-vector-a-label)
))

(create-step #(do
  (remove-geom geom-line-a-label)
  (insert-geom geom-line-b)
  (insert-geom geom-line-b-label)
))

(create-step #(do
  (insert-geom geom-plane-b)
))

(create-step #(do
  (insert-geom geom-vector-b)
  (insert-geom geom-vector-b-label)
))

(create-step #(do
  (insert-geom geom-vector-ab)
  (insert-geom geom-vector-ab-label)
))

(create-step #(do
  (insert-geom geom-z1-disc)
))
