


var tessel = require('tessel');
var sum = 0;
var avg = 0;
var noiseLevel = "Initial";
var fs = require('fs');


var camera = require('camera-vc0706').use(tessel.port['A']);
var ambient = require('ambient-attx4').use(tessel.port['B']);
var http = require('http');

module.exports.getSound = function(cb){

  ambient.on('ready', function () {
   // Get array buffer of sound data.
    
        ambient.getSoundBuffer( function(err, sdata) {
          console.log("Sound Level:", sdata);
          if(Array.isArray(sdata)) console.log("Yeah");
            for(var i=0; i<sdata.length;i++){
              sum += sdata[i];
            }
            avg = sum/sdata.length;
            console.log("Average Sound is ", avg);

            if(avg<0.1){
              noiseLevel = "Quiet";
            } else if (avg>0.1 && avg<0.15){
              noiseLevel = "Meh";
            } else {
              noiseLevel = "Loud";
            }
            // return noiseLevel;
            cb(noiseLevel)
        });
  }); 

  ambient.on('error', function (err) {
    console.log(err)
  });
}

module.exports.getImage = function(cb){

  var notificationLED = tessel.led[3]; 
  camera.on('ready', function() {
    notificationLED.high();
    // Take the picture
    camera.takePicture(function(err, image) {
      if (err) {
        console.log('error taking image', err);
      } else {
        notificationLED.low();
        // Name the image
        var name = 'douglas.jpg';
        fs.writeFileSync('/app/tessel-code/scopeOut/douglas.jpg',image,'binary');
        // Save the image
        console.log('Picture saving as', name, '...');
        // console.log('Sending Image');

        cb(image)
        
        // Turn the camera off to end the script
        camera.disable();
      }
    });
  });

}

