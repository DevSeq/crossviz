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
crossviz.obj3.axis = (function axis(v,color){var obj = (new THREE.Geometry());obj.vertices.push(v);
obj.vertices.push(v.clone().negate());
return (new THREE.Line(obj,(new THREE.LineBasicMaterial({"linewidth": 2, "opacity": 0.5, "color": color}))));
});
crossviz.obj3.axes = (function axes(len){var obj = (new THREE.Object3D());obj.add(crossviz.obj3.axis.call(null,(new THREE.Vector3(len,0,0)),16711680));
obj.add(crossviz.obj3.axis.call(null,(new THREE.Vector3(0,len,0)),65280));
obj.add(crossviz.obj3.axis.call(null,(new THREE.Vector3(0,0,len)),255));
return obj;
});
crossviz.obj3.vector_from_typed_goem = (function vector_from_typed_goem(p__15476){var map__15478 = p__15476;var map__15478__$1 = ((cljs.core.seq_QMARK_.call(null,map__15478))?cljs.core.apply.call(null,cljs.core.hash_map,map__15478):map__15478);var z = cljs.core.get.call(null,map__15478__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__15478__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__15478__$1,new cljs.core.Keyword(null,"x","x",1013904362));var g = (new THREE.Geometry());g.vertices.push((new THREE.Vector3(x,y,z)));
g.vertices.push((new THREE.Vector3(0,0,0)));
return (new THREE.Line(g,(new THREE.LineBasicMaterial({"linewidth": 2, "opacity": 0, "color": crossviz.constants.vectorColor}))));
});
crossviz.obj3.line_from_typed_goem = (function line_from_typed_goem(p__15479){var map__15482 = p__15479;var map__15482__$1 = ((cljs.core.seq_QMARK_.call(null,map__15482))?cljs.core.apply.call(null,cljs.core.hash_map,map__15482):map__15482);var z = cljs.core.get.call(null,map__15482__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__15482__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__15482__$1,new cljs.core.Keyword(null,"x","x",1013904362));var g = (new THREE.Geometry());var A = ((x * x) + (y * y));var vec__15483 = (((crossviz.math.abs.call(null,x) > crossviz.math.abs.call(null,y)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * y) * z),((z * z) + ((x * x) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (g,A,map__15482,map__15482__$1,z,y,x){
return (function (t){return (new THREE.Vector3(((- (z + (y * t))) / x),t,1));
});})(g,A,map__15482,map__15482__$1,z,y,x))
], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * x) * z),((z * z) + ((y * y) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (g,A,map__15482,map__15482__$1,z,y,x){
return (function (t){return (new THREE.Vector3(t,((- (z + (x * t))) / y),1));
});})(g,A,map__15482,map__15482__$1,z,y,x))
], null));var B = cljs.core.nth.call(null,vec__15483,0,null);var C = cljs.core.nth.call(null,vec__15483,1,null);var vert = cljs.core.nth.call(null,vec__15483,2,null);var D = crossviz.math.sqrt.call(null,((B * B) - ((4 * A) * C)));g.vertices.push(vert.call(null,(((- B) + D) / (2.0 * A))));
g.vertices.push(vert.call(null,(((- B) - D) / (2.0 * A))));
return (new THREE.Line(g,(new THREE.LineBasicMaterial({"linewidth": 5, "opacity": 0, "color": crossviz.constants.lineColor}))));
});
crossviz.obj3.text = (function() {
var text = null;
var text__2 = (function (string,a){return string.call(null,a,null);
});
var text__3 = (function (string,p__15484,props){var vec__15486 = p__15484;var x = cljs.core.nth.call(null,vec__15486,0,null);var y = cljs.core.nth.call(null,vec__15486,1,null);var z = cljs.core.nth.call(null,vec__15486,2,null);var mprops = cljs.core.merge.call(null,crossviz.obj3.default_props,props);var g = (new THREE.TextGeometry(string,cljs.core.clj__GT_js.call(null,mprops)));var s = (new THREE.Mesh(g,(new THREE.MeshPhongMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"transparent","transparent",3582677188),false,new cljs.core.Keyword(null,"side","side",1017434313),THREE.DoubleSide], null),mprops))))));s.position.set(x,y,z);
return s;
});
text = function(string,p__15484,props){
switch(arguments.length){
case 2:
return text__2.call(this,string,p__15484);
case 3:
return text__3.call(this,string,p__15484,props);
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
var segment3__3 = (function (p__15487,p__15488,props){var vec__15491 = p__15487;var ax = cljs.core.nth.call(null,vec__15491,0,null);var ay = cljs.core.nth.call(null,vec__15491,1,null);var az = cljs.core.nth.call(null,vec__15491,2,null);var vec__15492 = p__15488;var bx = cljs.core.nth.call(null,vec__15492,0,null);var by = cljs.core.nth.call(null,vec__15492,1,null);var bz = cljs.core.nth.call(null,vec__15492,2,null);var obj = (new THREE.Geometry());obj.vertices.push((new THREE.Vector3(ax,ay,az)));
obj.vertices.push((new THREE.Vector3(bx,by,bz)));
return (new THREE.Line(obj,(new THREE.LineBasicMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,crossviz.obj3.default_props,props))))));
});
segment3 = function(p__15487,p__15488,props){
switch(arguments.length){
case 2:
return segment3__2.call(this,p__15487,p__15488);
case 3:
return segment3__3.call(this,p__15487,p__15488,props);
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
var zdisc__3 = (function (r,z,props){var g = (new THREE.Geometry());var N = 60;g.vertices.push((new THREE.Vector3(0,0,z)));
var seq__15497_15501 = cljs.core.seq.call(null,cljs.core.range.call(null,0,(N + 1)));var chunk__15498_15502 = null;var count__15499_15503 = 0;var i__15500_15504 = 0;while(true){
if((i__15500_15504 < count__15499_15503))
{var i_15505 = cljs.core._nth.call(null,chunk__15498_15502,i__15500_15504);var a_15506 = (((2 * crossviz.math.PI) * i_15505) / N);g.vertices.push((new THREE.Vector3((r * crossviz.math.cos.call(null,a_15506)),(r * crossviz.math.sin.call(null,a_15506)),z)));
g.faces.push((new THREE.Face3(0,i_15505,(((i_15505 < N))?(i_15505 + 1):1))));
{
var G__15507 = seq__15497_15501;
var G__15508 = chunk__15498_15502;
var G__15509 = count__15499_15503;
var G__15510 = (i__15500_15504 + 1);
seq__15497_15501 = G__15507;
chunk__15498_15502 = G__15508;
count__15499_15503 = G__15509;
i__15500_15504 = G__15510;
continue;
}
} else
{var temp__4126__auto___15511 = cljs.core.seq.call(null,seq__15497_15501);if(temp__4126__auto___15511)
{var seq__15497_15512__$1 = temp__4126__auto___15511;if(cljs.core.chunked_seq_QMARK_.call(null,seq__15497_15512__$1))
{var c__4239__auto___15513 = cljs.core.chunk_first.call(null,seq__15497_15512__$1);{
var G__15514 = cljs.core.chunk_rest.call(null,seq__15497_15512__$1);
var G__15515 = c__4239__auto___15513;
var G__15516 = cljs.core.count.call(null,c__4239__auto___15513);
var G__15517 = 0;
seq__15497_15501 = G__15514;
chunk__15498_15502 = G__15515;
count__15499_15503 = G__15516;
i__15500_15504 = G__15517;
continue;
}
} else
{var i_15518 = cljs.core.first.call(null,seq__15497_15512__$1);var a_15519 = (((2 * crossviz.math.PI) * i_15518) / N);g.vertices.push((new THREE.Vector3((r * crossviz.math.cos.call(null,a_15519)),(r * crossviz.math.sin.call(null,a_15519)),z)));
g.faces.push((new THREE.Face3(0,i_15518,(((i_15518 < N))?(i_15518 + 1):1))));
{
var G__15520 = cljs.core.next.call(null,seq__15497_15512__$1);
var G__15521 = null;
var G__15522 = 0;
var G__15523 = 0;
seq__15497_15501 = G__15520;
chunk__15498_15502 = G__15521;
count__15499_15503 = G__15522;
i__15500_15504 = G__15523;
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
crossviz.obj3.segment_endpoints = (function segment_endpoints(p__15524){var map__15527 = p__15524;var map__15527__$1 = ((cljs.core.seq_QMARK_.call(null,map__15527))?cljs.core.apply.call(null,cljs.core.hash_map,map__15527):map__15527);var z = cljs.core.get.call(null,map__15527__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__15527__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__15527__$1,new cljs.core.Keyword(null,"x","x",1013904362));var A = ((x * x) + (y * y));var vec__15528 = (((crossviz.math.abs.call(null,x) > crossviz.math.abs.call(null,y)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * y) * z),((z * z) + ((x * x) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (A,map__15527,map__15527__$1,z,y,x){
return (function (t){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((- (z + (y * t))) / x),t,1], null);
});})(A,map__15527,map__15527__$1,z,y,x))
], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * x) * z),((z * z) + ((y * y) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (A,map__15527,map__15527__$1,z,y,x){
return (function (t){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,((- (z + (x * t))) / y),1], null);
});})(A,map__15527,map__15527__$1,z,y,x))
], null));var B = cljs.core.nth.call(null,vec__15528,0,null);var C = cljs.core.nth.call(null,vec__15528,1,null);var vert = cljs.core.nth.call(null,vec__15528,2,null);var D = crossviz.math.sqrt.call(null,((B * B) - ((4 * A) * C)));return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [vert.call(null,(((- B) + D) / (2.0 * A))),vert.call(null,(((- B) - D) / (2.0 * A)))], null);
});
crossviz.obj3.segment = (function() {
var segment = null;
var segment__1 = (function (p){return segment.call(null,p,null);
});
var segment__2 = (function (p,props){var vec__15530 = crossviz.obj3.segment_endpoints.call(null,p);var a = cljs.core.nth.call(null,vec__15530,0,null);var b = cljs.core.nth.call(null,vec__15530,1,null);var g = (new THREE.Geometry());g.vertices.push((new THREE.Vector3(a.call(null,0),a.call(null,1),a.call(null,2))));
g.vertices.push((new THREE.Vector3(b.call(null,0),b.call(null,1),b.call(null,2))));
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
var plane__2 = (function (p__15531,props){var map__15533 = p__15531;var map__15533__$1 = ((cljs.core.seq_QMARK_.call(null,map__15533))?cljs.core.apply.call(null,cljs.core.hash_map,map__15533):map__15533);var z = cljs.core.get.call(null,map__15533__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__15533__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__15533__$1,new cljs.core.Keyword(null,"x","x",1013904362));var v = (new THREE.Vector3(x,y,z));var k = (new THREE.Vector3(0,0,1));var axis = (new THREE.Vector3()).crossVectors(k,v).normalize();var angle = k.angleTo(v);var R = (new THREE.Matrix4()).makeRotationAxis(axis,angle);var obj = crossviz.obj3.zdisc.call(null,crossviz.constants.univDiam,0,props);obj.applyMatrix(R);
return obj;
});
plane = function(p__15531,props){
switch(arguments.length){
case 1:
return plane__1.call(this,p__15531);
case 2:
return plane__2.call(this,p__15531,props);
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
var vector__2 = (function (p__15534,props){var map__15536 = p__15534;var map__15536__$1 = ((cljs.core.seq_QMARK_.call(null,map__15536))?cljs.core.apply.call(null,cljs.core.hash_map,map__15536):map__15536);var z = cljs.core.get.call(null,map__15536__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__15536__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__15536__$1,new cljs.core.Keyword(null,"x","x",1013904362));var g = (new THREE.Geometry());g.vertices.push((new THREE.Vector3(x,y,z)));
g.vertices.push((new THREE.Vector3(0,0,0)));
return (new THREE.Line(g,(new THREE.LineBasicMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,crossviz.obj3.default_props,props))))));
});
vector = function(p__15534,props){
switch(arguments.length){
case 1:
return vector__1.call(this,p__15534);
case 2:
return vector__2.call(this,p__15534,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
vector.cljs$core$IFn$_invoke$arity$1 = vector__1;
vector.cljs$core$IFn$_invoke$arity$2 = vector__2;
return vector;
})()
;

//# sourceMappingURL=obj3.js.map