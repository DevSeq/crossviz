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
crossviz.obj3.vector_from_typed_goem = (function vector_from_typed_goem(p__4963){var map__4965 = p__4963;var map__4965__$1 = ((cljs.core.seq_QMARK_.call(null,map__4965))?cljs.core.apply.call(null,cljs.core.hash_map,map__4965):map__4965);var z = cljs.core.get.call(null,map__4965__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__4965__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__4965__$1,new cljs.core.Keyword(null,"x","x",1013904362));var g = (new THREE.Geometry());g.vertices.push(crossviz.obj3.vector3.call(null,x,y,z));
g.vertices.push(crossviz.obj3.vector3.call(null,0,0,0));
return (new THREE.Line(g,(new THREE.LineBasicMaterial({"linewidth": 2, "opacity": 0, "color": crossviz.constants.vectorColor}))));
});
crossviz.obj3.line_from_typed_goem = (function line_from_typed_goem(p__4966){var map__4969 = p__4966;var map__4969__$1 = ((cljs.core.seq_QMARK_.call(null,map__4969))?cljs.core.apply.call(null,cljs.core.hash_map,map__4969):map__4969);var z = cljs.core.get.call(null,map__4969__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__4969__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__4969__$1,new cljs.core.Keyword(null,"x","x",1013904362));var g = (new THREE.Geometry());var A = ((x * x) + (y * y));var vec__4970 = (((crossviz.math.abs.call(null,x) > crossviz.math.abs.call(null,y)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * y) * z),((z * z) + ((x * x) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (g,A,map__4969,map__4969__$1,z,y,x){
return (function (t){return crossviz.obj3.vector3.call(null,((- (z + (y * t))) / x),t,1);
});})(g,A,map__4969,map__4969__$1,z,y,x))
], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * x) * z),((z * z) + ((y * y) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (g,A,map__4969,map__4969__$1,z,y,x){
return (function (t){return crossviz.obj3.vector3.call(null,t,((- (z + (x * t))) / y),1);
});})(g,A,map__4969,map__4969__$1,z,y,x))
], null));var B = cljs.core.nth.call(null,vec__4970,0,null);var C = cljs.core.nth.call(null,vec__4970,1,null);var vert = cljs.core.nth.call(null,vec__4970,2,null);var D = crossviz.math.sqrt.call(null,((B * B) - ((4 * A) * C)));g.vertices.push(vert.call(null,(((- B) + D) / (2.0 * A))));
g.vertices.push(vert.call(null,(((- B) - D) / (2.0 * A))));
return (new THREE.Line(g,(new THREE.LineBasicMaterial({"linewidth": 5, "opacity": 0, "color": crossviz.constants.lineColor}))));
});
crossviz.obj3.text = (function() {
var text = null;
var text__2 = (function (string,a){return string.call(null,a,null);
});
var text__3 = (function (string,p__4971,props){var vec__4973 = p__4971;var x = cljs.core.nth.call(null,vec__4973,0,null);var y = cljs.core.nth.call(null,vec__4973,1,null);var z = cljs.core.nth.call(null,vec__4973,2,null);var mprops = cljs.core.merge.call(null,crossviz.obj3.default_props,props);var g = (new THREE.TextGeometry(string,cljs.core.clj__GT_js.call(null,mprops)));var s = (new THREE.Mesh(g,(new THREE.MeshPhongMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"transparent","transparent",3582677188),false,new cljs.core.Keyword(null,"side","side",1017434313),THREE.DoubleSide], null),mprops))))));s.position.set(x,y,z);
return s;
});
text = function(string,p__4971,props){
switch(arguments.length){
case 2:
return text__2.call(this,string,p__4971);
case 3:
return text__3.call(this,string,p__4971,props);
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
var segment3__3 = (function (p__4974,p__4975,props){var vec__4978 = p__4974;var ax = cljs.core.nth.call(null,vec__4978,0,null);var ay = cljs.core.nth.call(null,vec__4978,1,null);var az = cljs.core.nth.call(null,vec__4978,2,null);var vec__4979 = p__4975;var bx = cljs.core.nth.call(null,vec__4979,0,null);var by = cljs.core.nth.call(null,vec__4979,1,null);var bz = cljs.core.nth.call(null,vec__4979,2,null);var obj = (new THREE.Geometry());obj.vertices.push(crossviz.obj3.vector3.call(null,ax,ay,az));
obj.vertices.push(crossviz.obj3.vector3.call(null,bx,by,bz));
return (new THREE.Line(obj,(new THREE.LineBasicMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,crossviz.obj3.default_props,props))))));
});
segment3 = function(p__4974,p__4975,props){
switch(arguments.length){
case 2:
return segment3__2.call(this,p__4974,p__4975);
case 3:
return segment3__3.call(this,p__4974,p__4975,props);
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
var seq__4984_4988 = cljs.core.seq.call(null,cljs.core.range.call(null,0,(N + 1)));var chunk__4985_4989 = null;var count__4986_4990 = 0;var i__4987_4991 = 0;while(true){
if((i__4987_4991 < count__4986_4990))
{var i_4992 = cljs.core._nth.call(null,chunk__4985_4989,i__4987_4991);var a_4993 = (((2 * crossviz.math.PI) * i_4992) / N);g.vertices.push(crossviz.obj3.vector3.call(null,(r * crossviz.math.cos.call(null,a_4993)),(r * crossviz.math.sin.call(null,a_4993)),z));
g.faces.push((new THREE.Face3(0,i_4992,(((i_4992 < N))?(i_4992 + 1):1))));
{
var G__4994 = seq__4984_4988;
var G__4995 = chunk__4985_4989;
var G__4996 = count__4986_4990;
var G__4997 = (i__4987_4991 + 1);
seq__4984_4988 = G__4994;
chunk__4985_4989 = G__4995;
count__4986_4990 = G__4996;
i__4987_4991 = G__4997;
continue;
}
} else
{var temp__4126__auto___4998 = cljs.core.seq.call(null,seq__4984_4988);if(temp__4126__auto___4998)
{var seq__4984_4999__$1 = temp__4126__auto___4998;if(cljs.core.chunked_seq_QMARK_.call(null,seq__4984_4999__$1))
{var c__4229__auto___5000 = cljs.core.chunk_first.call(null,seq__4984_4999__$1);{
var G__5001 = cljs.core.chunk_rest.call(null,seq__4984_4999__$1);
var G__5002 = c__4229__auto___5000;
var G__5003 = cljs.core.count.call(null,c__4229__auto___5000);
var G__5004 = 0;
seq__4984_4988 = G__5001;
chunk__4985_4989 = G__5002;
count__4986_4990 = G__5003;
i__4987_4991 = G__5004;
continue;
}
} else
{var i_5005 = cljs.core.first.call(null,seq__4984_4999__$1);var a_5006 = (((2 * crossviz.math.PI) * i_5005) / N);g.vertices.push(crossviz.obj3.vector3.call(null,(r * crossviz.math.cos.call(null,a_5006)),(r * crossviz.math.sin.call(null,a_5006)),z));
g.faces.push((new THREE.Face3(0,i_5005,(((i_5005 < N))?(i_5005 + 1):1))));
{
var G__5007 = cljs.core.next.call(null,seq__4984_4999__$1);
var G__5008 = null;
var G__5009 = 0;
var G__5010 = 0;
seq__4984_4988 = G__5007;
chunk__4985_4989 = G__5008;
count__4986_4990 = G__5009;
i__4987_4991 = G__5010;
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
crossviz.obj3.segment_endpoints = (function segment_endpoints(p__5011){var map__5014 = p__5011;var map__5014__$1 = ((cljs.core.seq_QMARK_.call(null,map__5014))?cljs.core.apply.call(null,cljs.core.hash_map,map__5014):map__5014);var z = cljs.core.get.call(null,map__5014__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__5014__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__5014__$1,new cljs.core.Keyword(null,"x","x",1013904362));var A = ((x * x) + (y * y));var vec__5015 = (((crossviz.math.abs.call(null,x) > crossviz.math.abs.call(null,y)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * y) * z),((z * z) + ((x * x) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (A,map__5014,map__5014__$1,z,y,x){
return (function (t){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((- (z + (y * t))) / x),t,1], null);
});})(A,map__5014,map__5014__$1,z,y,x))
], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [((2 * x) * z),((z * z) + ((y * y) * (1 - (crossviz.constants.univDiam * crossviz.constants.univDiam)))),((function (A,map__5014,map__5014__$1,z,y,x){
return (function (t){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,((- (z + (x * t))) / y),1], null);
});})(A,map__5014,map__5014__$1,z,y,x))
], null));var B = cljs.core.nth.call(null,vec__5015,0,null);var C = cljs.core.nth.call(null,vec__5015,1,null);var vert = cljs.core.nth.call(null,vec__5015,2,null);var D = crossviz.math.sqrt.call(null,((B * B) - ((4 * A) * C)));return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [vert.call(null,(((- B) + D) / (2.0 * A))),vert.call(null,(((- B) - D) / (2.0 * A)))], null);
});
crossviz.obj3.segment = (function() {
var segment = null;
var segment__1 = (function (p){return segment.call(null,p,null);
});
var segment__2 = (function (p,props){var vec__5017 = crossviz.obj3.segment_endpoints.call(null,p);var a = cljs.core.nth.call(null,vec__5017,0,null);var b = cljs.core.nth.call(null,vec__5017,1,null);var g = (new THREE.Geometry());g.vertices.push(crossviz.obj3.vector3.call(null,a.call(null,0),a.call(null,1),a.call(null,2)));
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
var plane__2 = (function (p__5018,props){var map__5020 = p__5018;var map__5020__$1 = ((cljs.core.seq_QMARK_.call(null,map__5020))?cljs.core.apply.call(null,cljs.core.hash_map,map__5020):map__5020);var z = cljs.core.get.call(null,map__5020__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__5020__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__5020__$1,new cljs.core.Keyword(null,"x","x",1013904362));var v = crossviz.obj3.vector3.call(null,x,y,z);var k = crossviz.obj3.vector3.call(null,0,0,1);var axis = (new THREE.Vector3()).crossVectors(k,v).normalize();var angle = k.angleTo(v);var R = (new THREE.Matrix4()).makeRotationAxis(axis,angle);var obj = crossviz.obj3.zdisc.call(null,crossviz.constants.univDiam,0,props);obj.applyMatrix(R);
return obj;
});
plane = function(p__5018,props){
switch(arguments.length){
case 1:
return plane__1.call(this,p__5018);
case 2:
return plane__2.call(this,p__5018,props);
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
var conehead__4 = (function (p__5021,h,r,props){var vec__5027 = p__5021;var x = cljs.core.nth.call(null,vec__5027,0,null);var y = cljs.core.nth.call(null,vec__5027,1,null);var z = cljs.core.nth.call(null,vec__5027,2,null);var obj = (new THREE.Geometry());var v = crossviz.obj3.vector3.call(null,x,y,z);var N = 60;obj.vertices.push(crossviz.obj3.vector3.call(null,0,0,0));
var seq__5028_5032 = cljs.core.seq.call(null,cljs.core.range.call(null,0,(N + 1)));var chunk__5029_5033 = null;var count__5030_5034 = 0;var i__5031_5035 = 0;while(true){
if((i__5031_5035 < count__5030_5034))
{var i_5036 = cljs.core._nth.call(null,chunk__5029_5033,i__5031_5035);var a_5037 = (((2 * crossviz.math.PI) * i_5036) / N);obj.vertices.push(crossviz.obj3.vector3.call(null,(r * crossviz.math.cos.call(null,a_5037)),(r * crossviz.math.sin.call(null,a_5037)),(- h)));
obj.faces.push((new THREE.Face3(0,i_5036,(((i_5036 < N))?(i_5036 + 1):1))));
{
var G__5038 = seq__5028_5032;
var G__5039 = chunk__5029_5033;
var G__5040 = count__5030_5034;
var G__5041 = (i__5031_5035 + 1);
seq__5028_5032 = G__5038;
chunk__5029_5033 = G__5039;
count__5030_5034 = G__5040;
i__5031_5035 = G__5041;
continue;
}
} else
{var temp__4126__auto___5042 = cljs.core.seq.call(null,seq__5028_5032);if(temp__4126__auto___5042)
{var seq__5028_5043__$1 = temp__4126__auto___5042;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5028_5043__$1))
{var c__4229__auto___5044 = cljs.core.chunk_first.call(null,seq__5028_5043__$1);{
var G__5045 = cljs.core.chunk_rest.call(null,seq__5028_5043__$1);
var G__5046 = c__4229__auto___5044;
var G__5047 = cljs.core.count.call(null,c__4229__auto___5044);
var G__5048 = 0;
seq__5028_5032 = G__5045;
chunk__5029_5033 = G__5046;
count__5030_5034 = G__5047;
i__5031_5035 = G__5048;
continue;
}
} else
{var i_5049 = cljs.core.first.call(null,seq__5028_5043__$1);var a_5050 = (((2 * crossviz.math.PI) * i_5049) / N);obj.vertices.push(crossviz.obj3.vector3.call(null,(r * crossviz.math.cos.call(null,a_5050)),(r * crossviz.math.sin.call(null,a_5050)),(- h)));
obj.faces.push((new THREE.Face3(0,i_5049,(((i_5049 < N))?(i_5049 + 1):1))));
{
var G__5051 = cljs.core.next.call(null,seq__5028_5043__$1);
var G__5052 = null;
var G__5053 = 0;
var G__5054 = 0;
seq__5028_5032 = G__5051;
chunk__5029_5033 = G__5052;
count__5030_5034 = G__5053;
i__5031_5035 = G__5054;
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
conehead = function(p__5021,h,r,props){
switch(arguments.length){
case 3:
return conehead__3.call(this,p__5021,h,r);
case 4:
return conehead__4.call(this,p__5021,h,r,props);
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
var vector__2 = (function (p__5055,props){var map__5057 = p__5055;var map__5057__$1 = ((cljs.core.seq_QMARK_.call(null,map__5057))?cljs.core.apply.call(null,cljs.core.hash_map,map__5057):map__5057);var z = cljs.core.get.call(null,map__5057__$1,new cljs.core.Keyword(null,"z","z",1013904364));var y = cljs.core.get.call(null,map__5057__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__5057__$1,new cljs.core.Keyword(null,"x","x",1013904362));var stalk = (new THREE.Geometry());var obj = (new THREE.Object3D());stalk.vertices.push(crossviz.obj3.vector3.call(null,x,y,z));
stalk.vertices.push(crossviz.obj3.vector3.call(null,0,0,0));
obj.add((new THREE.Line(stalk,(new THREE.LineBasicMaterial(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,crossviz.obj3.default_props,props)))))));
obj.add(crossviz.obj3.conehead.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y,z], null),0.2,0.08,props));
return obj;
});
vector = function(p__5055,props){
switch(arguments.length){
case 1:
return vector__1.call(this,p__5055);
case 2:
return vector__2.call(this,p__5055,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
vector.cljs$core$IFn$_invoke$arity$1 = vector__1;
vector.cljs$core$IFn$_invoke$arity$2 = vector__2;
return vector;
})()
;

//# sourceMappingURL=obj3.js.map