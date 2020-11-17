import * as THREE from "./build/three.module.js";
import { EffectComposer } from './examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from './examples/jsm/postprocessing/UnrealBloomPass.js';
import { GLTFLoader } from './examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from './examples/jsm/controls/OrbitControls.js';
import { FirstPersonControls } from './examples/jsm/controls/FirstPersonControls.js';
import { BokehPass } from './examples/jsm/postprocessing/BokehPass.js';

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
const PARTICLE_SIZE = 2;
let lookAt;
var phoneSpeed = 0.002;
var onHover = document.getElementsByClassName('onHover');
var page= document.getElementById('page');
var loaderScreen = document.getElementById('loader');

var Explore  = document.getElementById('explore');
var isPhone = true;
 function detectMob() {
  const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
  ];

  return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
  });
}

isPhone = detectMob();
isPhone=true;
console.log('is phone test'+isPhone);

page.style.visibility='hidden';
document.getElementById('instruction').style.visibility='hidden';
window.oncontextmenu = function(event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

//LISTENERS
    window.addEventListener( 'resize', onWindowResize, false );
   



//init
  if(isPhone)
  {
    camera = new THREE.PerspectiveCamera(
      100,
      effectDiv.clientWidth / effectDiv.clientHeight,
      0.01,
     80
    );
  }
  else{
    camera = new THREE.PerspectiveCamera(
        40,
        effectDiv.clientWidth / effectDiv.clientHeight,
        0.01,
        300
      );

     
    }
      //camera = new THREE.OrthographicCamera( effectDiv.clientWidth / - 2, effectDiv.clientWidth / 2, effectDiv.clientHeight / 2,effectDiv.clientHeight / - 2, 0.01, 1000 );
    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio * 2);
    renderer.extensions.get( 'EXT_color_buffer_float' );
    renderer.setSize(effectDiv.clientWidth, effectDiv.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    //renderer.setSize(200,400);


    effectDiv.appendChild( renderer.domElement );
    camera.position.set(128,7.911,-36.6);
    
    
   
    scene = new THREE.Scene();
    const clock = new THREE.Clock();
    //scene.background = new THREE.Color( '000000' );
    //scene.fog =   new THREE.Fog(0x787676,0.3,190);
    if(isPhone)
    {
      renderer.setClearColor('#FFFFFF');
      scene.fog =   new THREE.Fog(0xffffff,0.3,85);
      camera.rotation.set(10,2,-10);
    }
  else{
    renderer.setClearColor('#787676');
    scene.fog =   new THREE.Fog(0x787676,0.3,190);
    camera.rotation.set(10,-80,-10);
  }
 

 /*
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
*/
//Loader

var obj;




//JSON LOADER
var AboutME;
var Projects;
var Resume;


const loa = new THREE.ObjectLoader();

if(!isPhone){
loa.load(
	// resource URL
	"FinalAssets/Models/scene1.json",

	// onLoad callback
	// Here the loaded data is assumed to be an object
	function ( obd ) {
    // Add the loaded object to the scene
    obj = obd;
    obd.dispose();
    //obj.scale.set(0.1,0.1,0.1);
    //obj.position.x=-0.5;
    scene.add( obj );
   
    AboutME = obj.getObjectByName('Plane029');
    Projects =obj.getObjectByName('Plane028');
    Resume=obj.getObjectByName('Plane030');
    
    page.style.visibility='visible';
    loaderScreen.style.display='none';
	},

	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.error( 'An error happened' );
	}
);}
else{
  loa.load(
    // resource URL
    "FinalAssets/Models/scene MOBILE.json",
  
    // onLoad callback
    // Here the loaded data is assumed to be an object
    function ( obd ) {
      // Add the loaded object to the scene
      obj = obd;
      obd.dispose();
      //obj.scale.set(0.1,0.1,0.1);
      //obj.position.x=-0.5;
      scene.add( obj );
     
      AboutME = obj.getObjectByName('Plane029');
      Projects =obj.getObjectByName('Plane028');
      Resume=obj.getObjectByName('Plane030');
      
      page.style.visibility='visible';
      loaderScreen.style.display='none';
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
}

document.getElementById('AboutME').addEventListener('click',function(event){
  
  obj.remove(); 
  window.location="./AboutME.html";
 // window.open("./AboutME.html", '_blank');
});


// Alternatively, to parse a previously loaded JSON structure
//const object = loader.parse( a_json_object );

//scene.add( object );

//LOADED OBJECTS 




//BLOOM

const renderScene = new RenderPass( scene, camera );

const bloomPass = new UnrealBloomPass( new THREE.Vector2( effectDiv.clientWidth, effectDiv.clientHeight ), 1.5, 0.4, 0.85 );
			bloomPass.threshold = 0.5;
			bloomPass.strength = 0.3;
      bloomPass.radius = 0.4;




let composer;
      composer = new EffectComposer( renderer );
      composer.addPass( renderScene );
      composer.addPass( bloomPass );
    

//console.log(vertices);

//LIGHT 


//CONTROLS
 let controls;
if(!isPhone){
 controls =  new FirstPersonControls( camera, renderer.domElement );
  controls.movementSpeed = 0;
  controls.lookSpeed = 0.06;
  controls.constrainVertical = true;
  controls.verticalMax  = 1.9;
  controls.verticalMin =1.5;
  controls.mouseDragOn =false;  
  controls.activeLook =true;



  Explore.addEventListener('click',function(){
      controls.movementSpeed=12;
      document.getElementById('instruction').style.visibility='visible';
      document.getElementById('welcome').style.display='none';
      document.getElementById("instructionImage").src = 'FinalAssets/Loader/instruction.png';
  });
  
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  var intersects;
  const black= new THREE.Color(0,0,0);
  const orange = new THREE.Color(206,87,9);
window.addEventListener('mousemove',function(event){
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera ); 
    intersects = raycaster.intersectObjects([AboutME,Projects,Resume]);
   // console.log(typeof intersects[0]);
   
    if(typeof intersects[0]  == 'undefined')
    {
      AboutME.material.emissive = black;
      Resume.material.emissive = black;
      Projects.material.emissive = black;

    }
    else
    {
      if(intersects[0].distance <40){
      intersects[0].object.material.emissive = orange;
      intersects[0].object.material.emissiveIntensity=0.003;
    }
  }
});

  document.body.addEventListener('click',function(event){
    raycaster.setFromCamera( mouse, camera );
    intersects = raycaster.intersectObjects([AboutME,Projects,Resume]);
    if(intersects[0].distance<45){
    switch(intersects[0].object.name)
    {
      case 'Plane029':
        //window.open( './AboutME.html','_blank');
        window.location = './AboutME.html';
        console.log('ji');
        break;
      case 'Plane028':
       // window.open( './Projects.html','_blank');
       window.location = './Projects.html';
        break;
        case 'Plane030':
         // window.open('./Resume.html','_blank');
         window.location = './Resume.html';
          break;

    };}
   

  });
}

else{
    lookAt = new THREE.Vector3(0,0,0);
  Explore.addEventListener('touchstart',function(){
    
    document.getElementById('instruction').style.visibility='visible';
    document.getElementById('welcome').style.display='none';
    document.getElementById("instructionImage").src = 'FinalAssets/Loader/up.png';
  
    document.getElementById("instruction").style.width='100%';
    document.getElementById("instruction").style.display='flex';
    document.getElementById("instruction").style.justifyContent='center';

});

Explore.addEventListener('click',function(){
    
  document.getElementById('instruction').style.visibility='visible';
  document.getElementById('welcome').style.display='none';
  document.getElementById("instructionImage").src = 'FinalAssets/Loader/up.png';

  document.getElementById("instruction").style.width='100%';
  document.getElementById("instruction").style.display='flex';
  document.getElementById("instruction").style.justifyContent='center';

});

}


function moveFrwd()
{
 
  camera.getWorldDirection(lookAt);
  camera.position.add(lookAt.multiplyScalar(phoneSpeed));
  //console.log(camera.position);
}

document.getElementById("instructionImage").addEventListener('touchstart',function(){phoneSpeed = 0.5; console.log(camera.position);});
document.getElementById("instructionImage").addEventListener('touchend',function(){phoneSpeed = 0;});
document.getElementById("instructionImage").addEventListener('mousedown',function(){phoneSpeed = 0.5; console.log(camera.position);});
document.getElementById("instructionImage").addEventListener('mouseup',function(){phoneSpeed = 0;});
/*
  function onHoverIn ()
  {
    controls.activeLook =false;
  }

  function onHoverOut()
  {
    
    controls.activeLook =true;
   
  }

  var hoverElements = document.getElementsByClassName('navBar');
  console.log(hoverElements); 

  for (let i = 0; i < hoverElements.length; i++) {
   // hoverElements[i].addEventListener('mouseleave',onHoverOut);
   // hoverElements[i].addEventListener('mouseenter',onHoverIn);
  }
*/



   function animate() {
     deltaTime=Date.now()-currentTIme;
     while(deltaTime>1)
     {
      deltaTime/=10;

     }
     
    //if(typeof obj !== "undefined")
    //obj.children[0].rotation.y+=0.05*deltaTime;

    

    
    if(isPhone)
    {
      renderer.render(scene, camera); 
      moveFrwd();
      console.log('Width'+effectDiv.clientWidth);
      console.log('height'+effectDiv.clientHeight);
    }
    else{
      controls.update( clock.getDelta() ); 
      composer.render();
    }
    
    
    
    requestAnimationFrame(animate);
    
  }
 

  function onWindowResize() {
  
    camera.aspect = effectDiv.clientWidth / effectDiv.clientHeight;

    renderer.setSize( effectDiv.clientWidth, effectDiv.clientHeight );  


    camera.updateProjectionMatrix();
    if(typeof controls!= 'undefined')
    controls.handleResize();
  }


  onWindowResize();
  animate();