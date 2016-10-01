var socket;

var kimi_normal;
var kimi_yi;
var kimi_woo;
var kimi_ahh;
var title;

var audioIn;
var inputGroup = [];

var currentTime = 0;
var receiving = false;

var playNormal, playYi, playWoo, playAhh;

function preload() {
  kimi_normal = loadAnimation("assets/kimi-normal1.png", "assets/kimi-normal8.png");
  kimi_yi = loadAnimation("assets/kimi-yiii1.png", "assets/kimi-yiii8.png");
  kimi_woo = loadAnimation("assets/kimi-woo1.png", "assets/kimi-woo6.png");
  kimi_ahh = loadAnimation("assets/kimi-ahh1.png", "assets/kimi-ahh8.png");
  title = loadAnimation("assets/title1.png", "assets/title5.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  socket = io.connect('http://localhost:8080');
  socket.on('toClient', function(data) {
    // console.log(data.outputMsg);
    audioIn = data.outputMsg;
  });

  playNormal = false;
  playYi = false;
  playWoo = false;
  playAhh = false;
}

function draw() {
  background(255, 255, 255);
  animation(title, windowWidth / 2 - 60, 100);

  millisecond = millis();
  var threshold = 1500;
  if (millisecond - currentTime >= threshold) {
    receiving = true;
    currentTime = millisecond;
  } else {
    receiving = false;
  }
  
  if (audioIn == undefined) {
    animation(kimi_normal, windowWidth / 2 - 40, 360);
  }

  if (receiving) {
    console.log(audioIn);
    console.log(playAhh + " " + playWoo + " " + playYi + " " + playNormal);
    if (audioIn == 1) {
      playAhh = true;
      playWoo = false;
      playYi = false;
      playNormal = false;
    } else if (audioIn == 2) {
      playAhh = false;
      playWoo = true;
      playYi = false;
      playNormal = false;
    } else if (audioIn == 3) {
      playAhh = false;
      playWoo = false;
      playYi = true;
      playNormal = false;
    } else if (audioIn == 4) {
      playAhh = false;
      playWoo = false;
      playYi = false;
      playNormal = true;
    }
    
  }
  if (playAhh) {
    animation(kimi_ahh, windowWidth / 2 - 40, 360);
  }
  if (playWoo) {
    animation(kimi_woo, windowWidth / 2 - 40, 360);
  }
  if (playYi) {
    animation(kimi_yi, windowWidth / 2 - 40, 360);
  }
  if (playNormal) {
    animation(kimi_normal, windowWidth / 2 - 40, 360);
  }


  //animation(kimi_normal, windowWidth / 2 - 40, 340);
  //animation(kimi_yi, windowWidth / 2 - 40, 340);
  //animation(kimi_woo, windowWidth / 2 - 40, 340);
  //   animation(kimi_ahh, windowWidth / 2 - 40, 340);
  // }
}