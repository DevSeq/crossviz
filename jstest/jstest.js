$(document).ready(function() {

    function showMatrix(name, m) {
        console.log(name + ' =');
        logMatrix(m);
    }

   logMatrix = function(m) {
        console.log(sprintf("[ %10.4f  %10.4f  %10.4f  %10.4f\n" +
                            "  %10.4f  %10.4f  %10.4f  %10.4f\n" +
                            "  %10.4f  %10.4f  %10.4f  %10.4f\n" +
                            "  %10.4f  %10.4f  %10.4f  %10.4f ]\n",
                            m.elements[0],m.elements[4],m.elements[ 8],m.elements[12],
                            m.elements[1],m.elements[5],m.elements[ 9],m.elements[13],
                            m.elements[2],m.elements[6],m.elements[10],m.elements[14],
                            m.elements[3],m.elements[7],m.elements[11],m.elements[15]));
    };

    function showVector3(name, v) {
        console.log(sprintf("%s = [ %10.4f, %10.4f, %10.4f ]",
                            name, v.x, v.y, v.z));
    }
    function showVector4(name, v) {
        console.log(sprintf("%s = [ %10.4f, %10.4f, %10.4f, %10.4f ]",
                            name, v.x, v.y, v.z, v.w));
    }

    $canvas = $('#thecanvas');

    width = $canvas.width();
    height = $canvas.height();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
//w = 10;
//h = 10;
//near = -10;
//far = 10;
//    camera = new THREE.OrthographicCamera( w / - 2, w / 2,
//                                           h / 2, h / - 2,
//                                           near, far );

    canvas = $canvas[0];

    renderer = new THREE.WebGLRenderer({
        canvas: canvas
    });
    renderer.setSize( width, height );

    cubeSize = 0.5;

    boxGeometry = new THREE.BoxGeometry( cubeSize, cubeSize, cubeSize );
    faces = new THREE.Mesh( boxGeometry,
                                new THREE.MeshBasicMaterial( { color: 0x999999 } )
                              );
    edges = new THREE.Mesh( boxGeometry,
                                new THREE.MeshBasicMaterial( { color: 0x000000,
                                                               wireframe: true,
                                                               wireframeLinewidth: 2 } ));

   segment = function(x0, y0, z0, x1, y1, z1, color) {
        segGeometry = new THREE.Geometry();
        segGeometry.vertices.push(new THREE.Vector3(x0, y0, z0));
        segGeometry.vertices.push(new THREE.Vector3(x1, y1, z1));
        return new THREE.Line(segGeometry,
                              new THREE.LineBasicMaterial( { color: color, linewidth: 3 } ));
    };

    cube = new THREE.Object3D();
    cube.add(faces);
    cube.add(edges);

    xaxis = segment(0, 0, 0, 3, 0, 0, 0xff0000);
    yaxis = segment(0, 0, 0, 0, 3, 0, 0x00ff00);
    zaxis = segment(0, 0, 0, 0, 0, 3, 0x0000ff);

    axes = new THREE.Object3D();
    axes.add(xaxis);
    axes.add(yaxis);
    axes.add(zaxis);

    world = new THREE.Object3D();
    world.matrixAutoUpdate = false;
    world.add(cube);
    world.add(axes);

    scene.add( world );

    var eventTracker = EventTracker(canvas, {
        mouseDown: function(p) {
        },
        mouseDrag: function(p, dp) {
            // Note: the axis of rotation for a mouse displacement of (dp.x,dp.y) would
            // normally be (-dp.y, dp.x, 0), but since the y direction of screen coords
            // is reversed (increasing towards the bottom of the screen), we need to negate
            // the y coord here; therefore we use (dp.y, dp.x, 0):
            var v = new THREE.Vector3(dp.y, dp.x, 0).normalize();
            var d = Math.sqrt(dp.x*dp.x + dp.y*dp.y);
            var angle = (d / canvas.width) * Math.PI;
            var R = new THREE.Matrix4().makeRotationAxis(v, angle);
            var M = eventTracker.computeTransform(world,world,camera, R);
            world.matrix.multiply(M);
            world.matrixWorldNeedsUpdate = true;
            rerender();
        },
        mouseUp: function(p) {
        },
        mouseWheel: function(delta) {
            var s = Math.exp(delta/20.0);
            var R = new THREE.Matrix4().makeScale(s,s,s);
            var M = eventTracker.computeTransform(world,world,camera, R);
            world.matrix.multiply(M);
            world.matrixWorldNeedsUpdate = true;
            rerender();
        }
    });


   render = function() {
        renderer.render( scene, camera );
    };

    makeRenderFunc = function(func) {
        return function() {
            renderer.render( scene, camera );
            if (typeof(func) === "function") {
                func();
            }
        };
    };

    rerender = function(func) {
        requestAnimationFrame( makeRenderFunc(func) );
    };

    camera.matrixAutoUpdate = false;
    camera.matrix.setPosition(new THREE.Vector3(0,0,5));
    camera.matrixWorldNeedsUpdate = true;

    function showScreenCoords(msg, x,y,z) {
        var S = (world.matrixWorld.clone()
                 .multiply((new THREE.Matrix4()).getInverse(camera.matrixWorld))
                 .multiply(camera.projectionMatrix));
        var v = (new THREE.Vector3(x,y,z)).applyMatrix4(S);
        console.log(sprintf("%s [%10.4f, %10.4f, %10.4f] => [%10.4f, %10.4f, %10.4f]",
                            msg, x, y, z, v.x, v.y, v.z));
    }


    rerender(function() {


    });

});
