import * as THREE from "./build/three.module.js";
import { EffectComposer } from './examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from './examples/jsm/postprocessing/UnrealBloomPass.js';
import { GLTFLoader } from './examples/jsm/loaders/GLTFLoader.js'


var effectDiv = document.getElementById("sideScroll");
var height= effectDiv.clientHeight;
var width = effectDiv.clientWidth;
var camera ='';
var scene ='';
var renderer;
var obj;
effectDiv.style.height = '100%';
effectDiv.style.width='100%';
effectDiv.style.position='fixed';
var currentTIme=Date.now();
var deltaTime =1;
const PARTICLE_SIZE = 2

//LISTENERS
    window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener('wheel', function(event)
{
 if (event.deltaY < 0)
 {
  console.log(event.deltaY);
  //document.getElementById('status').textContent= 'scrolling up';
 }
 else if (event.deltaY > 0)
 {
  console.log(event.deltaY);
 // document.getElementById('status').textContent= 'scrolling down';
 }
});



//init
  
    camera = new THREE.PerspectiveCamera(
        45,
        effectDiv.clientWidth / effectDiv.clientHeight,
        0.01,
        1000
      );
      //camera = new THREE.OrthographicCamera( effectDiv.clientWidth / - 2, effectDiv.clientWidth / 2, effectDiv.clientHeight / 2,effectDiv.clientHeight / - 2, 0.01, 1000 );
    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio * 2);
    renderer.setSize(effectDiv.clientWidth, effectDiv.clientHeight);
    effectDiv.appendChild( renderer.domElement );
    camera.position.set(0.141,1.911,5.873);
    
    renderer.setClearColor('000000');
    scene = new THREE.Scene();
    
  
 

 
//GEOMETRIES
const geometry = new THREE.IcosahedronBufferGeometry(0.3,1);
//const geometry = new THREE.BoxBufferGeometry(0.3,0.3,0.3);
const material = new THREE.MeshLambertMaterial({color:'#F4AA20',emissiveIntensity :8 }); 
const icoSphere= new THREE.Mesh( geometry, material );
const wireframe = new THREE.WireframeGeometry( geometry );
const lineMaterial = new THREE.LineBasicMaterial({color:'#FFFFFF',linewidth :1});
const line = new THREE.LineSegments( wireframe,lineMaterial );

var pos=  geometry.attributes.position.array;
const particlesGeometry = new THREE.BufferGeometry();
			particlesGeometry.setAttribute( 'position', new THREE.BufferAttribute( pos, 3 ) );
      var particleMaterial = new THREE.PointsMaterial( { color: 0x888888,size:0.02 } );


var points = new THREE.Points(particlesGeometry, particleMaterial);
icoSphere.add(points);
//scene.add( points );
//scene.add(icoSphere);
icoSphere.position.setX(-0.6);
line.position.x=-0.6
//scene.add(line);

//Loader

var obj;
const loader = new GLTFLoader();

loader.load( 'FinalAssets/Models/Earth.gltf', function ( gltf ) {

  obj = gltf.scene;
  obj.scale.set(0.3,0.3,0.3);
  
	//scene.add(obj);

}, undefined, function ( error ) {

	console.error( error );

} );




const loa = new THREE.ObjectLoader();

loa.load(
	// resource URL
	"FinalAssets/Models/scene.json",

	// onLoad callback
	// Here the loaded data is assumed to be an object
	function ( obd ) {
    // Add the loaded object to the scene
    obj = obd;
    //obj.scale.set(0.1,0.1,0.1);
    //obj.position.x=-0.5;
		scene.add( obj );
	},

	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.error( 'An error happened' );
	}
);


// Alternatively, to parse a previously loaded JSON structure
//const object = loader.parse( a_json_object );

//scene.add( object );






//BLOOM
const renderScene = new RenderPass( scene, camera );

const bloomPass = new UnrealBloomPass( new THREE.Vector2( effectDiv.clientWidth, effectDiv.clientHeight ), 1.5, 0.4, 0.85 );
			bloomPass.threshold = 0.8;
			bloomPass.strength = 0.4;
      bloomPass.radius = 0.8;

let composer;
      composer = new EffectComposer( renderer );
      composer.addPass( renderScene );
      composer.addPass( bloomPass );

//console.log(vertices);

//LIGHT
const light = new THREE.AmbientLight( '#25D6EC'); // soft white light
//  scene.add( light );
const directionalLight = new THREE.DirectionalLight( '#FFFFFF', 0.03 );
directionalLight.position.y=0.2;
directionalLight.position.z=1;
directionalLight.castShadow=true;
//scene.add( directionalLight);






   function animate() {
     deltaTime=Date.now()-currentTIme;
     while(deltaTime>1)
     {
      deltaTime/=10;

     }
     
     if(icoSphere.rotation.y>360)
     icoSphere.rotation.y=0;
    icoSphere.rotation.y +=0.05*deltaTime;
    line.rotation.y+=0.05*deltaTime;
    if(typeof obj !== "undefined")
    obj.children[0].rotation.y+=0.05*deltaTime;
    composer.render();
    //renderer.render(scene, camera); 
    requestAnimationFrame(animate);
    
  }
  animate();

  function onWindowResize() {

    camera.aspect = effectDiv.clientWidth / effectDiv.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( effectDiv.clientWidth, effectDiv.clientHeight );  

  }