import * as THREE from "./three.module.js";


var effectDiv = document.getElementById("sideScroll");
effectDiv.innerHTML='hi boi';
var height= effectDiv.clientHeight;
console.log(height);
var camera ='';
var scene ='';
var renderer
effectDiv.style.height = 500+'px';


  
    camera = new THREE.PerspectiveCamera(
        75,
        effectDiv.offsetWidth / effectDiv.offsetHeight,
        0.1,
        1000
      );

    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio * 2);
    renderer.setSize(effectDiv.offsetWidth, effectDiv.offsetHeight);
    effectDiv.appendChild( renderer.domElement );
    camera.position.z = 1;
    renderer.setClearColor('000000');
    scene = new THREE.Scene();
    
  
 

 
//GEOMETRIES
const geometry = new THREE.IcosahedronBufferGeometry(0.3,1);
const material = new THREE.MeshLambertMaterial({color:'#F4AA20',emissiveIntensity :3}); 
const icoSphere= new THREE.Mesh( geometry, material );
const wireframe = new THREE.WireframeGeometry( geometry );


const lineMaterial = new THREE.LineBasicMaterial({color:'#FFFFFF',linewidth :1});
const line = new THREE.LineSegments( wireframe,lineMaterial );



scene.add(icoSphere);
scene.add(line);
const vertices = geometry.attributes.position.array;
/*
const renderScene = new RenderPass( scene, camera );

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
			bloomPass.threshold = 0.6;
			bloomPass.strength = 0.16;
      bloomPass.radius = 0.3;

let composer;
      composer = new EffectComposer( renderer );
      composer.addPass( renderScene );
      composer.addPass( bloomPass );
*/
console.log(vertices);

//LIGHT
const light = new THREE.AmbientLight( '#CBB5B0'); // soft white light
scene.add( light );
const directionalLight = new THREE.DirectionalLight( '#D5F156', 0.5 );
directionalLight.position.y=0.2;
directionalLight.position.z=1;
directionalLight.castShadow=true;
scene.add( directionalLight);






   function animate() {
    icoSphere.rotation.y +=0.01;
    line.rotation.y+=0.01;
    //composer.render();
    renderer.render(scene, camera); 
    requestAnimationFrame(animate);
    
  }
  animate();