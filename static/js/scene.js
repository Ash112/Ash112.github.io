var scene, renderer, camera;
var controls;


init();
// runs each frame
animate();


//resizes canvas on window resize
window.addEventListener('resize', () => {
renderer.setSize(window.innerWidth,window.innerHeight);
camera.aspect = window.innerWidth / window.innerHeight;

camera.updateProjectionMatrix();
})

function init()
{
    // defines a new webgl renderer
    renderer = new THREE.WebGLRenderer( {antialias:true,alpha: true } );
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize (width, height);
    document.body.appendChild (renderer.domElement);

    //create a new scene.
    scene = new THREE.Scene();

    //new camera looking at origin
    camera = new THREE.PerspectiveCamera (75, width/height, 1, 1000);
    camera.position.y = 160;
    camera.position.x = -350;
    camera.position.z = 150;
    camera.lookAt (new THREE.Vector3(0,0,0));

    // camera rotate controls / seperate JS file
    controls = new THREE.OrbitControls (camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.minDistance = 75;
    controls.maxDistance = 700;
    controls.autoRotateSpeed= 0.4;

    // lights
    var keyLight = new THREE.DirectionalLight(0x404040, 1);
    keyLight.position.set(-200, 400, 350);
    scene.add(keyLight);

    //var helper = new THREE.DirectionalLightHelper( keyLight, 10 );
    //scene.add( helper );

    var alight = new THREE.AmbientLight( 0x404040,4 );
    scene.add( alight );

    var spotLight = new THREE.SpotLight(0x404040,7);
    spotLight.position.set(0, 750, 350);
    scene.add(spotLight);

    //var spotLightHelper = new THREE.SpotLightHelper( spotLight );
    //scene.add( spotLightHelper );


// texture loader for floor plane
var texture, material, plane;
texture = THREE.ImageUtils.loadTexture( "/static/others/textrep.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 175, 175 );

// infinite* plane geometry loader
material = new THREE.MeshLambertMaterial({ map : texture });
plane = new THREE.Mesh(new THREE.PlaneGeometry(5000, 5000), material);
plane.material.side = THREE.DoubleSide;
// Math.PI = 180 degrees, Math.PI / 2 = 90 degrees, etc.
plane.rotateX(-(3.1416/2));
scene.add(plane);

// Create a material for model. Currently not being used!
var textureLoader = new THREE.TextureLoader();

// texture loader not assigned yet
var map = textureLoader.load("/static/others/whitecolor.jpg");

var ballTexture = textureLoader.load("/static/icons/circledot1.png");


//face material
var material = new THREE.MeshLambertMaterial( { color: 0xDEDEDE  } );

//wirframe material
var wireframeMaterial = new THREE.LineBasicMaterial( { color: 0xA5A5A5  } );

  //instantiate a loader to load OBJ Files.
    var loader = new THREE.OBJLoader();

    loader.load(
    //object to load
	'/static/3dmodels/stadiumfinal.obj',
	function ( object ) {

    object.traverse( function ( child ) {

    //iterating through ll submeshes and adding wireframe material
	if ( child.isMesh ) {

        //surface material
		child.material =material;

		//wireframe material
		var wireframeGeomtry = new THREE.WireframeGeometry( child.geometry );
		var wireframe = new THREE.LineSegments( wireframeGeomtry, wireframeMaterial );
		child.add(wireframe);

	}

} );

    //adds object to scene and rotates it upright

	scene.add( object );
	object.rotateX(-(3.1416/2));

	},
    //sprite for model loading animation


	// called when loading is in progress
	function ( xhr ) {

    //displays loading text on screen
	//var text2 = document.createElement('div');
   //text2.style.position = 'absolute';
    //text2.style.width = 100;
    //text2.style.height = 100;
    //text2.style.top = 100/2 + 'vh';
    //text2.style.left = 100/2 + 'vw';
    //document.body.appendChild(text2);



    var loadvalue =( xhr.loaded / xhr.total * 100 );
	console.log( loadvalue);


	},
	// called when loading has errors
	function ( error ) {
	console.log( 'An error happened' );
	}


);


//sprite for Info display on Hover for every sprite added, seperate
//IF statements to be added in hover function and raycast function.
//position height has to be same in both init and hover function.

window.addEventListener( "mousemove", onDocumentMouseMove, false );

// all sprites added to group
group = new THREE.Group();
			scene.add( group );

//dot texture
var dotexture = textureLoader.load("/static/icons/circledot1.png");


//info1 texture
var infotext1 = textureLoader.load("/static/icons/info1.png");
var infotext2 = textureLoader.load("/static/icons/info2.png");
var infotext3 = textureLoader.load("/static/icons/info3.png");
var infotext4 = textureLoader.load("/static/icons/info4.png");
var infotext5 = textureLoader.load("/static/icons/info5.png");
var infotext6 = textureLoader.load("/static/icons/info6.png");

//temp helper
//var axesHelper = new THREE.AxesHelper( 250 );
//scene.add( axesHelper );

//spriteset 1
// y value set at hover function
var spritedot1 = new THREE.Sprite( new THREE.SpriteMaterial(  {map: dotexture}  ) );
			spritedot1.position.set( -300, 160, -100 );
            spritedot1.scale.set( 5, 5, 5 );
			group.add( spritedot1 );

//spriteset 2
var spritedot2 = new THREE.Sprite( new THREE.SpriteMaterial(  {map: dotexture}  ) );
			spritedot2.position.set( 10, 150, 160 );
            spritedot2.scale.set( 5, 5, 5 );
			group.add( spritedot2 );

//spriteset 3
var spritedot3 = new THREE.Sprite( new THREE.SpriteMaterial(  {map: dotexture}  ) );
			spritedot3.position.set( 0, 250, 0 );
            spritedot3.scale.set( 5, 5, 5 );
			group.add( spritedot3 );

//spriteset 4
var spritedot4 = new THREE.Sprite( new THREE.SpriteMaterial(  {map: dotexture}  ) );
			spritedot4.position.set( 180, 190, -180 );
            spritedot4.scale.set( 5, 5, 5 );
			group.add( spritedot4 );

//spriteset 5
var spritedot5 = new THREE.Sprite( new THREE.SpriteMaterial(  {map: dotexture}  ) );
			spritedot5.position.set( 240, 90, 0 );
            spritedot5.scale.set( 5, 5, 5 );
			group.add( spritedot5 );

//spriteset 6
var spritedot6 = new THREE.Sprite( new THREE.SpriteMaterial(  {map: dotexture}  ) );
			spritedot6.position.set( 0, 50, -75 );
            spritedot6.scale.set( 5, 5, 5 );
			group.add( spritedot6 );

// hover animation variables
var clock = new THREE.Clock();
var time = 0;
var delta = 0;

// hover animation loop
hoverdot();


function hoverdot() {

  requestAnimationFrame(hoverdot);
  delta = clock.getDelta();
  time += delta;


if (spritedot1.material.map==dotexture){
  spritedot1.position.y = 150 + (Math.sin(time * 2.5)) * 3;
  spritedot1.scale.y = 4 + Math.abs(Math.sin(time * 1));
  spritedot1.scale.x = 4 + Math.abs(Math.sin(time * 1));

  }
if (spritedot2.material.map==dotexture){
  spritedot2.position.y = 150 + (Math.cos(time * 2.5)) * 3;
  spritedot2.scale.y = 4 + Math.abs(Math.sin(time * 1));
  spritedot2.scale.x = 4 + Math.abs(Math.sin(time * 1));
  }

if (spritedot3.material.map==dotexture){
  spritedot3.position.y = 160 + (Math.sin(time * 2.2)) * 3;
  spritedot3.scale.y = 4 + Math.abs(Math.sin(time * 1));
  spritedot3.scale.x = 4 + Math.abs(Math.sin(time * 1));
  }

if (spritedot4.material.map==dotexture){
  spritedot4.position.y = 150 + (Math.cos(time * 2)) * 4;
  spritedot4.scale.y = 4 + Math.abs(Math.sin(time * 1));
  spritedot4.scale.x = 4 + Math.abs(Math.sin(time * 1));
  }

if (spritedot5.material.map==dotexture){
  spritedot5.position.y = 100 + (Math.sin(time * 2)) * 3;
  spritedot5.scale.y = 4 + Math.abs(Math.sin(time * 1));
  spritedot5.scale.x = 4 + Math.abs(Math.sin(time * 1));
  }

if (spritedot6.material.map==dotexture){
  spritedot6.position.y = 35 + (Math.cos(time * 2.6)) * 4;
  spritedot6.scale.y = 4 + Math.abs(Math.sin(time * 1));
  spritedot6.scale.x = 4 + Math.abs(Math.sin(time * 1));
  }



  renderer.render(scene, camera);
 //hover animation ends
}

//raycaster for sprite hover action

	var selectedObject = null;
		function onDocumentMouseMove( event ) {
			event.preventDefault();

			// default rest action for objects
			if ( selectedObject ) {

                selectedObject.scale.set( 5, 5, 5 );
                selectedObject.material.map=dotexture;
				selectedObject = null;
			}

			var intersects = getIntersects( event.layerX, event.layerY );
			if ( intersects.length > 0 ) {
				var res = intersects.filter( function ( res ) {
					return res && res.object;
				} )[ 0 ];

              //on hover action of objects
				if ( res && res.object ) {

					selectedObject = res.object;

                    //interaction for dot1
					if(selectedObject == spritedot1)
					{
					selectedObject.scale.set( 75, 75, 15 );
                    selectedObject.material.map=infotext1;

					}
					//interaction for dot2
					if(selectedObject == spritedot2)
					{
					selectedObject.scale.set( 75, 75, 15 );
                    selectedObject.material.map=infotext2;
					}
					//interaction for dot3
					if(selectedObject == spritedot3)
					{
					selectedObject.scale.set( 75, 60, 15 );
                    selectedObject.material.map=infotext3;
					}
					//interaction for dot4
					if(selectedObject == spritedot4)
					{
					selectedObject.scale.set( 75, 75, 15 );
                    selectedObject.material.map=infotext4;
					}
					//interaction for dot5
					if(selectedObject == spritedot5)
					{
					selectedObject.scale.set( 60, 40, 15 );
                    selectedObject.material.map=infotext5;
					}
					//interaction for dot6
					if(selectedObject == spritedot6)
					{
					selectedObject.scale.set( 70, 45, 15 );
                    selectedObject.material.map=infotext6;
					}
				}
			}
		}


		var raycaster = new THREE.Raycaster();
		var mouseVector = new THREE.Vector3();

		function getIntersects( x, y ) {

			x = ( x / window.innerWidth ) * 2 - 1;
			y = - ( y / window.innerHeight ) * 2 + 1;

			mouseVector.set( x, y, 0.5 );
			raycaster.setFromCamera( mouseVector, camera );

			return raycaster.intersectObject( group, true );
		}
// raycaster ends



// Particle system for random floaty particles
  particle = new THREE.Object3D();

  scene.add(particle);

  var geometry = new THREE.SphereGeometry(0.25, 0);

  var materialpar = new THREE.MeshPhongMaterial({
    color: 0x000000,
    shading: THREE.FlatShading
  });

  for (var i = 0; i < 500; i++) {
    var mesh = new THREE.Mesh(geometry, materialpar);
    mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    mesh.position.multiplyScalar(200 + (Math.random() * 650));
    //mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    particle.add(mesh);
  }


//end
};

// rotates the particles around the scene
function  rotatescene() {
    particle.rotation.x += 0.001
    particle.rotation.z += 0.0001
  }

// animates the whole scene
function animate()
{

    rotatescene();
    controls.update();
    requestAnimationFrame ( animate );
    renderer.render (scene, camera);


};


// ball animation at center

var ball = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 8), new THREE.MeshBasicMaterial({
  color: 0x000000,
}));
scene.add(ball);

var clock = new THREE.Clock();
var time = 0;
var delta = 0;

render();

function render() {
  requestAnimationFrame(render);
  delta = clock.getDelta();
  time += delta;
  ball.position.y = 0.25 + Math.abs(Math.sin(time * 3)) * 10;
  //ball.position.x = Math.cos(time) * 85 ;
  renderer.render(scene, camera);
}

