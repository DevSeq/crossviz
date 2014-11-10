$(document).ready(function() {

    $canvas = $('#thecanvas');

    width = $canvas.width();
    height = $canvas.height();

    var scene = new THREE.Scene();
    //var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

    canvas = $canvas[0];

    //var renderer = new THREE.WebGLRenderer(canvas);
    var renderer = new THREE.WebGLRenderer({
        canvas: canvas
    });
    renderer.setSize( width, height );
    //renderer.setSize( window.innerWidth, window.innerHeight );
    //document.body.appendChild( renderer.domElement );

    console.log(canvas);
    console.log(canvas.width);
    console.log(canvas.height);

    var cubeSize = 0.5;

    var boxGeometry = new THREE.BoxGeometry( cubeSize, cubeSize, cubeSize );
    var faces = new THREE.Mesh( boxGeometry,
                                new THREE.MeshBasicMaterial( { color: 0x999999 } )
                              );
    var edges = new THREE.Mesh( boxGeometry,
                                new THREE.MeshBasicMaterial( { color: 0x000000,
                                                               wireframe: true,
                                                               wireframeLinewidth: 2 } ));

    function segment(x0, y0, z0, x1, y1, z1, color) {
        var segGeometry = new THREE.Geometry();
        segGeometry.vertices.push(new THREE.Vector3(x0, y0, z0));
        segGeometry.vertices.push(new THREE.Vector3(x1, y1, z1));
        return new THREE.Line(segGeometry,
                              new THREE.LineBasicMaterial( { color: color, linewidth: 3 } ));
    }

    var cube = new THREE.Object3D();
    cube.add(faces);
    cube.add(edges);

    var xaxis = segment(0, 0, 0, 3, 0, 0, 0xff0000);
    var yaxis = segment(0, 0, 0, 0, 3, 0, 0x00ff00);
    var zaxis = segment(0, 0, 0, 0, 0, 3, 0x0000ff);

    var axes = new THREE.Object3D();
    axes.add(xaxis);
    axes.add(yaxis);
    axes.add(zaxis);

    var world = new THREE.Object3D();
    world.matrixAutoUpdate = false;
    world.add(cube);
    world.add(axes);

    scene.add( world );

    camera.position.z = 5;


    /*
	 this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

	 this.domElement.addEventListener( 'mousedown', mousedown, false );

	 this.domElement.addEventListener( 'mousewheel', mousewheel, false );
	 this.domElement.addEventListener( 'DOMMouseScroll', mousewheel, false ); // firefox

	 this.domElement.addEventListener( 'touchstart', touchstart, false );
	 this.domElement.addEventListener( 'touchend', touchend, false );
	 this.domElement.addEventListener( 'touchmove', touchmove, false );

	 window.addEventListener( 'keydown', keydown, false );
	 window.addEventListener( 'keyup', keyup, false );
     */

    function EventTracker(domElement, handler) {

        var mouseIsDown = false;
        var lastP;

        if (typeof(handler) === "undefined") {
            handler = {};
        }

        function relCoords(event) {
            return { x : event.pageX - domElement.offsetLeft,
                     y : event.pageY - domElement.offsetTop };
        }

        function mouseDown(event) {
            mouseIsDown = true;
            lastP = relCoords(event);
            if (handler.mouseDown) {
                handler.mouseDown(lastP);
            }
            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('mouseup', mouseUp);
        }

        function mouseMove(event) {
            var p = relCoords(event);
            if (mouseIsDown) {
                if (handler.mouseDrag) {
                    handler.mouseDrag(p, { x : p.x - lastP.x, y : p.y - lastP.y });
                }
                lastP = p;
            }
        }
        function mouseUp(event) {
            mouseIsDown = false;
            lastP = relCoords(event);
            if (handler.mouseUp) {
                handler.mouseUp(lastP);
            }
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
        }

        domElement.addEventListener('mousedown', mouseDown);
    }


    function computeTransform(moving, center, frame, V) {
        var Tm = moving.matrix;
        var TmInv = (new THREE.Matrix4()).getInverse(Tm);
        var Tf = frame.matrix;
        var TfInv = (new THREE.Matrix4()).getInverse(Tf);
        var Tc = center.matrix;
        var Pf = new THREE.Matrix4();
        Pf.set(1.0,             0.0,             0.0,             0.0,
               0.0,             1.0,             0.0,             0.0,
               0.0,             0.0,             1.0,             0.0,
               Tc.elements[12], Tc.elements[13], Tc.elements[14], Tc.elements[15]);
        var PfInv = (new THREE.Matrix4()).getInverse(Pf);

/*
        var M = Tm.clone();
        M.multiply(TfInv);
        M.multiply(PfInv);
        M.multiply(V);
        M.multiply(Pf);
        M.multiply(Tf);
        M.multiply(TmInv);
*/
        var M = TmInv.clone();
        M.multiply(Tf);
        M.multiply(Pf);
        M.multiply(V);
        M.multiply(PfInv);
        M.multiply(TfInv);
        M.multiply(Tm);
        return M;
    }



    EventTracker(canvas, {
        mouseDown: function(p) {
            //console.log('down: [' + p.x + ',' + p.y + ']');
        },
        mouseDrag: function(p, dp) {
            //console.log('drag: [' + p.x + ',' + p.y + '] / d[' + dp.x + ',' + dp.y + ']');
            var v = new THREE.Vector3(-dp.y, dp.x, 0).normalize();
            var d = 10000 * Math.sqrt(dp.x*dp.x + dp.y*dp.y);
            var angle = canvas.width * Math.PI / d;
            var R = new THREE.Matrix4().makeRotationAxis(v, angle);
            var M = computeTransform(world,world,camera, R);
            world.matrix.multiply(M);
            world.matrixWorldNeedsUpdate = true;
            rerender();
        },
        mouseUp: function(p) {
            //console.log('up: [' + p.x + ',' + p.y + ']');
        }
    });



    function logMatrix(m) {
        console.log(sprintf("[ %10.4f  %10.4f  %10.4f  %10.4f\n" +
                            "  %10.4f  %10.4f  %10.4f  %10.4f\n" +
                            "  %10.4f  %10.4f  %10.4f  %10.4f\n" +
                            "  %10.4f  %10.4f  %10.4f  %10.4f ]\n",
                            m.elements[0],m.elements[1],m.elements[2],m.elements[3],
                            m.elements[4],m.elements[5],m.elements[6],m.elements[7],
                            m.elements[8],m.elements[9],m.elements[10],m.elements[11],
                            m.elements[12],m.elements[13],m.elements[14],m.elements[15]));
    }


    function render() {
//      requestAnimationFrame( render );
//        world.matrix.multiply(R);
//        logMatrix(world.matrix);
//console.log(world.matrix.elements[0]);
//        console.log(world.matrixAutoUpdate);
        renderer.render( scene, camera );
    }

    function rerender() {
        requestAnimationFrame( render );
    }
    rerender();
    //render();

});
