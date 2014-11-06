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
crossviz.core.log = (function log(msg){return console.log(msg);
});
crossviz.core.scene_root = crossviz.three.Scene.call(null);
crossviz.core.geoms = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
crossviz.core.insert_geom = (function insert_geom(g){return cljs.core.swap_BANG_.call(null,crossviz.core.geoms,(function (gs){return cljs.core.conj.call(null,gs,g);
}));
});
crossviz.core.remove_geom = (function remove_geom(g){return cljs.core.swap_BANG_.call(null,crossviz.core.geoms,(function (gs){return cljs.core.filter.call(null,(function (p1__4926_SHARP_){return cljs.core.not_EQ_.call(null,p1__4926_SHARP_,g);
}),gs);
}));
});
crossviz.core.texts = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
crossviz.core.world = cljs.core.atom.call(null,crossviz.three.Object3D.call(null));
crossviz.core.add_geom_to_world = (function add_geom_to_world(g){if(cljs.core.vector_QMARK_.call(null,g))
{cljs.core.doall.call(null,cljs.core.map.call(null,add_geom_to_world,g));
} else
{var obj_4927 = crossviz.geom.to_obj3.call(null,g);if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1017479852).cljs$core$IFn$_invoke$arity$1(g),new cljs.core.Keyword(null,"text","text",1017460895)))
{cljs.core.swap_BANG_.call(null,crossviz.core.texts,((function (obj_4927){
return (function (ts){return cljs.core.conj.call(null,ts,obj_4927);
});})(obj_4927))
);
} else
{}
cljs.core.deref.call(null,crossviz.core.world).add(obj_4927);
}
return null;
});
cljs.core.add_watch.call(null,crossviz.core.geoms,new cljs.core.Keyword(null,"geoms-watch","geoms-watch",552219563),(function (_,___$1,___$2,new_geoms){crossviz.core.scene_root.remove(cljs.core.deref.call(null,crossviz.core.world));
cljs.core.reset_BANG_.call(null,crossviz.core.world,(new THREE.Object3D()));
cljs.core.reset_BANG_.call(null,crossviz.core.texts,cljs.core.PersistentVector.EMPTY);
var seq__4928_4932 = cljs.core.seq.call(null,new_geoms);var chunk__4929_4933 = null;var count__4930_4934 = 0;var i__4931_4935 = 0;while(true){
if((i__4931_4935 < count__4930_4934))
{var g_4936 = cljs.core._nth.call(null,chunk__4929_4933,i__4931_4935);crossviz.core.add_geom_to_world.call(null,g_4936);
{
var G__4937 = seq__4928_4932;
var G__4938 = chunk__4929_4933;
var G__4939 = count__4930_4934;
var G__4940 = (i__4931_4935 + 1);
seq__4928_4932 = G__4937;
chunk__4929_4933 = G__4938;
count__4930_4934 = G__4939;
i__4931_4935 = G__4940;
continue;
}
} else
{var temp__4126__auto___4941 = cljs.core.seq.call(null,seq__4928_4932);if(temp__4126__auto___4941)
{var seq__4928_4942__$1 = temp__4126__auto___4941;if(cljs.core.chunked_seq_QMARK_.call(null,seq__4928_4942__$1))
{var c__4229__auto___4943 = cljs.core.chunk_first.call(null,seq__4928_4942__$1);{
var G__4944 = cljs.core.chunk_rest.call(null,seq__4928_4942__$1);
var G__4945 = c__4229__auto___4943;
var G__4946 = cljs.core.count.call(null,c__4229__auto___4943);
var G__4947 = 0;
seq__4928_4932 = G__4944;
chunk__4929_4933 = G__4945;
count__4930_4934 = G__4946;
i__4931_4935 = G__4947;
continue;
}
} else
{var g_4948 = cljs.core.first.call(null,seq__4928_4942__$1);crossviz.core.add_geom_to_world.call(null,g_4948);
{
var G__4949 = cljs.core.next.call(null,seq__4928_4942__$1);
var G__4950 = null;
var G__4951 = 0;
var G__4952 = 0;
seq__4928_4932 = G__4949;
chunk__4929_4933 = G__4950;
count__4930_4934 = G__4951;
i__4931_4935 = G__4952;
continue;
}
}
} else
{}
}
break;
}
return crossviz.core.scene_root.add(cljs.core.deref.call(null,crossviz.core.world));
}));
crossviz.core.animating = cljs.core.atom.call(null,false);
crossviz.core.createCameraControls = (function createCameraControls(camera,domElement){var controls = (new THREE.TrackballControls(camera,domElement));var radius = 3;controls.rotateSpeed = 1.0;
controls.zoomSpeed = 3.0;
controls.panSpeed = 0.2;
controls.dynamicDampingFactor = 0.3;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = false;
controls.minDistance = (radius * 1.0);
controls.maxDistance = (radius * 20.0);
return controls;
});
crossviz.core.prepareContainer = (function prepareContainer(domElement,renderer){var container = document.getElementById("container");container.appendChild(renderer.domElement);
return container;
});
var renderer_4954 = (new THREE.WebGLRenderer({"antialias": true}));var container_4955 = crossviz.core.prepareContainer.call(null,document.getElementById("container"),renderer_4954);var width_4956 = container_4955.offsetWidth;var height_4957 = container_4955.offsetHeight;var camera_4958 = (new THREE.PerspectiveCamera(45,(width_4956 / height_4957),1,4000));var light1_4959 = (new THREE.DirectionalLight(16777215,0.5));var light2_4960 = (new THREE.DirectionalLight(16777215,0.6));var light3_4961 = (new THREE.DirectionalLight(16777215,0.7));var controls_4962 = crossviz.core.createCameraControls.call(null,camera_4958,renderer_4954.domElement);var run_4963 = ((function (renderer_4954,container_4955,width_4956,height_4957,camera_4958,light1_4959,light2_4960,light3_4961,controls_4962){
return (function run(){controls_4962.update();
cljs.core.dorun.call(null,cljs.core.map.call(null,((function (renderer_4954,container_4955,width_4956,height_4957,camera_4958,light1_4959,light2_4960,light3_4961,controls_4962){
return (function (p1__4953_SHARP_){return p1__4953_SHARP_.rotation.setFromRotationMatrix(camera_4958.matrix);
});})(renderer_4954,container_4955,width_4956,height_4957,camera_4958,light1_4959,light2_4960,light3_4961,controls_4962))
,cljs.core.deref.call(null,crossviz.core.texts)));
renderer_4954.render(crossviz.core.scene_root,camera_4958);
if(cljs.core.truth_(cljs.core.deref.call(null,crossviz.core.animating)))
{cljs.core.deref.call(null,crossviz.core.world).rotation.z = (cljs.core.deref.call(null,crossviz.core.world).rotation.z - 0.01);
} else
{}
return requestAnimationFrame(run);
});})(renderer_4954,container_4955,width_4956,height_4957,camera_4958,light1_4959,light2_4960,light3_4961,controls_4962))
;renderer_4954.setSize(width_4956,height_4957);
renderer_4954.setClearColor(4473941,1);
camera_4958.position.set(1,-5,3);
camera_4958.up.set(0,0,1);
camera_4958.lookAt(crossviz.obj3.vector3.call(null,0,0,0));
light1_4959.position.set(100,0,0);
light2_4960.position.set(0,-100,0);
light3_4961.position.set(0,100,0);
camera_4958.add(light1_4959);
camera_4958.add(light2_4960);
camera_4958.add(light3_4961);
crossviz.core.scene_root.add(camera_4958);
crossviz.core.scene_root.add(cljs.core.deref.call(null,crossviz.core.world));
run_4963.call(null);
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
crossviz.core.takestep = (function takestep(){cljs.core.first.call(null,cljs.core.deref.call(null,crossviz.core.steps)).call(null);
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
crossviz.core.insert_geom.call(null,crossviz.geom.conehead.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [1,1,1], null),0.2,0.05,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1108746965),16777215], null)));
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