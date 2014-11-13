var EventTracker = function(domElement, handler) {

    var mouseIsDown = false;
    var lastP;
    
    if (typeof(handler) === "undefined") {
        handler = {};
    }
    
    var relCoords = function(event) {
        return { x : event.pageX - domElement.offsetLeft,
                 y : event.pageY - domElement.offsetTop };
    };
    
    var mouseDown = function(event) {
        mouseIsDown = true;
        lastP = relCoords(event);
        if (handler.mouseDown) {
            handler.mouseDown(lastP);
        }
        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseup', mouseUp);
    };
    
    var mouseMove = function(event) {
        var p = relCoords(event);
        if (mouseIsDown) {
            if (handler.mouseDrag) {
                handler.mouseDrag(p, { x : p.x - lastP.x, y : p.y - lastP.y });
            }
            lastP = p;
        }
    };
    var mouseUp = function(event) {
        mouseIsDown = false;
        lastP = relCoords(event);
        if (handler.mouseUp) {
            handler.mouseUp(lastP);
        }
        window.removeEventListener('mousemove', mouseMove);
        window.removeEventListener('mouseup', mouseUp);
    };
    var mouseWheel = function(event) {
        if (handler.mouseWheel) {
		    event.preventDefault();
		    event.stopPropagation();
		    var delta = 0;
		    if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9
			    delta = event.wheelDelta / 40;
		    } else if ( event.detail ) { // Firefox
			    delta = - event.detail / 3;
		    }
            handler.mouseWheel(delta);
        }
    };
    domElement.addEventListener('mousedown', mouseDown);
	domElement.addEventListener( 'mousewheel', mouseWheel, false );

    /*
     * Geomview-style transformation computation:
     * 
     * Takes 3 THREE.js objects: moving, center, and frame, and a 4x4 matrix L.
     * L is the matrix of a spatial transformation, expressed in the coordinate
     * system of the `frame` object translated so as to move its origin to the
     * origin of the `center` system.
     * 
     * Returns the 4x4 matrix representing the same transformation L, but expressed
     * in the coordinate system of the `moving` object.
     */
    var Q     = new THREE.Matrix4();
    var QInv  = new THREE.Matrix4();
    var V     = new THREE.Matrix4();    
    var TfInv = new THREE.Matrix4();    
    var computeTransform = function(moving, center, frame, L) {

        var Tm = moving.matrix;
        var Tf = frame.matrix;
        var Tc = center.matrix;
        TfInv.getInverse(Tf);
        
        var ce = Tc.elements;
        var fe = Tf.elements;
        
        Q.set(1, 0, 0, fe[12] - ce[12],
              0, 1, 0, fe[13] - ce[13],
              0, 0, 1, fe[14] - ce[14],
              0, 0, 0, 1);
        
        Q.multiply(TfInv);
        Q.multiply(Tm);
        
        QInv.getInverse(Q);
        
        V.copy(QInv);
        V.multiply(L);
        V.multiply(Q);
        
        return V;
    };

    return {
        computeTransform: computeTransform
    };

};

