(ns crossviz.core
  (:require [crossviz.three :as three]
            [crossviz.rp2 :as rp2]
            [crossviz.obj3 :as obj3 :refer [vector3]]
            [crossviz.geom :as geom]
            [crossviz.math :as math]
            [crossviz.constants :as constants])
  (:require-macros [crossviz.macros :as mymacros])
)

(enable-console-print!)

(defn log [msg] (.log js/console msg))

; `scene-root` is the js/THREE object which gets rendered by the WebGL renderer below; it's the
; root object in our scene graph.
;(def scene-root (js/THREE.Scene.))
(def scene-root (three/Scene))

; @geoms is the master list of all the geoms to be displayed
(def geoms (atom []))

; insert a geom into the master list
(defn insert-geom [g]
  (swap! geoms (fn [gs] (conj gs g))))

; remove a geom from the master list
(defn remove-geom [g]
  (swap! geoms
         (fn [gs] (filter #(not= % g) gs))))

; @texts is a list of all the text objects in the world; this is a list of obj3
; objects which need to be kept camera-facing
(def texts (atom []))

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
    (.remove scene-root @world)
    (reset! world (js.THREE.Object3D.))
    (reset! texts [])
    (doseq [g new-geoms] (add-geom-to-world g))
    (.add scene-root @world)
   ))

; if @animating is true, the world is always spinning
(def animating (atom false))

(defn createCameraControls [camera domElement]
  ; takes a THREE.js camera, and a dom element, and returns
  ; a TrackballControls object
  (let [controls (js/THREE.TrackballControls. camera domElement)
  ;(let [controls (three/TrackballControls camera domElement)
        radius   3]
	(set! (.-rotateSpeed           controls)  1.0)
	(set! (.-zoomSpeed             controls)  3.0)
	(set! (.-panSpeed              controls)  0.2)
	(set! (.-dynamicDampingFactor  controls)  0.3)
	(set! (.-noZoom                controls)  false)
	(set! (.-noPan                 controls)  false)
	(set! (.-staticMoving          controls)  false)
	(set! (.-minDistance           controls)  (* radius 1.0))
	(set! (.-maxDistance           controls)  (* radius 20.0))
    controls)
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

; The `actions` has a value which is a list of functions.  Each function in this list
; should return either another function, or nil.  On each render pass, we
; replace each function in this list with the result calling it, eliminating
; any that return nil.  The `take-actions` function below implements this.

(defn take-actions []
  (swap! actions
         (fn [actions] (doall (filter #(not (nil? %)) (map #(%) actions))))))

; Add one or more action funtions to the `actions` list:
(defn add-actions [& new-actions]
  (swap! actions
         (fn [actions]
           (apply conj (cons actions new-actions)))))

; This atom determines whether the trackball controls are active; we have to disable
; them in order to take control of the camera for animating camera motions.  Not sure
; yet how to re-enable them in a way that retains the new camera position/orientation.
(def trackballing (atom true))

(def  renderer  (js/THREE.WebGLRenderer. #js{:antialias true}))
(def  container (prepareContainer (.getElementById js/document "container") renderer))
(def  width     (.-offsetWidth container))
(def  height    (.-offsetHeight container))
(def  camera    (js/THREE.PerspectiveCamera. 45   (/ width height)   1  4000 ))
(def  light1    (js/THREE.DirectionalLight.  0xffffff  0.5))
(def  light2    (js/THREE.DirectionalLight.  0xffffff  0.6))
(def  light3    (js/THREE.DirectionalLight.  0xffffff  0.7))
(def  controls  (createCameraControls camera (.-domElement renderer)))
(def  run       (fn run []
                  ; update the controls:
                  (if @trackballing (.update controls))
                  (take-actions)
                  ; re-orient any text objects to be camera-facing:
                  ;(doseq [t @texts] (.setFromRotationMatrix  (.-rotation t) (.-matrix camera)))
                  (dorun (map #(.setFromRotationMatrix  (.-rotation %) (.-matrix camera)) @texts))
                  ; render the scene
                  (.render renderer scene-root camera)
                  ; if animating, move time forward for next frame
                  (if @animating (set! (.-z (.-rotation @world)) (- (.-z (.-rotation @world)) 0.01)))
                  ; request next frame:
                  (js/requestAnimationFrame run)))

  (.setSize renderer width height)
  (.setClearColor renderer 0x444455 1)
  (.set (.-position camera) 1  -5  3)
  (.set (.-up camera) 0 0 1)
  (.lookAt camera (vector3 0 0 0))
  (.set (.-position light1) 100 0 0)
  (.set (.-position light2) 0 -100 0)
  (.set (.-position light3) 0  100 0)
  (.add camera light1)
  (.add camera light2)
  (.add camera light3)
  (.add scene-root camera)
  (.add scene-root @world)
  (run)


(def v1 (geom/vector (rp2/rp2 1 1 3) { :color 0xFFFF00 }))
(insert-geom v1)

(remove-geom v1)


;;; (let [
;;;       renderer  (js/THREE.WebGLRenderer. #js{:antialias true})
;;;       container (prepareContainer (.getElementById js/document "container") renderer)
;;;       width     (.-offsetWidth container)
;;;       height    (.-offsetHeight container)
;;;       camera    (js/THREE.PerspectiveCamera. 45   (/ width height)   1  4000 )
;;;       light1    (js/THREE.DirectionalLight.  0xffffff  0.5)
;;;       light2    (js/THREE.DirectionalLight.  0xffffff  0.6)
;;;       light3    (js/THREE.DirectionalLight.  0xffffff  0.7)
;;;       controls  (createCameraControls camera (.-domElement renderer))
;;;       run       (fn run []
;;;                   ; update the controls:
;;;                   (.update controls)
;;;                   ; re-orient any text objects to be camera-facing:
;;;                   ;(doseq [t @texts] (.setFromRotationMatrix  (.-rotation t) (.-matrix camera)))
;;;                   (dorun (map #(.setFromRotationMatrix  (.-rotation %) (.-matrix camera)) @texts))
;;;                   ; render the scene
;;;                   (.render renderer scene-root camera)
;;;                   ; if animating, move time forward for next frame
;;;                   (if @animating (set! (.-z (.-rotation @world)) (- (.-z (.-rotation @world)) 0.01)))
;;;                   ; request next frame:
;;;                   (js/requestAnimationFrame run))
;;;       ]
;;;   (.setSize renderer width height)
;;;   (.setClearColor renderer 0x444455 1)
;;;   (.set (.-position camera) 1  -5  3)
;;;   (.set (.-up camera) 0 0 1)
;;;   (.lookAt camera (vector3 0 0 0))
;;;   (.set (.-position light1) 100 0 0)
;;;   (.set (.-position light2) 0 -100 0)
;;;   (.set (.-position light3) 0  100 0)
;;;   (.add camera light1)
;;;   (.add camera light2)
;;;   (.add camera light3)
;;;   (.add scene-root camera)
;;;   (.add scene-root @world)
;;;   (run)
;;; )

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
(def geom-plane-a (geom/plane rp2-a { :transparent true, :color 0xFFFFFF }))
(def geom-vector-a (geom/vector rp2-a ))
(def geom-vector-a-label (geom/text [(:x rp2-a) (:y rp2-a) (:z rp2-a)]
                                  (str "(" (:x rp2-a) "," (:y rp2-a) "," (:z rp2-a) ")")
                                  ))

(def geom-line-b (geom/line rp2-b ))
(def geom-line-b-label (geom/text (first (obj3/segment-endpoints rp2-b))
                                  (str (:x rp2-b) "x + " (:y rp2-b) "y + " (:z rp2-b) " = 0")
                                  ))
(def geom-plane-b (geom/plane rp2-b { :transparent true, :color 0xFFFFFF }))
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

(def geom-z1-disc (geom/zdisc disc-radius 1 { :color 0xFFFFFF, :transparent true }))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(def steps (atom []))

(defn create-step [f] (swap! steps (fn [steps] (conj steps f))))

(defn takestep []
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
