(ns crossviz.macros)

(defmacro defstep [stepps & body]
  (swap!
   stepps
   (fn [stepps] (conj stepps `(fn [] ~@body)))))

(defmacro dfn [& body]
  `(fn [] ~@body))
