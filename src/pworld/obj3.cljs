(ns pworld.obj3
  (:require [pworld.math :as math]
            [pworld.rp2 :as rp2]
            [pworld.constants :as constants])
)


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

(defn disc [r z]
   (let [g (js/THREE.Geometry.)
         N 60]
       (.push (.-vertices g) (js/THREE.Vector3. 0 0 z))
       (doseq [i (range 0 (+ N 1))]
         (let [a (/ (* 2 math/PI i) N)]
           (.push (.-vertices g) (js/THREE.Vector3. (* r (math/cos a)) (* r (math/sin a)) z))
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

(defn axis [v color]
  ; takes THREE.js Vector3 `v`, and a color `color`, and returns a
  ; THREE.js obj3 representing an axis in the direction of `v`
  ; (the endpoints of the axis will be v and -v).
  (let [obj (js/THREE.Geometry.)]
    (.push (.-vertices obj) v)
    (.push (.-vertices obj) (.negate (.clone v)))
    (js/THREE.Line. obj (js/THREE.LineBasicMaterial. #js{
      :color     color
      :opacity   0.5
      :linewidth 2
    })))
)

(defn axes [len]
  ; takes a length `len`, and returns a THREE.js Object3D object
  ; representing a set of 3 coordinate axes of that length
  (let [obj (js/THREE.Object3D.)]
    (.add obj (axis (js/THREE.Vector3. len 0 0) 0xff0000))
    (.add obj (axis (js/THREE.Vector3. 0 len 0) 0x00ff00))
    (.add obj (axis (js/THREE.Vector3. 0 0 len) 0x0000ff))
    obj)
)

;;;
;;; functions to convert typed goems into THREE.js objects for display
;;;

(defn point-from-typed-goem [g]
  (let [ng (rp2/normalize g)]
    (ball 0.05 (:x ng) (:y ng) (:z ng))))

(defn vector-from-typed-goem [{:keys [x y z]}]
    (let [g (js/THREE.Geometry.)]
      (.push (.-vertices g) (js/THREE.Vector3. x y z))
      (.push (.-vertices g) (js/THREE.Vector3. 0 0 0))
      (js/THREE.Line. g (js/THREE.LineBasicMaterial.
                         #js {
                               :color      constants/vectorColor,
                               :opacity    0,
                               :linewidth  2
                             }))))

(defn plane-from-typed-goem [{:keys [x y z]}]
  ; return a disc Object3D through 0,0,0
  (let [v     (js/THREE.Vector3. x y z)
        k     (js/THREE.Vector3. 0 0 1)
        axis  (-> (js/THREE.Vector3.)
                  (.crossVectors k v)
                  (.normalize))
        angle (-> k (.angleTo v))
        R     (-> (js/THREE.Matrix4.)
                  (.makeRotationAxis axis angle))
        obj   (disc constants/univDiam 0)]
    (-> obj (.applyMatrix R))
    obj
))

(defn line-from-typed-goem [{:keys [x y z]}]
  (let [g          (js/THREE.Geometry.)
        A          (+ (* x x) (* y y))
        [B C vert] (if (> (math/abs x) (math/abs y))
                     [ (* 2 y z)                                                             ; B
                       (+ (* z z) (* x x (- 1 (* constants/univDiam constants/univDiam))))   ; C
                       (fn [t] (js/THREE.Vector3. (/ (- (+ z (* y t))) x) t 1))              ; vert
                       ]
                     [ (* 2 x z)                                                             ; B
                       (+ (* z z) (* y y (- 1 (* constants/univDiam constants/univDiam))))   ; C
                       (fn [t] (js/THREE.Vector3. t  (/ (- (+ z (* x t))) y)  1))            ; vert
                       ])
        D          (math/sqrt (- (* B B) (* 4 A C)))
        ]
    (-> g (.-vertices) (.push (vert (/ (+ (- B) D) (* 2.0 A)))))
    (-> g (.-vertices) (.push (vert (/ (- (- B) D) (* 2.0 A)))))
    (js/THREE.Line. g (js/THREE.LineBasicMaterial. #js{
                                                      :color     constants/lineColor,
                                                      :opacity   0,
                                                      :linewidth 5
                                   }))
    )
  )


; a convenient multi-method for converting typed goems to THREE.js objects

(defmulti from-typed-goem first)

(defmethod from-typed-goem :vector [[_ g]]   (vector-from-typed-goem g))
(defmethod from-typed-goem :line   [[_ g]]   (line-from-typed-goem   g))
(defmethod from-typed-goem :point  [[_ g]]   (point-from-typed-goem  g))
(defmethod from-typed-goem :plane  [[_ g]]   (plane-from-typed-goem  g))

; so now we can say
;    (from-typed-goem TYPED-GOEM)
; to convert any typed goem to an obj3!


;;; (defn add-light-ball [r]
;;;   ;; adds a very shiny sphere of radius r, at the origin; its specular highlights show
;;;   ;; the location of the light sources
;;;   (let [g (js/THREE.SphereGeometry. r 32 32)
;;;         s (js/THREE.Mesh. g (js/THREE.MeshPhongMaterial. #js{
;;;                                                              :transparent false,
;;;                                                              :side THREE.DoubleSide,
;;;                                                              :specular 0xffffff,
;;;                                                              :shininess 100
;;;                                                              }))]
;;;     (.add @world s)))

(defn text
  ([string a] (string a nil))
  ([string [x y z] props]
     (let [mprops (merge default-props props)
           g (js/THREE.TextGeometry. string (clj->js mprops))
           s (js/THREE.Mesh. g (js/THREE.MeshPhongMaterial. 
                                (clj->js (merge {:transparent false, :side THREE.DoubleSide } mprops))))]
       (.set (.-position s) x y z)
       s)))

(def default-props {:color     0x000000
                    :opacity   0.0
                    :linewidth 4
                    :size      0.2  ; for text, size of the text
                    :height    0.01 ; for text, height of the text
                                        ; :curveSegments — Integer. Number of points on the curves.
                                        ; :font — String. Font name.
                                        ; :weight — String. Font weight (normal, bold).
                                        ; :style — String. Font style (normal, italics).
                                        ; :bevelEnabled — Boolean. Turn on bevel. Default is False.
                                        ; :bevelThickness — Float. How deep into text bevel goes. Default is 10.
                                        ; :bevelSize — Float. How far from text outline is bevel. Default is 8.
                    })


(defn segment3
  ([a b]
     (segment3 a b nil))
  ([[ax ay az] [bx by bz] props]
  ; takes 2 points in R3 (vectors), and a color, and returns a THREE.js obj3
  ; representing a 3 dimensional line segment from a to b.
     (let [obj (js/THREE.Geometry.)]
       (.push (.-vertices obj) (js/THREE.Vector3. ax ay az))
       (.push (.-vertices obj) (js/THREE.Vector3. bx by bz))
       (js/THREE.Line. obj (js/THREE.LineBasicMaterial. (clj->js (merge default-props props)))))))
