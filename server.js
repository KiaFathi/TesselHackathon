var app = require('./index.js').app;
// server stuff
var express = require('express');
var fs = require('fs');
var server = express();
server.use(express.static(__dirname));
var port = 1111;
server.listen(port);


// current states
var currentNoiseLevel = 'Not Set';
var currentImage = '/thermometer-01.jpg';
var currentTemperature;
var currentBT;
console.log(app);

app(currentNoiseLevel, currentImage, currentTemperature, currentBT);


// handle all get requests
server.get('/*', function(req, res) {
  res.end("ScopeItOut");
});


// Receive room noise level on POST request
server.post('/noiseLevel', function(req, res) {
  req.on('data', function(data) {
    console.log("noiseLevel:");
    console.log(JSON.parse(data));
  });
});


// Receive image on POST request
server.post('/imageCapture', function(req, res) {
  var path = require('path');

  var body = '';
  filePath = path.join(__dirname, currentImage);
  req.setEncoding('binary');

  req.on('data', function(data) {
    body += data;
  });

  req.on('end', function () {
    fs.writeFile(filePath, body, 'binary', function(err) {
      console.log('upload error found');
      console.log(err);
      res.end();
    });
  });
});



