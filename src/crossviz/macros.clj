(ns crossviz.macros)

(defmacro defstep [stepps & body]
  (swap!
   stepps
   (fn [stepps] (conj stepps `(fn [] ~@body)))))

(defmacro dfn [& body]
  `(fn [] ~@body))

;(defmacro wrap [name]
;  `(defn ~name
;     ([] @(new (symbol (str "js/THREE." TrackballControls))))
;     ([a1] @(new (symbol (str "js/THREE." TrackballControls)) a1))
;     ([a1 a2] @(new (symbol (str "js/THREE." TrackballControls)) a1 a2))
;     ([a1 a2 a3] @(new (symbol (str "js/THREE." TrackballControls)) a1 a2 a3))
;     ([a1 a2 a3 a4] @(new (symbol (str "js/THREE." TrackballControls)) a1 a2 a3 a4))
;     ([a1 a2 a3 a4 a5] @(new (symbol (str "js/THREE." TrackballControls)) a1 a2 a3 a4 a5))
;     ([a1 a2 a3 a4 a5 a6] @(new (symbol (str "js/THREE." TrackballControls)) a1 a2 a3 a4 a5 a6))
;     ([a1 a2 a3 a4 a5 a6 a7] @(new (symbol (str "js/THREE." TrackballControls)) a1 a2 a3 a4 a5 a6 a7))
;     ))


;(defmacro construct [name & args]
;  `(new name ~@args))

;(defmacro construct
;  ([name a1] `(new ~(str name ".") a1))
;  ([name a1 a2] `(new ~(str name ".") a1 a2))
;  ([name a1 a2 a3] `(new ~(str name ".") a1 a2 a3))
;  ([name a1 a2 a3 a4] `(new ~(str name ".") a1 a2 a3 a4))
;  ([name a1 a2 a3 a4 a5] `(new ~(str name ".") a1 a2 a3 a4 a5))
