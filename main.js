Webcam.set({
    width:350,
    height:300,
    image_format:'heic',
    heic_quality:100
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version -', ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/if6G4w_h3/model.json', modelLoaded);

function modelLoaded(){
    console.log("model is loaded yeaaaa");
}

prediction_1 = "";
prediction_2 = "";

function speak(){
    var Synth=window.speechSynthesis;
    speak_data1 = "The first prediction is"+prediction_1;
    speak_data2 = "and the second prediction is"+prediction_2;

    var utterThis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    Synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
};

function gotResult(error, results){
    if (error){ 
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById('result_name').innerHTML=results[0].label;
        document.getElementById('result_name2').innerHTML=results[1].label;

        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();

            if(results[0].label=="victory"){
                document.getElementById("update_emoji").innerHTML="&#9996;";
            }

            if(results[0].label=="highFive"){
                document.getElementById("update_emoji").innerHTML="&#9995;";
            }

            if(results[0].label=="chilling"){
                document.getElementById("update_emoji").innerHTML="&#129304;";
            }
            



            if(results[1].label=="victory"){
                document.getElementById("update_emoji2").innerHTML="&#9996;";
            }

            if(results[1].label=="highFive"){
                document.getElementById("update_emoji2").innerHTML="&#9995;";
            }

            if(results[1].label=="chilling"){
                document.getElementById("update_emoji2").innerHTML="&#129304;";
            }
            
        }

}