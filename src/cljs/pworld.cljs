(ns pworld.pworld)

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

(defn consolelog [msg] (.log js/console msg))

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

(let [renderer  (js/THREE.WebGLRenderer. (clj->js {:antialias true}))
      container (prepareContainer (.getElementById js/document "container") renderer)
      width     (.-offsetWidth container)
      height    (.-offsetHeight container)
      scene     (js/THREE.Scene.)
      camera    (js/THREE.PerspectiveCamera. 45   (/ width height)   1  4000 )
      light     (js/THREE.DirectionalLight.  0xffffff  1.5)
      light2    (js/THREE.DirectionalLight.  0xffffff  1.5)
      world     (js.THREE.Object3D.)
      controls  (createCameraControls camera (.-domElement renderer))
      run       (fn run []
                  (.update controls)
                  (.render renderer scene camera)
                  ; if (animating) { world.rotation.y -= 0.01; }
                  (js/requestAnimationFrame run))
     ]
     (.setSize renderer width height)
     (.set (.-position camera) 1  -5  3)
     (.set (.-up camera) 0 0 1)
     (.set (.-position light) 0 0 1)
     (.set (.-position light2) 0 0 -1)
     (.add scene light)
     (.add scene light2)
     (.add world (axes 2.0))
     (.add scene world)
     (run)
;    (consolelog "hi there")
)
