var express = require('express');
var app = express();
var server = app.listen(8082);
var io = require("socket.io").listen(server);
var SerialPort = require("serialport");

SerialPort.list(function(err, ports) {
    ports.forEach(function(port) {
        console.log(port.comName);
    });
});

var port = new SerialPort("/dev/cu.usbmodem1421", {
    autoOpen: false
}, {
    baudRate: 9600,
    parser: SerialPort.parsers.readline('\n')
});

app.use(express.static('public'));
console.log("Server running on 8082");

console.log(port.isOpen());

try {
    io.sockets.on('connection', function(socket) {
        //if (!port.isOpen) {
        port.open(function(error) {
            port.resume();
            if (error) {
                console.log('failed to open: ' + error);
            } else {
                console.log('Serial open');
                socket.on('toServer', function(data) {
                    console.log('right answer:', data.answer);
                    port.write(data.answer + " \n");
                    console.log("port is open: " + port.isOpen());
                });


                port.on("data", function(data) {
                    console.log("user answer:" + parseInt(data));
                    socket.emit('toClient', {
                        button: parseInt(data)
                    });

                });
                socket.on('disconnect', function() {
                    console.log("Client shas disconnected");
                    port.close();
                });
            }
        });
        //}
    });
} catch (error) {
    console.log(error);
}
