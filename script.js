let vid;
objs  = []
status = ""

function setup(){
    createCanvas(480,380);
    vid = createVideo("video.mp4");
    vid.hide();
}
function modelLoaded(){
    console.log("FINALLY IT WORKS!\nTime for my Divorce Papers.")
    status = true;
    vid.loop();
    vid.speed(1);
    vid.volume(0);
}
function gotResult(err,res){
    if(err){
        console.error(err);
    }
    console.log(res)
    objs = res;
}
function start(){
    objDetector = ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("Status").textContent = "Status: Starting"
}
function getRandomColor(){
    return [Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256)];
}
function draw(){
    image(vid,0,0,480,380)
    if(status != ""){
        objDetector.detect(vid,gotResult);
        for(var i = 0;i<objs.length;i++){
            document.getElementById("Status").textContent = "Status: Started"   
            document.getElementById("NumberOfObjects").textContent = "Number Of Objects Detected: "+objs.length+"objects"
            randomColor = getRandomColor();
            fill(0);
            p = objs[i].confidence.toFixed(2)*100;
            text(objs[i].label+" "+p+"%",objs[i].x+15,objs[i].y+15)
            noFill();
            stroke(0);
            rect(objs[i].x, objs[i].y,objs[i].width,objs[i].height);
        }
    }
}
console.log(getRandomColor())
