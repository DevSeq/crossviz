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
crossviz.obj3.vector_from_typed_goem = (function vector_from_typed_goem(p__8413){var map__8415 = p__8413;var map__8415__$1 = ((cljs.core.seq_QMARK_.call(null,map__8415))?cljs.core.apply.call(null,cljs.core.hash_map,map__8415):map__8415);var z = cljs.core.get.call(null,map__8415__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__8415__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__8415__$1,new cljs.core.Keyword(null,"x","x",1013904362));var g = (new THREE.Geometry());g.vertices.push(crossviz.obj3.vector3.call(null,x,y,z));
g.vertices.push(crossviz.obj3.vector3.call(null,0,0,0));
return (new THREE.Line(g,(new THREE.LineBasicMaterial({"linewidth": 2, "opacity": 0, "color": crossviz.constants.vectorColor}))));
});
crossviz.obj3.line_from_typed_goem = (function line_from_typed_goem(p__8416){var map__8419 = p__8416;var map__8419__$1 = ((cljs.core.seq_QMARK_.call(null,map__8419))?cljs.core.apply.call(null,cljs.core.hash_map,map__8419):map__8419);var z = cljs.core.get.call(null,map__8419__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__8419__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__8419__$1,new cljs.core.Keyword(null,"x","x",1013904362));var g = (new THREE.Geometry());var A = ((x * x) + (y * y));var vec__8420 = (((crossviz.math.abs.call(null,x) > crossviz.math.abs.call(null,y)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * y) * z),((z * z) + ((x * x) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (g,A,map__8419,map__8419__$1,z,y,x){
return (function (t){return crossviz.obj3.vector3.call(null,((- (z + (y * t))) / x),t,1);
});})(g,A,map__8419,map__8419__$1,z,y,x))
], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * x) * z),((z * z) + ((y * y) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (g,A,map__8419,map__8419__$1,z,y,x){
return (function (t){return crossviz.obj3.vector3.call(null,t,((- (z + (x * t))) / y),1);
});})(g,A,map__8419,map__8419__$1,z,y,x))
], null));var B = cljs.core.nth.call(null,vec__8420,0,null);var C = cljs.core.nth.call(null,vec__8420,1,null);var vert = cljs.core.nth.call(null,vec__8420,2,null);var D = crossviz.math.sqrt.call(null,((B * B) - ((4 * A) * C)));g.vertices.push(vert.call(null,(((- B) + D) / (2.0 * A))));
g.vertices.push(vert.call(null,(((- B) - D) / (2.0 * A))));
return (new THREE.Line(g,(new THREE.LineBasicMaterial({"linewidth": 5, "opacity": 0, "color": crossviz.constants.lineColor}))));
});
crossviz.obj3.text = (function() {
var text = null;
var text__2 = (function (string,a){return string.call(null,a,null);
});
var text__3 = (function (string,p__8421,props){var vec__8423 = p__8421;var x = cljs.core.nth.call(null,vec__8423,0,null);var y = cljs.core.nth.call(null,vec__8423,1,null);var z = cljs.core.nth.call(null,vec__8423,2,null);var mprops = cljs.core.merge.call(null,crossviz.obj3.default_props,props);var g = (new THREE.TextGeometry(string,cljs.core.clj__GT_js.call(null,mprops)));var s = (new THREE.Mesh(g,(new THREE.MeshPhongMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"transparent","transparent",3582677188),false,new cljs.core.Keyword(null,"side","side",1017434313),THREE.DoubleSide], null),mprops))))));s.position.set(x,y,z);
return s;
});
text = function(string,p__8421,props){
switch(arguments.length){
case 2:
return text__2.call(this,string,p__8421);
case 3:
return text__3.call(this,string,p__8421,props);
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
var segment3__3 = (function (p__8424,p__8425,props){var vec__8428 = p__8424;var ax = cljs.core.nth.call(null,vec__8428,0,null);var ay = cljs.core.nth.call(null,vec__8428,1,null);var az = cljs.core.nth.call(null,vec__8428,2,null);var vec__8429 = p__8425;var bx = cljs.core.nth.call(null,vec__8429,0,null);var by = cljs.core.nth.call(null,vec__8429,1,null);var bz = cljs.core.nth.call(null,vec__8429,2,null);var obj = (new THREE.Geometry());obj.vertices.push(crossviz.obj3.vector3.call(null,ax,ay,az));
obj.vertices.push(crossviz.obj3.vector3.call(null,bx,by,bz));
return (new THREE.Line(obj,(new THREE.LineBasicMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,crossviz.obj3.default_props,props))))));
});
segment3 = function(p__8424,p__8425,props){
switch(arguments.length){
case 2:
return segment3__2.call(this,p__8424,p__8425);
case 3:
return segment3__3.call(this,p__8424,p__8425,props);
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
var seq__8434_8438 = cljs.core.seq.call(null,cljs.core.range.call(null,0,(N + 1)));var chunk__8435_8439 = null;var count__8436_8440 = 0;var i__8437_8441 = 0;while(true){
if((i__8437_8441 < count__8436_8440))
{var i_8442 = cljs.core._nth.call(null,chunk__8435_8439,i__8437_8441);var a_8443 = (((2 * crossviz.math.PI) * i_8442) / N);g.vertices.push(crossviz.obj3.vector3.call(null,(r * crossviz.math.cos.call(null,a_8443)),(r * crossviz.math.sin.call(null,a_8443)),z));
g.faces.push((new THREE.Face3(0,i_8442,(((i_8442 < N))?(i_8442 + 1):1))));
{
var G__8444 = seq__8434_8438;
var G__8445 = chunk__8435_8439;
var G__8446 = count__8436_8440;
var G__8447 = (i__8437_8441 + 1);
seq__8434_8438 = G__8444;
chunk__8435_8439 = G__8445;
count__8436_8440 = G__8446;
i__8437_8441 = G__8447;
continue;
}
} else
{var temp__4126__auto___8448 = cljs.core.seq.call(null,seq__8434_8438);if(temp__4126__auto___8448)
{var seq__8434_8449__$1 = temp__4126__auto___8448;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8434_8449__$1))
{var c__4229__auto___8450 = cljs.core.chunk_first.call(null,seq__8434_8449__$1);{
var G__8451 = cljs.core.chunk_rest.call(null,seq__8434_8449__$1);
var G__8452 = c__4229__auto___8450;
var G__8453 = cljs.core.count.call(null,c__4229__auto___8450);
var G__8454 = 0;
seq__8434_8438 = G__8451;
chunk__8435_8439 = G__8452;
count__8436_8440 = G__8453;
i__8437_8441 = G__8454;
continue;
}
} else
{var i_8455 = cljs.core.first.call(null,seq__8434_8449__$1);var a_8456 = (((2 * crossviz.math.PI) * i_8455) / N);g.vertices.push(crossviz.obj3.vector3.call(null,(r * crossviz.math.cos.call(null,a_8456)),(r * crossviz.math.sin.call(null,a_8456)),z));
g.faces.push((new THREE.Face3(0,i_8455,(((i_8455 < N))?(i_8455 + 1):1))));
{
var G__8457 = cljs.core.next.call(null,seq__8434_8449__$1);
var G__8458 = null;
var G__8459 = 0;
var G__8460 = 0;
seq__8434_8438 = G__8457;
chunk__8435_8439 = G__8458;
count__8436_8440 = G__8459;
i__8437_8441 = G__8460;
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
crossviz.obj3.segment_endpoints = (function segment_endpoints(p__8461){var map__8464 = p__8461;var map__8464__$1 = ((cljs.core.seq_QMARK_.call(null,map__8464))?cljs.core.apply.call(null,cljs.core.hash_map,map__8464):map__8464);var z = cljs.core.get.call(null,map__8464__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__8464__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__8464__$1,new cljs.core.Keyword(null,"x","x",1013904362));var A = ((x * x) + (y * y));var vec__8465 = (((crossviz.math.abs.call(null,x) > crossviz.math.abs.call(null,y)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * y) * z),((z * z) + ((x * x) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (A,map__8464,map__8464__$1,z,y,x){
return (function (t){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((- (z + (y * t))) / x),t,1], null);
});})(A,map__8464,map__8464__$1,z,y,x))
], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * x) * z),((z * z) + ((y * y) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (A,map__8464,map__8464__$1,z,y,x){
return (function (t){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,((- (z + (x * t))) / y),1], null);
});})(A,map__8464,map__8464__$1,z,y,x))
], null));var B = cljs.core.nth.call(null,vec__8465,0,null);var C = cljs.core.nth.call(null,vec__8465,1,null);var vert = cljs.core.nth.call(null,vec__8465,2,null);var D = crossviz.math.sqrt.call(null,((B * B) - ((4 * A) * C)));return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [vert.call(null,(((- B) + D) / (2.0 * A))),vert.call(null,(((- B) - D) / (2.0 * A)))], null);
});
crossviz.obj3.segment = (function() {
var segment = null;
var segment__1 = (function (p){return segment.call(null,p,null);
});
var segment__2 = (function (p,props){var vec__8467 = crossviz.obj3.segment_endpoints.call(null,p);var a = cljs.core.nth.call(null,vec__8467,0,null);var b = cljs.core.nth.call(null,vec__8467,1,null);var g = (new THREE.Geometry());g.vertices.push(crossviz.obj3.vector3.call(null,a.call(null,0),a.call(null,1),a.call(null,2)));
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
var plane__2 = (function (p__8468,props){var map__8470 = p__8468;var map__8470__$1 = ((cljs.core.seq_QMARK_.call(null,map__8470))?cljs.core.apply.call(null,cljs.core.hash_map,map__8470):map__8470);var z = cljs.core.get.call(null,map__8470__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__8470__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__8470__$1,new cljs.core.Keyword(null,"x","x",1013904362));var v = crossviz.obj3.vector3.call(null,x,y,z);var k = crossviz.obj3.vector3.call(null,0,0,1);var axis = (new THREE.Vector3()).crossVectors(k,v).normalize();var angle = k.angleTo(v);var R = (new THREE.Matrix4()).makeRotationAxis(axis,angle);var obj = crossviz.obj3.zdisc.call(null,crossviz.constants.univDiam,0,props);obj.applyMatrix(R);
return obj;
});
plane = function(p__8468,props){
switch(arguments.length){
case 1:
return plane__1.call(this,p__8468);
case 2:
return plane__2.call(this,p__8468,props);
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
var conehead__4 = (function (p__8471,h,r,props){var vec__8477 = p__8471;var x = cljs.core.nth.call(null,vec__8477,0,null);var y = cljs.core.nth.call(null,vec__8477,1,null);var z = cljs.core.nth.call(null,vec__8477,2,null);var obj = (new THREE.Geometry());var v = crossviz.obj3.vector3.call(null,x,y,z);var N = 60;obj.vertices.push(crossviz.obj3.vector3.call(null,0,0,0));
var seq__8478_8482 = cljs.core.seq.call(null,cljs.core.range.call(null,0,(N + 1)));var chunk__8479_8483 = null;var count__8480_8484 = 0;var i__8481_8485 = 0;while(true){
if((i__8481_8485 < count__8480_8484))
{var i_8486 = cljs.core._nth.call(null,chunk__8479_8483,i__8481_8485);var a_8487 = (((2 * crossviz.math.PI) * i_8486) / N);obj.vertices.push(crossviz.obj3.vector3.call(null,(r * crossviz.math.cos.call(null,a_8487)),(r * crossviz.math.sin.call(null,a_8487)),(- h)));
obj.faces.push((new THREE.Face3(0,i_8486,(((i_8486 < N))?(i_8486 + 1):1))));
{
var G__8488 = seq__8478_8482;
var G__8489 = chunk__8479_8483;
var G__8490 = count__8480_8484;
var G__8491 = (i__8481_8485 + 1);
seq__8478_8482 = G__8488;
chunk__8479_8483 = G__8489;
count__8480_8484 = G__8490;
i__8481_8485 = G__8491;
continue;
}
} else
{var temp__4126__auto___8492 = cljs.core.seq.call(null,seq__8478_8482);if(temp__4126__auto___8492)
{var seq__8478_8493__$1 = temp__4126__auto___8492;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8478_8493__$1))
{var c__4229__auto___8494 = cljs.core.chunk_first.call(null,seq__8478_8493__$1);{
var G__8495 = cljs.core.chunk_rest.call(null,seq__8478_8493__$1);
var G__8496 = c__4229__auto___8494;
var G__8497 = cljs.core.count.call(null,c__4229__auto___8494);
var G__8498 = 0;
seq__8478_8482 = G__8495;
chunk__8479_8483 = G__8496;
count__8480_8484 = G__8497;
i__8481_8485 = G__8498;
continue;
}
} else
{var i_8499 = cljs.core.first.call(null,seq__8478_8493__$1);var a_8500 = (((2 * crossviz.math.PI) * i_8499) / N);obj.vertices.push(crossviz.obj3.vector3.call(null,(r * crossviz.math.cos.call(null,a_8500)),(r * crossviz.math.sin.call(null,a_8500)),(- h)));
obj.faces.push((new THREE.Face3(0,i_8499,(((i_8499 < N))?(i_8499 + 1):1))));
{
var G__8501 = cljs.core.next.call(null,seq__8478_8493__$1);
var G__8502 = null;
var G__8503 = 0;
var G__8504 = 0;
seq__8478_8482 = G__8501;
chunk__8479_8483 = G__8502;
count__8480_8484 = G__8503;
i__8481_8485 = G__8504;
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
conehead = function(p__8471,h,r,props){
switch(arguments.length){
case 3:
return conehead__3.call(this,p__8471,h,r);
case 4:
return conehead__4.call(this,p__8471,h,r,props);
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
var vector__2 = (function (p__8505,props){var map__8507 = p__8505;var map__8507__$1 = ((cljs.core.seq_QMARK_.call(null,map__8507))?cljs.core.apply.call(null,cljs.core.hash_map,map__8507):map__8507);var z = cljs.core.get.call(null,map__8507__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__8507__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__8507__$1,new cljs.core.Keyword(null,"x","x",1013904362));var stalk = (new THREE.Geometry());var obj = (new THREE.Object3D());stalk.vertices.push(crossviz.obj3.vector3.call(null,x,y,z));
stalk.vertices.push(crossviz.obj3.vector3.call(null,0,0,0));
obj.add((new THREE.Line(stalk,(new THREE.LineBasicMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,crossviz.obj3.default_props,props)))))));
obj.add(crossviz.obj3.conehead.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y,z], null),0.2,0.08,props));
return obj;
});
vector = function(p__8505,props){
switch(arguments.length){
case 1:
return vector__1.call(this,p__8505);
case 2:
return vector__2.call(this,p__8505,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
vector.cljs$core$IFn$_invoke$arity$1 = vector__1;
vector.cljs$core$IFn$_invoke$arity$2 = vector__2;
return vector;
})()
;

//# sourceMappingURL=obj3.js.map