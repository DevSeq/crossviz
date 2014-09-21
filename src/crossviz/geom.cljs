;;; geom:
;;; 
;;;     { :type :vector,  :color ..., :rp2  ... }
;;;     { :type :plane,   :color ..., :rp2  ... }
;;;     { :type :point,   :color ..., :rp2  ... }
;;;     { :type :axis,    :color ..., :a ..., :b ... }
;;;     { :type :segment  :color ..., :a ..., :b ... }
;;;     { :type :text     :color ..., :a ..., ... }

(ns crossviz.geom
  (:require [crossviz.obj3 :as obj3]
            [crossviz.rp2 :as rp2]))

(def current-id (atom 1000))

(defn next-id []
  (swap! current-id (fn [id] (inc id)))
  @current-id)

(defn segment3
  ([a b]
     (segment3 a b nil))
  ([a b props]
     (assoc props :type :segment3 :a a :b b :id (next-id))))

(defn text
  ([a string]
     (text a string nil))
  ([a string props]
     (assoc props :type :text :a a :string string :id (next-id))))

(defn zdisc
  ([r z]
     (zdisc r z nil))
  ([r z props]
     (assoc props :type :zdisc :r r :z z :id (next-id))))

(defn line
  ([p]
     (line p nil))
  ([p props]
     (assoc props :type :line :p p :id (next-id))))

(defn point
  ([p]
     (point p nil))
  ([p props]
     (assoc props :type :point :p p :id (next-id))))

(defn plane
  ([p]
     (plane p nil))
  ([p props]
     (assoc props :type :plane :p p :id (next-id))))

(defn vector
  ([p]
     (vector p nil))
  ([p props]
     (assoc props :type :vector :p p :id (next-id))))

(defmulti to-obj3 :type)

(defmethod to-obj3 :segment3 [g]   (obj3/segment3 (:a g) (:b g) g))

(defmethod to-obj3 :text     [g]   (obj3/text (:string g) (:a g) g))

(defmethod to-obj3 :zdisc    [g]   (obj3/zdisc (:r g) (:z g) g))

(defmethod to-obj3 :line     [g]   (obj3/segment (:p g) g))

(defmethod to-obj3 :point    [g]   (let [ng (rp2/normalize (:p g))]
                                     (obj3/ball 0.05 (:x ng) (:y ng) (:z ng) g)))

(defmethod to-obj3 :plane    [g]   (obj3/plane (:p g) g))

(defmethod to-obj3 :vector    [g]   (obj3/vector (:p g) g))
