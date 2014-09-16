;;; geom:
;;; 
;;;     { :type :vector,  :color ..., :rp2  ... }
;;;     { :type :plane,   :color ..., :rp2  ... }
;;;     { :type :point,   :color ..., :rp2  ... }
;;;     { :type :axis,    :color ..., :a ..., :b ... }
;;;     { :type :segment  :color ..., :a ..., :b ... }
;;;     { :type :text     :color ..., :a ..., ... }

(ns pworld.geom
  (:require [pworld.obj3 :as obj3]))

(defn segment3
  ([a b]
     (segment3 a b nil))
  ([a b props]
     (assoc props :type :segment3 :a a :b b)))

(defn text
  ([a string]
     (text a string nil))
  ([a string props]
     (assoc props :type :text :a a :string string)))

(defmulti to-obj3 :type)

(defmethod to-obj3 :segment3 [g]   (obj3/segment3 (:a g) (:b g) g))

(defmethod to-obj3 :text     [g]   (obj3/text (:string g) (:a g) g))
