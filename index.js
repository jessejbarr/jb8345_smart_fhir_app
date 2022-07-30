var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var port = process.env.PORT || 443
var path = '/example-smart-app';

var app = express();

// viewed at http://localhost:8080
//res.sendFile(path.join(__dirname + '/index.html'));
app.get('/', function(req, res) {
    res.sendFile('/example-smart-app/index.html');
});

app.listen(port, function () {
	console.log('Server started. Listening on port',port);
});

























