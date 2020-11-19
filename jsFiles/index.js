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
var phoneSpeed = 0;
var phoneCurrentSpeed = 1;

var onHover = document.getElementsByClassName('onHover');
var page= document.getElementById('page');
var loaderScreen = document.getElementById('loader');
var ins = document.getElementById("instruction");
var insimg =document.getElementById("instructionImage");
var Explore  = document.getElementById('explore');
<<<<<<< HEAD
var linkPage = document.getElementById('linkPage');
let pageNavigator = function(){};
var pageNavigatorLinks = {
    AboutMe: {link:'./AboutME.html',active:false},
    Resume: {link:'./AboutME.html',active:false},
    Projects: {link:'./AboutME.html',active:false}
};
=======
>>>>>>> parent of a130295... Mobile page navigation


let isPhone = true;

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

console.log('is phone test '+isPhone);

if(isPhone)
{
  
  var target= new THREE.Vector3(-0.631,13.313,-27.756);
  

  function degToRad(num)
  {
    return  num*3.14/360;
  }
  var phoneup = document.getElementById('up');
  var phonedown = document.getElementById('down');
  var phoneright = document.getElementById('right');
  var phoneleft = document.getElementById('left');
  var phonemove = document.getElementById('move');
  var phoneback = document.getElementById('back');
  var phoneControls = [phoneup,phonedown,phoneright,phoneleft];
  var phoneLookSpeed = degToRad(2);
  var phoneLookStatus = 1;
  var direction;
  var phi=degToRad(150);
    var theta=degToRad(-150);


  function startRotation(dir)
  {
    direction=dir;
    phoneLookStatus=1;
    
  }
  
  function stopRotation(dir)
  {
    direction=dir;
    phoneLookStatus=0;
  }
  

  
  phoneControls.some((crtinput)=>{
      crtinput.addEventListener('touchstart',function(){
        startRotation(this.id);

      });

      crtinput.addEventListener('mousedown',function(){
        startRotation(this.id);

      });

      crtinput.addEventListener('touchend',function(){
        stopRotation(this.id);

      });

      crtinput.addEventListener('mouseup',function(){
        stopRotation(this.id);

      });
  });


}

function phoneControlsUpdate()
{
  
  
  var position = camera.position;
  switch(direction)
  {
    case 'up':
      phi += -phoneLookSpeed*phoneLookStatus;
      break;
    case 'down':
      phi += phoneLookSpeed*phoneLookStatus;
      break;
    case 'right':
      theta += -phoneLookSpeed*phoneLookStatus;
      break;
    case 'left':
      theta += phoneLookSpeed*phoneLookStatus;
      break;
  };
    //console.log(phoneLookStatus);
    
    target.setFromSphericalCoords( 1, phi, theta ).add( position );
    
    camera.lookAt( target );
}
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
      60,
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
    renderer.setPixelRatio(window.devicePixelRatio * 1/2);
    renderer.extensions.get( 'EXT_color_buffer_float' );
    //renderer.setPixelRatio(window.devicePixelRatio);
    if(!isPhone)
    renderer.setSize(effectDiv.clientWidth, effectDiv.clientHeight);
    else
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    //renderer.setSize(200,400);


    effectDiv.appendChild( renderer.domElement );
    camera.position.set(128,7.911,-36.6);
    
    
   
    scene = new THREE.Scene();
    const clock = new THREE.Clock();
    
    if(isPhone)
    {
      renderer.setClearColor('#FFFFFF');
      scene.fog =   new THREE.Fog(0xffffff,0.3,85);
      camera.rotation.set(0,2,0);
      renderer.setPixelRatio(window.devicePixelRatio * 1/4);
    }
  else{
    renderer.setClearColor('#787676');
    scene.fog =   new THREE.Fog(0x787676,0.3,190);
    camera.rotation.set(10,-80,-10);
    renderer.setPixelRatio(window.devicePixelRatio );
  }
 



var obj;




//JSON LOADER
var AboutME;
var Projects;
var Resume;


const loa = new THREE.ObjectLoader();
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
var intersects;
const black= new THREE.Color(0,0,0);
const orange = new THREE.Color(206,87,9);

