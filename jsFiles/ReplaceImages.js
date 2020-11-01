var k=0;
var imageSet;
this.onmessage= function(e)
{
    console.log('message recivied');
    
    
    function replaceImage(){
        console.log('lop repeat');
        
                if(e.data.imagelist.legth == k)
                {
                    this.postMessage({frame:k});
                    return;
                }
                
                let source = '';
                if(k<10)
                source = "FinalAssets/AboutME3/EN1000"+k+".jpg";
                else  if(k<100)
                source = "FinalAssets/AboutME3/EN100"+k+".jpg";
                else  if(k<1000)
                source = "FinalAssets/AboutME3/EN10"+k+".jpg";
                
                imagelist[k].src = source;
                k++;
                imagelist[k-1].onload=function()
                {
                    console.log('loaded '+k-1);
                    setTimeout(replaceImage,1000);
                };
                
                
           
    }

    replaceImage();

}