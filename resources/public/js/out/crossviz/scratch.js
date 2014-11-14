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
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"position","position",1761709211),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [p.x,p.y,p.z], null),new cljs.core.Keyword(null,"quaternion","quaternion",3684236944),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [q.x,q.y,q.z,q.w], null),new cljs.core.Keyword(null,"scale","scale",1123155132),s], null);
});

//# sourceMappingURL=scratch.js.map