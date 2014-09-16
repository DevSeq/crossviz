(ns pworld.core
  (:require [pworld.rp2 :as rp2]
            [pworld.obj3 :as obj3]
            [pworld.geom :as geom]
            [pworld.math :as math]
            [pworld.constants :as constants])
)

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

(defn insert-geom [g]
  (swap! geoms (fn [gs] (conj gs g))))

; @texts is a list of all the text objects in the world; this is a list of obj3
; objects which need to be kept camera-facing
(def texts (atom []))

; @world is an obj3 object that gets added to `scene-root`; it's updated with a new
; value (and replaced in `scene-root`) whenever the value of @geoms changes, i.e.
; whenever anything is inserted into or removed from @geoms.
(def world (atom (js.THREE.Object3D.)))

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
    (doseq [g new-geoms]
      (let [obj (geom/to-obj3 g)]
        (if (= (:type g) :text) (swap! texts (fn [ts] (conj ts obj))))
        (.add @world obj)))

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


(let [line1 (rp2/rp2 1 2 2)
      line2 (rp2/rp2 -1 2 1.5)
      pt1    (rp2/cross line1 line2)
      ]
  
  (insert-geom (geom/segment3 [0 0 0] [1 0 0] { :color 0xFF0000 }))
  (insert-geom (geom/segment3 [0 0 0] [0 1 0] { :color 0x00FF00 }))
  (insert-geom (geom/segment3 [0 0 0] [0 0 1] { :color 0x0000FF }))

  (insert-geom (geom/text     [1 0 0] "x"))
  (insert-geom (geom/text     [0 1 0] "y"))
  (insert-geom (geom/text     [0 0 1] "z"))

;;;   (add-t! :vector line1)
;;;   (add-t! :plane  line1)
;;;   (add-t! :line   line1)
;;;  
;;;   (add-t! :vector line2)
;;;   (add-t! :plane  line2)
;;;   (add-t! :line   line2)
;;; 
;;;   (add-t! :point  pt1)
;;;   (add-t! :vector  pt1)
)

#_(let
    [g (geom/segment3 [0 0 0] [0 0 1] { :color 0xFF0000 })]

  (.log js/console 
        (obj3/segment3 (:a g) (:b g) g))
)

