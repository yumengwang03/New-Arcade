var express = require('express');
var osc = require('osc-min');
var dgram = require('dgram');
var socket = require('socket.io');

var app = express();
var server = app.listen(8080);
var io = socket(server);
var OSCport = 9998;

app.use(express.static('public'));
console.log("Server running on 8080");


// var sock = dgram.createSocket('udp4', function(msg, rinfo) {
//     var error, error1;
//     var OSCmsg;
//     var output;
//     try {
//         OSCmsg = osc.fromBuffer(msg);
//         output = OSCmsg.args[0].value;
//         console.log(output);
//         // io.sockets.on('connection', function(socket) {
//         //     console.log("new connection: " + socket.id);
//         //     socket.emit('toClient', {
//         //         outputMsg: output
//         //     });
//         // });
//         //return output;
//     } catch (error1) {
//         error = error1;
//         console.log("invalid OSC packet");
//     }
// });
//
// sock.bind(OSCport);
console.log("Starting server:");
console.log("Listening for OSC messages on port: " + OSCport);

io.sockets.on('connection', function(socket) {
    console.log("new connection: " + socket.id);
    var sock = dgram.createSocket('udp4', function(msg, rinfo) {
        var error, error1;
        var OSCmsg;
        var output;
        try {
            OSCmsg = osc.fromBuffer(msg);
            output = OSCmsg.args[0].value;
            console.log(output);
            socket.emit('toClient', {
                outputMsg: output
            });
        } catch (error1) {
            error = error1;
            console.log("invalid OSC packet");
        }
    });
    sock.bind(OSCport);
});
