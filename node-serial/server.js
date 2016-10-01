var SerialPort = require('serialport');
var WS = require('ws').Server;
var SERVER_PORT = 8080;
var wss = new WebSocketServer({
    port: SERVER_PORT
});
var connections = [];

wss.on('connection', handleConnection);
function handleConnection(client) {
  console.log("new connectio");
  connections.push(client);
}

function broadcast(data) {
  for (var connection in connetions) {
    connections[connection].send(data);
  }
}

// SerialPort.list(function(err, ports) {
//   ports.forEach(function(port) {
//     console.log(port.comName);
//   });
// });

var portName = '/dev/cu.usbmodem457241';

var port = new SerialPort(portName, {
    baudRate: 9600,
    parser: SerialPort.parsers.readline('\n')
});

port.on('data', sendSerialData);
port.on('open', showPortOpen);
port.on('close', showPortClose);
// port.on('error', showError);
function sendSerialData() {
    console.log(data);
}

function showPortOpen() {
    console.log("port open. data rate: " + port.options.baudRate);
}

function showPortClose() {

}
