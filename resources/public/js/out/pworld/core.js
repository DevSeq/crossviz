// Compiled by ClojureScript 0.0-2202
goog.provide('pworld.core');
goog.require('cljs.core');
goog.require('pworld.obj3');
goog.require('pworld.constants');
goog.require('pworld.math');
goog.require('pworld.geom');
goog.require('pworld.constants');
goog.require('pworld.rp2');
goog.require('pworld.rp2');
goog.require('pworld.math');
goog.require('pworld.geom');
goog.require('pworld.obj3');
pworld.core.current_id = cljs.core.atom.call(null,1000);
pworld.core.next_id = (function next_id(){cljs.core.swap_BANG_.call(null,pworld.core.current_id,(function (id){return (id + 1);
}));
return cljs.core.deref.call(null,pworld.core.current_id);
});
pworld.core.scene_root = (new THREE.Scene());
pworld.core.geoms = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
pworld.core.insert_geom = (function insert_geom(g){var id = (function (){var or__3481__auto__ = new cljs.core.Keyword(null,"id","id",1013907597).cljs$core$IFn$_invoke$arity$1(g);if(cljs.core.truth_(or__3481__auto__))
{return or__3481__auto__;
} else
{return pworld.core.next_id.call(null);
}
})();var ng = cljs.core.merge.call(null,g,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",1013907597),id], null));cljs.core.swap_BANG_.call(null,pworld.core.geoms,((function (id,ng){
return (function (gs){return cljs.core.conj.call(null,gs,ng);
});})(id,ng))
);
return ng;
});
pworld.core.remove_geom = (function remove_geom(g){return cljs.core.swap_BANG_.call(null,pworld.core.geoms,(function (gs){return cljs.core.filter.call(null,(function (p1__9900_SHARP_){return cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"id","id",1013907597).cljs$core$IFn$_invoke$arity$1(p1__9900_SHARP_),new cljs.core.Keyword(null,"id","id",1013907597).cljs$core$IFn$_invoke$arity$1(g));
}),gs);
}));
});
pworld.core.texts = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
pworld.core.world = cljs.core.atom.call(null,(new THREE.Object3D()));
cljs.core.add_watch.call(null,pworld.core.geoms,new cljs.core.Keyword(null,"geoms-watch","geoms-watch",552219563),(function (_,___$1,___$2,new_geoms){pworld.core.scene_root.remove(cljs.core.deref.call(null,pworld.core.world));
cljs.core.reset_BANG_.call(null,pworld.core.world,(new THREE.Object3D()));
cljs.core.reset_BANG_.call(null,pworld.core.texts,cljs.core.PersistentVector.EMPTY);
var seq__9901_9905 = cljs.core.seq.call(null,new_geoms);var chunk__9902_9906 = null;var count__9903_9907 = 0;var i__9904_9908 = 0;while(true){
if((i__9904_9908 < count__9903_9907))
{var g_9909 = cljs.core._nth.call(null,chunk__9902_9906,i__9904_9908);var obj_9910 = pworld.geom.to_obj3.call(null,g_9909);if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1017479852).cljs$core$IFn$_invoke$arity$1(g_9909),new cljs.core.Keyword(null,"text","text",1017460895)))
{cljs.core.swap_BANG_.call(null,pworld.core.texts,((function (seq__9901_9905,chunk__9902_9906,count__9903_9907,i__9904_9908,obj_9910,g_9909){
return (function (ts){return cljs.core.conj.call(null,ts,obj_9910);
});})(seq__9901_9905,chunk__9902_9906,count__9903_9907,i__9904_9908,obj_9910,g_9909))
);
} else
{}
cljs.core.deref.call(null,pworld.core.world).add(obj_9910);
{
var G__9911 = seq__9901_9905;
var G__9912 = chunk__9902_9906;
var G__9913 = count__9903_9907;
var G__9914 = (i__9904_9908 + 1);
seq__9901_9905 = G__9911;
chunk__9902_9906 = G__9912;
count__9903_9907 = G__9913;
i__9904_9908 = G__9914;
continue;
}
} else
{var temp__4126__auto___9915 = cljs.core.seq.call(null,seq__9901_9905);if(temp__4126__auto___9915)
{var seq__9901_9916__$1 = temp__4126__auto___9915;if(cljs.core.chunked_seq_QMARK_.call(null,seq__9901_9916__$1))
{var c__4229__auto___9917 = cljs.core.chunk_first.call(null,seq__9901_9916__$1);{
var G__9918 = cljs.core.chunk_rest.call(null,seq__9901_9916__$1);
var G__9919 = c__4229__auto___9917;
var G__9920 = cljs.core.count.call(null,c__4229__auto___9917);
var G__9921 = 0;
seq__9901_9905 = G__9918;
chunk__9902_9906 = G__9919;
count__9903_9907 = G__9920;
i__9904_9908 = G__9921;
continue;
}
} else
{var g_9922 = cljs.core.first.call(null,seq__9901_9916__$1);var obj_9923 = pworld.geom.to_obj3.call(null,g_9922);if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1017479852).cljs$core$IFn$_invoke$arity$1(g_9922),new cljs.core.Keyword(null,"text","text",1017460895)))
{cljs.core.swap_BANG_.call(null,pworld.core.texts,((function (seq__9901_9905,chunk__9902_9906,count__9903_9907,i__9904_9908,obj_9923,g_9922,seq__9901_9916__$1,temp__4126__auto___9915){
return (function (ts){return cljs.core.conj.call(null,ts,obj_9923);
});})(seq__9901_9905,chunk__9902_9906,count__9903_9907,i__9904_9908,obj_9923,g_9922,seq__9901_9916__$1,temp__4126__auto___9915))
);
} else
{}
cljs.core.deref.call(null,pworld.core.world).add(obj_9923);
{
var G__9924 = cljs.core.next.call(null,seq__9901_9916__$1);
var G__9925 = null;
var G__9926 = 0;
var G__9927 = 0;
seq__9901_9905 = G__9924;
chunk__9902_9906 = G__9925;
count__9903_9907 = G__9926;
i__9904_9908 = G__9927;
continue;
}
}
} else
{}
}
break;
}
return pworld.core.scene_root.add(cljs.core.deref.call(null,pworld.core.world));
}));
pworld.core.animating = cljs.core.atom.call(null,false);
pworld.core.createCameraControls = (function createCameraControls(camera,domElement){var controls = (new THREE.TrackballControls(camera,domElement));var radius = 3;controls.rotateSpeed = 1.0;
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
pworld.core.prepareContainer = (function prepareContainer(domElement,renderer){var container = document.getElementById("container");container.appendChild(renderer.domElement);
return container;
});
var renderer_9929 = (new THREE.WebGLRenderer({"antialias": true}));var container_9930 = pworld.core.prepareContainer.call(null,document.getElementById("container"),renderer_9929);var width_9931 = container_9930.offsetWidth;var height_9932 = container_9930.offsetHeight;var camera_9933 = (new THREE.PerspectiveCamera(45,(width_9931 / height_9932),1,4000));var light1_9934 = (new THREE.DirectionalLight(16777215,0.5));var light2_9935 = (new THREE.DirectionalLight(16777215,0.6));var light3_9936 = (new THREE.DirectionalLight(16777215,0.7));var controls_9937 = pworld.core.createCameraControls.call(null,camera_9933,renderer_9929.domElement);var run_9938 = ((function (renderer_9929,container_9930,width_9931,height_9932,camera_9933,light1_9934,light2_9935,light3_9936,controls_9937){
return (function run(){controls_9937.update();
cljs.core.dorun.call(null,cljs.core.map.call(null,((function (renderer_9929,container_9930,width_9931,height_9932,camera_9933,light1_9934,light2_9935,light3_9936,controls_9937){
return (function (p1__9928_SHARP_){return p1__9928_SHARP_.rotation.setFromRotationMatrix(camera_9933.matrix);
});})(renderer_9929,container_9930,width_9931,height_9932,camera_9933,light1_9934,light2_9935,light3_9936,controls_9937))
,cljs.core.deref.call(null,pworld.core.texts)));
renderer_9929.render(pworld.core.scene_root,camera_9933);
if(cljs.core.truth_(cljs.core.deref.call(null,pworld.core.animating)))
{cljs.core.deref.call(null,pworld.core.world).rotation.z = (cljs.core.deref.call(null,pworld.core.world).rotation.z - 0.01);
} else
{}
return requestAnimationFrame(run);
});})(renderer_9929,container_9930,width_9931,height_9932,camera_9933,light1_9934,light2_9935,light3_9936,controls_9937))
;renderer_9929.setSize(width_9931,height_9932);
renderer_9929.setClearColor(4473941,1);
camera_9933.position.set(1,-5,3);
camera_9933.up.set(0,0,1);
camera_9933.lookAt((new THREE.Vector3(0,0,0)));
light1_9934.position.set(100,0,0);
light2_9935.position.set(0,-100,0);
light3_9936.position.set(0,100,0);
camera_9933.add(light1_9934);
camera_9933.add(light2_9935);
camera_9933.add(light3_9936);
pworld.core.scene_root.add(camera_9933);
pworld.core.scene_root.add(cljs.core.deref.call(null,pworld.core.world));
run_9938.call(null);
pworld.core.disc_radius = pworld.math.sqrt.call(null,((pworld.constants.univDiam * pworld.constants.univDiam) - 1));
pworld.core.step = (function (){var method_table__4339__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__4340__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__4341__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__4342__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__4343__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",3129050535),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("step",cljs.core.identity,new cljs.core.Keyword(null,"default","default",2558708147),hierarchy__4343__auto__,method_table__4339__auto__,prefer_table__4340__auto__,method_cache__4341__auto__,cached_hierarchy__4342__auto__));
})();
pworld.core.rp2_a = pworld.rp2.rp2.call(null,2,4,2);
pworld.core.rp2_b = pworld.rp2.rp2.call(null,3,-6,2);
pworld.core.rp2_ab = pworld.rp2.cross.call(null,pworld.core.rp2_a,pworld.core.rp2_b);
pworld.core.insert_geom.call(null,pworld.geom.segment3.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(- pworld.core.disc_radius),0,1], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [pworld.core.disc_radius,0,1], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1108746965),16711680], null)));
pworld.core.insert_geom.call(null,pworld.geom.segment3.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,(- pworld.core.disc_radius),1], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,pworld.core.disc_radius,1], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1108746965),65280], null)));
pworld.core.insert_geom.call(null,pworld.geom.text.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [pworld.core.disc_radius,0,1], null),"x"));
pworld.core.insert_geom.call(null,pworld.geom.text.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,pworld.core.disc_radius,1], null),"y"));
pworld.core.geom_line_a = pworld.geom.line.call(null,pworld.core.rp2_a,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",1013907597),new cljs.core.Keyword(null,"line-a","line-a",4206197818)], null));
pworld.core.geom_line_a_label = pworld.geom.text.call(null,cljs.core.first.call(null,pworld.obj3.segment_endpoints.call(null,pworld.core.rp2_a)),[cljs.core.str(new cljs.core.Keyword(null,"x","x",1013904362).cljs$core$IFn$_invoke$arity$1(pworld.core.rp2_a)),cljs.core.str("x + "),cljs.core.str(new cljs.core.Keyword(null,"y","y",1013904363).cljs$core$IFn$_invoke$arity$1(pworld.core.rp2_a)),cljs.core.str("y + "),cljs.core.str(new cljs.core.Keyword(null,"z","z",1013904364).cljs$core$IFn$_invoke$arity$1(pworld.core.rp2_a)),cljs.core.str(" = 0")].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",1013907597),new cljs.core.Keyword(null,"line-a-label","line-a-label",2759285025)], null));
pworld.core.geom_plane_a = pworld.geom.plane.call(null,pworld.core.rp2_a,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",1013907597),new cljs.core.Keyword(null,"plane-a","plane-a",520006818),new cljs.core.Keyword(null,"transparent","transparent",3582677188),true,new cljs.core.Keyword(null,"color","color",1108746965),16777215], null));
pworld.core.geom_vector_a = pworld.geom.vector.call(null,pworld.core.rp2_a,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",1013907597),new cljs.core.Keyword(null,"vector-a","vector-a",2895484361)], null));
pworld.core.geom_vector_a_label = pworld.geom.text.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",1013904362).cljs$core$IFn$_invoke$arity$1(pworld.core.rp2_a),new cljs.core.Keyword(null,"y","y",1013904363).cljs$core$IFn$_invoke$arity$1(pworld.core.rp2_a),new cljs.core.Keyword(null,"z","z",1013904364).cljs$core$IFn$_invoke$arity$1(pworld.core.rp2_a)], null),[cljs.core.str("("),cljs.core.str(new cljs.core.Keyword(null,"x","x",1013904362).cljs$core$IFn$_invoke$arity$1(pworld.core.rp2_a)),cljs.core.str(","),cljs.core.str(new cljs.core.Keyword(null,"y","y",1013904363).cljs$core$IFn$_invoke$arity$1(pworld.core.rp2_a)),cljs.core.str(","),cljs.core.str(new cljs.core.Keyword(null,"z","z",1013904364).cljs$core$IFn$_invoke$arity$1(pworld.core.rp2_a)),cljs.core.str(")")].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",1013907597),new cljs.core.Keyword(null,"vector-a-label","vector-a-label",1992018800)], null));
pworld.core.geom_line_b = pworld.geom.line.call(null,pworld.core.rp2_b,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",1013907597),new cljs.core.Keyword(null,"line-b","line-b",4206197819)], null));
pworld.core.geom_line_b_label = pworld.geom.text.call(null,cljs.core.first.call(null,pworld.obj3.segment_endpoints.call(null,pworld.core.rp2_b)),[cljs.core.str(new cljs.core.Keyword(null,"x","x",1013904362).cljs$core$IFn$_invoke$arity$1(pworld.core.rp2_b)),cljs.core.str("x + "),cljs.core.str(new cljs.core.Keyword(null,"y","y",1013904363).cljs$core$IFn$_invoke$arity$1(pworld.core.rp2_b)),cljs.core.str("y + "),cljs.core.str(new cljs.core.Keyword(null,"z","z",1013904364).cljs$core$IFn$_invoke$arity$1(pworld.core.rp2_b)),cljs.core.str(" = 0")].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",1013907597),new cljs.core.Keyword(null,"line-b-label","line-b-label",3646788706)], null));
pworld.core.geom_plane_b = pworld.geom.plane.call(null,pworld.core.rp2_b,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",1013907597),new cljs.core.Keyword(null,"plane-b","plane-b",520006819),new cljs.core.Keyword(null,"transparent","transparent",3582677188),true,new cljs.core.Keyword(null,"color","color",1108746965),16777215], null));
pworld.core.geom_vector_b = pworld.geom.vector.call(null,pworld.core.rp2_b,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",1013907597),new cljs.core.Keyword(null,"vector-b","vector-b",2895484362)], null));
pworld.core.geom_vector_b_label = pworld.geom.text.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",1013904362).cljs$core$IFn$_invoke$arity$1(pworld.core.rp2_b),new cljs.core.Keyword(null,"y","y",1013904363).cljs$core$IFn$_invoke$arity$1(pworld.core.rp2_b),new cljs.core.Keyword(null,"z","z",1013904364).cljs$core$IFn$_invoke$arity$1(pworld.core.rp2_b)], null),[cljs.core.str("("),cljs.core.str(new cljs.core.Keyword(null,"x","x",1013904362).cljs$core$IFn$_invoke$arity$1(pworld.core.rp2_b)),cljs.core.str(","),cljs.core.str(new cljs.core.Keyword(null,"y","y",1013904363).cljs$core$IFn$_invoke$arity$1(pworld.core.rp2_b)),cljs.core.str(","),cljs.core.str(new cljs.core.Keyword(null,"z","z",1013904364).cljs$core$IFn$_invoke$arity$1(pworld.core.rp2_b)),cljs.core.str(")")].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",1013907597),new cljs.core.Keyword(null,"vector-b-label","vector-b-label",2879522481)], null));
pworld.core.geom_point_ab = pworld.geom.point.call(null,pworld.core.rp2_ab,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",1013907597),new cljs.core.Keyword(null,"point-ab","point-ab",1479977200)], null));
pworld.core.geom_point_ab_label = (function (){var p = pworld.rp2.normalize.call(null,pworld.core.rp2_ab);return pworld.geom.text.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",1013904362).cljs$core$IFn$_invoke$arity$1(p),(new cljs.core.Keyword(null,"y","y",1013904363).cljs$core$IFn$_invoke$arity$1(p) + 0.2),new cljs.core.Keyword(null,"z","z",1013904364).cljs$core$IFn$_invoke$arity$1(p)], null),"?",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",1013907597),new cljs.core.Keyword(null,"point-ab-label","point-ab-label",1259709783)], null));
})();
pworld.core.geom_3d_x_axis = pworld.geom.segment3.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,0,0], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [2,0,0], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"color","color",1108746965),16711680,new cljs.core.Keyword(null,"linewidth","linewidth",3534637508),2,new cljs.core.Keyword(null,"id","id",1013907597),new cljs.core.Keyword(null,"3d-x-axis","3d-x-axis",1978439172)], null));
pworld.core.geom_3d_y_axis = pworld.geom.segment3.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,0,0], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,2,0], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"color","color",1108746965),65280,new cljs.core.Keyword(null,"linewidth","linewidth",3534637508),2,new cljs.core.Keyword(null,"id","id",1013907597),new cljs.core.Keyword(null,"3d-y-axis","3d-y-axis",2007068323)], null));
pworld.core.geom_3d_z_axis = pworld.geom.segment3.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,0,0], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [0,0,2], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"color","color",1108746965),255,new cljs.core.Keyword(null,"linewidth","linewidth",3534637508),2,new cljs.core.Keyword(null,"id","id",1013907597),new cljs.core.Keyword(null,"3d-z-axis","3d-z-axis",2035697474)], null));
pworld.core.geom_z1_disc = pworld.geom.zdisc.call(null,pworld.core.disc_radius,1,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"color","color",1108746965),16777215,new cljs.core.Keyword(null,"transparent","transparent",3582677188),true,new cljs.core.Keyword(null,"id","id",1013907597),new cljs.core.Keyword(null,"z1-disc","z1-disc",3362641437)], null));
cljs.core._add_method.call(null,pworld.core.step,1,(function (){pworld.core.insert_geom.call(null,pworld.core.geom_line_a);
return pworld.core.insert_geom.call(null,pworld.core.geom_line_a_label);
}));
cljs.core._add_method.call(null,pworld.core.step,2,(function (){pworld.core.insert_geom.call(null,pworld.core.geom_line_b);
return pworld.core.insert_geom.call(null,pworld.core.geom_line_b_label);
}));
cljs.core._add_method.call(null,pworld.core.step,3,(function (){pworld.core.insert_geom.call(null,pworld.core.geom_point_ab);
return pworld.core.insert_geom.call(null,pworld.core.geom_point_ab_label);
}));
cljs.core._add_method.call(null,pworld.core.step,4,(function (){pworld.core.insert_geom.call(null,pworld.core.geom_3d_x_axis);
pworld.core.insert_geom.call(null,pworld.core.geom_3d_y_axis);
return pworld.core.insert_geom.call(null,pworld.core.geom_3d_z_axis);
}));
cljs.core._add_method.call(null,pworld.core.step,5,(function (){return pworld.core.insert_geom.call(null,pworld.core.geom_z1_disc);
}));
cljs.core._add_method.call(null,pworld.core.step,6,(function (){pworld.core.remove_geom.call(null,pworld.core.geom_point_ab);
pworld.core.remove_geom.call(null,pworld.core.geom_point_ab_label);
pworld.core.remove_geom.call(null,pworld.core.geom_line_b);
return pworld.core.remove_geom.call(null,pworld.core.geom_line_b_label);
}));
cljs.core._add_method.call(null,pworld.core.step,7,(function (){return pworld.core.insert_geom.call(null,pworld.core.geom_plane_a);
}));
cljs.core._add_method.call(null,pworld.core.step,8,(function (){pworld.core.insert_geom.call(null,pworld.core.geom_vector_a);
return pworld.core.insert_geom.call(null,pworld.core.geom_vector_a_label);
}));
cljs.core._add_method.call(null,pworld.core.step,9,(function (){pworld.core.remove_geom.call(null,pworld.core.geom_line_a_label);
pworld.core.insert_geom.call(null,pworld.core.geom_line_b);
return pworld.core.insert_geom.call(null,pworld.core.geom_line_b_label);
}));
cljs.core._add_method.call(null,pworld.core.step,10,(function (){return pworld.core.insert_geom.call(null,pworld.core.geom_plane_b);
}));
cljs.core._add_method.call(null,pworld.core.step,11,(function (){pworld.core.insert_geom.call(null,pworld.core.geom_vector_b);
return pworld.core.insert_geom.call(null,pworld.core.geom_vector_b_label);
}));
cljs.core._add_method.call(null,pworld.core.step,new cljs.core.Keyword(null,"default","default",2558708147),(function (){return null;
}));
pworld.core.stepforward = (function stepforward(n){return pworld.core.step.call(null,n);
});

//# sourceMappingURL=core.js.map