

// Automatically resize scene  based on browser window size
window.addEventListener('resize', () => {
renderer.setSize(window.innerWidth,window.innerHeight);
camera.aspect = window.innerWidth / window.innerHeight;

camera.updateProjectionMatrix();
})

// initiate scene
var scene = new THREE.Scene();

// initiate scene renderer
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor("#e5e5e5");
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// adds lights to scene
var light = new THREE.PointLight( 0xF7F7F7, 10, 100 );
light.position.set( 50, 50, 50 );
light.castShadow = true;

// adds geometry to scene
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshLambertMaterial({color: 0xff0000, wireframe: true});
var cube = new THREE.Mesh( geometry, material );
cube.castShadow = true;


// helpers
var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper )

var size = 10;
var divisions = 10;

var gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );



// adding to scene
scene.add( light )
scene.add( cube )


    camera = new THREE.PerspectiveCamera (45, window.innerWidth/window.innerHeight, 1, 10000);
    camera.position.y = 160;
    camera.position.z = 400;
    camera.lookAt (new THREE.Vector3(0,0,0));

    controls = new THREE.OrbitControls (camera, renderer.domElement);


var animate = function () {
    requestAnimationFrame( animate );

    //cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    //cube.rotation.z += 0.01;
    controls.update();

    renderer.render( scene, camera );
};

animate();


// var cubeGeometry = new THREE.BoxGeometry (10,10,10);
   // var cubeMaterial = new THREE.MeshBasicMaterial ({color: 0x1ec876});
    //cube = new THREE.Mesh (cubeGeometry, cubeMaterial);
    //cube.castShadow = true;
    //cube.position.set (0, 5, 0);
   // scene.add (cube);





    //var light = new THREE.PointLight( 0xF7F7F7, 10, 100 );
    //light.position.set( 500, 500, 500 );
    //light.castShadow = true;

    //var light2 = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    //light2.castShadow = true;
    //scene.add( light2 );



    //var cirgeometry = new THREE.CircleBufferGeometry( 250, 64);
    //var material = new THREE.MeshBasicMaterial( { color: 0xF7F7F7, opacity: 0.5,transparent: true,} );
    //var circle = new THREE.Mesh( cirgeometry, material );
    //circle.receiveShadow=true;
    //circle.rotateX(-(3.1416/2));
    //scene.add( circle );

     // scene.fog = new THREE.Fog(0xFFFFFF, 700, 800);


    //var fillLight = new THREE.DirectionalLight(0xffffff, 0.75);
    //fillLight.position.set(100, 0, 100);

    //var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    //backLight.position.set(100, 0, -100).normalize();

    //scene.add(fillLight);
    //scene.add(backLight);