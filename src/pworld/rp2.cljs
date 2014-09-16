(ns pworld.rp2)

(defn rp2
  "with 3 args, create an rp2 element with coords x z y; with 2 args, create an element with coords x y 1"
  ; We represent an element of RP2 as a map with keys :x, :y, :z.
   ([x y z]
      {:x x :y y :z z})
   ([x y]
      (rp2 x y 1)))

(defn normalize
  "return a new rp2 element which has been normalized so that its :z component is 1"
  [{:keys [x y z]}] (rp2 (/ x z) (/ y z)))

(defn cross [g0 g1]
  "return the cross product of two elements in rp2, which is another rp2 element"
  (rp2 (- (* (:y g0) (:z g1)) (* (:y g1) (:z g0)))
        (- (* (:x g1) (:z g0)) (* (:x g0) (:z g1)))
        (- (* (:x g0) (:y g1)) (* (:x g1) (:y g0)))))

; (def display-types [:line :vector :plane :point])

; Each display type denotes a particular way that a rp2 can be displayed -- as a line,
; a vector, a plane, or a point.

