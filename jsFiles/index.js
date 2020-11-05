import * as THREE from "./build/three.module.js";
import { EffectComposer } from './examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from './examples/jsm/postprocessing/UnrealBloomPass.js';



var effectDiv = document.getElementById("sideScroll");
effectDiv.innerHTML='hi boi';
var height= effectDiv.clientHeight;
var width = effectDiv.clientWidth;
var camera ='';
var scene ='';
var renderer
effectDiv.style.height = 500+'px';
var currentTIme=Date.now();
var deltaTime =1;


    window.addEventListener( 'resize', onWindowResize, false );
  
    camera = new THREE.PerspectiveCamera(
        45,
        effectDiv.clientWidth / effectDiv.clientHeight,
        0.1,
        1000
      );
      //camera = new THREE.OrthographicCamera( effectDiv.clientWidth / - 2, effectDiv.clientWidth / 2, effectDiv.clientHeight / 2,effectDiv.clientHeight / - 2, 0.01, 1000 );
    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio * 2);
    renderer.setSize(effectDiv.clientWidth, effectDiv.clientHeight);
    effectDiv.appendChild( renderer.domElement );
    camera.position.z =1;
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


console.log(effectDiv.offsetWidth);
scene.add(icoSphere);
icoSphere.position.setX(-0.6);
line.position.x=-0.6
scene.add(line);
const vertices = geometry.attributes.position.array;

//BLOOM
const renderScene = new RenderPass( scene, camera );

const bloomPass = new UnrealBloomPass( new THREE.Vector2( effectDiv.clientWidth, effectDiv.clientHeight ), 1.5, 0.4, 0.85 );
			bloomPass.threshold = 0.3;
			bloomPass.strength = 0.5;
      bloomPass.radius = 0.6;

let composer;
      composer = new EffectComposer( renderer );
      composer.addPass( renderScene );
      composer.addPass( bloomPass );

console.log(vertices);

//LIGHT
const light = new THREE.AmbientLight( '#F19518'); // soft white light
scene.add( light );
const directionalLight = new THREE.DirectionalLight( '#D5F156', 0.3 );
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
    icoSphere.rotation.y +=0.01*deltaTime;
    line.rotation.y+=0.01*deltaTime;
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