// Compiled by ClojureScript 0.0-2202
goog.provide('crossviz.geom');
goog.require('cljs.core');
goog.require('crossviz.rp2');
goog.require('crossviz.rp2');
goog.require('crossviz.obj3');
goog.require('crossviz.obj3');
crossviz.geom.current_id = cljs.core.atom.call(null,1000);
crossviz.geom.next_id = (function next_id(){cljs.core.swap_BANG_.call(null,crossviz.geom.current_id,(function (id){return (id + 1);
}));
return cljs.core.deref.call(null,crossviz.geom.current_id);
});
crossviz.geom.segment3 = (function() {
var segment3 = null;
var segment3__2 = (function (a,b){return segment3.call(null,a,b,null);
});
var segment3__3 = (function (a,b,props){return cljs.core.assoc.call(null,props,new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"segment3","segment3",2069773010),new cljs.core.Keyword(null,"a","a",1013904339),a,new cljs.core.Keyword(null,"b","b",1013904340),b,new cljs.core.Keyword(null,"id","id",1013907597),crossviz.geom.next_id.call(null));
});
segment3 = function(a,b,props){
switch(arguments.length){
case 2:
return segment3__2.call(this,a,b);
case 3:
return segment3__3.call(this,a,b,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
segment3.cljs$core$IFn$_invoke$arity$2 = segment3__2;
segment3.cljs$core$IFn$_invoke$arity$3 = segment3__3;
return segment3;
})()
;
crossviz.geom.text = (function() {
var text = null;
var text__2 = (function (a,string){return text.call(null,a,string,null);
});
var text__3 = (function (a,string,props){return cljs.core.assoc.call(null,props,new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"text","text",1017460895),new cljs.core.Keyword(null,"a","a",1013904339),a,new cljs.core.Keyword(null,"string","string",4416885635),string,new cljs.core.Keyword(null,"id","id",1013907597),crossviz.geom.next_id.call(null));
});
text = function(a,string,props){
switch(arguments.length){
case 2:
return text__2.call(this,a,string);
case 3:
return text__3.call(this,a,string,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
text.cljs$core$IFn$_invoke$arity$2 = text__2;
text.cljs$core$IFn$_invoke$arity$3 = text__3;
return text;
})()
;
crossviz.geom.zdisc = (function() {
var zdisc = null;
var zdisc__2 = (function (r,z){return zdisc.call(null,r,z,null);
});
var zdisc__3 = (function (r,z,props){return cljs.core.assoc.call(null,props,new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"zdisc","zdisc",1129657473),new cljs.core.Keyword(null,"r","r",1013904356),r,new cljs.core.Keyword(null,"z","z",1013904364),z,new cljs.core.Keyword(null,"id","id",1013907597),crossviz.geom.next_id.call(null));
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
crossviz.geom.line = (function() {
var line = null;
var line__1 = (function (p){return line.call(null,p,null);
});
var line__2 = (function (p,props){return cljs.core.assoc.call(null,props,new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"p","p",1013904354),p,new cljs.core.Keyword(null,"id","id",1013907597),crossviz.geom.next_id.call(null));
});
line = function(p,props){
switch(arguments.length){
case 1:
return line__1.call(this,p);
case 2:
return line__2.call(this,p,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
line.cljs$core$IFn$_invoke$arity$1 = line__1;
line.cljs$core$IFn$_invoke$arity$2 = line__2;
return line;
})()
;
crossviz.geom.point = (function() {
var point = null;
var point__1 = (function (p){return point.call(null,p,null);
});
var point__2 = (function (p,props){return cljs.core.assoc.call(null,props,new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"point","point",1120749826),new cljs.core.Keyword(null,"p","p",1013904354),p,new cljs.core.Keyword(null,"id","id",1013907597),crossviz.geom.next_id.call(null));
});
point = function(p,props){
switch(arguments.length){
case 1:
return point__1.call(this,p);
case 2:
return point__2.call(this,p,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
point.cljs$core$IFn$_invoke$arity$1 = point__1;
point.cljs$core$IFn$_invoke$arity$2 = point__2;
return point;
})()
;
crossviz.geom.plane = (function() {
var plane = null;
var plane__1 = (function (p){return plane.call(null,p,null);
});
var plane__2 = (function (p,props){return cljs.core.assoc.call(null,props,new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"plane","plane",1120652750),new cljs.core.Keyword(null,"p","p",1013904354),p,new cljs.core.Keyword(null,"id","id",1013907597),crossviz.geom.next_id.call(null));
});
plane = function(p,props){
switch(arguments.length){
case 1:
return plane__1.call(this,p);
case 2:
return plane__2.call(this,p,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
plane.cljs$core$IFn$_invoke$arity$1 = plane__1;
plane.cljs$core$IFn$_invoke$arity$2 = plane__2;
return plane;
})()
;
crossviz.geom.vector = (function() {
var vector = null;
var vector__1 = (function (p){return vector.call(null,p,null);
});
var vector__2 = (function (p,props){return cljs.core.assoc.call(null,props,new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"vector","vector",4488484021),new cljs.core.Keyword(null,"p","p",1013904354),p,new cljs.core.Keyword(null,"id","id",1013907597),crossviz.geom.next_id.call(null));
});
vector = function(p,props){
switch(arguments.length){
case 1:
return vector__1.call(this,p);
case 2:
return vector__2.call(this,p,props);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
vector.cljs$core$IFn$_invoke$arity$1 = vector__1;
vector.cljs$core$IFn$_invoke$arity$2 = vector__2;
return vector;
})()
;
crossviz.geom.to_obj3 = (function (){var method_table__4339__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__4340__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__4341__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__4342__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__4343__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",3129050535),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("to-obj3",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"default","default",2558708147),hierarchy__4343__auto__,method_table__4339__auto__,prefer_table__4340__auto__,method_cache__4341__auto__,cached_hierarchy__4342__auto__));
})();
cljs.core._add_method.call(null,crossviz.geom.to_obj3,new cljs.core.Keyword(null,"segment3","segment3",2069773010),(function (g){return crossviz.obj3.segment3.call(null,new cljs.core.Keyword(null,"a","a",1013904339).cljs$core$IFn$_invoke$arity$1(g),new cljs.core.Keyword(null,"b","b",1013904340).cljs$core$IFn$_invoke$arity$1(g),g);
}));
cljs.core._add_method.call(null,crossviz.geom.to_obj3,new cljs.core.Keyword(null,"text","text",1017460895),(function (g){return crossviz.obj3.text.call(null,new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(g),new cljs.core.Keyword(null,"a","a",1013904339).cljs$core$IFn$_invoke$arity$1(g),g);
}));
cljs.core._add_method.call(null,crossviz.geom.to_obj3,new cljs.core.Keyword(null,"zdisc","zdisc",1129657473),(function (g){return crossviz.obj3.zdisc.call(null,new cljs.core.Keyword(null,"r","r",1013904356).cljs$core$IFn$_invoke$arity$1(g),new cljs.core.Keyword(null,"z","z",1013904364).cljs$core$IFn$_invoke$arity$1(g),g);
}));
cljs.core._add_method.call(null,crossviz.geom.to_obj3,new cljs.core.Keyword(null,"line","line",1017226086),(function (g){return crossviz.obj3.segment.call(null,new cljs.core.Keyword(null,"p","p",1013904354).cljs$core$IFn$_invoke$arity$1(g),g);
}));
cljs.core._add_method.call(null,crossviz.geom.to_obj3,new cljs.core.Keyword(null,"point","point",1120749826),(function (g){var ng = crossviz.rp2.normalize.call(null,new cljs.core.Keyword(null,"p","p",1013904354).cljs$core$IFn$_invoke$arity$1(g));return crossviz.obj3.ball.call(null,0.05,new cljs.core.Keyword(null,"x","x",1013904362).cljs$core$IFn$_invoke$arity$1(ng),new cljs.core.Keyword(null,"y","y",1013904363).cljs$core$IFn$_invoke$arity$1(ng),new cljs.core.Keyword(null,"z","z",1013904364).cljs$core$IFn$_invoke$arity$1(ng),g);
}));
cljs.core._add_method.call(null,crossviz.geom.to_obj3,new cljs.core.Keyword(null,"plane","plane",1120652750),(function (g){return crossviz.obj3.plane.call(null,new cljs.core.Keyword(null,"p","p",1013904354).cljs$core$IFn$_invoke$arity$1(g),g);
}));
cljs.core._add_method.call(null,crossviz.geom.to_obj3,new cljs.core.Keyword(null,"vector","vector",4488484021),(function (g){return crossviz.obj3.vector.call(null,new cljs.core.Keyword(null,"p","p",1013904354).cljs$core$IFn$_invoke$arity$1(g),g);
}));

//# sourceMappingURL=geom.js.map