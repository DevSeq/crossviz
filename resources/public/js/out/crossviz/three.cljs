(ns crossviz.three
  (:require-macros [crossviz.macros :as mymacros])
)

;(defn Scene [&args] (apply #(new js/THREE.Scene %) args))

;(defn Scene [ & args ] (apply #(new js/THREE.Scene %&) args))

(defn Scene [ & args ] (js/doConstruct js/THREE.Scene args))

;(defn Object3D [ & args ] (apply #(new js/THREE.Object3D %&) args))
(defn Object3D [ & args ] (js/doConstruct js/THREE.Object3D args))

;(defn TrackballControls [ & args ] (js/doConstruct js/THREE.TrackballControls args))

;(defn TrackballControls
;  ([] (new js/THREE.TrackballControls))
;  ([a1] (new js/THREE.TrackballControls a1))
;  ([a1 a2] (new js/THREE.TrackballControls a1 a2))
;  ([a1 a2 a3] (new js/THREE.TrackballControls a1 a2 a3))
;  ([a1 a2 a3 a4] (new js/THREE.TrackballControls a1 a2 a3 a4))
;  ([a1 a2 a3 a4 a5] (new js/THREE.TrackballControls a1 a2 a3 a4 a5))
;  ([a1 a2 a3 a4 a5 a6] (new js/THREE.TrackballControls a1 a2 a3 a4 a5 a6))
;  ([a1 a2 a3 a4 a5 a6 a7] (new js/THREE.TrackballControls a1 a2 a3 a4 a5 a6 a7))
;)

;(mymacros/wrap TrackballControls)

;(defn TrackballControls [ & args ] (apply #(new js/THREE.TrackballControls %&) args))



;(fn [&args] (new js/THREE.Scene
;#(new js/THREE.Scene %) args))