if(!isPhone){

  document.getElementById('motioncontrols').remove();
  document.getElementById('controls').remove();
  
loa.load(
	// resource URL
	"FinalAssets/Models/scene1.json",

	// onLoad callback
	// Here the loaded data is assumed to be an object
	function ( obd ) {
    // Add the loaded object to the scene
    obj = obd;
    console.log('3comlete');
 
    scene.add( obj );
   
    AboutME = obj.getObjectByName('Plane029');
    Projects =obj.getObjectByName('Plane028');
    Resume=obj.getObjectByName('Plane030');
    
    page.style.visibility='visible';
    loaderScreen.remove();

    //////////////////////////////
    function makeVisible(name)
    {
      if(pageNavigatorLinks[name].active) return;
      console.log(pageNavigatorLinks[name].link);
      linkPage.innerHTML = name;
      linkPage.style.display='block';
      pageNavigatorLinks[name].active = true;

    }


      pageNavigator =  function()
      {
          if(camera.position.distanceTo(AboutME.position) < 40)
          {
              makeVisible('AboutMe');
          }
          else if(camera.position.distanceTo(Resume.position) < 40)
          {
            makeVisible('Resume');
          }
          else if (camera.position.distanceTo(Projects.position) < 40)
          {
            makeVisible('Projects');
          }
          else{
            linkPage.style.display = 'none';
            pageNavigatorLinks['AboutMe'].active = false;
            pageNavigatorLinks['Resume'].active = false;
            pageNavigatorLinks['Projects'].active = false;
          }}
          linkPage.addEventListener('click',function(){
            window.location = pageNavigatorLinks[this.innerHTML].link;
          });
    /////////////////////////
    Explore.addEventListener('click',function(){
      controls.movementSpeed=12;
      document.getElementById('instruction').style.visibility='visible';
      document.getElementById('welcome').style.display='none';
      document.getElementById("instructionImage").src = 'FinalAssets/Loader/instruction.png';
  });
  

  

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
      

      scene.add( obj );
     
      AboutME = obj.getObjectByName('Plane029');
      Projects =obj.getObjectByName('Plane028');
      Resume=obj.getObjectByName('Plane030');
      
      page.style.visibility='visible';
      loaderScreen.remove();
<<<<<<< HEAD


      function makeVisible(name)
    {
      if(pageNavigatorLinks[name].active) return;
      console.log(pageNavigatorLinks[name].link);
      linkPage.innerHTML = name;
      linkPage.style.display='block';
      pageNavigatorLinks[name].active = true;

    }


      pageNavigator=  function()
      {
          if(camera.position.distanceTo(AboutME.position) < 40)
          {
              makeVisible('AboutMe');
          }
          else if(camera.position.distanceTo(Resume.position) < 40)
          {
            makeVisible('Resume');
          }
          else if (camera.position.distanceTo(Projects.position) < 40)
          {
            makeVisible('Projects');
          }
          else{
            linkPage.style.display = 'none';
            pageNavigatorLinks['AboutMe'].active = false;
            pageNavigatorLinks['Resume'].active = false;
            pageNavigatorLinks['Projects'].active = false;
          }
         
          
      }

      linkPage.addEventListener('click',function(){
        window.location = pageNavigatorLinks[this.innerHTML].link;
      });
=======
>>>>>>> parent of a130295... Mobile page navigation
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

console.log('1comlete');

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
    
      console.log('2comlete');
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




}

else{
  
    lookAt = new THREE.Vector3(0,0,0);
  Explore.addEventListener('touchstart',function(){
    document.getElementById('controls').style.zIndex='3';
    ins.style.visibility='visible';
    document.getElementById('welcome').style.display='none';
    insimg.src = 'FinalAssets/Loader/mobileInstructions.png';
    insimg.style.width="100%";
    insimg.style.height='auto';
    ins.style.backgroundColor = 'rgba(226, 141, 14, 0.747)';
    ins.style.width='100%';
    ins.style.display='flex';
    ins.style.justifyContent='center';
    ins.remove();
});

Explore.addEventListener('click',function(){
    
  ins.style.visibility='visible';
  document.getElementById('welcome').style.display='none';
  document.getElementById("instructionImage").src = 'FinalAssets/Loader/mobileInstructions.png';
  document.getElementById('controls').style.zIndex='3';
 /* insimg.style.width="100%";
    insimg.style.height='auto';
    ins.style.backgroundColor = 'rgba(226, 109, 14, 0.06)';*/
  ins.style.width='100%';
  ins.style.height='100%';
  ins.style.display='flex';
  ins.style.justifyContent='center';
  ins.remove();

});

}

console.log('4comlete');
function moveFrwd()
{
 
  camera.getWorldDirection(lookAt);
  

  camera.position.add(lookAt.multiplyScalar(phoneSpeed*deltaTime));
  
}

if(isPhone){
phonemove.addEventListener('touchstart',function(){phoneSpeed = phoneCurrentSpeed; });
phonemove.addEventListener('touchend',function(){phoneSpeed = 0;});
phonemove.addEventListener('mousedown',function(){phoneSpeed = phoneCurrentSpeed; });
phonemove.addEventListener('mouseup',function(){phoneSpeed = 0;});
phoneback.addEventListener('touchstart',function(){phoneSpeed =-phoneCurrentSpeed; });
phoneback.addEventListener('touchendt',function(){phoneSpeed =0; });
phoneback.addEventListener('mousedown',function(){phoneSpeed = -phoneCurrentSpeed; });
phoneback.addEventListener('mouseup',function(){phoneSpeed = 0;});
}
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
     
      deltaTime/=100;
    currentTIme = Date.now();
     
     
    //if(typeof obj !== "undefined")
    //obj.children[0].rotation.y+=0.05*deltaTime;

   

    
    if(isPhone)
    {
      renderer.render(scene, camera); 
      moveFrwd();
      phoneControlsUpdate();
      var t = new THREE.Vector2(0,0);
      renderer.getSize ( t );

      console.log('width '+t.x +'height '+t.y + 'device pix '+ renderer.getPixelRatio () );  
      console.log('h2 '+effectDiv.offsetHeight +'height '+effectDiv.clientHeight);
     // console.log('2 width '+window.screen.availHeight+'height '+window.screen.availHeight );
    }
    else{
      pageNavigator();
      controls.update( clock.getDelta() ); 
      composer.render();
    }
    
    
    
    requestAnimationFrame(animate);
    
  }
 

  function onWindowResize() {
  
    camera.aspect = effectDiv.clientWidth / effectDiv.clientHeight;
    if(isPhone)
    {
    renderer.setSize(window.innerWidth, window.innerHeight );  
    }
    else
    {
    renderer.setSize(effectDiv.clientWidth , effectDiv.clientHeight );  
    }
    camera.updateProjectionMatrix();
    if(typeof controls!= 'undefined')
    controls.handleResize();
  }


  onWindowResize();
  animate();