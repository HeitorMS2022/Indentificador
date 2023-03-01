function preload(){
}
function setup(){
    canvas = createCanvas(400, 300);
    canvas.position(500, 350);
    video = createCapture(VIDEO);
    video.hide();
    classifier = imageClassifier("MobileNet", modelLoaded);
}
function draw(){
    image(video, 0, 0, 400, 300);
    classifier.classify(video, gotResult);
}
function modelLoaded(){
    console.log("Uhu! O modelo carregou!")
}
var resultado_precisão = "";
function gotResult(error, results){
    if(error){
        console.error(error)
    }
    else{
        if((results[0].confidence > 0.5) && (resultado_precisão != results[0].label)){
            resultado_precisão = results[0].label;
            var synth = window.speechSynthesis;
            var speak_data = ("O objeto detectado é " + resultado_precisão);
            var utterThis = new SpeechSynthesisUtterance(speak_data);
            synth.speak(utterThis);
            document.getElementById("result-Object-name").innerHTML = resultado_precisão;
            document.getElementById("result-Object-accuracy").innerHTML = results[0].confidence.toFixed(5);
        }
    }
}