var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
//var port = process.env.PORT || 443
const path = require('path');
const router = express.Router();
//var path = '/example-smart-app';

console.log(__dirname);
console.log(process.cwd());
var app = express();

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/example-smart-app'));
  //__dirname : It will resolve to your project folder.
});
app.use('/', router);
//app.listen(process.env.port || 3000);
//console.log('Running at Port 3000');


//const http = require('http');
//const fs = require('fs');

//const server = http.createServer((req, res) => {
 // res.writeHead(200, { 'content-type': 'text/html' })
  //fs.createReadStream('/example-smart-app/index.html').pipe(res)
//});

//server.listen(process.env.PORT || 3000)
// viewed at http://localhost:8080
//res.sendFile(path.join(__dirname + '/index.html'));
//app.get('/', function(req, res) {
//    res.sendFile('/example-smart-app/index.html');
//});

//app.listen(port, function () {
//	console.log('Server started. Listening on port',port);
//});

























