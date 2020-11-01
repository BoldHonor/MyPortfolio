
let currentFrame = 0;
let frameSpeed =0.03;
let frameDuration = 0.10;
let totalSpeed=0;
var threshold = 0.001;
let deltaTime=0;
let currenTime=0;
let maxScrollHeight = 1;
let distancePerFrame = 1;

let frameNumber =150;

var requiredHeight = 500;
var dive = document.getElementById("her");
dive.style.height = requiredHeight+'px';
var body  = document.getElementsByTagName("body")[0];

var vid = document.getElementById("themeVideo");
vid.onloadedmetadata = function() {
  console.log('metadata loaded!');
  console.log(this.duration);
  frameDuration= vid.duration/frameNumber;
  maxScrollHeight = body.scrollHeight - window.innerHeight;
  distancePerFrame = (maxScrollHeight+15)/frameNumber;
  console.log("frameNumber "+ frameNumber);
}


vid.currentTime = 1;


function play()
{
    if(maxScrollHeight!= body.scrollHeight - window.innerHeight) {
        maxScrollHeight = body.scrollHeight - window.innerHeight
        distancePerFrame = (maxScrollHeight+15)/frameNumber
    }
    deltaTime = (Date.now()-currenTime);
    while(deltaTime>1){
        deltaTime/=10;
    }
    if(deltaTime <threshold)deltaTime=threshold;    
    currenTime = Date.now();
    
    if(Math.abs(window.pageYOffset/distancePerFrame - currentFrame) > frameSpeed)
    currentFrame +=  Math.sign((window.pageYOffset/distancePerFrame- currentFrame))*frameSpeed*deltaTime;
    
    
    
    console.log("frame "+vid.currentTime);
    
    vid.currentTime =currentFrame*frameDuration; 
     requestAnimationFrame(play);
    
}
function setKey()
{
    if(Math.abs(window.pageYOffset/distancePerFrame - currentFrame) > frameSpeed)
    currentFrame +=  Math.sign((window.pageYOffset/distancePerFrame- currentFrame))*frameSpeed*deltaTime;
    
}

requestAnimationFrame(play);