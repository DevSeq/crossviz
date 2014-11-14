(ns crossviz.scratch
  (:require [crossviz.core :as cv]
            [crossviz.three :as three]
            [crossviz.rp2 :as rp2]
            [crossviz.obj3 :as obj3 :refer [vector3]]
            [crossviz.geom :as geom]
            [crossviz.math :as math]
            [crossviz.constants :as constants])
  (:require-macros [crossviz.macros :as mymacros])
)

; This is a sample action function, for testing.  It prints out the numbers from n down to 0, then stops.
(defn countdown-action [n dn]
  (if (< n 0) nil
    (fn []
      (println n)
      (countdown-action (- n dn) dn))
  )
)

@cv/trackballing
(reset! cv/trackballing true)


; NOTE: to see the current camera position/quaternion, use the following.  (Make sure the
; js console is open in the browser.)  Note that (.log js/console ...) prints the JS object
; in a way that can be inspected in the brower, where as (println ...) just prints the
; useless "#<Object>".
(.log js/console (.-quaternion cv/camera))
(.log js/console (.-position cv/camera))


; This function will cause the camera to jump to the new position;
; trackball controls have to be turned off for this to work.
(defn resetcam []
  (set! (.-quaternion cv/camera)
    (js/THREE.Quaternion. 0 0 0 1)
  )
  (set! (.-position cv/camera)
    (js/THREE.Vector3. 0 0 6)
  )
)

; Some utility functions for better cljs pleasure:

(defn v3vec [v3]  [(.-x v3) (.-y v3) (.-z v3)])

(defn cammap [cam]
  { :up (v3vec (.-up cam)) :position (v3vec (.-position cam)) })


; create a vector geom with a text label:
(defn lvec
  ([x y z t] (lvec x y z t nil))
  ([x y z t props]
   [(geom/vector (rp2/rp2 x y z) props)
    (geom/text [x y z] t props)])
)


(def a1 (lvec 1 1 1 "a1" {:color 0xffff00}))
(cv/insert-geom a1)
(cv/remove-geom a1)
;(def a2 (lvec 0 1 0 "a2" {:color 0xffff00}))
;(insert-geom a2)

;(def p (lvec 0.5 0.5 0.5 "p" {:color 0xff00ff}))
;(insert-geom p)
;(remove-geom p)


; cljs wrapper around THREE.Matrix4's decompose function:
(defn decons [m]
  (let [q (js/THREE.Quaternion.)
        p (js/THREE.Vector3.)
        s 0.0]
  (.decompose m p q s)
  { :position [ (.-x p) (.-y p) (.-z p) ]
    :quaternion [ (.-x q) (.-y q) (.-z q) (.-w q)]
    :scale s }))
