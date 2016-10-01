var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var port0 = 8000;
var url = 'localhost'
var server = app.listen(port0);
var io = require("socket.io").listen(server);

var SerialPort = require("serialport");
var port = new SerialPort("/dev/cu.usbmodem1411", {
    autoOpen: false
}, {
    baudrate: 9600
}, {
  parser: SerialPort.parsers.readline("\n")
});


app.use(express.static(__dirname + '/'));
console.log('Simple static server listening at ' + url + ':' + port0);

io.sockets.on('connection', function(socket) {
    console.log("socket");
    port.open(function(error) {
        if (error) {
            console.log('failed to open: ' + error);
        } else {
            console.log('Serial open');
            // socket.on('toServer', function (data) {
            // sPort.write(data.attack+" \n");
            // });

            port.on("data", function(data) {
                var dataString = data.toString();
                dataString = dataString.replace('/r',',');
                dataString = dataString.replace('/n',',');
                var update = [];
                update = dataString.split('a');
                console.log(update);
                // var movements = [];
                // movements = data.toString().split(',');
                // console.log(data.toString);
                // socket.emit('toP5', {thing: data.toString()});

                //socket.emit('toP5', { xMoveL: data[0], xMoveR: data[2], ZMoveU: data[4], ZMoveD: data[6], fireSignal: data[8]});
                //console.log(data);
            });
        }
    });

    // port.on('open', function() {
    //     port.write('serialport is open', function(err) {
    //         if (err) {
    //             return console.log('Error on write: ', err.message);
    //         } else {
    //             console.log('message written');
    //         }
    //     });
    // });
});
