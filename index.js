var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    request.get('https://api.bithumb.com/public/ticker/btc', function (error, response, data) {
        console.log('error:', error); // Print the error if one occurred
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //console.log('data:', data); // Print the HTML for the Google homepage.
        io.emit('json data', JSON.parse(data));
    }).on('error', function(err) {
        console.log(err)
    });

    /*socket.on('json data', function(msg){
        request('https://api.bithumb.com/public/ticker/btc', function (error, response, data) {
            //console.log('error:', error); // Print the error if one occurred
            //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            //console.log('data:', data); // Print the HTML for the Google homepage.
            io.emit('json data', JSON.parse(data));
        });
    });*/
});

