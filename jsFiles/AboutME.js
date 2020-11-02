var imageDoc = document.getElementById("ig");
            var dive = document.getElementById("her");
            var imagelist = [];
            let currentFrame = 0;
            let frameSpeed =0.6;
            let totalSpeed=0;
            let deltaTime=0;
            let currenTime=0;
            var requiredHeight = 1000;
            var frameNumber = 150;
            var threshold = 0.2;
            var body  = document.getElementsByTagName("body")[0];
            let maxScrollHeight = 1;
            let distancePerFrame = 1;
            var k=0;
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
                document.getElementById("loader").style.display='none';
                document.getElementById("page").style.display="block";
                document.getElementById("page").style.visibility="visible";
                if(window.innerWidth>(600))
                iq();
                else
                frameSpeed++;
            }

            /*
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
            */
            //body.style.height = requiredHeight+'px';
            dive.append(imagelist[0]);
            maxScrollHeight = body.scrollHeight - window.innerHeight;
            distancePerFrame = (maxScrollHeight+15)/frameNumber;
            function iq()
            {
                
                if(k==frameNumber)return;
                var source='';
                if(k<10)
                source = "FinalAssets/AboutME2/EN1000"+k+".jpg";
                else  if(k<100)
                source = "FinalAssets/AboutME2/EN100"+k+".jpg";
                else  if(k<1000)
                source= "FinalAssets/AboutME2/EN10"+k+".jpg";
                
                imagelist[k].src = source;
                k++;

                imagelist[k-1].onload=function()
                {
                    console.log('loaded '+ (k-1));
                    iq();
                };
            }
            


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
                totalSpeed = deltaTime*frameSpeed;
                if(dive.firstChild)
                dive.removeChild(dive.firstChild);

                if(Math.abs(window.pageYOffset/distancePerFrame - currentFrame) > totalSpeed)
                currentFrame+=  Math.sign(window.pageYOffset/distancePerFrame - currentFrame)*totalSpeed;
                
                dive.append(imagelist[Math.floor(currentFrame)]);
                
                requestAnimationFrame(play);
            }
            requestAnimationFrame(play);