(ns crossviz.core
  (:require [crossviz.rp2 :as rp2]
            [crossviz.obj3 :as obj3]
            [crossviz.geom :as geom]
            [crossviz.math :as math]
            [crossviz.constants :as constants])
  (:require-macros [crossviz.macros :as mymacros])
)

(defn log [msg] (.log js/console msg))

;;; (defn typed-goems [state]
;;;   ; This function takes a state map and returns a list of all the objects that should
;;;   ; be displayed.  More specifically, it returns a list of vectors, where each vector
;;;   ; is of the form [type g], indicating that the goem `g` should be displyed as type
;;;   ; `type`.
;;;   ;
;;;   ; In general, we call a vector of the form [type g] a "typed goem".  So this function
;;;   ; takes a world state map and returns a list of typed goems.
;;;   (mapcat 
;;;    (fn [[g types]] 
;;;        (map (fn [type] [type g]) types))
;;;    state))

; `scene-root` is the js/THREE object which gets rendered by the WebGL renderer below; it's the
; root object in our scene graph.
(def scene-root (js/THREE.Scene.))

;;; ; @world-state is a map whose keys are goems; the value for each goem is a set of display
;;; ; types for that goem, indicating one or more ways that the goem should be displayed.
;;; ;
;;; ; Note that this data model does not allow two goems with the same coordinates to
;;; ; be displayed as the same type, which is a limitation that we might want to remove
;;; ; in the future.
;;; (def world-state (atom {}))

; @geoms is a list of all the geoms to be displayed in the world
(def geoms (atom []))

;(defn insert-geom [g]
;  (let [id (or (:id g) (next-id))
;        ng (merge g {:id id})]
;    (swap! geoms (fn [gs] (conj gs ng)))
;    ng))

(defn insert-geom [g]
  (swap! geoms (fn [gs] (conj gs g))))

