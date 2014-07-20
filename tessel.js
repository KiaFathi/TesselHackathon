var tessel = require('tessel');

var noiseLevel = 
console.log("im here");

var scoper = require('./tessel-code/scopeOut/scoper.js');
var http = require('http');
var fs = require('fs');

setInterval(function(){

  scoper.getSound(function(level) {
    
      var options = {
      host: '10.7.25.237',
      port: 1111,
      path: '/noiseLevel',
      method: 'POST',
      header : {
        "Content-Type" : "application/json"
      }
    };

    var req = http.request(options, function(){});
    req.write(JSON.stringify(level));
    req.end();

  });
},500);

// scoper.getImage(function(image){

//  var options = {
//    host: '10.7.24.253',
//    port: 1111,
//    path: '/imageCapture',
//    method: 'POST',
//    header : {
//      "Content-Type" : "image/jpeg"
//    }
//  };

//  var req = http.request(options, function(){});
  
//  req.end(fs.readFileSync('/app/tessel-code/scopeOut/douglas.jpg'));
//  // req.write('/app/tessel-code/scopeOut/douglas.jpg');
//  // req.end();
//  console.log('File sent');

// });



