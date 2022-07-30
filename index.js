var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
//var port = process.env.PORT || 443
var path = '/example-smart-app';

var app = express();

const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' })
  fs.createReadStream('/example-smart-app/index.html').pipe(res)
});

//server.listen(process.env.PORT || 3000)
// viewed at http://localhost:8080
//res.sendFile(path.join(__dirname + '/index.html'));
//app.get('/', function(req, res) {
//    res.sendFile('/example-smart-app/index.html');
//});

//app.listen(port, function () {
//	console.log('Server started. Listening on port',port);
//});

























