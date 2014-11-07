var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

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
world.add(cube);
world.add(axes);

scene.add( world );

camera.position.z = 5;

function render() {
    requestAnimationFrame( render );
//cube.rotation.x += 0.01;
//cube.rotation.y += 0.01;
    renderer.render( scene, camera );
}
render();
