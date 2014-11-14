// Compiled by ClojureScript 0.0-2202
goog.provide('crossviz.core');
goog.require('cljs.core');
goog.require('crossviz.obj3');
goog.require('crossviz.obj3');
goog.require('crossviz.constants');
goog.require('crossviz.math');
goog.require('crossviz.three');
goog.require('crossviz.constants');
goog.require('crossviz.rp2');
goog.require('crossviz.obj3');
goog.require('crossviz.geom');
goog.require('crossviz.three');
goog.require('crossviz.rp2');
goog.require('crossviz.math');
goog.require('crossviz.geom');
cljs.core.enable_console_print_BANG_.call(null);
crossviz.core.log = (function log(msg){return console.log(msg);
});
crossviz.core.scene_root = crossviz.three.Scene.call(null);
crossviz.core.geoms = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
crossviz.core.insert_geom = (function insert_geom(g){cljs.core.swap_BANG_.call(null,crossviz.core.geoms,(function (gs){return cljs.core.conj.call(null,gs,g);
}));
return crossviz.core.refresh.call(null);
});
crossviz.core.remove_geom = (function remove_geom(g){cljs.core.swap_BANG_.call(null,crossviz.core.geoms,(function (gs){return cljs.core.filter.call(null,(function (p1__5247_SHARP_){return cljs.core.not_EQ_.call(null,p1__5247_SHARP_,g);
}),gs);
}));
return crossviz.core.refresh.call(null);
});
crossviz.core.texts = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
crossviz.core.WORLD = (new crossviz.three.Object3D());
crossviz.core.WORLD.matrixAutoUpdate = false;
crossviz.core.world = cljs.core.atom.call(null,crossviz.three.Object3D.call(null));
crossviz.core.add_geom_to_world = (function add_geom_to_world(g){if(cljs.core.vector_QMARK_.call(null,g))
{cljs.core.doall.call(null,cljs.core.map.call(null,add_geom_to_world,g));
} else
{var obj_5248 = crossviz.geom.to_obj3.call(null,g);if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1017479852).cljs$core$IFn$_invoke$arity$1(g),new cljs.core.Keyword(null,"text","text",1017460895)))
{cljs.core.swap_BANG_.call(null,crossviz.core.texts,((function (obj_5248){
return (function (ts){return cljs.core.conj.call(null,ts,obj_5248);
});})(obj_5248))
);
} else
{}
cljs.core.deref.call(null,crossviz.core.world).add(obj_5248);
}
return null;
});
cljs.core.add_watch.call(null,crossviz.core.geoms,new cljs.core.Keyword(null,"geoms-watch","geoms-watch",552219563),(function (_,___$1,___$2,new_geoms){crossviz.core.WORLD.remove(cljs.core.deref.call(null,crossviz.core.world));
cljs.core.reset_BANG_.call(null,crossviz.core.world,(new THREE.Object3D()));
cljs.core.reset_BANG_.call(null,crossviz.core.texts,cljs.core.PersistentVector.EMPTY);
var seq__5249_5253 = cljs.core.seq.call(null,new_geoms);var chunk__5250_5254 = null;var count__5251_5255 = 0;var i__5252_5256 = 0;while(true){
if((i__5252_5256 < count__5251_5255))
{var g_5257 = cljs.core._nth.call(null,chunk__5250_5254,i__5252_5256);crossviz.core.add_geom_to_world.call(null,g_5257);
{
var G__5258 = seq__5249_5253;
var G__5259 = chunk__5250_5254;
var G__5260 = count__5251_5255;
var G__5261 = (i__5252_5256 + 1);
seq__5249_5253 = G__5258;
chunk__5250_5254 = G__5259;
count__5251_5255 = G__5260;
i__5252_5256 = G__5261;
continue;
}
} else
{var temp__4126__auto___5262 = cljs.core.seq.call(null,seq__5249_5253);if(temp__4126__auto___5262)
{var seq__5249_5263__$1 = temp__4126__auto___5262;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5249_5263__$1))
{var c__4229__auto___5264 = cljs.core.chunk_first.call(null,seq__5249_5263__$1);{
var G__5265 = cljs.core.chunk_rest.call(null,seq__5249_5263__$1);
var G__5266 = c__4229__auto___5264;
var G__5267 = cljs.core.count.call(null,c__4229__auto___5264);
var G__5268 = 0;
seq__5249_5253 = G__5265;
chunk__5250_5254 = G__5266;
count__5251_5255 = G__5267;
i__5252_5256 = G__5268;
continue;
}
} else
{var g_5269 = cljs.core.first.call(null,seq__5249_5263__$1);crossviz.core.add_geom_to_world.call(null,g_5269);
{
var G__5270 = cljs.core.next.call(null,seq__5249_5263__$1);
var G__5271 = null;
var G__5272 = 0;
var G__5273 = 0;
seq__5249_5253 = G__5270;
chunk__5250_5254 = G__5271;
count__5251_5255 = G__5272;
i__5252_5256 = G__5273;
continue;
}
}
} else
{}
}
break;
}
return crossviz.core.WORLD.add(cljs.core.deref.call(null,crossviz.core.world));
}));
crossviz.core.animating = cljs.core.atom.call(null,false);
crossviz.core.finterp = (function finterp(x0,x1,t){return (x0 + (t * (x1 - x0)));
});
crossviz.core.v3interp = (function v3interp(v0,v1,t){return (new THREE.Vector3(crossviz.core.finterp.call(null,v0.x,v1.x,t),crossviz.core.finterp.call(null,v0.y,v1.y,t),crossviz.core.finterp.call(null,v0.z,v1.z,t)));
});
crossviz.core.anim_transform_action = (function() {
var anim_transform_action = null;
var anim_transform_action__5 = (function (target,q1,p1,s1,n){var q0 = (new THREE.Quaternion());var p0 = (new THREE.Vector3());var s0 = (new THREE.Vector3());target.matrix.decompose(p0,q0,s0);
return anim_transform_action.call(null,target,q0,p0,s0,q1,p1,s1,n);
});
var anim_transform_action__8 = (function (target,q0,p0,s0,q1,p1,s1,n){return anim_transform_action.call(null,target,q0,p0,s0,q1,p1,s1,n,0);
});
var anim_transform_action__9 = (function (target,q0,p0,s0,q1,p1,s1,n,t){if((t >= 1))
{return (function (){target.quaternion = q1;
target.position = p1;
target.scale = s1;
target.updateMatrix();
target.matrixWorldNeedsUpdate = true;
return null;
});
} else
{return (function (){target.quaternion = q0.slerp(q1,t);
target.position = crossviz.core.v3interp.call(null,p0,p1,t);
target.scale = crossviz.core.v3interp.call(null,s0,s1,t);
target.updateMatrix();
target.matrixWorldNeedsUpdate = true;
return anim_transform_action.call(null,target,q0,p0,s0,q1,p1,s1,n,(t + (1.0 / n)));
});
}
});
anim_transform_action = function(target,q0,p0,s0,q1,p1,s1,n,t){
switch(arguments.length){
case 5:
return anim_transform_action__5.call(this,target,q0,p0,s0,q1);
case 8:
return anim_transform_action__8.call(this,target,q0,p0,s0,q1,p1,s1,n);
case 9:
return anim_transform_action__9.call(this,target,q0,p0,s0,q1,p1,s1,n,t);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
anim_transform_action.cljs$core$IFn$_invoke$arity$5 = anim_transform_action__5;
anim_transform_action.cljs$core$IFn$_invoke$arity$8 = anim_transform_action__8;
anim_transform_action.cljs$core$IFn$_invoke$arity$9 = anim_transform_action__9;
return anim_transform_action;
})()
;
crossviz.core.anim_reset_action = (function anim_reset_action(target){var p1 = (new THREE.Vector3(0,0,0));var q1 = (new THREE.Quaternion(0,0,0,1));var s1 = (new THREE.Vector3(1,1,1));return crossviz.core.anim_transform_action.call(null,target,q1,p1,s1,100);
});
crossviz.core.resetWorld = (function resetWorld(){return crossviz.core.add_actions.call(null,crossviz.core.anim_reset_action.call(null,crossviz.core.WORLD));
});
crossviz.core.prepareContainer = (function prepareContainer(domElement,renderer){var container = document.getElementById("container");container.appendChild(renderer.domElement);
return container;
});
crossviz.core.actions = cljs.core.atom.call(null,cljs.core.List.EMPTY);
crossviz.core.take_actions = (function take_actions(){var action_taken = cljs.core.seq.call(null,cljs.core.deref.call(null,crossviz.core.actions));cljs.core.swap_BANG_.call(null,crossviz.core.actions,((function (action_taken){
return (function (actions){return cljs.core.doall.call(null,cljs.core.filter.call(null,((function (action_taken){
return (function (p1__5274_SHARP_){return !((p1__5274_SHARP_ == null));
});})(action_taken))
,cljs.core.map.call(null,((function (action_taken){
return (function (p1__5275_SHARP_){return p1__5275_SHARP_.call(null);
});})(action_taken))
,actions)));
});})(action_taken))
);
return action_taken;
});
/**
* @param {...*} var_args
*/
crossviz.core.add_actions = (function() { 
var add_actions__delegate = function (new_actions){cljs.core.swap_BANG_.call(null,crossviz.core.actions,(function (actions){return cljs.core.apply.call(null,cljs.core.conj,cljs.core.cons.call(null,actions,new_actions));
}));
return crossviz.core.refresh.call(null);
};
var add_actions = function (var_args){
var new_actions = null;if (arguments.length > 0) {
  new_actions = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return add_actions__delegate.call(this,new_actions);};
add_actions.cljs$lang$maxFixedArity = 0;
add_actions.cljs$lang$applyTo = (function (arglist__5276){
var new_actions = cljs.core.seq(arglist__5276);
return add_actions__delegate(new_actions);
});
add_actions.cljs$core$IFn$_invoke$arity$variadic = add_actions__delegate;
return add_actions;
})()
;
crossviz.core.oneshot_transform_action = (function oneshot_transform_action(target,M){return (function (){target.matrix.multiply(M);
target.matrixWorldNeedsUpdate = true;
return null;
});
});
crossviz.core.renderer = (new THREE.WebGLRenderer({"antialias": true}));
crossviz.core.container = crossviz.core.prepareContainer.call(null,document.getElementById("container"),crossviz.core.renderer);
crossviz.core.width = crossviz.core.container.offsetWidth;
crossviz.core.height = crossviz.core.container.offsetHeight;
crossviz.core.camera = (new THREE.PerspectiveCamera(45,(crossviz.core.width / crossviz.core.height),1,4000));
crossviz.core.light1 = (new THREE.DirectionalLight(16777215,0.5));
crossviz.core.light2 = (new THREE.DirectionalLight(16777215,0.6));
crossviz.core.light3 = (new THREE.DirectionalLight(16777215,0.7));
crossviz.core.eventTracker = EventTracker(crossviz.core.renderer.domElement,{"mouseWheel": (function (delta){var s = Math.exp((delta / 20.0));var R = (new THREE.Matrix4()).makeScale(s,s,s);var M = crossviz.core.eventTracker.computeTransform(crossviz.core.WORLD,crossviz.core.WORLD,crossviz.core.camera,R);return crossviz.core.add_actions.call(null,crossviz.core.oneshot_transform_action.call(null,crossviz.core.WORLD,M));
}), "mouseDrag": (function (p,dp){var v = (new THREE.Vector3(dp.y,dp.x,0)).normalize();var d = Math.sqrt(((dp.x * dp.x) + (dp.y * dp.y)));var angle = ((d / crossviz.core.width) * Math.PI);var R = (new THREE.Matrix4()).makeRotationAxis(v,angle);var M = crossviz.core.eventTracker.computeTransform(crossviz.core.WORLD,crossviz.core.WORLD,crossviz.core.camera,R);return crossviz.core.add_actions.call(null,crossviz.core.oneshot_transform_action.call(null,crossviz.core.WORLD,M));
})});
crossviz.core.realign_labels_camera_facing = (function realign_labels_camera_facing(){crossviz.core.WORLD.updateMatrixWorld();
crossviz.core.camera.updateMatrixWorld();
var M = (new THREE.Matrix4()).getInverse(crossviz.core.WORLD.matrixWorld).multiply(crossviz.core.camera.matrixWorld);return cljs.core.dorun.call(null,cljs.core.map.call(null,((function (M){
return (function (p1__5277_SHARP_){return p1__5277_SHARP_.rotation.setFromRotationMatrix(M);
});})(M))
,cljs.core.deref.call(null,crossviz.core.texts)));
});
crossviz.core.refresh = (function refresh(){return requestAnimationFrame((function (){crossviz.core.realign_labels_camera_facing.call(null);
crossviz.core.renderer.render(crossviz.core.scene_root,crossviz.core.camera);
if(crossviz.core.take_actions.call(null))
{return refresh.call(null);
} else
{return null;
}
}));
});
crossviz.core.renderer.setSize(crossviz.core.width,crossviz.core.height);
crossviz.core.renderer.setClearColor(4473941,1);
crossviz.core.camera.position.set(0,0,8);
crossviz.core.camera.up.set(0,1,0);
crossviz.core.camera.lookAt(crossviz.obj3.vector3.call(null,0,0,0));
crossviz.core.light1.position.set(100,0,0);
crossviz.core.light2.position.set(0,-100,0);
crossviz.core.light3.position.set(0,100,0);
crossviz.core.camera.add(crossviz.core.light1);
crossviz.core.camera.add(crossviz.core.light2);
crossviz.core.camera.add(crossviz.core.light3);
crossviz.core.scene_root.add(crossviz.core.camera);
crossviz.core.scene_root.add(crossviz.core.WORLD);
crossviz.core.WORLD.add(cljs.core.deref.call(null,crossviz.core.world));
crossviz.core.refresh.call(null);
crossviz.core.v1 = crossviz.geom.vector.call(null,crossviz.rp2.rp2.call(null,1,1,3),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1108746965),16776960], null));
crossviz.core.insert_geom.call(null,crossviz.core.v1);
crossviz.core.remove_geom.call(null,crossviz.core.v1);
crossviz.core.disc_radius = crossviz.math.sqrt.call(null,((crossviz.constants.univDiam * crossviz.constants.univDiam) - 1));
crossviz.core.rp2_v1 = crossviz.rp2.rp2.call(null,1,1,3);
crossviz.core.rp2_v2 = crossviz.rp2.rp2.call(null,1,-1,2);
crossviz.core.rp2_v1v2 = crossviz.rp2.cross.call(null,crossviz.core.rp2_v1,crossviz.core.rp2_v2);
crossviz.core.geom_vector_v1 = crossviz.geom.vector.call(null,crossviz.core.rp2_v1);
crossviz.core.geom_vector_v2 = crossviz.geom.vector.call(null,crossviz.core.rp2_v2);
crossviz.core.geom_vector_v1v2 = crossviz.geom.vector.call(null,crossviz.core.rp2_v1v2);
crossviz.core.rp2_a = crossviz.rp2.rp2.call(null,2,4,2);
crossviz.core.rp2_b = crossviz.rp2.rp2.call(null,3,-6,2);
crossviz.core.rp2_ab = crossviz.rp2.cross.call(null,crossviz.core.rp2_b,crossviz.core.rp2_a);
crossviz.core.geom_2d_axes = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [crossviz.geom.segment3.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(- crossviz.core.disc_radius),0,1], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [crossviz.core.disc_radius,0,1], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1108746965),16711680], null)),crossviz.geom.segment3.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,(- crossviz.core.disc_radius),1], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,crossviz.core.disc_radius,1], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1108746965),65280], null)),crossviz.geom.text.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [crossviz.core.disc_radius,0,1], null),"x"),crossviz.geom.text.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,crossviz.core.disc_radius,1], null),"y")], null);
crossviz.core.geom_line_a = crossviz.geom.line.call(null,crossviz.core.rp2_a);
crossviz.core.geom_line_a_label = crossviz.geom.text.call(null,cljs.core.first.call(null,crossviz.obj3.segment_endpoints.call(null,crossviz.core.rp2_a)),[cljs.core.str(new cljs.core.Keyword(null,"x","x",1013904362).cljs$core$IFn$_invoke$arity$1(crossviz.core.rp2_a)),cljs.core.str("x + "),cljs.core.str(new cljs.core.Keyword(null,"y","y",1013904363).cljs$core$IFn$_invoke$arity$1(crossviz.core.rp2_a)),cljs.core.str("y + "),cljs.core.str(new cljs.core.Keyword(null,"z","z",1013904364).cljs$core$IFn$_invoke$arity$1(crossviz.core.rp2_a)),cljs.core.str(" = 0")].join(''));
crossviz.core.geom_plane_a = crossviz.geom.plane.call(null,crossviz.core.rp2_a,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"transparent","transparent",3582677188),true,new cljs.core.Keyword(null,"color","color",1108746965),16777215], null));
crossviz.core.geom_vector_a = crossviz.geom.vector.call(null,crossviz.core.rp2_a);
crossviz.core.geom_vector_a_label = crossviz.geom.text.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",1013904362).cljs$core$IFn$_invoke$arity$1(crossviz.core.rp2_a),new cljs.core.Keyword(null,"y","y",1013904363).cljs$core$IFn$_invoke$arity$1(crossviz.core.rp2_a),new cljs.core.Keyword(null,"z","z",1013904364).cljs$core$IFn$_invoke$arity$1(crossviz.core.rp2_a)], null),[cljs.core.str("("),cljs.core.str(new cljs.core.Keyword(null,"x","x",1013904362).cljs$core$IFn$_invoke$arity$1(crossviz.core.rp2_a)),cljs.core.str(","),cljs.core.str(new cljs.core.Keyword(null,"y","y",1013904363).cljs$core$IFn$_invoke$arity$1(crossviz.core.rp2_a)),cljs.core.str(","),cljs.core.str(new cljs.core.Keyword(null,"z","z",1013904364).cljs$core$IFn$_invoke$arity$1(crossviz.core.rp2_a)),cljs.core.str(")")].join(''));
crossviz.core.geom_line_b = crossviz.geom.line.call(null,crossviz.core.rp2_b);
crossviz.core.geom_line_b_label = crossviz.geom.text.call(null,cljs.core.first.call(null,crossviz.obj3.segment_endpoints.call(null,crossviz.core.rp2_b)),[cljs.core.str(new cljs.core.Keyword(null,"x","x",1013904362).cljs$core$IFn$_invoke$arity$1(crossviz.core.rp2_b)),cljs.core.str("x + "),cljs.core.str(new cljs.core.Keyword(null,"y","y",1013904363).cljs$core$IFn$_invoke$arity$1(crossviz.core.rp2_b)),cljs.core.str("y + "),cljs.core.str(new cljs.core.Keyword(null,"z","z",1013904364).cljs$core$IFn$_invoke$arity$1(crossviz.core.rp2_b)),cljs.core.str(" = 0")].join(''));
crossviz.core.geom_plane_b = crossviz.geom.plane.call(null,crossviz.core.rp2_b,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"transparent","transparent",3582677188),true,new cljs.core.Keyword(null,"color","color",1108746965),16777215], null));
crossviz.core.geom_vector_b = crossviz.geom.vector.call(null,crossviz.core.rp2_b);
crossviz.core.geom_vector_b_label = crossviz.geom.text.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",1013904362).cljs$core$IFn$_invoke$arity$1(crossviz.core.rp2_b),new cljs.core.Keyword(null,"y","y",1013904363).cljs$core$IFn$_invoke$arity$1(crossviz.core.rp2_b),new cljs.core.Keyword(null,"z","z",1013904364).cljs$core$IFn$_invoke$arity$1(crossviz.core.rp2_b)], null),[cljs.core.str("("),cljs.core.str(new cljs.core.Keyword(null,"x","x",1013904362).cljs$core$IFn$_invoke$arity$1(crossviz.core.rp2_b)),cljs.core.str(","),cljs.core.str(new cljs.core.Keyword(null,"y","y",1013904363).cljs$core$IFn$_invoke$arity$1(crossviz.core.rp2_b)),cljs.core.str(","),cljs.core.str(new cljs.core.Keyword(null,"z","z",1013904364).cljs$core$IFn$_invoke$arity$1(crossviz.core.rp2_b)),cljs.core.str(")")].join(''));
crossviz.core.geom_point_ab = crossviz.geom.point.call(null,crossviz.core.rp2_ab);
crossviz.core.geom_point_ab_label = (function (){var p = crossviz.rp2.normalize.call(null,crossviz.core.rp2_ab);return crossviz.geom.text.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",1013904362).cljs$core$IFn$_invoke$arity$1(p),(new cljs.core.Keyword(null,"y","y",1013904363).cljs$core$IFn$_invoke$arity$1(p) + 0.2),new cljs.core.Keyword(null,"z","z",1013904364).cljs$core$IFn$_invoke$arity$1(p)], null),"?");
})();
crossviz.core.geom_vector_ab = crossviz.geom.vector.call(null,crossviz.core.rp2_ab);
crossviz.core.geom_vector_ab_label = crossviz.geom.text.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",1013904362).cljs$core$IFn$_invoke$arity$1(crossviz.core.rp2_ab),new cljs.core.Keyword(null,"y","y",1013904363).cljs$core$IFn$_invoke$arity$1(crossviz.core.rp2_ab),new cljs.core.Keyword(null,"z","z",1013904364).cljs$core$IFn$_invoke$arity$1(crossviz.core.rp2_ab)], null),[cljs.core.str("a X b")].join(''));
crossviz.core.geom_3d_x_axis = crossviz.geom.segment3.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,0,0], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [2,0,0], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1108746965),16711680,new cljs.core.Keyword(null,"linewidth","linewidth",3534637508),2], null));
crossviz.core.geom_3d_y_axis = crossviz.geom.segment3.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,0,0], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,2,0], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1108746965),65280,new cljs.core.Keyword(null,"linewidth","linewidth",3534637508),2], null));
crossviz.core.geom_3d_z_axis = crossviz.geom.segment3.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,0,0], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,0,2], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1108746965),255,new cljs.core.Keyword(null,"linewidth","linewidth",3534637508),2], null));
crossviz.core.geom_z1_disc = crossviz.geom.zdisc.call(null,crossviz.core.disc_radius,1,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1108746965),16777215,new cljs.core.Keyword(null,"transparent","transparent",3582677188),true], null));
crossviz.core.steps = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
crossviz.core.create_step = (function create_step(f){return cljs.core.swap_BANG_.call(null,crossviz.core.steps,(function (steps){return cljs.core.conj.call(null,steps,f);
}));
});
crossviz.core.takeStep = (function takeStep(){cljs.core.first.call(null,cljs.core.deref.call(null,crossviz.core.steps)).call(null);
return cljs.core.swap_BANG_.call(null,crossviz.core.steps,(function (steps){return cljs.core.rest.call(null,steps);
}));
});
crossviz.core.insert_geom.call(null,crossviz.core.geom_3d_x_axis);
crossviz.core.insert_geom.call(null,crossviz.core.geom_3d_y_axis);
crossviz.core.insert_geom.call(null,crossviz.core.geom_3d_z_axis);
crossviz.core.create_step.call(null,(function (){return crossviz.core.insert_geom.call(null,crossviz.core.geom_vector_v1);
}));
crossviz.core.create_step.call(null,(function (){return crossviz.core.insert_geom.call(null,crossviz.core.geom_vector_v2);
}));
crossviz.core.create_step.call(null,(function (){return crossviz.core.insert_geom.call(null,crossviz.core.geom_vector_v1v2);
}));
crossviz.core.create_step.call(null,(function (){crossviz.core.remove_geom.call(null,crossviz.core.geom_vector_v1);
crossviz.core.remove_geom.call(null,crossviz.core.geom_vector_v2);
crossviz.core.remove_geom.call(null,crossviz.core.geom_vector_v1v2);
crossviz.core.remove_geom.call(null,crossviz.core.geom_3d_x_axis);
crossviz.core.remove_geom.call(null,crossviz.core.geom_3d_y_axis);
return crossviz.core.remove_geom.call(null,crossviz.core.geom_3d_z_axis);
}));
crossviz.core.create_step.call(null,(function (){return crossviz.core.insert_geom.call(null,crossviz.core.geom_2d_axes);
}));
crossviz.core.insert_geom.call(null,crossviz.core.geom_3d_x_axis);
crossviz.core.insert_geom.call(null,crossviz.core.geom_3d_y_axis);
crossviz.core.insert_geom.call(null,crossviz.core.geom_3d_z_axis);
crossviz.core.create_step.call(null,(function (){crossviz.core.insert_geom.call(null,crossviz.core.geom_line_a);
return crossviz.core.insert_geom.call(null,crossviz.core.geom_line_a_label);
}));
crossviz.core.create_step.call(null,(function (){crossviz.core.insert_geom.call(null,crossviz.core.geom_line_b);
return crossviz.core.insert_geom.call(null,crossviz.core.geom_line_b_label);
}));
crossviz.core.create_step.call(null,(function (){crossviz.core.insert_geom.call(null,crossviz.core.geom_point_ab);
return crossviz.core.insert_geom.call(null,crossviz.core.geom_point_ab_label);
}));
crossviz.core.create_step.call(null,(function (){crossviz.core.insert_geom.call(null,crossviz.core.geom_3d_x_axis);
crossviz.core.insert_geom.call(null,crossviz.core.geom_3d_y_axis);
return crossviz.core.insert_geom.call(null,crossviz.core.geom_3d_z_axis);
}));
crossviz.core.create_step.call(null,(function (){return crossviz.core.insert_geom.call(null,crossviz.core.geom_z1_disc);
}));
crossviz.core.create_step.call(null,(function (){crossviz.core.remove_geom.call(null,crossviz.core.geom_point_ab);
crossviz.core.remove_geom.call(null,crossviz.core.geom_point_ab_label);
crossviz.core.remove_geom.call(null,crossviz.core.geom_line_b);
return crossviz.core.remove_geom.call(null,crossviz.core.geom_line_b_label);
}));
crossviz.core.create_step.call(null,(function (){return crossviz.core.insert_geom.call(null,crossviz.core.geom_plane_a);
}));
crossviz.core.create_step.call(null,(function (){crossviz.core.remove_geom.call(null,crossviz.core.geom_z1_disc);
return crossviz.core.remove_geom.call(null,crossviz.core.geom_2d_axes);
}));
crossviz.core.create_step.call(null,(function (){crossviz.core.insert_geom.call(null,crossviz.core.geom_vector_a);
return crossviz.core.insert_geom.call(null,crossviz.core.geom_vector_a_label);
}));
crossviz.core.create_step.call(null,(function (){crossviz.core.remove_geom.call(null,crossviz.core.geom_line_a_label);
crossviz.core.insert_geom.call(null,crossviz.core.geom_line_b);
return crossviz.core.insert_geom.call(null,crossviz.core.geom_line_b_label);
}));
crossviz.core.create_step.call(null,(function (){return crossviz.core.insert_geom.call(null,crossviz.core.geom_plane_b);
}));
crossviz.core.create_step.call(null,(function (){crossviz.core.insert_geom.call(null,crossviz.core.geom_vector_b);
return crossviz.core.insert_geom.call(null,crossviz.core.geom_vector_b_label);
}));
crossviz.core.create_step.call(null,(function (){crossviz.core.insert_geom.call(null,crossviz.core.geom_vector_ab);
return crossviz.core.insert_geom.call(null,crossviz.core.geom_vector_ab_label);
}));
crossviz.core.create_step.call(null,(function (){return crossviz.core.insert_geom.call(null,crossviz.core.geom_z1_disc);
}));

//# sourceMappingURL=core.js.map