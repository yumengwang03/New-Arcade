var socket;

var buttonSize = 100;

function setup() {
  socket = io.connect('http://localhost:8000');

  createCanvas(windowWidth, windowHeight);
}

function draw() {
  socket.on('toP5', function(data) {
    console.log(data.thing);
    // if (data.xMoveL == 1) {
    //   playerPos.x -= playerSpeed;
    // }
    
    ellipse(width/2, height/2 - 3*buttonSize, buttonSize, buttonSize);


  });
}