var scene, renderer, camera;
var controls;

//temp
var cameraCenter = new THREE.Vector3();
var cameraHorzLimit = 25;
var cameraVertLimit = 25;
var mouse = new THREE.Vector2();
//tmp

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
    document.body.appendChild (renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera (75, width/height, 1, 1000);
    camera.position.y = 150;
    camera.position.z = 350;
    camera.lookAt (new THREE.Vector3(0,0,0));

    //tmp
    cameraCenter.x = camera.position.x;
    cameraCenter.y = camera.position.y;

    //set up mouse stuff
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

    //tmp

    controls = new THREE.OrbitControls (camera, renderer.domElement);
    controls.enableDamping = false;
    controls.dampingFactor = 0.1;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.userRotate = false;
    controls.userZoom = false;

    var keyLight = new THREE.DirectionalLight(0x404040, 0.1);
    keyLight.position.set(-100, 0, 100);
    scene.add(keyLight);

  particle = new THREE.Object3D();

  scene.add(particle);

  var geometry = new THREE.SphereGeometry(0.25, 0);

  var materialpar = new THREE.MeshPhongMaterial({
    color: 0x424242,
    //shading: THREE.FlatShading
  });
  for (var i = 0; i < 300; i++) {
    var mesh = new THREE.Mesh(geometry, materialpar);
    mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    mesh.position.multiplyScalar(100 + (Math.random() * 400));
    //mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    particle.add(mesh);
  }
//end
};

function  rotatescene() {
    particle.rotation.x += 0.001
    particle.rotation.y += 0.001
  }


function animate()
{
    rotatescene();
    updateCamera();
    controls.update();
    requestAnimationFrame ( animate );
    renderer.render (scene, camera);
};

//tmp
function updateCamera() {
    //offset the camera x/y based on the mouse's position in the window
    camera.position.x = cameraCenter.x + (cameraHorzLimit * mouse.x);
    camera.position.y = cameraCenter.y + (cameraVertLimit * mouse.y);
}

function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}