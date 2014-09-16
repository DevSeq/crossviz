(ns pworld.geom)

(defn geom
  "with 3 args, create a geom with coords x z y; with 2 args, create a geom with coords x y 1"
  ; mathematically speaking, a geom is a point in the projective plane RP2, represented in CS
  ; as a map with keys :x, :y, :z.
   ([x y z]
      {:x x :y y :z z})
   ([x y]
      (geom x y 1)))

(defn normalize
  "return a new geom which has been normalized so that its :z component is 1"
  [{:keys [x y z]}] (geom (/ x z) (/ y z)))

(defn cross [g0 g1]
  "return the cross product of two geoms, which is another geom"
  (geom (- (* (:y g0) (:z g1)) (* (:y g1) (:z g0)))
        (- (* (:x g1) (:z g0)) (* (:x g0) (:z g1)))
        (- (* (:x g0) (:y g1)) (* (:x g1) (:y g0)))))

(def display-types [:line :vector :plane :point])

; Each display type denotes a particular way that a geom can be displayed -- as a line,
; a vector, a plane, or a point.

