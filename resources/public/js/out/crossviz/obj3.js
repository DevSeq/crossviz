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
/**
* @param {...*} var_args
*/
crossviz.obj3.vector3 = (function() { 
var vector3__delegate = function (args__7751__auto__){return cljs.core.eval.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("js","THREE.Vector3.","js/THREE.Vector3.",1484678640,null)),args__7751__auto__)));
};
var vector3 = function (var_args){
var args__7751__auto__ = null;if (arguments.length > 0) {
  args__7751__auto__ = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return vector3__delegate.call(this,args__7751__auto__);};
vector3.cljs$lang$maxFixedArity = 0;
vector3.cljs$lang$applyTo = (function (arglist__8936){
var args__7751__auto__ = cljs.core.seq(arglist__8936);
return vector3__delegate(args__7751__auto__);
});
vector3.cljs$core$IFn$_invoke$arity$variadic = vector3__delegate;
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
crossviz.obj3.vector_from_typed_goem = (function vector_from_typed_goem(p__8937){var map__8939 = p__8937;var map__8939__$1 = ((cljs.core.seq_QMARK_.call(null,map__8939))?cljs.core.apply.call(null,cljs.core.hash_map,map__8939):map__8939);var z = cljs.core.get.call(null,map__8939__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__8939__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__8939__$1,new cljs.core.Keyword(null,"x","x",1013904362));var g = (new THREE.Geometry());g.vertices.push(crossviz.obj3.vector3.call(null,x,y,z));
g.vertices.push(crossviz.obj3.vector3.call(null,0,0,0));
return (new THREE.Line(g,(new THREE.LineBasicMaterial({"linewidth": 2, "opacity": 0, "color": crossviz.constants.vectorColor}))));
});
crossviz.obj3.line_from_typed_goem = (function line_from_typed_goem(p__8940){var map__8943 = p__8940;var map__8943__$1 = ((cljs.core.seq_QMARK_.call(null,map__8943))?cljs.core.apply.call(null,cljs.core.hash_map,map__8943):map__8943);var z = cljs.core.get.call(null,map__8943__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__8943__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__8943__$1,new cljs.core.Keyword(null,"x","x",1013904362));var g = (new THREE.Geometry());var A = ((x * x) + (y * y));var vec__8944 = (((crossviz.math.abs.call(null,x) > crossviz.math.abs.call(null,y)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * y) * z),((z * z) + ((x * x) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (g,A,map__8943,map__8943__$1,z,y,x){
return (function (t){return crossviz.obj3.vector3.call(null,((- (z + (y * t))) / x),t,1);
});})(g,A,map__8943,map__8943__$1,z,y,x))
], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * x) * z),((z * z) + ((y * y) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (g,A,map__8943,map__8943__$1,z,y,x){
return (function (t){return crossviz.obj3.vector3.call(null,t,((- (z + (x * t))) / y),1);
});})(g,A,map__8943,map__8943__$1,z,y,x))
], null));var B = cljs.core.nth.call(null,vec__8944,0,null);var C = cljs.core.nth.call(null,vec__8944,1,null);var vert = cljs.core.nth.call(null,vec__8944,2,null);var D = crossviz.math.sqrt.call(null,((B * B) - ((4 * A) * C)));g.vertices.push(vert.call(null,(((- B) + D) / (2.0 * A))));
g.vertices.push(vert.call(null,(((- B) - D) / (2.0 * A))));
return (new THREE.Line(g,(new THREE.LineBasicMaterial({"linewidth": 5, "opacity": 0, "color": crossviz.constants.lineColor}))));
});
crossviz.obj3.text = (function() {
var text = null;
var text__2 = (function (string,a){return string.call(null,a,null);
});
var text__3 = (function (string,p__8945,props){var vec__8947 = p__8945;var x = cljs.core.nth.call(null,vec__8947,0,null);var y = cljs.core.nth.call(null,vec__8947,1,null);var z = cljs.core.nth.call(null,vec__8947,2,null);var mprops = cljs.core.merge.call(null,crossviz.obj3.default_props,props);var g = (new THREE.TextGeometry(string,cljs.core.clj__GT_js.call(null,mprops)));var s = (new THREE.Mesh(g,(new THREE.MeshPhongMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"transparent","transparent",3582677188),false,new cljs.core.Keyword(null,"side","side",1017434313),THREE.DoubleSide], null),mprops))))));s.position.set(x,y,z);
return s;
});
text = function(string,p__8945,props){
switch(arguments.length){
case 2:
return text__2.call(this,string,p__8945);
case 3:
return text__3.call(this,string,p__8945,props);
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
var segment3__3 = (function (p__8948,p__8949,props){var vec__8952 = p__8948;var ax = cljs.core.nth.call(null,vec__8952,0,null);var ay = cljs.core.nth.call(null,vec__8952,1,null);var az = cljs.core.nth.call(null,vec__8952,2,null);var vec__8953 = p__8949;var bx = cljs.core.nth.call(null,vec__8953,0,null);var by = cljs.core.nth.call(null,vec__8953,1,null);var bz = cljs.core.nth.call(null,vec__8953,2,null);var obj = (new THREE.Geometry());obj.vertices.push(crossviz.obj3.vector3.call(null,ax,ay,az));
obj.vertices.push(crossviz.obj3.vector3.call(null,bx,by,bz));
return (new THREE.Line(obj,(new THREE.LineBasicMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,crossviz.obj3.default_props,props))))));
});
segment3 = function(p__8948,p__8949,props){
switch(arguments.length){
case 2:
return segment3__2.call(this,p__8948,p__8949);
case 3:
return segment3__3.call(this,p__8948,p__8949,props);
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
var seq__8958_8962 = cljs.core.seq.call(null,cljs.core.range.call(null,0,(N + 1)));var chunk__8959_8963 = null;var count__8960_8964 = 0;var i__8961_8965 = 0;while(true){
if((i__8961_8965 < count__8960_8964))
{var i_8966 = cljs.core._nth.call(null,chunk__8959_8963,i__8961_8965);var a_8967 = (((2 * crossviz.math.PI) * i_8966) / N);g.vertices.push(crossviz.obj3.vector3.call(null,(r * crossviz.math.cos.call(null,a_8967)),(r * crossviz.math.sin.call(null,a_8967)),z));
g.faces.push((new THREE.Face3(0,i_8966,(((i_8966 < N))?(i_8966 + 1):1))));
{
var G__8968 = seq__8958_8962;
var G__8969 = chunk__8959_8963;
var G__8970 = count__8960_8964;
var G__8971 = (i__8961_8965 + 1);
seq__8958_8962 = G__8968;
chunk__8959_8963 = G__8969;
count__8960_8964 = G__8970;
i__8961_8965 = G__8971;
continue;
}
} else
{var temp__4126__auto___8972 = cljs.core.seq.call(null,seq__8958_8962);if(temp__4126__auto___8972)
{var seq__8958_8973__$1 = temp__4126__auto___8972;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8958_8973__$1))
{var c__4257__auto___8974 = cljs.core.chunk_first.call(null,seq__8958_8973__$1);{
var G__8975 = cljs.core.chunk_rest.call(null,seq__8958_8973__$1);
var G__8976 = c__4257__auto___8974;
var G__8977 = cljs.core.count.call(null,c__4257__auto___8974);
var G__8978 = 0;
seq__8958_8962 = G__8975;
chunk__8959_8963 = G__8976;
count__8960_8964 = G__8977;
i__8961_8965 = G__8978;
continue;
}
} else
{var i_8979 = cljs.core.first.call(null,seq__8958_8973__$1);var a_8980 = (((2 * crossviz.math.PI) * i_8979) / N);g.vertices.push(crossviz.obj3.vector3.call(null,(r * crossviz.math.cos.call(null,a_8980)),(r * crossviz.math.sin.call(null,a_8980)),z));
g.faces.push((new THREE.Face3(0,i_8979,(((i_8979 < N))?(i_8979 + 1):1))));
{
var G__8981 = cljs.core.next.call(null,seq__8958_8973__$1);
var G__8982 = null;
var G__8983 = 0;
var G__8984 = 0;
seq__8958_8962 = G__8981;
chunk__8959_8963 = G__8982;
count__8960_8964 = G__8983;
i__8961_8965 = G__8984;
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
crossviz.obj3.segment_endpoints = (function segment_endpoints(p__8985){var map__8988 = p__8985;var map__8988__$1 = ((cljs.core.seq_QMARK_.call(null,map__8988))?cljs.core.apply.call(null,cljs.core.hash_map,map__8988):map__8988);var z = cljs.core.get.call(null,map__8988__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__8988__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__8988__$1,new cljs.core.Keyword(null,"x","x",1013904362));var A = ((x * x) + (y * y));var vec__8989 = (((crossviz.math.abs.call(null,x) > crossviz.math.abs.call(null,y)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * y) * z),((z * z) + ((x * x) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (A,map__8988,map__8988__$1,z,y,x){
return (function (t){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((- (z + (y * t))) / x),t,1], null);
});})(A,map__8988,map__8988__$1,z,y,x))
], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * x) * z),((z * z) + ((y * y) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (A,map__8988,map__8988__$1,z,y,x){
return (function (t){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,((- (z + (x * t))) / y),1], null);
});})(A,map__8988,map__8988__$1,z,y,x))
], null));var B = cljs.core.nth.call(null,vec__8989,0,null);var C = cljs.core.nth.call(null,vec__8989,1,null);var vert = cljs.core.nth.call(null,vec__8989,2,null);var D = crossviz.math.sqrt.call(null,((B * B) - ((4 * A) * C)));return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [vert.call(null,(((- B) + D) / (2.0 * A))),vert.call(null,(((- B) - D) / (2.0 * A)))], null);
});
crossviz.obj3.segment = (function() {
var segment = null;
var segment__1 = (function (p){return segment.call(null,p,null);
});
var segment__2 = (function (p,props){var vec__8991 = crossviz.obj3.segment_endpoints.call(null,p);var a = cljs.core.nth.call(null,vec__8991,0,null);var b = cljs.core.nth.call(null,vec__8991,1,null);var g = (new THREE.Geometry());g.vertices.push(crossviz.obj3.vector3.call(null,a.call(null,0),a.call(null,1),a.call(null,2)));
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
var plane__2 = (function (p__8992,props){var map__8994 = p__8992;var map__8994__$1 = ((cljs.core.seq_QMARK_.call(null,map__8994))?cljs.core.apply.call(null,cljs.core.hash_map,map__8994):map__8994);var z = cljs.core.get.call(null,map__8994__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__8994__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__8994__$1,new cljs.core.Keyword(null,"x","x",1013904362));var v = crossviz.obj3.vector3.call(null,x,y,z);var k = crossviz.obj3.vector3.call(null,0,0,1);var axis = (new THREE.Vector3()).crossVectors(k,v).normalize();var angle = k.angleTo(v);var R = (new THREE.Matrix4()).makeRotationAxis(axis,angle);var obj = crossviz.obj3.zdisc.call(null,crossviz.constants.univDiam,0,props);obj.applyMatrix(R);
return obj;
});
plane = function(p__8992,props){
switch(arguments.length){
case 1:
return plane__1.call(this,p__8992);
case 2:
return plane__2.call(this,p__8992,props);
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
var conehead__4 = (function (p__8995,h,r,props){var vec__9001 = p__8995;var x = cljs.core.nth.call(null,vec__9001,0,null);var y = cljs.core.nth.call(null,vec__9001,1,null);var z = cljs.core.nth.call(null,vec__9001,2,null);var obj = (new THREE.Geometry());var v = crossviz.obj3.vector3.call(null,x,y,z);var N = 60;obj.vertices.push(crossviz.obj3.vector3.call(null,0,0,0));
var seq__9002_9006 = cljs.core.seq.call(null,cljs.core.range.call(null,0,(N + 1)));var chunk__9003_9007 = null;var count__9004_9008 = 0;var i__9005_9009 = 0;while(true){
if((i__9005_9009 < count__9004_9008))
{var i_9010 = cljs.core._nth.call(null,chunk__9003_9007,i__9005_9009);var a_9011 = (((2 * crossviz.math.PI) * i_9010) / N);obj.vertices.push(crossviz.obj3.vector3.call(null,(r * crossviz.math.cos.call(null,a_9011)),(r * crossviz.math.sin.call(null,a_9011)),(- h)));
obj.faces.push((new THREE.Face3(0,i_9010,(((i_9010 < N))?(i_9010 + 1):1))));
{
var G__9012 = seq__9002_9006;
var G__9013 = chunk__9003_9007;
var G__9014 = count__9004_9008;
var G__9015 = (i__9005_9009 + 1);
seq__9002_9006 = G__9012;
chunk__9003_9007 = G__9013;
count__9004_9008 = G__9014;
i__9005_9009 = G__9015;
continue;
}
} else
{var temp__4126__auto___9016 = cljs.core.seq.call(null,seq__9002_9006);if(temp__4126__auto___9016)
{var seq__9002_9017__$1 = temp__4126__auto___9016;if(cljs.core.chunked_seq_QMARK_.call(null,seq__9002_9017__$1))
{var c__4257__auto___9018 = cljs.core.chunk_first.call(null,seq__9002_9017__$1);{
var G__9019 = cljs.core.chunk_rest.call(null,seq__9002_9017__$1);
var G__9020 = c__4257__auto___9018;
var G__9021 = cljs.core.count.call(null,c__4257__auto___9018);
var G__9022 = 0;
seq__9002_9006 = G__9019;
chunk__9003_9007 = G__9020;
count__9004_9008 = G__9021;
i__9005_9009 = G__9022;
continue;
}
} else
{var i_9023 = cljs.core.first.call(null,seq__9002_9017__$1);var a_9024 = (((2 * crossviz.math.PI) * i_9023) / N);obj.vertices.push(crossviz.obj3.vector3.call(null,(r * crossviz.math.cos.call(null,a_9024)),(r * crossviz.math.sin.call(null,a_9024)),(- h)));
obj.faces.push((new THREE.Face3(0,i_9023,(((i_9023 < N))?(i_9023 + 1):1))));
{
var G__9025 = cljs.core.next.call(null,seq__9002_9017__$1);
var G__9026 = null;
var G__9027 = 0;
var G__9028 = 0;
seq__9002_9006 = G__9025;
chunk__9003_9007 = G__9026;
count__9004_9008 = G__9027;
i__9005_9009 = G__9028;
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
conehead = function(p__8995,h,r,props){
switch(arguments.length){
case 3:
return conehead__3.call(this,p__8995,h,r);
case 4:
return conehead__4.call(this,p__8995,h,r,props);
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
var vector__2 = (function (p__9029,props){var map__9031 = p__9029;var map__9031__$1 = ((cljs.core.seq_QMARK_.call(null,map__9031))?cljs.core.apply.call(null,cljs.core.hash_map,map__9031):map__9031);var z = cljs.core.get.call(null,map__9031__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__9031__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__9031__$1,new cljs.core.Keyword(null,"x","x",1013904362));var stalk = (new THREE.Geometry());var obj = (new THREE.Object3D());stalk.vertices.push(crossviz.obj3.vector3.call(null,x,y,z));
stalk.vertices.push(crossviz.obj3.vector3.call(null,0,0,0));
obj.add((new THREE.Line(stalk,(new THREE.LineBasicMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,crossviz.obj3.default_props,props)))))));
obj.add(crossviz.obj3.conehead.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y,z], null),0.2,0.08,props));
return obj;
});
vector = function(p__9029,props){
switch(arguments.length){
case 1:
return vector__1.call(this,p__9029);
case 2:
return vector__2.call(this,p__9029,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
vector.cljs$core$IFn$_invoke$arity$1 = vector__1;
vector.cljs$core$IFn$_invoke$arity$2 = vector__2;
return vector;
})()
;

//# sourceMappingURL=obj3.js.map