#include <Servo.h>

Servo servoOne;
Servo servoTwo;
Servo servoThree;
Servo servoFour;
Servo servoFive;
Servo servoSix;

const int button1 = 2;
const int button2 = 3;
const int button3 = 4;
const int button4 = 5;
const int button5 = 6;
const int button6 = 7;

int previousReading1 = 0;
int currentReading1 = 0;

int previousReading2 = 0;
int currentReading2 = 0;

int previousReading3 = 0;
int currentReading3 = 0;

int previousReading4 = 0;
int currentReading4 = 0;

int previousReading5 = 0;
int currentReading5 = 0;

int previousReading6 = 0;
int currentReading6 = 0;

int turnAngle = 170;

String answer = "";
unsigned long previousMillis = 0;
const long interval = 8000;
boolean gotAnswer = false;

boolean startCount = false;

void setup() {
  Serial.begin(9600);

  servoOne.attach(8);
  servoTwo.attach(9);
  servoThree.attach(10);
  servoFour.attach(11);
  servoFive.attach(12);
  servoSix.attach(13);


  pinMode(8, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(11, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(13, OUTPUT);

  pinMode(button1, INPUT);
  pinMode(button2, INPUT);
  pinMode(button3, INPUT);
  pinMode(button4, INPUT);
  pinMode(button5, INPUT);
  pinMode(button6, INPUT);

  digitalWrite (button1, LOW);
  digitalWrite (button2, LOW);
  digitalWrite (button3, LOW);
  digitalWrite (button4, LOW);
  digitalWrite (button5, LOW);
  digitalWrite (button6, LOW);
}

void loop() {
  servoOne.write(0);
  servoTwo.write(0);
  servoThree.write(0);
  servoFour.write(179);
  servoFive.write(0);
  servoSix.write(0);

  if (startCount) {
    unsigned long currentMillis = millis();
    if (currentMillis - previousMillis >= interval) {
      previousMillis = currentMillis;
//      Serial.print("Turn!");
      switch (answer.toInt()) {
        case 11:
          servoThree.write(turnAngle);
          delay(800);
          servoThree.write(0);
                    //Serial.println("The answer is " + answer + ". The third servo turns.");
          break;
        case 12:
          servoFour.write(0);
          delay(800);
          servoFour.write(turnAngle);
                   // Serial.println("The answer is " + answer + ". The forth servo turns.");
          break;
        case 13:
          servoSix.write(turnAngle);
          delay(800);
          servoSix.write(0);
                    //Serial.println("The answer is " + answer + ". The sixth servo turns.");
          break;
        case 14:
          servoOne.write(turnAngle);
          delay(800);
          servoOne.write(0);
               // Serial.println("The answer is " + answer + ". The first servo turns.");
          break;
        case 15:
          servoTwo.write(turnAngle);
          delay(800);
          servoTwo.write(0);
               // Serial.println("The answer is " + answer + ". The second servo turns.");
          break;
        case 16:
          servoThree.write(turnAngle);
          delay(800);
          servoThree.write(0);
                //Serial.println("The answer is " + answer + ". The third servo turns.");
          break;
        default:
//          Serial.println("something went wrong...");
          break;
      }
      answer = "";
      //      gotAnswer = true;
      startCount = false;
    }
  } else {
    while (Serial.available()) {
      answer = Serial.readStringUntil('/n');

      if (!gotAnswer) {
//        Serial.print("Got new answer: ");
//        Serial.println(answer.toInt());

        if (answer.toInt() > 10 && answer.toInt() < 18) {
          startCount = true;
        }
      }
    }
  }
  int reading1 = digitalRead(button1);
  int reading2 = digitalRead(button3);
  int reading3 = digitalRead(button2);
  int reading4 = digitalRead(button4);
  int reading5 = digitalRead(button5);
  int reading6 = digitalRead(button6);


  currentReading1 = reading1;
  currentReading2 = reading2;
  currentReading3 = reading3;
  currentReading4 = reading4;
  currentReading5 = reading5;
  currentReading6 = reading6;


  if (previousReading1 != currentReading1 && currentReading1 == 1) {
    Serial.println(1);
  } else if (previousReading1 != currentReading1 && currentReading1 == 0) {
    Serial.println(0);
  }

  if (previousReading2 != currentReading2 && currentReading2 == 1) {
    Serial.println(2);
  } else if (previousReading2 != currentReading2 && currentReading2 == 0) {
    Serial.println(0);
  }

  if (previousReading3 != currentReading3 && currentReading3 == 1) {
    Serial.println(3);
  } else if (previousReading3 != currentReading3 && currentReading3 == 0) {
    Serial.println(0);
  }

  if (previousReading4 != currentReading4 && currentReading4 == 1) {
    Serial.println(4);
  } else if (previousReading4 != currentReading4 && currentReading4 == 0) {
    Serial.println(0);
  }

  if (previousReading5 != currentReading5 && currentReading5 == 1) {
    Serial.println(5);
  } else if (previousReading5 != currentReading5 && currentReading5 == 0) {
    Serial.println(0);
  }

  if (previousReading6 != currentReading6 && currentReading6 == 1) {
    Serial.println(6);
  } else if (previousReading6 != currentReading6 && currentReading6 == 0) {
    Serial.println(0);
  }

  previousReading1 = currentReading1;
  previousReading2 = currentReading2;
  previousReading3 = currentReading3;
  previousReading4 = currentReading4;
  previousReading5 = currentReading5;
  previousReading6 = currentReading6;
  
}
