// Compiled by ClojureScript 0.0-2202
goog.provide('crossviz.scratch');
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
goog.require('crossviz.core');
goog.require('crossviz.core');
goog.require('crossviz.three');
goog.require('crossviz.rp2');
goog.require('crossviz.math');
goog.require('crossviz.geom');
crossviz.scratch.countdown_action = (function countdown_action(n,dn){if((n < 0))
{return null;
} else
{return (function (){cljs.core.println.call(null,n);
return countdown_action.call(null,(n - dn),dn);
});
}
});
cljs.core.deref.call(null,crossviz.core.trackballing);
cljs.core.reset_BANG_.call(null,crossviz.core.trackballing,true);
console.log(crossviz.core.camera.quaternion);
console.log(crossviz.core.camera.position);
crossviz.scratch.finterp = (function finterp(x0,x1,t){return (x0 + (t * (x1 - x0)));
});
crossviz.scratch.v3interp = (function v3interp(v0,v1,t){return (new THREE.Vector3(crossviz.scratch.finterp.call(null,v0.x,v1.x,t),crossviz.scratch.finterp.call(null,v0.y,v1.y,t),crossviz.scratch.finterp.call(null,v0.z,v1.z,t)));
});
crossviz.scratch.camanim_action = (function() {
var camanim_action = null;
var camanim_action__5 = (function (q0,p0,q1,p1,n){return camanim_action.call(null,q0,p0,q1,p1,n,0);
});
var camanim_action__6 = (function (q0,p0,q1,p1,n,t){if((t >= 1))
{crossviz.core.camera.position = p1;
crossviz.core.camera.quaternion = q1;
return (function (){return null;
});
} else
{return (function (){cljs.core.reset_BANG_.call(null,crossviz.core.trackballing,false);
crossviz.core.camera.position = crossviz.scratch.v3interp.call(null,p0,p1,t);
crossviz.core.camera.quaternion = q0.slerp(q1,t);
return camanim_action.call(null,q0,p0,q1,p1,n,(t + (1.0 / n)));
});
}
});
camanim_action = function(q0,p0,q1,p1,n,t){
switch(arguments.length){
case 5:
return camanim_action__5.call(this,q0,p0,q1,p1,n);
case 6:
return camanim_action__6.call(this,q0,p0,q1,p1,n,t);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
camanim_action.cljs$core$IFn$_invoke$arity$5 = camanim_action__5;
camanim_action.cljs$core$IFn$_invoke$arity$6 = camanim_action__6;
return camanim_action;
})()
;
crossviz.scratch.anim_reset_cam_action = (function anim_reset_cam_action(){var p0 = crossviz.core.camera.position.clone();var q0 = crossviz.core.camera.quaternion.clone();var p1 = (new THREE.Vector3(0,0,6));var q1 = (new THREE.Quaternion(0,0,0,1));return crossviz.scratch.camanim_action.call(null,q0,p0,q1,p1,40);
});
crossviz.core.add_actions.call(null,crossviz.scratch.anim_reset_cam_action.call(null));
crossviz.scratch.resetcam = (function resetcam(){crossviz.core.camera.quaternion = (new THREE.Quaternion(0,0,0,1));
return crossviz.core.camera.position = (new THREE.Vector3(0,0,6));
});
crossviz.scratch.v3vec = (function v3vec(v3){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [v3.x,v3.y,v3.z], null);
});
crossviz.scratch.cammap = (function cammap(cam){return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"up","up",1013907981),crossviz.scratch.v3vec.call(null,cam.up),new cljs.core.Keyword(null,"position","position",1761709211),crossviz.scratch.v3vec.call(null,cam.position)], null);
});
crossviz.scratch.lvec = (function() {
var lvec = null;
var lvec__4 = (function (x,y,z,t){return lvec.call(null,x,y,z,t,null);
});
var lvec__5 = (function (x,y,z,t,props){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [crossviz.geom.vector.call(null,crossviz.rp2.rp2.call(null,x,y,z),props),crossviz.geom.text.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y,z], null),t,props)], null);
});
lvec = function(x,y,z,t,props){
switch(arguments.length){
case 4:
return lvec__4.call(this,x,y,z,t);
case 5:
return lvec__5.call(this,x,y,z,t,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
lvec.cljs$core$IFn$_invoke$arity$4 = lvec__4;
lvec.cljs$core$IFn$_invoke$arity$5 = lvec__5;
return lvec;
})()
;
crossviz.scratch.a1 = crossviz.scratch.lvec.call(null,1,1,1,"a1",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1108746965),16776960], null));
crossviz.core.insert_geom.call(null,crossviz.scratch.a1);
crossviz.core.remove_geom.call(null,crossviz.scratch.a1);
crossviz.scratch.decons = (function decons(m){var q = (new THREE.Quaternion());var p = (new THREE.Vector3());var s = 0.0;m.decompose(p,q,s);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"position","position",1761709211),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [p.x,p.y,p.z], null),new cljs.core.Keyword(null,"quaterion","quaterion",4286628022),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [q.x,q.y,q.z,q.w], null),new cljs.core.Keyword(null,"scale","scale",1123155132),s], null);
});

//# sourceMappingURL=scratch.js.map