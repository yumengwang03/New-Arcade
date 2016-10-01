// the game is here: http://www.kongregate.com/games/danielben/i-wish-i-were-the-moon

#include <Wire.h>
#include <SPI.h>
#include <Adafruit_LSM9DS0.h> //gyro stuff
#include <Adafruit_Sensor.h> 
#include <Bounce.h>

// i2c
Adafruit_LSM9DS0 lsm = Adafruit_LSM9DS0(); // connection for teensy LC: SCL-19, SDA-18

const int heartPin = 0; // heartbreak button pin
const int clickPin = 1; // mouse click pin
const int patternPin = 2; // to close the game, for now - cmd+w
Bounce heartButton = Bounce(heartPin, 10); // 10ms to detect "sensitivity"
Bounce clickButton = Bounce(clickPin, 10);
Bounce patternButton = Bounce(patternPin, 10);

unsigned long time;
int currentTime = 0;

boolean lastState = false;

int xGyroRaw = 0;
int yGyroRaw = 0;
int xGyroSum = 0;
int yGyroSum = 0;
int xGyro = 0;
int yGyro = 0;
int count = 0;

boolean up = false;
boolean down = false;
boolean left = false;
boolean right = false;

// set up gyro
void setupSensor() {
  lsm.setupGyro(lsm.LSM9DS0_GYROSCALE_245DPS);
}

void setup() {
  Mouse.screenSize(2880, 1800, true);

  pinMode(heartPin, INPUT_PULLUP);
  pinMode(clickPin, INPUT_PULLUP);
  pinMode(patternPin, INPUT_PULLUP);

  // gyro stuff
  while (!Serial); // flora & leonardo

  Serial.begin(9600);
  Serial.println("LSM raw read demo");

  // Try to initialise and warn if we couldn't detect the chip
  if (!lsm.begin())
  {
    Serial.println("unable to initialize the LSM9DS0. Check your wiring!");
    while (1);
  }
  Serial.println("Found LSM9DS0 9DOF");
  Serial.println("");
}

void loop() {
  heartButton.update();
  clickButton.update();
  patternButton.update();

  if (heartButton.risingEdge()) {
    //Serial.println("lala");
    //Keyboard.println("r");
    Keyboard.set_key1(KEY_R);
    Keyboard.send_now();
    delay(100); // because the game restarts on key release
    Keyboard.set_key1(0);
    Keyboard.send_now();
  }

  if (clickButton.fallingEdge()) {
    Mouse.click();
  }

  if (patternButton.fallingEdge()) {
    pattern();
  }

  lsm.read();

  gyroMovement();
  mouseMove();
}

//read gyro data very 10 milliseconds, reand 20 of them and get the average value
void gyroMovement() {
  time = millis();
  if (time - currentTime > 10) {
    lastState = true;
    currentTime = time;
  } else {
    lastState = false;
  }
  if (lastState) {
    xGyroRaw = (int)lsm.gyroData.x;
    yGyroRaw = (int)lsm.gyroData.y;
    xGyroSum += xGyroRaw;
    yGyroSum += yGyroRaw;
    count++;
  }
  int readThreshold = 20;
  if (count > readThreshold) {
    xGyro = xGyroSum / readThreshold;
    yGyro = yGyroSum / readThreshold;
    xGyroSum = 0;
    yGyroSum = 0;
    count = 0;
  }

  if (xGyro > 9000) {
    up = true;
  } else if (xGyro < -10000) {
    down = true;
  } else {
    up = false;
    down = false;
  }
  if (yGyro > 7000) {
    left = true;
  } else if (yGyro < -7000) {
    right = true;
  } else {
    left = false;
    right = false;
  }

  //  Serial.print(up);
  //  Serial.print(down);
  //  Serial.print(left);
  //  Serial.println(right);
}

// gyro to move mouse
void mouseMove() {
  int pixelStep = 2;
  if (up) {
    Mouse.move(0, -pixelStep);
    //  Mouse.moveTo(10, 10);
  }
  if (down) {
    Mouse.move(0, pixelStep);
  }
  if (left) {
    Mouse.move(-pixelStep, 0);
  }
  if (right) {
    Mouse.move(pixelStep, 0);
  }
}

// just close the game
void pattern() {
  //  Mouse.moveTo(1800, 600);
  Keyboard.set_modifier(MODIFIERKEY_GUI);
  Keyboard.set_key3(KEY_W);
  Keyboard.send_now();
  delay(100);
  Keyboard.set_modifier(0);
  Keyboard.set_key3(0);
  Keyboard.send_now();
}

