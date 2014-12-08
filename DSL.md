dsl primitives functions:
   each primitive function can be called in one of two ways
     * with n arguments, for some n; in this case, the return value is a geom
     * a single argument which is a function which takes n arguments and returns a geom
     
   some examples of dsl primitive calls:     
     * (dsl/vector [1 2 -1])
     * (dsl/vector #(vecmul (:s @app-state) [1 2 -1]))
     * (dsl/line [2 3 -1])
     * (dsl/plane [3 1 -2])
     * (dsl/point [2 1 -3])
     * (dsl/zdisc 1)

geom:
    a geom is a data representation of a geometric object
    
    
gui component:
   (dsl/slider :s -5 5)