(defn remove-geom [g]
  (swap! geoms
         (fn [gs] (filter #(not= (:id %) (:id g)) gs))))

; @texts is a list of all the text objects in the world; this is a list of obj3
; objects which need to be kept camera-facing
(def texts (atom []))

; @world is an obj3 object that gets added to `scene-root`; it's updated with a new
; value (and replaced in `scene-root`) whenever the value of @geoms changes, i.e.
; whenever anything is inserted into or removed from @geoms.
(def world (atom (js.THREE.Object3D.)))

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
;;;     (.add @world (obj3/axes 2.0))
;;;     (.add @world (obj3/disc
;;;                   (math/sqrt (- (* constants/univDiam constants/univDiam) 1))
;;;                         1)
;;;                   )
;;;     (.add @world textobj3)
;;;     (doseq [obj (to-obj3-list new-world-state)] (.add @world obj))
    (reset! texts [])

;    (doseq [g new-geoms]
;      (let [obj (geom/to-obj3 g)]
;        (if (= (:type g) :text) (swap! texts (fn [ts] (conj ts obj))))
;        (.add @world obj)))
    (doseq [g new-geoms] (add-geom-to-world g))

    (.add scene-root @world)
   ))

; if @animating is true, the world is always spinning
(def animating (atom false))

;;; (defn add-t* [type state g]
;;;   ; Returns a new world-state map in which `type` has been added to the display-type set
;;;   ; for the goem `g`.  Note that this function does not modify anything --- it takes
;;;   ; a world-state map as an arg, and returns a new world-state map.
;;;   (update-in state [g] 
;;;     (fn [s] (conj (or s #{}) type))))
;;; 
;;; (defn add-t! [type g]
;;;   ; This function modifies the world-state atom's value to add `type` to the display-type
;;;   ; set for the goem `g`.
;;;   (swap! world-state
;;;          (fn [state]
;;;            (add-t* type state g))))
;;; 
;;; (defn to-obj3-list [state]
;;;   ; this function takes a world state map and returns a list of THREE.js objects
;;;   (map obj3/from-typed-goem (typed-goems state))
;;; )

(defn createCameraControls [camera domElement]
  ; takes a THREE.js camera, and a dom element, and returns
  ; a TrackballControls object
  (let [controls (js/THREE.TrackballControls. camera domElement)
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

(let [
      renderer  (js/THREE.WebGLRenderer. #js{:antialias true})
      container (prepareContainer (.getElementById js/document "container") renderer)
      width     (.-offsetWidth container)
      height    (.-offsetHeight container)
      camera    (js/THREE.PerspectiveCamera. 45   (/ width height)   1  4000 )
      light1    (js/THREE.DirectionalLight.  0xffffff  0.5)
      light2    (js/THREE.DirectionalLight.  0xffffff  0.6)
      light3    (js/THREE.DirectionalLight.  0xffffff  0.7)
      controls  (createCameraControls camera (.-domElement renderer))
      run       (fn run []
                  ; update the controls:
                  (.update controls)
                  ; re-orient any text objects to be camera-facing:
                  ;(doseq [t @texts] (.setFromRotationMatrix  (.-rotation t) (.-matrix camera)))
                  (dorun (map #(.setFromRotationMatrix  (.-rotation %) (.-matrix camera)) @texts))
                  ; render the scene
                  (.render renderer scene-root camera)
                  ; if animating, move time forward for next frame
                  (if @animating (set! (.-z (.-rotation @world)) (- (.-z (.-rotation @world)) 0.01)))
                  ; request next frame:
                  (js/requestAnimationFrame run))
      ]
  (.setSize renderer width height)
  (.setClearColor renderer 0x444455 1)
  (.set (.-position camera) 1  -5  3)
  (.set (.-up camera) 0 0 1)
  (.lookAt camera (js/THREE.Vector3. 0 0 0))
  (.set (.-position light1) 100 0 0)
  (.set (.-position light2) 0 -100 0)
  (.set (.-position light3) 0  100 0)
  (.add camera light1)
  (.add camera light2)
  (.add camera light3)
  (.add scene-root camera)
  (.add scene-root @world)
  (run)
)

;;; ; The following arranges for the enclosed function (fn ...) to be called whenever
;;; ; the value of the world-state atom changes.  The function (fn ...) is called with
;;; ; 4 args, the last of which is the new value of world-state.
;;; (add-watch world-state :world-watch 
;;;   (fn [_ _ _ new-world-state]
;;;     (.remove scene-root @world)
;;;     (reset! world (js.THREE.Object3D.))
;;;     (.add @world (obj3/axes 2.0))
;;;     (.add @world (obj3/disc
;;;                   (math/sqrt (- (* constants/univDiam constants/univDiam) 1))
;;;                         1)
;;;                   )
;;;     (.add @world textobj3)
;;;     (doseq [obj (to-obj3-list new-world-state)] (.add @world obj))
;;;     (.add scene-root @world)
;;;    ))

;(defn step [n]
;  (.log js/console (str "cljs step "  n))
;)

(def disc-radius (math/sqrt (- (* constants/univDiam constants/univDiam) 1)))

(def rp2-a (rp2/rp2 2  4 2))
(def rp2-b (rp2/rp2 3 -6 2))
(def rp2-ab (rp2/cross rp2-b rp2-a))

; 2D xy axes:
(def geom-2d-x-axis (geom/segment3 [(- disc-radius) 0 1] [disc-radius 0 1] { :color 0xFF0000 }))
(def geom-2d-y-axis (geom/segment3 [0 (- disc-radius) 1] [0 disc-radius 1] { :color 0x00FF00 }))
(def geom-2d-x-axis-label (geom/text [disc-radius 0 1] "x"))
(def geom-2d-y-axis-label (geom/text [0 disc-radius 1] "y"))

(insert-geom geom-2d-x-axis)
(insert-geom geom-2d-y-axis)
(insert-geom geom-2d-x-axis-label)
(insert-geom geom-2d-y-axis-label)

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

(defn take-step []
  ((first @steps))
  (swap! steps (fn [steps] (rest steps))))

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
  ; plane (disc) at height z=1:
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
  (remove-geom geom-2d-x-axis)
  (remove-geom geom-2d-y-axis)
  (remove-geom geom-2d-x-axis-label)
  (remove-geom geom-2d-y-axis-label)
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

(defn stepforward [n]
  (take-step)
)
