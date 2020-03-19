var scene, renderer, camera;
var controls;

init();
animate();

window.addEventListener('resize', () => {
renderer.setSize(window.innerWidth,window.innerHeight);
camera.aspect = window.innerWidth / window.innerHeight;

camera.updateProjectionMatrix();
})


function init()
{
    renderer = new THREE.WebGLRenderer( {antialias:true,alpha: true } );
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize (width, height);
    //renderer.setClearColor("#e5e5e5");
    document.body.appendChild (renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera (75, width/height, 1, 1000);
    camera.position.y = 150;
    camera.position.z = 350;
    camera.lookAt (new THREE.Vector3(0,0,0));

    controls = new THREE.OrbitControls (camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enableZoom = true;
    controls.autoRotate = true;

    var keyLight = new THREE.DirectionalLight(0x404040, 0.1);
    keyLight.position.set(-100, 0, 100);
    scene.add(keyLight);

    var alight = new THREE.AmbientLight( 0x404040,5 );
    scene.add( alight );



var texture, material, plane;
texture = THREE.ImageUtils.loadTexture( "/static/others/textrep.jpg" );

// assuming you want the texture to repeat in both directions:
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

// how many times to repeat in each direction; the default is (1,1),
texture.repeat.set( 175, 175 );

material = new THREE.MeshLambertMaterial({ map : texture });
plane = new THREE.Mesh(new THREE.PlaneGeometry(5000, 5000), material);
plane.material.side = THREE.DoubleSide;
// Math.PI = 180 degrees, Math.PI / 2 = 90 degrees, etc.
plane.rotateX(-(3.1416/2));
scene.add(plane);

// Create a material
var textureLoader = new THREE.TextureLoader();
var map = textureLoader.load("/static/others/grid.png");
var material = new THREE.MeshPhongMaterial({map: map});
  //instantiate a loader
    var loader = new THREE.OBJLoader();

    loader.load(
	'/static/3dmodels/stdobj3.obj',
	function ( object ) {

    object.traverse( function ( child ) {

	if ( child.isMesh ) {

		var wireframeGeomtry = new THREE.WireframeGeometry( child.geometry );
		var wireframeMaterial = new THREE.LineBasicMaterial( { color: 0x484848 } );
		var wireframe = new THREE.LineSegments( wireframeGeomtry, wireframeMaterial );
		child.add(wireframe);

	}

} );
    object.traverse( function ( node ) {

    if ( node.isMesh ) node.material = material;
    });

	scene.add( object );
	object.rotateX(-(3.1416/2));
	},
	// called when loading is in progresses
	function ( xhr ) {
	console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
	console.log( 'An error happened' );
	}
);


//test area
  particle = new THREE.Object3D();

  scene.add(particle);

  var geometry = new THREE.SphereGeometry(0.25, 0);

  var materialpar = new THREE.MeshPhongMaterial({
    color: 0x424242,
    //shading: THREE.FlatShading
  });

  for (var i = 0; i < 500; i++) {
    var mesh = new THREE.Mesh(geometry, materialpar);
    mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    mesh.position.multiplyScalar(150 + (Math.random() * 450));
    //mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    particle.add(mesh);
  }

  var mat = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  });

  var mat2 = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: true,
    side: THREE.DoubleSide
  });
//end
};

function animate()
{
    controls.update();
    requestAnimationFrame ( animate );
    renderer.render (scene, camera);
};