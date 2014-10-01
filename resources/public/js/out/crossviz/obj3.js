// Compiled by ClojureScript 0.0-2202
goog.provide('crossviz.obj3');
goog.require('cljs.core');
goog.require('crossviz.constants');
goog.require('crossviz.constants');
goog.require('crossviz.rp2');
goog.require('crossviz.rp2');
goog.require('crossviz.math');
goog.require('crossviz.math');
crossviz.obj3.default_props = new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"color","color",1108746965),0,new cljs.core.Keyword(null,"transparent","transparent",3582677188),false,new cljs.core.Keyword(null,"opacity","opacity",4041665405),0.7,new cljs.core.Keyword(null,"linewidth","linewidth",3534637508),4,new cljs.core.Keyword(null,"size","size",1017434995),0.2,new cljs.core.Keyword(null,"height","height",4087841945),0.01,new cljs.core.Keyword(null,"side","side",1017434313),THREE.DoubleSide], null);
crossviz.obj3.vector3 = (function vector3(x,y,z){return (new THREE.Vector3(x,y,z));
});
crossviz.obj3.axis = (function axis(v,color){var obj = (new THREE.Geometry());obj.vertices.push(v);
obj.vertices.push(v.clone().negate());
return (new THREE.Line(obj,(new THREE.LineBasicMaterial({"linewidth": 2, "opacity": 0.5, "color": color}))));
});
crossviz.obj3.axes = (function axes(len){var obj = (new THREE.Object3D());obj.add(crossviz.obj3.axis.call(null,crossviz.obj3.vector3.call(null,len,0,0),16711680));
obj.add(crossviz.obj3.axis.call(null,crossviz.obj3.vector3.call(null,0,len,0),65280));
obj.add(crossviz.obj3.axis.call(null,crossviz.obj3.vector3.call(null,0,0,len),255));
return obj;
});
crossviz.obj3.vector_from_typed_goem = (function vector_from_typed_goem(p__13487){var map__13489 = p__13487;var map__13489__$1 = ((cljs.core.seq_QMARK_.call(null,map__13489))?cljs.core.apply.call(null,cljs.core.hash_map,map__13489):map__13489);var z = cljs.core.get.call(null,map__13489__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__13489__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__13489__$1,new cljs.core.Keyword(null,"x","x",1013904362));var g = (new THREE.Geometry());g.vertices.push(crossviz.obj3.vector3.call(null,x,y,z));
g.vertices.push(crossviz.obj3.vector3.call(null,0,0,0));
return (new THREE.Line(g,(new THREE.LineBasicMaterial({"linewidth": 2, "opacity": 0, "color": crossviz.constants.vectorColor}))));
});
crossviz.obj3.line_from_typed_goem = (function line_from_typed_goem(p__13490){var map__13493 = p__13490;var map__13493__$1 = ((cljs.core.seq_QMARK_.call(null,map__13493))?cljs.core.apply.call(null,cljs.core.hash_map,map__13493):map__13493);var z = cljs.core.get.call(null,map__13493__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__13493__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__13493__$1,new cljs.core.Keyword(null,"x","x",1013904362));var g = (new THREE.Geometry());var A = ((x * x) + (y * y));var vec__13494 = (((crossviz.math.abs.call(null,x) > crossviz.math.abs.call(null,y)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * y) * z),((z * z) + ((x * x) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (g,A,map__13493,map__13493__$1,z,y,x){
return (function (t){return crossviz.obj3.vector3.call(null,((- (z + (y * t))) / x),t,1);
});})(g,A,map__13493,map__13493__$1,z,y,x))
], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * x) * z),((z * z) + ((y * y) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (g,A,map__13493,map__13493__$1,z,y,x){
return (function (t){return crossviz.obj3.vector3.call(null,t,((- (z + (x * t))) / y),1);
});})(g,A,map__13493,map__13493__$1,z,y,x))
], null));var B = cljs.core.nth.call(null,vec__13494,0,null);var C = cljs.core.nth.call(null,vec__13494,1,null);var vert = cljs.core.nth.call(null,vec__13494,2,null);var D = crossviz.math.sqrt.call(null,((B * B) - ((4 * A) * C)));g.vertices.push(vert.call(null,(((- B) + D) / (2.0 * A))));
g.vertices.push(vert.call(null,(((- B) - D) / (2.0 * A))));
return (new THREE.Line(g,(new THREE.LineBasicMaterial({"linewidth": 5, "opacity": 0, "color": crossviz.constants.lineColor}))));
});
crossviz.obj3.text = (function() {
var text = null;
var text__2 = (function (string,a){return string.call(null,a,null);
});
var text__3 = (function (string,p__13495,props){var vec__13497 = p__13495;var x = cljs.core.nth.call(null,vec__13497,0,null);var y = cljs.core.nth.call(null,vec__13497,1,null);var z = cljs.core.nth.call(null,vec__13497,2,null);var mprops = cljs.core.merge.call(null,crossviz.obj3.default_props,props);var g = (new THREE.TextGeometry(string,cljs.core.clj__GT_js.call(null,mprops)));var s = (new THREE.Mesh(g,(new THREE.MeshPhongMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"transparent","transparent",3582677188),false,new cljs.core.Keyword(null,"side","side",1017434313),THREE.DoubleSide], null),mprops))))));s.position.set(x,y,z);
return s;
});
text = function(string,p__13495,props){
switch(arguments.length){
case 2:
return text__2.call(this,string,p__13495);
case 3:
return text__3.call(this,string,p__13495,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
text.cljs$core$IFn$_invoke$arity$2 = text__2;
text.cljs$core$IFn$_invoke$arity$3 = text__3;
return text;
})()
;
crossviz.obj3.segment3 = (function() {
var segment3 = null;
var segment3__2 = (function (a,b){return segment3.call(null,a,b,null);
});
var segment3__3 = (function (p__13498,p__13499,props){var vec__13502 = p__13498;var ax = cljs.core.nth.call(null,vec__13502,0,null);var ay = cljs.core.nth.call(null,vec__13502,1,null);var az = cljs.core.nth.call(null,vec__13502,2,null);var vec__13503 = p__13499;var bx = cljs.core.nth.call(null,vec__13503,0,null);var by = cljs.core.nth.call(null,vec__13503,1,null);var bz = cljs.core.nth.call(null,vec__13503,2,null);var obj = (new THREE.Geometry());obj.vertices.push(crossviz.obj3.vector3.call(null,ax,ay,az));
obj.vertices.push(crossviz.obj3.vector3.call(null,bx,by,bz));
return (new THREE.Line(obj,(new THREE.LineBasicMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,crossviz.obj3.default_props,props))))));
});
segment3 = function(p__13498,p__13499,props){
switch(arguments.length){
case 2:
return segment3__2.call(this,p__13498,p__13499);
case 3:
return segment3__3.call(this,p__13498,p__13499,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
segment3.cljs$core$IFn$_invoke$arity$2 = segment3__2;
segment3.cljs$core$IFn$_invoke$arity$3 = segment3__3;
return segment3;
})()
;
crossviz.obj3.zdisc = (function() {
var zdisc = null;
var zdisc__2 = (function (r,z){return zdisc.call(null,r,z,null);
});
var zdisc__3 = (function (r,z,props){var g = (new THREE.Geometry());var N = 60;g.vertices.push(crossviz.obj3.vector3.call(null,0,0,z));
var seq__13508_13512 = cljs.core.seq.call(null,cljs.core.range.call(null,0,(N + 1)));var chunk__13509_13513 = null;var count__13510_13514 = 0;var i__13511_13515 = 0;while(true){
if((i__13511_13515 < count__13510_13514))
{var i_13516 = cljs.core._nth.call(null,chunk__13509_13513,i__13511_13515);var a_13517 = (((2 * crossviz.math.PI) * i_13516) / N);g.vertices.push(crossviz.obj3.vector3.call(null,(r * crossviz.math.cos.call(null,a_13517)),(r * crossviz.math.sin.call(null,a_13517)),z));
g.faces.push((new THREE.Face3(0,i_13516,(((i_13516 < N))?(i_13516 + 1):1))));
{
var G__13518 = seq__13508_13512;
var G__13519 = chunk__13509_13513;
var G__13520 = count__13510_13514;
var G__13521 = (i__13511_13515 + 1);
seq__13508_13512 = G__13518;
chunk__13509_13513 = G__13519;
count__13510_13514 = G__13520;
i__13511_13515 = G__13521;
continue;
}
} else
{var temp__4126__auto___13522 = cljs.core.seq.call(null,seq__13508_13512);if(temp__4126__auto___13522)
{var seq__13508_13523__$1 = temp__4126__auto___13522;if(cljs.core.chunked_seq_QMARK_.call(null,seq__13508_13523__$1))
{var c__4251__auto___13524 = cljs.core.chunk_first.call(null,seq__13508_13523__$1);{
var G__13525 = cljs.core.chunk_rest.call(null,seq__13508_13523__$1);
var G__13526 = c__4251__auto___13524;
var G__13527 = cljs.core.count.call(null,c__4251__auto___13524);
var G__13528 = 0;
seq__13508_13512 = G__13525;
chunk__13509_13513 = G__13526;
count__13510_13514 = G__13527;
i__13511_13515 = G__13528;
continue;
}
} else
{var i_13529 = cljs.core.first.call(null,seq__13508_13523__$1);var a_13530 = (((2 * crossviz.math.PI) * i_13529) / N);g.vertices.push(crossviz.obj3.vector3.call(null,(r * crossviz.math.cos.call(null,a_13530)),(r * crossviz.math.sin.call(null,a_13530)),z));
g.faces.push((new THREE.Face3(0,i_13529,(((i_13529 < N))?(i_13529 + 1):1))));
{
var G__13531 = cljs.core.next.call(null,seq__13508_13523__$1);
var G__13532 = null;
var G__13533 = 0;
var G__13534 = 0;
seq__13508_13512 = G__13531;
chunk__13509_13513 = G__13532;
count__13510_13514 = G__13533;
i__13511_13515 = G__13534;
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
return (new THREE.Mesh(g,(new THREE.MeshPhongMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,crossviz.obj3.default_props,props))))));
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
crossviz.obj3.ball = (function() {
var ball = null;
var ball__4 = (function (r,x,y,z){return ball.call(null,r,x,y,z,null);
});
var ball__5 = (function (r,x,y,z,props){var g = (new THREE.SphereGeometry(r,32,32));var s = (new THREE.Mesh(g,(new THREE.MeshPhongMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,crossviz.obj3.default_props,props))))));s.position.set(x,y,z);
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
crossviz.obj3.segment_endpoints = (function segment_endpoints(p__13535){var map__13538 = p__13535;var map__13538__$1 = ((cljs.core.seq_QMARK_.call(null,map__13538))?cljs.core.apply.call(null,cljs.core.hash_map,map__13538):map__13538);var z = cljs.core.get.call(null,map__13538__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__13538__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__13538__$1,new cljs.core.Keyword(null,"x","x",1013904362));var A = ((x * x) + (y * y));var vec__13539 = (((crossviz.math.abs.call(null,x) > crossviz.math.abs.call(null,y)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * y) * z),((z * z) + ((x * x) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (A,map__13538,map__13538__$1,z,y,x){
return (function (t){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((- (z + (y * t))) / x),t,1], null);
});})(A,map__13538,map__13538__$1,z,y,x))
], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * x) * z),((z * z) + ((y * y) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (A,map__13538,map__13538__$1,z,y,x){
return (function (t){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,((- (z + (x * t))) / y),1], null);
});})(A,map__13538,map__13538__$1,z,y,x))
], null));var B = cljs.core.nth.call(null,vec__13539,0,null);var C = cljs.core.nth.call(null,vec__13539,1,null);var vert = cljs.core.nth.call(null,vec__13539,2,null);var D = crossviz.math.sqrt.call(null,((B * B) - ((4 * A) * C)));return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [vert.call(null,(((- B) + D) / (2.0 * A))),vert.call(null,(((- B) - D) / (2.0 * A)))], null);
});
crossviz.obj3.segment = (function() {
var segment = null;
var segment__1 = (function (p){return segment.call(null,p,null);
});
var segment__2 = (function (p,props){var vec__13541 = crossviz.obj3.segment_endpoints.call(null,p);var a = cljs.core.nth.call(null,vec__13541,0,null);var b = cljs.core.nth.call(null,vec__13541,1,null);var g = (new THREE.Geometry());g.vertices.push(crossviz.obj3.vector3.call(null,a.call(null,0),a.call(null,1),a.call(null,2)));
g.vertices.push(crossviz.obj3.vector3.call(null,b.call(null,0),b.call(null,1),b.call(null,2)));
return (new THREE.Line(g,(new THREE.LineBasicMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,crossviz.obj3.default_props,props))))));
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
crossviz.obj3.plane = (function() {
var plane = null;
var plane__1 = (function (p){return plane.call(null,p,null);
});
var plane__2 = (function (p__13542,props){var map__13544 = p__13542;var map__13544__$1 = ((cljs.core.seq_QMARK_.call(null,map__13544))?cljs.core.apply.call(null,cljs.core.hash_map,map__13544):map__13544);var z = cljs.core.get.call(null,map__13544__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__13544__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__13544__$1,new cljs.core.Keyword(null,"x","x",1013904362));var v = crossviz.obj3.vector3.call(null,x,y,z);var k = crossviz.obj3.vector3.call(null,0,0,1);var axis = (new THREE.Vector3()).crossVectors(k,v).normalize();var angle = k.angleTo(v);var R = (new THREE.Matrix4()).makeRotationAxis(axis,angle);var obj = crossviz.obj3.zdisc.call(null,crossviz.constants.univDiam,0,props);obj.applyMatrix(R);
return obj;
});
plane = function(p__13542,props){
switch(arguments.length){
case 1:
return plane__1.call(this,p__13542);
case 2:
return plane__2.call(this,p__13542,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
plane.cljs$core$IFn$_invoke$arity$1 = plane__1;
plane.cljs$core$IFn$_invoke$arity$2 = plane__2;
return plane;
})()
;
crossviz.obj3.vector = (function() {
var vector = null;
var vector__1 = (function (p){return vector.call(null,p,null);
});
var vector__2 = (function (p__13545,props){var map__13547 = p__13545;var map__13547__$1 = ((cljs.core.seq_QMARK_.call(null,map__13547))?cljs.core.apply.call(null,cljs.core.hash_map,map__13547):map__13547);var z = cljs.core.get.call(null,map__13547__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__13547__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__13547__$1,new cljs.core.Keyword(null,"x","x",1013904362));var g = (new THREE.Geometry());g.vertices.push(crossviz.obj3.vector3.call(null,x,y,z));
g.vertices.push(crossviz.obj3.vector3.call(null,0,0,0));
return (new THREE.Line(g,(new THREE.LineBasicMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,crossviz.obj3.default_props,props))))));
});
vector = function(p__13545,props){
switch(arguments.length){
case 1:
return vector__1.call(this,p__13545);
case 2:
return vector__2.call(this,p__13545,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
vector.cljs$core$IFn$_invoke$arity$1 = vector__1;
vector.cljs$core$IFn$_invoke$arity$2 = vector__2;
return vector;
})()
;

//# sourceMappingURL=obj3.js.map