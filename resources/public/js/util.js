
// http://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible

function doConstruct(constructor, args) {
    function F() {
        return constructor.apply(this, args);
    }
    F.prototype = constructor.prototype;
    return new F();
}
