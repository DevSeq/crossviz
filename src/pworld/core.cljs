;;
;; see https://github.com/magomimmo/modern-cljs/blob/master/doc/tutorial-02.md
;; for an idea about how to create a browser-connected repl
;;

(ns pworld.core
  (:require
   [figwheel.client :as fw]))

(def PI   (.-PI js/Math))
(def cos  (.-cos js/Math))
(def sin  (.-sin js/Math))
(def sqrt (.-sqrt js/Math))
(def abs  (.-abs js/Math))

(def univDiam 2)
(def vectorColor 0x000000)
(def lineColor   0x000000)

(enable-console-print!)

(defn lh [x] (.log js/console x) x)
(defn lnh[x] x)

(defn geom 
   ([x y z]
      {:x x :y y :z z})
   ([x y]
      (geom x y 1)))

(defn normalize-geom [{:keys [x y z]}] (geom (/ x z) (/ y z)))

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

(defn geom-to-point [g]
  (let [ng (normalize-geom g)]
    (ball 0.05 (:x ng) (:y ng) (:z ng))))

(defn geom-to-vector [{:keys [x y z]}]
    (let [g (js/THREE.Geometry.)]
      (.push (.-vertices g) (js/THREE.Vector3. x y z))
      (.push (.-vertices g) (js/THREE.Vector3. 0 0 0))
      (js/THREE.Line. g (js/THREE.LineBasicMaterial.
                         #js {
                               :color      vectorColor,
                               :opacity    0,
                               :linewidth  2
                             }))))

(defn geom-to-plane [{:keys [x y z]}]
  ; return a disc Object3D through 0,0,0
  (let [v     (js/THREE.Vector3. x y z)
        k     (js/THREE.Vector3. 0 0 1)
        axis  (-> (js/THREE.Vector3.)
                  (.crossVectors k v)
                  (.normalize))
        angle (-> k (.angleTo v))
        R     (-> (js/THREE.Matrix4.)
                  (.makeRotationAxis axis angle))
        obj   (disc univDiam 0)]
    (-> obj (.applyMatrix R))
    obj
))

(defn geom-to-line [{:keys [x y z]}]
  (let [g          (js/THREE.Geometry.)
        A          (+ (* x x) (* y y))
        [B C vert] (if (> (abs x) (abs y))
                     [ (* 2 y z)                                                ; B
                       (+ (* z z) (* x x (- 1 (* univDiam univDiam))))          ; C
                       (fn [t] (js/THREE.Vector3. (/ (- (+ z (* y t))) x) t 1)) ; vert
                       ]
                     [ (* 2 x z)                                                  ; B
                       (+ (* z z) (* y y (- 1 (* univDiam univDiam))))            ; C
                       (fn [t] (js/THREE.Vector3. t  (/ (- (+ z (* x t))) y)  1)) ; vert
                       ])
        D          (sqrt (- (* B B) (* 4 A C)))
        ]
    (-> g (.-vertices) (.push (vert (/ (+ (- B) D) (* 2.0 A)))))
    (-> g (.-vertices) (.push (vert (/ (- (- B) D) (* 2.0 A)))))
    (js/THREE.Line. g (js/THREE.LineBasicMaterial. #js{
                                                      :color     lineColor,
                                                      :opacity   0,
                                                      :linewidth 5
                                   }))
    )
  )

(defmethod geom-to :vector [[_ g]]
   (geom-to-vector g)
)
(defmethod geom-to :line [[_ g]]
   (geom-to-line g)
)
(defmethod geom-to :point [[_ g]]
   (geom-to-point g)
)
(defmethod geom-to :plane [[_ g]]
   (geom-to-plane g)
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


(defn disc [r z]
   (let [g (js/THREE.Geometry.)
         N 60]
       (.push (.-vertices g) (js/THREE.Vector3. 0 0 z))
       (doseq [i (range 0 (+ N 1))]
         (let [a (/ (* 2 PI i) N)]
           (.push (.-vertices g) (js/THREE.Vector3. (* r (cos a)) (* r (sin a)) z))
           (.push (.-faces g) (js/THREE.Face3. 0 i (if (< i N) (+ i 1) 1)))))
       (.computeBoundingSphere g)
       (.computeFaceNormals g)
       (js/THREE.Mesh. g (js/THREE.MeshPhongMaterial. #js{
                                                          ; :color 0xffffff,
                                                          ; :specular 0xffffff,
                                                          ; :shininess 30,
                                                          :transparent true,
                                                          :side (.-DoubleSide js/THREE),
                                                          :opacity 0.7
                                                          }))))

(defn ball [r x y z]
  ;; creates a sphere of radius r centered at 0,0,0
  (let [g (js/THREE.SphereGeometry. r 32 32)
        s (js/THREE.Mesh. g (js/THREE.MeshPhongMaterial. #js{
                                                             :transparent false,
                                                             :side THREE.DoubleSide,
                                                             :color 0x000000,
                                                             }))]
    ; (.computeBoundingSphere g)
    ; (.computeFaceNormals g)
    (.set (.-position s) x y z)
    s))

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
    (.add @world (disc
                  (sqrt (- (* univDiam univDiam) 1))
                        1)
                  )
    (doseq [obj (to-world n)] (.add @world obj))
    (.add scene @world)
   ))

(defonce foo
(let [renderer  (js/THREE.WebGLRenderer. (clj->js {:antialias true}))
      container (prepareContainer (.getElementById js/document "container") renderer)
      width     (.-offsetWidth container)
      height    (.-offsetHeight container)
      camera    (js/THREE.PerspectiveCamera. 45   (/ width height)   1  4000 )
      light1    (js/THREE.DirectionalLight.  0xffffff  0.5)
      light2    (js/THREE.DirectionalLight.  0xffffff  0.6)
      light3    (js/THREE.DirectionalLight.  0xffffff  0.7)
      ;ambient   (js/THREE.AmbientLight. 0x404040)
      controls  (createCameraControls camera (.-domElement renderer))
      run       (fn run []
                  (.update controls)
                  (.render renderer scene camera)
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
  ;(.add scene ambient)
;  (.add scene light)
;  (.add scene light2)
  (.add camera light1)
  (.add camera light2)
  (.add camera light3)
  (.add scene camera)
  ;(.add scene light2)
  (.add scene @world)
  (run)
)
)

; (add (axes 2.0))
(reset! animating false)


(let [line1 (geom 1 2 2)]
  (add-t! :vector line1)
  (add-t! :plane  line1)
  (add-t! :point  line1)
)




(defn add-light-ball [r]
  ;; adds a very shiny sphere of radius r, at the origin; its specular highlights show
  ;; the location of the light sources
  (let [g (js/THREE.SphereGeometry. r 32 32)
        s (js/THREE.Mesh. g (js/THREE.MeshPhongMaterial. #js{
                                                             :transparent false,
                                                             :side THREE.DoubleSide,
                                                             :specular 0xffffff,
                                                             :shininess 100
                                                             }))]
    (.add @world s)))

;(add-light-ball 0.5)

;;;;;;;;;;;;;;;;;;;;;
(fw/watch-and-reload)
