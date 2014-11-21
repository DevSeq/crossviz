// Compiled by ClojureScript 0.0-2202
goog.provide('crossviz.obj3');
goog.require('cljs.core');
goog.require('crossviz.constants');
goog.require('crossviz.constants');
goog.require('crossviz.rp2');
goog.require('crossviz.rp2');
goog.require('crossviz.math');
goog.require('crossviz.math');
crossviz.obj3.default_props = new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"color","color",1108746965),crossviz.constants.default_color,new cljs.core.Keyword(null,"transparent","transparent",3582677188),false,new cljs.core.Keyword(null,"opacity","opacity",4041665405),1.0,new cljs.core.Keyword(null,"linewidth","linewidth",3534637508),4,new cljs.core.Keyword(null,"size","size",1017434995),0.2,new cljs.core.Keyword(null,"height","height",4087841945),0.01,new cljs.core.Keyword(null,"side","side",1017434313),THREE.DoubleSide], null);
crossviz.obj3.vector3 = (function() {
var vector3 = null;
var vector3__0 = (function (){return (new THREE.Vector3());
});
var vector3__3 = (function (x,y,z){return (new THREE.Vector3(x,y,z));
});
vector3 = function(x,y,z){
switch(arguments.length){
case 0:
return vector3__0.call(this);
case 3:
return vector3__3.call(this,x,y,z);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
vector3.cljs$core$IFn$_invoke$arity$0 = vector3__0;
vector3.cljs$core$IFn$_invoke$arity$3 = vector3__3;
return vector3;
})()
;
crossviz.obj3.axis = (function axis(v,color){var obj = (new THREE.Geometry());obj.vertices.push(v);
obj.vertices.push(v.clone().negate());
return (new THREE.Line(obj,(new THREE.LineBasicMaterial({"linewidth": 2, "opacity": 0.5, "color": color}))));
});
crossviz.obj3.axes = (function axes(len){var obj = (new THREE.Object3D());obj.add(crossviz.obj3.axis.call(null,crossviz.obj3.vector3.call(null,len,0,0),16711680));
obj.add(crossviz.obj3.axis.call(null,crossviz.obj3.vector3.call(null,0,len,0),65280));
obj.add(crossviz.obj3.axis.call(null,crossviz.obj3.vector3.call(null,0,0,len),255));
return obj;
});
crossviz.obj3.vector_from_typed_goem = (function vector_from_typed_goem(p__6270){var map__6272 = p__6270;var map__6272__$1 = ((cljs.core.seq_QMARK_.call(null,map__6272))?cljs.core.apply.call(null,cljs.core.hash_map,map__6272):map__6272);var z = cljs.core.get.call(null,map__6272__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__6272__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__6272__$1,new cljs.core.Keyword(null,"x","x",1013904362));var g = (new THREE.Geometry());g.vertices.push(crossviz.obj3.vector3.call(null,x,y,z));
g.vertices.push(crossviz.obj3.vector3.call(null,0,0,0));
return (new THREE.Line(g,(new THREE.LineBasicMaterial({"linewidth": 2, "opacity": 0, "color": crossviz.constants.vectorColor}))));
});
crossviz.obj3.line_from_typed_goem = (function line_from_typed_goem(p__6273){var map__6276 = p__6273;var map__6276__$1 = ((cljs.core.seq_QMARK_.call(null,map__6276))?cljs.core.apply.call(null,cljs.core.hash_map,map__6276):map__6276);var z = cljs.core.get.call(null,map__6276__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__6276__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__6276__$1,new cljs.core.Keyword(null,"x","x",1013904362));var g = (new THREE.Geometry());var A = ((x * x) + (y * y));var vec__6277 = (((crossviz.math.abs.call(null,x) > crossviz.math.abs.call(null,y)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * y) * z),((z * z) + ((x * x) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (g,A,map__6276,map__6276__$1,z,y,x){
return (function (t){return crossviz.obj3.vector3.call(null,((- (z + (y * t))) / x),t,1);
});})(g,A,map__6276,map__6276__$1,z,y,x))
], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * x) * z),((z * z) + ((y * y) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (g,A,map__6276,map__6276__$1,z,y,x){
return (function (t){return crossviz.obj3.vector3.call(null,t,((- (z + (x * t))) / y),1);
});})(g,A,map__6276,map__6276__$1,z,y,x))
], null));var B = cljs.core.nth.call(null,vec__6277,0,null);var C = cljs.core.nth.call(null,vec__6277,1,null);var vert = cljs.core.nth.call(null,vec__6277,2,null);var D = crossviz.math.sqrt.call(null,((B * B) - ((4 * A) * C)));g.vertices.push(vert.call(null,(((- B) + D) / (2.0 * A))));
g.vertices.push(vert.call(null,(((- B) - D) / (2.0 * A))));
return (new THREE.Line(g,(new THREE.LineBasicMaterial({"linewidth": 5, "opacity": 0, "color": crossviz.constants.lineColor}))));
});
crossviz.obj3.text = (function() {
var text = null;
var text__2 = (function (string,a){return string.call(null,a,null);
});
var text__3 = (function (string,p__6278,props){var vec__6280 = p__6278;var x = cljs.core.nth.call(null,vec__6280,0,null);var y = cljs.core.nth.call(null,vec__6280,1,null);var z = cljs.core.nth.call(null,vec__6280,2,null);var mprops = cljs.core.merge.call(null,crossviz.obj3.default_props,props);var g = (new THREE.TextGeometry(string,cljs.core.clj__GT_js.call(null,mprops)));var s = (new THREE.Mesh(g,(new THREE.MeshBasicMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"transparent","transparent",3582677188),false,new cljs.core.Keyword(null,"side","side",1017434313),THREE.DoubleSide], null),mprops))))));s.position.set(x,y,z);
return s;
});
text = function(string,p__6278,props){
switch(arguments.length){
case 2:
return text__2.call(this,string,p__6278);
case 3:
return text__3.call(this,string,p__6278,props);
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
var segment3__3 = (function (p__6281,p__6282,props){var vec__6285 = p__6281;var ax = cljs.core.nth.call(null,vec__6285,0,null);var ay = cljs.core.nth.call(null,vec__6285,1,null);var az = cljs.core.nth.call(null,vec__6285,2,null);var vec__6286 = p__6282;var bx = cljs.core.nth.call(null,vec__6286,0,null);var by = cljs.core.nth.call(null,vec__6286,1,null);var bz = cljs.core.nth.call(null,vec__6286,2,null);var obj = (new THREE.Geometry());obj.vertices.push(crossviz.obj3.vector3.call(null,ax,ay,az));
obj.vertices.push(crossviz.obj3.vector3.call(null,bx,by,bz));
return (new THREE.Line(obj,(new THREE.LineBasicMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,crossviz.obj3.default_props,props))))));
});
segment3 = function(p__6281,p__6282,props){
switch(arguments.length){
case 2:
return segment3__2.call(this,p__6281,p__6282);
case 3:
return segment3__3.call(this,p__6281,p__6282,props);
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
var seq__6291_6295 = cljs.core.seq.call(null,cljs.core.range.call(null,0,(N + 1)));var chunk__6292_6296 = null;var count__6293_6297 = 0;var i__6294_6298 = 0;while(true){
if((i__6294_6298 < count__6293_6297))
{var i_6299 = cljs.core._nth.call(null,chunk__6292_6296,i__6294_6298);var a_6300 = (((2 * crossviz.math.PI) * i_6299) / N);g.vertices.push(crossviz.obj3.vector3.call(null,(r * crossviz.math.cos.call(null,a_6300)),(r * crossviz.math.sin.call(null,a_6300)),z));
g.faces.push((new THREE.Face3(0,i_6299,(((i_6299 < N))?(i_6299 + 1):1))));
{
var G__6301 = seq__6291_6295;
var G__6302 = chunk__6292_6296;
var G__6303 = count__6293_6297;
var G__6304 = (i__6294_6298 + 1);
seq__6291_6295 = G__6301;
chunk__6292_6296 = G__6302;
count__6293_6297 = G__6303;
i__6294_6298 = G__6304;
continue;
}
} else
{var temp__4126__auto___6305 = cljs.core.seq.call(null,seq__6291_6295);if(temp__4126__auto___6305)
{var seq__6291_6306__$1 = temp__4126__auto___6305;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6291_6306__$1))
{var c__4229__auto___6307 = cljs.core.chunk_first.call(null,seq__6291_6306__$1);{
var G__6308 = cljs.core.chunk_rest.call(null,seq__6291_6306__$1);
var G__6309 = c__4229__auto___6307;
var G__6310 = cljs.core.count.call(null,c__4229__auto___6307);
var G__6311 = 0;
seq__6291_6295 = G__6308;
chunk__6292_6296 = G__6309;
count__6293_6297 = G__6310;
i__6294_6298 = G__6311;
continue;
}
} else
{var i_6312 = cljs.core.first.call(null,seq__6291_6306__$1);var a_6313 = (((2 * crossviz.math.PI) * i_6312) / N);g.vertices.push(crossviz.obj3.vector3.call(null,(r * crossviz.math.cos.call(null,a_6313)),(r * crossviz.math.sin.call(null,a_6313)),z));
g.faces.push((new THREE.Face3(0,i_6312,(((i_6312 < N))?(i_6312 + 1):1))));
{
var G__6314 = cljs.core.next.call(null,seq__6291_6306__$1);
var G__6315 = null;
var G__6316 = 0;
var G__6317 = 0;
seq__6291_6295 = G__6314;
chunk__6292_6296 = G__6315;
count__6293_6297 = G__6316;
i__6294_6298 = G__6317;
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
crossviz.obj3.segment_endpoints = (function segment_endpoints(p__6318){var map__6321 = p__6318;var map__6321__$1 = ((cljs.core.seq_QMARK_.call(null,map__6321))?cljs.core.apply.call(null,cljs.core.hash_map,map__6321):map__6321);var z = cljs.core.get.call(null,map__6321__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__6321__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__6321__$1,new cljs.core.Keyword(null,"x","x",1013904362));var A = ((x * x) + (y * y));var vec__6322 = (((crossviz.math.abs.call(null,x) > crossviz.math.abs.call(null,y)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * y) * z),((z * z) + ((x * x) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (A,map__6321,map__6321__$1,z,y,x){
return (function (t){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((- (z + (y * t))) / x),t,1], null);
});})(A,map__6321,map__6321__$1,z,y,x))
], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * x) * z),((z * z) + ((y * y) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (A,map__6321,map__6321__$1,z,y,x){
return (function (t){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,((- (z + (x * t))) / y),1], null);
});})(A,map__6321,map__6321__$1,z,y,x))
], null));var B = cljs.core.nth.call(null,vec__6322,0,null);var C = cljs.core.nth.call(null,vec__6322,1,null);var vert = cljs.core.nth.call(null,vec__6322,2,null);var D = crossviz.math.sqrt.call(null,((B * B) - ((4 * A) * C)));return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [vert.call(null,(((- B) + D) / (2.0 * A))),vert.call(null,(((- B) - D) / (2.0 * A)))], null);
});
crossviz.obj3.segment = (function() {
var segment = null;
var segment__1 = (function (p){return segment.call(null,p,null);
});
var segment__2 = (function (p,props){var vec__6324 = crossviz.obj3.segment_endpoints.call(null,p);var a = cljs.core.nth.call(null,vec__6324,0,null);var b = cljs.core.nth.call(null,vec__6324,1,null);var g = (new THREE.Geometry());g.vertices.push(crossviz.obj3.vector3.call(null,a.call(null,0),a.call(null,1),a.call(null,2)));
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
var plane__2 = (function (p__6325,props){var map__6327 = p__6325;var map__6327__$1 = ((cljs.core.seq_QMARK_.call(null,map__6327))?cljs.core.apply.call(null,cljs.core.hash_map,map__6327):map__6327);var z = cljs.core.get.call(null,map__6327__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__6327__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__6327__$1,new cljs.core.Keyword(null,"x","x",1013904362));var v = crossviz.obj3.vector3.call(null,x,y,z);var k = crossviz.obj3.vector3.call(null,0,0,1);var axis = (new THREE.Vector3()).crossVectors(k,v).normalize();var angle = k.angleTo(v);var R = (new THREE.Matrix4()).makeRotationAxis(axis,angle);var obj = crossviz.obj3.zdisc.call(null,crossviz.constants.univDiam,0,props);obj.applyMatrix(R);
return obj;
});
plane = function(p__6325,props){
switch(arguments.length){
case 1:
return plane__1.call(this,p__6325);
case 2:
return plane__2.call(this,p__6325,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
plane.cljs$core$IFn$_invoke$arity$1 = plane__1;
plane.cljs$core$IFn$_invoke$arity$2 = plane__2;
return plane;
})()
;
crossviz.obj3.matrixRotatingZTo = (function matrixRotatingZTo(v){var k = crossviz.obj3.vector3.call(null,0,0,1);var axis = crossviz.obj3.vector3.call(null).crossVectors(k,v).normalize();var angle = k.angleTo(v);var R = (new THREE.Matrix4()).makeRotationAxis(axis,angle);return R;
});
crossviz.obj3.conehead = (function() {
var conehead = null;
var conehead__3 = (function (p,h,r){return conehead.call(null,h,r,null);
});
var conehead__4 = (function (p__6328,h,r,props){var vec__6334 = p__6328;var x = cljs.core.nth.call(null,vec__6334,0,null);var y = cljs.core.nth.call(null,vec__6334,1,null);var z = cljs.core.nth.call(null,vec__6334,2,null);var obj = (new THREE.Geometry());var v = crossviz.obj3.vector3.call(null,x,y,z);var N = 60;obj.vertices.push(crossviz.obj3.vector3.call(null,0,0,0));
var seq__6335_6339 = cljs.core.seq.call(null,cljs.core.range.call(null,0,(N + 1)));var chunk__6336_6340 = null;var count__6337_6341 = 0;var i__6338_6342 = 0;while(true){
if((i__6338_6342 < count__6337_6341))
{var i_6343 = cljs.core._nth.call(null,chunk__6336_6340,i__6338_6342);var a_6344 = (((2 * crossviz.math.PI) * i_6343) / N);obj.vertices.push(crossviz.obj3.vector3.call(null,(r * crossviz.math.cos.call(null,a_6344)),(r * crossviz.math.sin.call(null,a_6344)),(- h)));
obj.faces.push((new THREE.Face3(0,i_6343,(((i_6343 < N))?(i_6343 + 1):1))));
{
var G__6345 = seq__6335_6339;
var G__6346 = chunk__6336_6340;
var G__6347 = count__6337_6341;
var G__6348 = (i__6338_6342 + 1);
seq__6335_6339 = G__6345;
chunk__6336_6340 = G__6346;
count__6337_6341 = G__6347;
i__6338_6342 = G__6348;
continue;
}
} else
{var temp__4126__auto___6349 = cljs.core.seq.call(null,seq__6335_6339);if(temp__4126__auto___6349)
{var seq__6335_6350__$1 = temp__4126__auto___6349;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6335_6350__$1))
{var c__4229__auto___6351 = cljs.core.chunk_first.call(null,seq__6335_6350__$1);{
var G__6352 = cljs.core.chunk_rest.call(null,seq__6335_6350__$1);
var G__6353 = c__4229__auto___6351;
var G__6354 = cljs.core.count.call(null,c__4229__auto___6351);
var G__6355 = 0;
seq__6335_6339 = G__6352;
chunk__6336_6340 = G__6353;
count__6337_6341 = G__6354;
i__6338_6342 = G__6355;
continue;
}
} else
{var i_6356 = cljs.core.first.call(null,seq__6335_6350__$1);var a_6357 = (((2 * crossviz.math.PI) * i_6356) / N);obj.vertices.push(crossviz.obj3.vector3.call(null,(r * crossviz.math.cos.call(null,a_6357)),(r * crossviz.math.sin.call(null,a_6357)),(- h)));
obj.faces.push((new THREE.Face3(0,i_6356,(((i_6356 < N))?(i_6356 + 1):1))));
{
var G__6358 = cljs.core.next.call(null,seq__6335_6350__$1);
var G__6359 = null;
var G__6360 = 0;
var G__6361 = 0;
seq__6335_6339 = G__6358;
chunk__6336_6340 = G__6359;
count__6337_6341 = G__6360;
i__6338_6342 = G__6361;
continue;
}
}
} else
{}
}
break;
}
obj.computeBoundingSphere();
obj.computeFaceNormals();
obj.applyMatrix(crossviz.obj3.matrixRotatingZTo.call(null,v));
obj.applyMatrix((new THREE.Matrix4()).setPosition(v));
return (new THREE.Mesh(obj,(new THREE.MeshPhongMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,crossviz.obj3.default_props,props))))));
});
conehead = function(p__6328,h,r,props){
switch(arguments.length){
case 3:
return conehead__3.call(this,p__6328,h,r);
case 4:
return conehead__4.call(this,p__6328,h,r,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
conehead.cljs$core$IFn$_invoke$arity$3 = conehead__3;
conehead.cljs$core$IFn$_invoke$arity$4 = conehead__4;
return conehead;
})()
;
crossviz.obj3.vector = (function() {
var vector = null;
var vector__1 = (function (p){return vector.call(null,p,null);
});
var vector__2 = (function (p__6362,props){var map__6364 = p__6362;var map__6364__$1 = ((cljs.core.seq_QMARK_.call(null,map__6364))?cljs.core.apply.call(null,cljs.core.hash_map,map__6364):map__6364);var z = cljs.core.get.call(null,map__6364__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__6364__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__6364__$1,new cljs.core.Keyword(null,"x","x",1013904362));var stalk = (new THREE.Geometry());var obj = (new THREE.Object3D());stalk.vertices.push(crossviz.obj3.vector3.call(null,x,y,z));
stalk.vertices.push(crossviz.obj3.vector3.call(null,0,0,0));
obj.add((new THREE.Line(stalk,(new THREE.LineBasicMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,crossviz.obj3.default_props,props)))))));
obj.add(crossviz.obj3.conehead.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y,z], null),0.2,0.08,props));
return obj;
});
vector = function(p__6362,props){
switch(arguments.length){
case 1:
return vector__1.call(this,p__6362);
case 2:
return vector__2.call(this,p__6362,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
vector.cljs$core$IFn$_invoke$arity$1 = vector__1;
vector.cljs$core$IFn$_invoke$arity$2 = vector__2;
return vector;
})()
;

//# sourceMappingURL=obj3.js.map