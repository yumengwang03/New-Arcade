#include <Servo.h>

Servo servo1;
Servo servo2;
Servo servo3;
Servo servo4;
Servo servo5;
Servo servo6;

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

int turnAngle = 150;
int pos;

String answer = "";

unsigned long timer; // the timer
boolean timedOut = true;
boolean timedOut2 = true;// set to true when timer fired
unsigned long INTERVAL = 8000; // the timeout interval
unsigned long INTERVAL2 = 5000;
boolean gotAnswer = false;
boolean userAnswer = false;

void setup() {
  Serial.begin(9600);

  servo1.attach(8);
  servo2.attach(9);
  servo3.attach(10);
  servo4.attach(11);
  servo5.attach(12);
  servo6.attach(13);

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
  servo1.write(0);
  servo2.write(0);
  servo3.write(0);
  servo4.write(0);
  servo5.write(0);
  servo6.write(0);

  while (Serial.available()) {
    answer = Serial.readStringUntil('/n');
    if (answer.toInt() > 10 && answer.toInt() < 18) {
      userAnswer = false;
      timer = millis();
    }

    if (answer.toInt() > 20 && answer.toInt() < 28) {
      userAnswer = false;
      timedOut = false;
      timer = millis();
    }
    if (answer.toInt() > 30 && answer.toInt() < 38) {
      userAnswer = false;
      timedOut = false;
      timedOut2 = false;
      timer = millis();
    }
  }

  if ((timedOut == false) && (timedOut2 == false) && ((millis() - timer) > INTERVAL2)) {
    switch (answer.toInt()) {
      case 31:
        for (pos = 0; pos <= turnAngle; pos += 1) {
          servo3.write(pos);
          delay(3);
        }
        for (pos = turnAngle; pos >= 0; pos -= 1) {
          servo3.write(pos);
          delay(3);
        }
        //Serial.println("The answer is " + answer + ". The third servo turns.");
        break;
      case 32:

        for (pos = 0; pos <= turnAngle; pos += 1) {
          servo4.write(pos);
          delay(3);
        }
        for (pos = turnAngle; pos >= 0; pos -= 1) {
          servo4.write(pos);
          delay(3);
        }
        // Serial.println("The answer is " + answer + ". The forth servo turns.");
        break;
      case 33:

        for (pos = 0; pos <= turnAngle; pos += 1) {
          servo6.write(pos);
          delay(3);
        }
        for (pos = turnAngle; pos >= 0; pos -= 1) {
          servo6.write(pos);
          delay(3);
        }
        //Serial.println("The answer is " + answer + ". The sixth servo turns.");
        break;
      case 34:

        for (pos = 0; pos <= turnAngle; pos += 1) {
          servo1.write(pos);
          delay(3);
        }
        for (pos = turnAngle; pos >= 0; pos -= 1) {
          servo1.write(pos);
          delay(3);
        }
        // Serial.println("The answer is " + answer + ". The first servo turns.");
        break;
      case 35:

        for (pos = 0; pos <= turnAngle; pos += 1) {
          servo2.write(pos);
          delay(3);
        }
        for (pos = turnAngle; pos >= 0; pos -= 1) {
          servo2.write(pos);
          delay(3);
        }
        // Serial.println("The answer is " + answer + ". The second servo turns.");
        break;
      case 36:

        for (pos = 0; pos <= turnAngle; pos += 1) {
          servo5.write(pos);
          delay(3);
        }
        for (pos = turnAngle; pos >= 0; pos -= 1) {
          servo5.write(pos);
          delay(3);
        }
       case 37:

        for (pos = 0; pos <= turnAngle; pos += 1) {
          servo5.write(pos);
          delay(3);
        }
        for (pos = turnAngle; pos >= 0; pos -= 1) {
          servo5.write(pos);
          delay(3);
        }
        //Serial.println("The answer is " + answer + ". The third servo turns.");
        break;
      default:
        //          Serial.println("something went wrong...");
        break;
    }
    answer = "";
    timedOut2 = false;
  }
  if ((timedOut == false) && ((millis() - timer) > INTERVAL)) {
    switch (answer.toInt()) {
      case 21:
        for (pos = 0; pos <= turnAngle; pos += 1) {
          servo3.write(pos);
          delay(3);
        }
        for (pos = turnAngle; pos >= 0; pos -= 1) {
          servo3.write(pos);
          delay(3);
        }
        //Serial.println("The answer is " + answer + ". The third servo turns.");
        break;
      case 22:

        for (pos = 0; pos <= turnAngle; pos += 1) {
          servo4.write(pos);
          delay(3);
        }
        for (pos = turnAngle; pos >= 0; pos -= 1) {
          servo4.write(pos);
          delay(3);
        }
        // Serial.println("The answer is " + answer + ". The forth servo turns.");
        break;
      case 23:

        for (pos = 0; pos <= turnAngle; pos += 1) {
          servo6.write(pos);
          delay(3);
        }
        for (pos = turnAngle; pos >= 0; pos -= 1) {
          servo6.write(pos);
          delay(3);
        }
        //Serial.println("The answer is " + answer + ". The sixth servo turns.");
        break;
      case 24:

        for (pos = 0; pos <= turnAngle; pos += 1) {
          servo1.write(pos);
          delay(3);
        }
        for (pos = turnAngle; pos >= 0; pos -= 1) {
          servo1.write(pos);
          delay(3);
        }
        // Serial.println("The answer is " + answer + ". The first servo turns.");
        break;
      case 25:

        for (pos = 0; pos <= turnAngle; pos += 1) {
          servo2.write(pos);
          delay(3);
        }
        for (pos = turnAngle; pos >= 0; pos -= 1) {
          servo2.write(pos);
          delay(3);
        }
        // Serial.println("The answer is " + answer + ". The second servo turns.");
        break;
      case 26:

        for (pos = 0; pos <= turnAngle; pos += 1) {
          servo5.write(pos);
          delay(3);
        }
        for (pos = turnAngle; pos >= 0; pos -= 1) {
          servo5.write(pos);
          delay(3);
        }
        case 27:

        for (pos = 0; pos <= turnAngle; pos += 1) {
          servo5.write(pos);
          delay(3);
        }
        for (pos = turnAngle; pos >= 0; pos -= 1) {
          servo5.write(pos);
          delay(3);
        }
        //Serial.println("The answer is " + answer + ". The third servo turns.");
        break;
      default:
        //          Serial.println("something went wrong...");
        break;
    }
    answer = "";
    timedOut = true;
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
    userAnswer = true;
  } else if (previousReading1 != currentReading1 && currentReading1 == 0) {
    Serial.println(0);
    userAnswer = true;
  }

  if (previousReading2 != currentReading2 && currentReading2 == 1) {
    Serial.println(2);
    userAnswer = true;
  } else if (previousReading2 != currentReading2 && currentReading2 == 0) {
    Serial.println(0);
    userAnswer = true;
  }

  if (previousReading3 != currentReading3 && currentReading3 == 1) {
    Serial.println(3);
    userAnswer = true;
  } else if (previousReading3 != currentReading3 && currentReading3 == 0) {
    Serial.println(0);
    userAnswer = true;
  }

  if (previousReading4 != currentReading4 && currentReading4 == 1) {
    Serial.println(4);
    userAnswer = true;
  } else if (previousReading4 != currentReading4 && currentReading4 == 0) {
    Serial.println(0);
    userAnswer = true;
  }

  if (previousReading5 != currentReading5 && currentReading5 == 1) {
    Serial.println(5);
    userAnswer = true;
  } else if (previousReading5 != currentReading5 && currentReading5 == 0) {
    Serial.println(0);
    userAnswer = true;
  }

  if (previousReading6 != currentReading6 && currentReading6 == 1) {
    Serial.println(6);
    userAnswer = true;
  } else if (previousReading6 != currentReading6 && currentReading6 == 0) {
    Serial.println(0);
    userAnswer = true;
  }

  previousReading1 = currentReading1;
  previousReading2 = currentReading2;
  previousReading3 = currentReading3;
  previousReading4 = currentReading4;
  previousReading5 = currentReading5;
  previousReading6 = currentReading6;

}




