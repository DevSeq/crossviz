(ns pworld.core
  (:require
   [figwheel.client :as fw]))

(enable-console-print!)

(defn geom 
   ([x y z]
      {:x x :y y :z z})
   ([x y]
      (geom x y 1)))

(defn add-t* [t state g]
  (update-in state [g] 
    (fn [s] (conj (or s #{}) t))))

(def add-line   (partial add-t* :line))
(def add-vector (partial add-t* :vector))
(def add-plane   (partial add-t* :plane))
(def add-point   (partial add-t* :point))

(defn add-t! [t g]
  (swap! world-state (fn [st] (add-t* t st g))))

(def add-line!   (partial add-t* :line))
(def add-vector! (partial add-t* :vector))
(def add-plane!   (partial add-t* :plane))
(def add-point!   (partial add-t* :point))

(defn list-of-objects [state]
  (mapcat 
   (fn [[g objs]] 
       (map (fn [obj] [obj g]) objs))
   state))

(defn to-world [state]
  (map geom-to (list-of-objects state))
)

(defmulti geom-to first)

(defn geom-to-vector [{:keys [x y z]}]
    (let [g (js/THREE.Geometry.)]
      (.push (.-vertices g) (js/THREE.Vector3. x y z))
      (.push (.-vertices g) (js/THREE.Vector3. 0 0 0))
      (js/THREE.Line. g (js/THREE.LineBasicMaterial.
                         #js {
                               :color      0x663399,
                               :opacity    0,
                               :linewidth  2
                             }))))

(defmethod geom-to :vector [[_ g]]
   (geom-to-vector g)
)
(defmethod geom-to :line [[_ g]]
   (geom-to-vector g)
)
(defmethod geom-to :plane [[_ g]]
   (geom-to-vector g)
)
(defmethod geom-to :plane [[_ g]]
   (geom-to-vector g)
)





; 
; (defn showLine [g]
;  ...
; )
; 
; 
; 
; (defn add-thin
; 
;
;
;
;
;(defprotocol Projective
;  (displayPoint2d [obj])
;  (displayLine2d  [obj])
;  (makeVector     [obj])
;  (displayVector  [obj])
;  (displayPlane   [obj])
;)
;
;(deftype ProjectiveGeom [v geoms]
;  Projective
;  (displayPoint2d [this]
;    )
;  (displayLine2d  [this]
;    )
;
;  (makeVector  [this]
;    (let [g (js/THREE.Geometry.)]
;      (.push (.vertices g) (js/THREE.Vector3. ((:v this) 0) ((:v this) 1) ((:v this) 3)))
;      (.push (.vertices g) (js/THREE.Vector3. 0 0 0))
;      (js/THREE.Line. g (js/THREE.LineBasicMaterial
;                         (clj->js {
;                                   :color     0x663399,
;                                   :opacity   0,
;                                   :inewidth  2
;                                   })))))
;
;  (makeVector  [this]
;    (let [geoms  (:geoms this)
;          vector (makeVector this)]
;      (if (contains geoms :vector)
;        (.remove @world (:vector geoms)))
;;;;   (set! (:geoms this) (assoc geoms :vector vector))
;      (.add @world vector)
;      )
;    )
;
;  (displayPlane   [this]
;    )
;)


(defn createCameraControls [camera domElement]
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

(defn axis [v color]
  (let [geom (js/THREE.Geometry.)]
    (.push (.-vertices geom) v)
    (.push (.-vertices geom) (.negate (.clone v)))
    (js/THREE.Line. geom (js/THREE.LineBasicMaterial. (clj->js {
      :color     color
      :opacity   0.5
      :linewidth 2
    }))))
)

(defn axes [len]
  (let [obj (js/THREE.Object3D.)]
    (.add obj (axis (js/THREE.Vector3. len 0 0) 0xff0000))
    (.add obj (axis (js/THREE.Vector3. 0 len 0) 0x00ff00))
    (.add obj (axis (js/THREE.Vector3. 0 0 len) 0x0000ff))
    obj)
)

;; this function exists so that we can append the renderer dom element ("canvas", in the case
;; of the WebGL renderer) to the container immediately as soon as we define it, so that it will
;; exist (and be properly sized) later on when needed (e.g. by createCameraControls)
(defn prepareContainer [domElement renderer]
  (let [container (.getElementById js/document "container")]
    (.appendChild container (.-domElement renderer))
    container)
)

(defonce world-state (atom {}))

(def world (atom (js.THREE.Object3D.)))
(def animating (atom false))

(defn add [obj]
  (.add @world obj)
)

(def scene (js/THREE.Scene.))

(add-watch world-state :world-watch 
  (fn [_ _ _ n]   
    (.remove scene @world)
    (reset! world (js.THREE.Object3D.))
    (.add @world (axes 2.0))
    (doseq [obj (to-world n)] (.add @world obj))
    (.add scene @world)
   ))

(let [renderer  (js/THREE.WebGLRenderer. (clj->js {:antialias true}))
      container (prepareContainer (.getElementById js/document "container") renderer)
      width     (.-offsetWidth container)
      height    (.-offsetHeight container)
      camera    (js/THREE.PerspectiveCamera. 45   (/ width height)   1  4000 )
      light     (js/THREE.DirectionalLight.  0xffffff  1.5)
      light2    (js/THREE.DirectionalLight.  0xffffff  1.5)
      controls  (createCameraControls camera (.-domElement renderer))
      run       (fn run []
                  (.update controls)
                  (.render renderer scene camera)
                  ; if (animating) { world.rotation.y -= 0.01; }
                  (if @animating (set! (.-z (.-rotation @world)) (- (.-z (.-rotation @world)) 0.01)))
                  (js/requestAnimationFrame run))
     ]
     (.setSize renderer width height)
     (.set (.-position camera) 1  -5  3)
     (.set (.-up camera) 0 0 1)
     (.set (.-position light) 0 0 1)
     (.set (.-position light2) 0 0 -1)
     (.add scene light)
     (.add scene light2)
     (.add scene @world)
     (run)
;    (consolelog "hi there")
)

; (add (axes 2.0))
; (reset! animating true)

; (def g1 (geom 1 2 3))

(add-t! :vector (def g1 (geom 1 2 1)))
(add-t! :vector (def g2 (geom -1 2 -1)))
(add-t! :vector (def g3 (geom 1 -2 1)))

; (add (geom-to-vector g1))

;      (.push
;       (.vertices
;        g)
;       (js/THREE.Vector3. x y z)
;       )
