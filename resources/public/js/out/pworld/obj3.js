// Compiled by ClojureScript 0.0-2202
goog.provide('pworld.obj3');
goog.require('cljs.core');
goog.require('pworld.constants');
goog.require('pworld.constants');
goog.require('pworld.rp2');
goog.require('pworld.rp2');
goog.require('pworld.math');
goog.require('pworld.math');
pworld.obj3.default_props = new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"color","color",1108746965),0,new cljs.core.Keyword(null,"transparent","transparent",3582677188),false,new cljs.core.Keyword(null,"opacity","opacity",4041665405),0.7,new cljs.core.Keyword(null,"linewidth","linewidth",3534637508),4,new cljs.core.Keyword(null,"size","size",1017434995),0.2,new cljs.core.Keyword(null,"height","height",4087841945),0.01,new cljs.core.Keyword(null,"side","side",1017434313),THREE.DoubleSide], null);
pworld.obj3.axis = (function axis(v,color){var obj = (new THREE.Geometry());obj.vertices.push(v);
obj.vertices.push(v.clone().negate());
return (new THREE.Line(obj,(new THREE.LineBasicMaterial({"linewidth": 2, "opacity": 0.5, "color": color}))));
});
pworld.obj3.axes = (function axes(len){var obj = (new THREE.Object3D());obj.add(pworld.obj3.axis.call(null,(new THREE.Vector3(len,0,0)),16711680));
obj.add(pworld.obj3.axis.call(null,(new THREE.Vector3(0,len,0)),65280));
obj.add(pworld.obj3.axis.call(null,(new THREE.Vector3(0,0,len)),255));
return obj;
});
pworld.obj3.vector_from_typed_goem = (function vector_from_typed_goem(p__7291){var map__7293 = p__7291;var map__7293__$1 = ((cljs.core.seq_QMARK_.call(null,map__7293))?cljs.core.apply.call(null,cljs.core.hash_map,map__7293):map__7293);var z = cljs.core.get.call(null,map__7293__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__7293__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__7293__$1,new cljs.core.Keyword(null,"x","x",1013904362));var g = (new THREE.Geometry());g.vertices.push((new THREE.Vector3(x,y,z)));
g.vertices.push((new THREE.Vector3(0,0,0)));
return (new THREE.Line(g,(new THREE.LineBasicMaterial({"linewidth": 2, "opacity": 0, "color": pworld.constants.vectorColor}))));
});
pworld.obj3.line_from_typed_goem = (function line_from_typed_goem(p__7294){var map__7297 = p__7294;var map__7297__$1 = ((cljs.core.seq_QMARK_.call(null,map__7297))?cljs.core.apply.call(null,cljs.core.hash_map,map__7297):map__7297);var z = cljs.core.get.call(null,map__7297__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__7297__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__7297__$1,new cljs.core.Keyword(null,"x","x",1013904362));var g = (new THREE.Geometry());var A = ((x * x) + (y * y));var vec__7298 = (((pworld.math.abs.call(null,x) > pworld.math.abs.call(null,y)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * y) * z),((z * z) + ((x * x) * (1 - (pworld.constants.univDiam * pworld.constants.univDiam)))),((function (g,A,map__7297,map__7297__$1,z,y,x){
return (function (t){return (new THREE.Vector3(((- (z + (y * t))) / x),t,1));
});})(g,A,map__7297,map__7297__$1,z,y,x))
], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * x) * z),((z * z) + ((y * y) * (1 - (pworld.constants.univDiam * pworld.constants.univDiam)))),((function (g,A,map__7297,map__7297__$1,z,y,x){
return (function (t){return (new THREE.Vector3(t,((- (z + (x * t))) / y),1));
});})(g,A,map__7297,map__7297__$1,z,y,x))
], null));var B = cljs.core.nth.call(null,vec__7298,0,null);var C = cljs.core.nth.call(null,vec__7298,1,null);var vert = cljs.core.nth.call(null,vec__7298,2,null);var D = pworld.math.sqrt.call(null,((B * B) - ((4 * A) * C)));g.vertices.push(vert.call(null,(((- B) + D) / (2.0 * A))));
g.vertices.push(vert.call(null,(((- B) - D) / (2.0 * A))));
return (new THREE.Line(g,(new THREE.LineBasicMaterial({"linewidth": 5, "opacity": 0, "color": pworld.constants.lineColor}))));
});
pworld.obj3.from_typed_goem = (function (){var method_table__4339__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__4340__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__4341__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__4342__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__4343__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",3129050535),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("from-typed-goem",cljs.core.first,new cljs.core.Keyword(null,"default","default",2558708147),hierarchy__4343__auto__,method_table__4339__auto__,prefer_table__4340__auto__,method_cache__4341__auto__,cached_hierarchy__4342__auto__));
})();
cljs.core._add_method.call(null,pworld.obj3.from_typed_goem,new cljs.core.Keyword(null,"vector","vector",4488484021),(function (p__7299){var vec__7300 = p__7299;var _ = cljs.core.nth.call(null,vec__7300,0,null);var g = cljs.core.nth.call(null,vec__7300,1,null);return pworld.obj3.vector_from_typed_goem.call(null,g);
}));
cljs.core._add_method.call(null,pworld.obj3.from_typed_goem,new cljs.core.Keyword(null,"line","line",1017226086),(function (p__7301){var vec__7302 = p__7301;var _ = cljs.core.nth.call(null,vec__7302,0,null);var g = cljs.core.nth.call(null,vec__7302,1,null);return pworld.obj3.line_from_typed_goem.call(null,g);
}));
cljs.core._add_method.call(null,pworld.obj3.from_typed_goem,new cljs.core.Keyword(null,"point","point",1120749826),(function (p__7303){var vec__7304 = p__7303;var _ = cljs.core.nth.call(null,vec__7304,0,null);var g = cljs.core.nth.call(null,vec__7304,1,null);return pworld.obj3.point_from_typed_goem.call(null,g);
}));
cljs.core._add_method.call(null,pworld.obj3.from_typed_goem,new cljs.core.Keyword(null,"plane","plane",1120652750),(function (p__7305){var vec__7306 = p__7305;var _ = cljs.core.nth.call(null,vec__7306,0,null);var g = cljs.core.nth.call(null,vec__7306,1,null);return pworld.obj3.plane_from_typed_goem.call(null,g);
}));
pworld.obj3.text = (function() {
var text = null;
var text__2 = (function (string,a){return string.call(null,a,null);
});
var text__3 = (function (string,p__7307,props){var vec__7309 = p__7307;var x = cljs.core.nth.call(null,vec__7309,0,null);var y = cljs.core.nth.call(null,vec__7309,1,null);var z = cljs.core.nth.call(null,vec__7309,2,null);var mprops = cljs.core.merge.call(null,pworld.obj3.default_props,props);var g = (new THREE.TextGeometry(string,cljs.core.clj__GT_js.call(null,mprops)));var s = (new THREE.Mesh(g,(new THREE.MeshPhongMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"transparent","transparent",3582677188),false,new cljs.core.Keyword(null,"side","side",1017434313),THREE.DoubleSide], null),mprops))))));s.position.set(x,y,z);
return s;
});
text = function(string,p__7307,props){
switch(arguments.length){
case 2:
return text__2.call(this,string,p__7307);
case 3:
return text__3.call(this,string,p__7307,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
text.cljs$core$IFn$_invoke$arity$2 = text__2;
text.cljs$core$IFn$_invoke$arity$3 = text__3;
return text;
})()
;
pworld.obj3.segment3 = (function() {
var segment3 = null;
var segment3__2 = (function (a,b){return segment3.call(null,a,b,null);
});
var segment3__3 = (function (p__7310,p__7311,props){var vec__7314 = p__7310;var ax = cljs.core.nth.call(null,vec__7314,0,null);var ay = cljs.core.nth.call(null,vec__7314,1,null);var az = cljs.core.nth.call(null,vec__7314,2,null);var vec__7315 = p__7311;var bx = cljs.core.nth.call(null,vec__7315,0,null);var by = cljs.core.nth.call(null,vec__7315,1,null);var bz = cljs.core.nth.call(null,vec__7315,2,null);var obj = (new THREE.Geometry());obj.vertices.push((new THREE.Vector3(ax,ay,az)));
obj.vertices.push((new THREE.Vector3(bx,by,bz)));
return (new THREE.Line(obj,(new THREE.LineBasicMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,pworld.obj3.default_props,props))))));
});
segment3 = function(p__7310,p__7311,props){
switch(arguments.length){
case 2:
return segment3__2.call(this,p__7310,p__7311);
case 3:
return segment3__3.call(this,p__7310,p__7311,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
segment3.cljs$core$IFn$_invoke$arity$2 = segment3__2;
segment3.cljs$core$IFn$_invoke$arity$3 = segment3__3;
return segment3;
})()
;
pworld.obj3.zdisc = (function() {
var zdisc = null;
var zdisc__2 = (function (r,z){return zdisc.call(null,r,z,null);
});
var zdisc__3 = (function (r,z,props){var g = (new THREE.Geometry());var N = 60;g.vertices.push((new THREE.Vector3(0,0,z)));
var seq__7320_7324 = cljs.core.seq.call(null,cljs.core.range.call(null,0,(N + 1)));var chunk__7321_7325 = null;var count__7322_7326 = 0;var i__7323_7327 = 0;while(true){
if((i__7323_7327 < count__7322_7326))
{var i_7328 = cljs.core._nth.call(null,chunk__7321_7325,i__7323_7327);var a_7329 = (((2 * pworld.math.PI) * i_7328) / N);g.vertices.push((new THREE.Vector3((r * pworld.math.cos.call(null,a_7329)),(r * pworld.math.sin.call(null,a_7329)),z)));
g.faces.push((new THREE.Face3(0,i_7328,(((i_7328 < N))?(i_7328 + 1):1))));
{
var G__7330 = seq__7320_7324;
var G__7331 = chunk__7321_7325;
var G__7332 = count__7322_7326;
var G__7333 = (i__7323_7327 + 1);
seq__7320_7324 = G__7330;
chunk__7321_7325 = G__7331;
count__7322_7326 = G__7332;
i__7323_7327 = G__7333;
continue;
}
} else
{var temp__4126__auto___7334 = cljs.core.seq.call(null,seq__7320_7324);if(temp__4126__auto___7334)
{var seq__7320_7335__$1 = temp__4126__auto___7334;if(cljs.core.chunked_seq_QMARK_.call(null,seq__7320_7335__$1))
{var c__4229__auto___7336 = cljs.core.chunk_first.call(null,seq__7320_7335__$1);{
var G__7337 = cljs.core.chunk_rest.call(null,seq__7320_7335__$1);
var G__7338 = c__4229__auto___7336;
var G__7339 = cljs.core.count.call(null,c__4229__auto___7336);
var G__7340 = 0;
seq__7320_7324 = G__7337;
chunk__7321_7325 = G__7338;
count__7322_7326 = G__7339;
i__7323_7327 = G__7340;
continue;
}
} else
{var i_7341 = cljs.core.first.call(null,seq__7320_7335__$1);var a_7342 = (((2 * pworld.math.PI) * i_7341) / N);g.vertices.push((new THREE.Vector3((r * pworld.math.cos.call(null,a_7342)),(r * pworld.math.sin.call(null,a_7342)),z)));
g.faces.push((new THREE.Face3(0,i_7341,(((i_7341 < N))?(i_7341 + 1):1))));
{
var G__7343 = cljs.core.next.call(null,seq__7320_7335__$1);
var G__7344 = null;
var G__7345 = 0;
var G__7346 = 0;
seq__7320_7324 = G__7343;
chunk__7321_7325 = G__7344;
count__7322_7326 = G__7345;
i__7323_7327 = G__7346;
continue;
}
}
} else
{}
}
break;
}
g.computeBoundingSphere();
g.computeFaceNormals();
return (new THREE.Mesh(g,(new THREE.MeshPhongMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,pworld.obj3.default_props,props))))));
});
zdisc = function(r,z,props){
switch(arguments.length){
case 2:
return zdisc__2.call(this,r,z);
case 3:
return zdisc__3.call(this,r,z,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
zdisc.cljs$core$IFn$_invoke$arity$2 = zdisc__2;
zdisc.cljs$core$IFn$_invoke$arity$3 = zdisc__3;
return zdisc;
})()
;
pworld.obj3.ball = (function() {
var ball = null;
var ball__4 = (function (r,x,y,z){return ball.call(null,r,x,y,z,null);
});
var ball__5 = (function (r,x,y,z,props){var g = (new THREE.SphereGeometry(r,32,32));var s = (new THREE.Mesh(g,(new THREE.MeshPhongMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,pworld.obj3.default_props,props))))));s.position.set(x,y,z);
return s;
});
ball = function(r,x,y,z,props){
switch(arguments.length){
case 4:
return ball__4.call(this,r,x,y,z);
case 5:
return ball__5.call(this,r,x,y,z,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
ball.cljs$core$IFn$_invoke$arity$4 = ball__4;
ball.cljs$core$IFn$_invoke$arity$5 = ball__5;
return ball;
})()
;
pworld.obj3.segment_endpoints = (function segment_endpoints(p__7347){var map__7350 = p__7347;var map__7350__$1 = ((cljs.core.seq_QMARK_.call(null,map__7350))?cljs.core.apply.call(null,cljs.core.hash_map,map__7350):map__7350);var z = cljs.core.get.call(null,map__7350__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__7350__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__7350__$1,new cljs.core.Keyword(null,"x","x",1013904362));var A = ((x * x) + (y * y));var vec__7351 = (((pworld.math.abs.call(null,x) > pworld.math.abs.call(null,y)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * y) * z),((z * z) + ((x * x) * (1 - (pworld.constants.univDiam * pworld.constants.univDiam)))),((function (A,map__7350,map__7350__$1,z,y,x){
return (function (t){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((- (z + (y * t))) / x),t,1], null);
});})(A,map__7350,map__7350__$1,z,y,x))
], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * x) * z),((z * z) + ((y * y) * (1 - (pworld.constants.univDiam * pworld.constants.univDiam)))),((function (A,map__7350,map__7350__$1,z,y,x){
return (function (t){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,((- (z + (x * t))) / y),1], null);
});})(A,map__7350,map__7350__$1,z,y,x))
], null));var B = cljs.core.nth.call(null,vec__7351,0,null);var C = cljs.core.nth.call(null,vec__7351,1,null);var vert = cljs.core.nth.call(null,vec__7351,2,null);var D = pworld.math.sqrt.call(null,((B * B) - ((4 * A) * C)));return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [vert.call(null,(((- B) + D) / (2.0 * A))),vert.call(null,(((- B) - D) / (2.0 * A)))], null);
});
pworld.obj3.segment = (function() {
var segment = null;
var segment__1 = (function (p){return segment.call(null,p,null);
});
var segment__2 = (function (p,props){var vec__7353 = pworld.obj3.segment_endpoints.call(null,p);var a = cljs.core.nth.call(null,vec__7353,0,null);var b = cljs.core.nth.call(null,vec__7353,1,null);var g = (new THREE.Geometry());g.vertices.push((new THREE.Vector3(a.call(null,0),a.call(null,1),a.call(null,2))));
g.vertices.push((new THREE.Vector3(b.call(null,0),b.call(null,1),b.call(null,2))));
return (new THREE.Line(g,(new THREE.LineBasicMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,pworld.obj3.default_props,props))))));
});
segment = function(p,props){
switch(arguments.length){
case 1:
return segment__1.call(this,p);
case 2:
return segment__2.call(this,p,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
segment.cljs$core$IFn$_invoke$arity$1 = segment__1;
segment.cljs$core$IFn$_invoke$arity$2 = segment__2;
return segment;
})()
;
pworld.obj3.plane = (function() {
var plane = null;
var plane__1 = (function (p){return plane.call(null,p,null);
});
var plane__2 = (function (p__7354,props){var map__7356 = p__7354;var map__7356__$1 = ((cljs.core.seq_QMARK_.call(null,map__7356))?cljs.core.apply.call(null,cljs.core.hash_map,map__7356):map__7356);var z = cljs.core.get.call(null,map__7356__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__7356__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__7356__$1,new cljs.core.Keyword(null,"x","x",1013904362));var v = (new THREE.Vector3(x,y,z));var k = (new THREE.Vector3(0,0,1));var axis = (new THREE.Vector3()).crossVectors(k,v).normalize();var angle = k.angleTo(v);var R = (new THREE.Matrix4()).makeRotationAxis(axis,angle);var obj = pworld.obj3.zdisc.call(null,pworld.constants.univDiam,0,props);obj.applyMatrix(R);
return obj;
});
plane = function(p__7354,props){
switch(arguments.length){
case 1:
return plane__1.call(this,p__7354);
case 2:
return plane__2.call(this,p__7354,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
plane.cljs$core$IFn$_invoke$arity$1 = plane__1;
plane.cljs$core$IFn$_invoke$arity$2 = plane__2;
return plane;
})()
;
pworld.obj3.vector = (function() {
var vector = null;
var vector__1 = (function (p){return vector.call(null,p,null);
});
var vector__2 = (function (p__7357,props){var map__7359 = p__7357;var map__7359__$1 = ((cljs.core.seq_QMARK_.call(null,map__7359))?cljs.core.apply.call(null,cljs.core.hash_map,map__7359):map__7359);var z = cljs.core.get.call(null,map__7359__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__7359__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__7359__$1,new cljs.core.Keyword(null,"x","x",1013904362));var g = (new THREE.Geometry());g.vertices.push((new THREE.Vector3(x,y,z)));
g.vertices.push((new THREE.Vector3(0,0,0)));
return (new THREE.Line(g,(new THREE.LineBasicMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,pworld.obj3.default_props,props))))));
});
vector = function(p__7357,props){
switch(arguments.length){
case 1:
return vector__1.call(this,p__7357);
case 2:
return vector__2.call(this,p__7357,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
vector.cljs$core$IFn$_invoke$arity$1 = vector__1;
vector.cljs$core$IFn$_invoke$arity$2 = vector__2;
return vector;
})()
;

//# sourceMappingURL=obj3.js.map