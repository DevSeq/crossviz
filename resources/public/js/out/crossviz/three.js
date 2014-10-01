// Compiled by ClojureScript 0.0-2202
goog.provide('crossviz.three');
goog.require('cljs.core');
/**
* @param {...*} var_args
*/
crossviz.three.Scene = (function() { 
var Scene__delegate = function (args){return doConstruct(THREE.Scene,args);
};
var Scene = function (var_args){
var args = null;if (arguments.length > 0) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return Scene__delegate.call(this,args);};
Scene.cljs$lang$maxFixedArity = 0;
Scene.cljs$lang$applyTo = (function (arglist__13551){
var args = cljs.core.seq(arglist__13551);
return Scene__delegate(args);
});
Scene.cljs$core$IFn$_invoke$arity$variadic = Scene__delegate;
return Scene;
})()
;
/**
* @param {...*} var_args
*/
crossviz.three.Object3D = (function() { 
var Object3D__delegate = function (args){return doConstruct(THREE.Object3D,args);
};
var Object3D = function (var_args){
var args = null;if (arguments.length > 0) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return Object3D__delegate.call(this,args);};
Object3D.cljs$lang$maxFixedArity = 0;
Object3D.cljs$lang$applyTo = (function (arglist__13552){
var args = cljs.core.seq(arglist__13552);
return Object3D__delegate(args);
});
Object3D.cljs$core$IFn$_invoke$arity$variadic = Object3D__delegate;
return Object3D;
})()
;

//# sourceMappingURL=three.js.map