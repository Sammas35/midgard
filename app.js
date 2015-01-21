var express = require('express');
var path = require('path');
var http = require('http');
var routes = require('./routes/index');

var app = express();
var port = 8002;

app.use(express.static(path.join(__dirname, 'app')));
//app.use(express.static(__dirname));

app.use('/api', routes);

var server = http.createServer(app);

server.listen(port);
server.on('listening', function () {
    console.log('Server running at localhost:' + port);
});












