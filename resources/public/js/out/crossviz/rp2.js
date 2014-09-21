// Compiled by ClojureScript 0.0-2202
goog.provide('crossviz.rp2');
goog.require('cljs.core');
/**
* with 3 args, create an rp2 element with coords x z y; with 2 args, create an element with coords x y 1
*/
crossviz.rp2.rp2 = (function() {
var rp2 = null;
var rp2__2 = (function (x,y){return rp2.call(null,x,y,1);
});
var rp2__3 = (function (x,y,z){return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"x","x",1013904362),x,new cljs.core.Keyword(null,"y","y",1013904363),y,new cljs.core.Keyword(null,"z","z",1013904364),z], null);
});
rp2 = function(x,y,z){
switch(arguments.length){
case 2:
return rp2__2.call(this,x,y);
case 3:
return rp2__3.call(this,x,y,z);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
rp2.cljs$core$IFn$_invoke$arity$2 = rp2__2;
rp2.cljs$core$IFn$_invoke$arity$3 = rp2__3;
return rp2;
})()
;
/**
* return a new rp2 element which has been normalized so that its :z component is 1
*/
crossviz.rp2.normalize = (function normalize(p__15537){var map__15539 = p__15537;var map__15539__$1 = ((cljs.core.seq_QMARK_.call(null,map__15539))?cljs.core.apply.call(null,cljs.core.hash_map,map__15539):map__15539);var z = cljs.core.get.call(null,map__15539__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__15539__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__15539__$1,new cljs.core.Keyword(null,"x","x",1013904362));return crossviz.rp2.rp2.call(null,(x / z),(y / z));
});
crossviz.rp2.cross = (function cross(g0,g1){return crossviz.rp2.rp2.call(null,((new cljs.core.Keyword(null,"y","y",1013904363).cljs$core$IFn$_invoke$arity$1(g0) * new cljs.core.Keyword(null,"z","z",1013904364).cljs$core$IFn$_invoke$arity$1(g1)) - (new cljs.core.Keyword(null,"y","y",1013904363).cljs$core$IFn$_invoke$arity$1(g1) * new cljs.core.Keyword(null,"z","z",1013904364).cljs$core$IFn$_invoke$arity$1(g0))),((new cljs.core.Keyword(null,"x","x",1013904362).cljs$core$IFn$_invoke$arity$1(g1) * new cljs.core.Keyword(null,"z","z",1013904364).cljs$core$IFn$_invoke$arity$1(g0)) - (new cljs.core.Keyword(null,"x","x",1013904362).cljs$core$IFn$_invoke$arity$1(g0) * new cljs.core.Keyword(null,"z","z",1013904364).cljs$core$IFn$_invoke$arity$1(g1))),((new cljs.core.Keyword(null,"x","x",1013904362).cljs$core$IFn$_invoke$arity$1(g0) * new cljs.core.Keyword(null,"y","y",1013904363).cljs$core$IFn$_invoke$arity$1(g1)) - (new cljs.core.Keyword(null,"x","x",1013904362).cljs$core$IFn$_invoke$arity$1(g1) * new cljs.core.Keyword(null,"y","y",1013904363).cljs$core$IFn$_invoke$arity$1(g0))));
});

//# sourceMappingURL=rp2.js.map