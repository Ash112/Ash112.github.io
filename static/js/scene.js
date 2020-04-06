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

// variables for leading amgnaer
var loadingManager = null;
var RESOURCES_LOADED = false;


function init()
{
    // loading manger

	loadingManager = new THREE.LoadingManager();

	loadingManager.onProgress = function(item, loaded, total){
		console.log(item, loaded, total);
	};

	loadingManager.onLoad = function(){
		console.log("loaded all resources");
		RESOURCES_LOADED = true;
	};

    // defines a new webgl renderer
    renderer = new THREE.WebGLRenderer( {antialias:true,alpha: true } );
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize (width, height);
    document.body.appendChild (renderer.domElement);

    //create a new scene.
    scene = new THREE.Scene();

    //new camera looking at origin
    camera = new THREE.PerspectiveCamera (75, width/height, 1, 1900);
    camera.position.y = 190;
    camera.position.x = -390;
    camera.position.z = 190;
    camera.lookAt (new THREE.Vector3(0,0,0));

    // camera rotate controls / seperate JS file
    controls = new THREE.OrbitControls (camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.5;
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
//var map = textureLoader.load("/static/others/whitecolor.jpg");

var ballTexture = textureLoader.load("/static/icons/circledot1.png");


//face material
var material = new THREE.MeshLambertMaterial( { color: 0xDEDEDE  } );

//wirframe material
var wireframeMaterial = new THREE.LineBasicMaterial( { color: 0xA5A5A5  } );

  //instantiate a loader to load OBJ Files.
    var loader = new THREE.OBJLoader(loadingManager);

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
// called when loading is in progress
	function ( xhr ) {
    //displays loading text on screen
	//var text2 = document.createElement('div');
   //text2.style.position = 'absolute';
    //text2.style.width = 100;
    //text2.style.height = 100;
    //text2.style.top = 100/2 + 'vh';
    //text2.style.left = 100/2 + 'vw';
   // text2.innerHTML = "hi there!";
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


//info texture
var infotext1 = textureLoader.load("/static/icons/info1.png");
var infotext2 = textureLoader.load("/static/icons/info2.png");
var infotext3 = textureLoader.load("/static/icons/info3.png");
var infotext4 = textureLoader.load("/static/icons/info4.png");
var infotext5 = textureLoader.load("/static/icons/info5.png");
var infotext6 = textureLoader.load("/static/icons/info6.png");

//temp helper
//var axesHelper = new THREE.AxesHelper( 250 );
//scene.add( axesHelper );

//line from floor
function drwline(point1,point2){

var materialline = new THREE.LineBasicMaterial({
	color: 0xE6E6E6
});
var points1 = [];
points1.push(point1 );
points1.push( point2 );
var geometry1 = new THREE.BufferGeometry().setFromPoints( points1 );
var line1 = new THREE.Line( geometry1,materialline );
scene.add( line1 );
}

//spriteset 1 // have to recode as function!
// y value set at hover function
var spritedot1 = new THREE.Sprite( new THREE.SpriteMaterial(  {map: dotexture}  ) );
			spritedot1.position.set( -300, 160, -100 );
            spritedot1.scale.set( 5, 5, 5 );
			group.add( spritedot1 );

drwline(new THREE.Vector3( -300, 146, -100),new THREE.Vector3( -300, 10, -100) );

//spriteset 2
var spritedot2 = new THREE.Sprite( new THREE.SpriteMaterial(  {map: dotexture}  ) );
			spritedot2.position.set( 10, 160, 160 );
            spritedot2.scale.set( 5, 5, 5 );
			group.add( spritedot2 );

drwline(new THREE.Vector3( 10, 156, 160 ),new THREE.Vector3( 10, 110, 160 ) );

//spriteset 3
var spritedot3 = new THREE.Sprite( new THREE.SpriteMaterial(  {map: dotexture}  ) );
			spritedot3.position.set( 0, 155, 0 );
            spritedot3.scale.set( 5, 5, 5 );
			group.add( spritedot3 );

drwline(new THREE.Vector3( 0, 155, 0  ),new THREE.Vector3( 0, 10, 0  ) );

//spriteset 4
var spritedot4 = new THREE.Sprite( new THREE.SpriteMaterial(  {map: dotexture}  ) );
			spritedot4.position.set( 180, 190, -210 );
            spritedot4.scale.set( 5, 5, 5 );
			group.add( spritedot4 );

drwline(new THREE.Vector3( 180, 145, -210 ),new THREE.Vector3( 180, 10, -210) );

//spriteset 5
var spritedot5 = new THREE.Sprite( new THREE.SpriteMaterial(  {map: dotexture}  ) );
			spritedot5.position.set( 240, 100, 0 );
            spritedot5.scale.set( 5, 5, 5 );
			group.add( spritedot5 );

drwline(new THREE.Vector3( 240, 95, 0 ),new THREE.Vector3( 240, 75, 0) );

//spriteset 6
var spritedot6 = new THREE.Sprite( new THREE.SpriteMaterial(  {map: dotexture}  ) );
			spritedot6.position.set( 0, 35, -75 );
            spritedot6.scale.set( 5, 5, 5 );
			group.add( spritedot6 );

drwline(new THREE.Vector3( 0, 30, -75 ),new THREE.Vector3( 0, 10, -75) );

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

// TB recoded as function
if (spritedot1.material.map==dotexture){
  spritedot1.position.y = 150 + (Math.sin(time * 2.5)) * 3;
  spritedot1.scale.y = 4 + Math.abs(Math.sin(time * 1));
  spritedot1.scale.x = 4 + Math.abs(Math.sin(time * 1));

  }
if (spritedot2.material.map==dotexture){
  spritedot2.position.y = 160 + (Math.cos(time * 2.5)) * 3;
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
					selectedObject.scale.set( 75, 65, 15 );
                    selectedObject.material.map=infotext1;

					}
					//interaction for dot2
					if(selectedObject == spritedot2)
					{
					selectedObject.scale.set( 75, 65, 15 );
                    selectedObject.material.map=infotext2;
					}
					//interaction for dot3
					if(selectedObject == spritedot3)
					{
					selectedObject.scale.set( 75, 50, 15 );
                    selectedObject.material.map=infotext3;
					}
					//interaction for dot4
					if(selectedObject == spritedot4)
					{
					selectedObject.scale.set( 75, 35, 15 );
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
					selectedObject.scale.set( 70, 40, 15 );
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

   // spheres with flat shading
  var geometry = new THREE.SphereGeometry(0.25,);

  var materialpar = new THREE.MeshBasicMaterial({color: 0x000000});

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

//loding picture
var loadingtexture = new THREE.TextureLoader();

var loadtext = loadingtexture.load("/static/icons/loading.png");

var loadingsprite = new THREE.Sprite( new THREE.SpriteMaterial(  {map: loadtext } ) );
			loadingsprite.position.set( 0, 40, 0 );
            loadingsprite.scale.set( 95, 22, 0 );
			scene.add(loadingsprite)

// animates the whole scene
function animate()
{
// does nothing ATM
if( RESOURCES_LOADED == false ){

        requestAnimationFrame ( animate );
        //console.log(RESOURCES_LOADED);

		return; // Stop the function here.
	}
	else{

	//removes loading texture once model is loaded
    scene.remove(loadingsprite);

    //rotates particles
    rotatescene();
    controls.update();
    requestAnimationFrame ( animate );
    renderer.render (scene, camera);
    }
};



