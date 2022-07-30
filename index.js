
let http = require('http');
let fs = require('fs');

let handleRequest = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.readFile('./example-smart-app/index.html', null, function (error, data) {
        if (error) {
            response.writeHead(404);
            response.write('Whoops! File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
};

//.listen(process.env.PORT || 5000)

const PORT = process.env.PORT || 5000

http.createServer(handleRequest).listen(PORT);

/** 
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

var http = require('http');
var fs = require('fs');

const PORT = 8080; 
console.log("test");

app.use('/', function renderApp(req, res) {
  console.log("in app use");
//fs.readFile('/example-smart-app/index.html', function (err, html) {
  const filePath = path.resolve(__dirname, '..', '/example-smart-app/index.html', 'index.html');
  console.log(filePath);
    if (err) throw err;    

    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(PORT);
});
*/








//router.get('/',function(req,res){
 //express.static(path.join(__dirname, '/example-smart-app'));
  //res.sendFile(path.join(__dirname+'/example-smart-app'));
  //__dirname : It will resolve to your project folder.
//});
//app.use('/', router);
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

























