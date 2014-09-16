(ns pworld.core
  (:require [pworld.geom :as geom]
            [pworld.obj3 :as obj3]
            [pworld.math :as math]
            [pworld.constants :as constants])
)

(defn typed-geoms [state]
  ; This function takes a state map and returns a list of all the objects that should
  ; be displayed.  More specifically, it returns a list of vectors, where each vector
  ; is of the form [type g], indicating that the geom `g` should be displyed as type
  ; `type`.
  ;
  ; In general, we call a vector of the form [type g] a "typed geom".  So this function
  ; takes a world state map and returns a list of typed geoms.
  (mapcat 
   (fn [[g types]] 
       (map (fn [type] [type g]) types))
   state))

; `scene-root` is the js/THREE object which gets rendered by the WebGL renderer below; it's the
; root object in our scene graph.
(def scene-root (js/THREE.Scene.))

; @world-state is a map whose keys are geoms; the value for each geom is a set of display
; types for that geom, indicating one or more ways that the geom should be displayed.
;
; Note that this data model does not allow two geoms with the same coordinates to
; be displayed as the same type, which is a limitation that we might want to remove
; in the future.
(def world-state (atom {}))

; @world is an obj3 object that gets added to `scene-root`; it's updated with a new
; value (and replaced in `scene-root`) whenever the value of @world-state changes.
; @world-state is a map which stores geoms and their display-types
; @world is an obj3 which serves as a container for all the obj3's corresponding
; to these geoms; @world is added to scene-root below.
(def world (atom (js.THREE.Object3D.)))

; if @animating is true, the world is always spinning
(def animating (atom false))

(defn add-t* [type state g]
  ; Returns a new world-state map in which `type` has been added to the display-type set
  ; for the geom `g`.  Note that this function does not modify anything --- it takes
  ; a world-state map as an arg, and returns a new world-state map.
  (update-in state [g] 
    (fn [s] (conj (or s #{}) type))))

(defn add-t! [type g]
  ; This function modifies the world-state atom's value to add `type` to the display-type
  ; set for the geom `g`.
  (swap! world-state
         (fn [state]
           (add-t* type state g))))

(defn to-obj3-list [state]
  ; this function takes a world state map and returns a list of THREE.js objects
  (map obj3/from-typed-geom (typed-geoms state))
)

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
                  (.update controls)
                  (.render renderer scene-root camera)
                  (if @animating (set! (.-z (.-rotation @world)) (- (.-z (.-rotation @world)) 0.01)))
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

; The following arranges for the enclosed function (fn ...) to be called whenever
; the value of the world-state atom changes.  The function (fn ...) is called with
; 4 args, the last of which is the new value of world-state.
(add-watch world-state :world-watch 
  (fn [_ _ _ new-world-state]
    (.remove scene-root @world)
    (reset! world (js.THREE.Object3D.))
    (.add @world (obj3/axes 2.0))
    (.add @world (obj3/disc
                  (math/sqrt (- (* constants/univDiam constants/univDiam) 1))
                        1)
                  )
    (doseq [obj (to-obj3-list new-world-state)] (.add @world obj))
    (.add scene-root @world)
   ))


(let [line1 (geom/geom 1 2 2)
      line2 (geom/geom -1 2 1.5)
      pt1    (geom/cross line1 line2)
      ]
  (add-t! :vector line1)
  (add-t! :plane  line1)
  (add-t! :line   line1)
 
  (add-t! :vector line2)
  (add-t! :plane  line2)
  (add-t! :line   line2)

  (add-t! :point  pt1)
)
