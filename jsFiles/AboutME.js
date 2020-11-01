var imageDoc = document.getElementById("ig");
            var dive = document.getElementById("her");
            var imagelist = [];
            let currentFrame = 0;
            let frameSpeed =0.6;
            let totalSpeed=0;
            let deltaTime=0;
            let currenTime=0;
            var requiredHeight = 550;
            var frameNumber = 150;
            var threshold = 0.2;
            var body  = document.getElementsByTagName("body")[0];
            let maxScrollHeight = 1;
            let distancePerFrame = 1;
            currenTime=Date.now();
            for(let i =0;i<frameNumber;i++)
            {
                
                let img = new Image();
                if(i<10)
                img.src = "FinalAssets/AboutME3/EN1000"+i+".jpg";
                else  if(i<100)
                img.src = "FinalAssets/AboutME3/EN100"+i+".jpg";
                else  if(i<1000)
                img.src = "FinalAssets/AboutME3/EN10"+i+".jpg";
                
                imagelist.push(img);
            }
            imagelist[frameNumber-5].onload =function(){

                document.getElementById("loader").style.visibility="hidden";
                document.getElementById("loader").style.height = 0+'px';
                document.getElementById("page").style.visibility="visible";
                
            }


            for(let i =0;i<frameNumber;i++)
            {
                
                let img = new Image();
                if(i<10)
                img.src = "FinalAssets/AboutME2/EN1000"+i+".jpg";
                else  if(i<100)
                img.src = "FinalAssets/AboutME2/EN100"+i+".jpg";
                else  if(i<1000)
                img.src = "FinalAssets/AboutME2/EN10"+i+".jpg";
                
                imagelist[i] = img;
            }
            dive.style.height = requiredHeight+'px';
            dive.append(imagelist[0]);
            maxScrollHeight = body.scrollHeight - window.innerHeight;
            distancePerFrame = (maxScrollHeight+15)/frameNumber;
            
            function play()
            {
                if(maxScrollHeight< body.scrollHeight - window.innerHeight) {
                    maxScrollHeight = body.scrollHeight - window.innerHeight
                    distancePerFrame = (maxScrollHeight+15)/frameNumber
                }
                deltaTime = (Date.now()-currenTime);
                while(deltaTime>1){
                    deltaTime/=10;
                }
                if(deltaTime <threshold)deltaTime=threshold;    
                currenTime = Date.now();
                totalSpeed = deltaTime*frameSpeed;
                if(dive.firstChild)
                dive.removeChild(dive.firstChild);

                if(Math.abs(window.pageYOffset/distancePerFrame - currentFrame) > totalSpeed)
                currentFrame+=  Math.sign(window.pageYOffset/distancePerFrame - currentFrame)*totalSpeed;
                
                dive.append(imagelist[Math.floor(currentFrame)]);
                
                requestAnimationFrame(play);
            }
            requestAnimationFrame(play);