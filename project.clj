(defproject pworld "0.1.0-SNAPSHOT"
  :description "FIXME: write this!"
  :url "http://example.com/FIXME"

  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/clojurescript "0.0-2202"]                 
                 [org.clojure/core.async "0.1.278.0-76b25b-alpha"]
                 [figwheel "0.1.2-SNAPSHOT"]]

  :plugins [[cider/cider-nrepl "0.7.0-SNAPSHOT"]
            [lein-cljsbuild "1.0.3"]
            [lein-figwheel "0.1.2-SNAPSHOT"]]

  :source-paths ["src"]

  :cljsbuild { 
    :builds [{:id "pworld"
              :source-paths ["src"]
              :compiler {
                         :output-to "resources/public/js/pworld.js"
                         :output-dir "resources/public/js/out"
                         :optimizations :none
                         :source-map true}}]}
  
  :figwheel { :css-dirs ["resources/public/css"] })
