var socket;
var gameStarted = false;

var showResult = false;
var isAnswered = false;

var buttonNumber = 6;
var timer; // timer for setInterval in timing function
var countdown;
var questionTime = 4000; // time allowed for each question
var timeIndicator;

// start screen
var mainTitle;

// question screen
var qTitle;
var qOptions = [];
var buttonNumber = 6;
var qNum = 7; // numbers of questions

// Arduino stuff
var buttonPressed = 0;

var rightAnswer = 0;
var runTime = 0;
var result = 0;

var gotAnswer = false;



var rightAudios = ['audio/right-0.wav', 'audio/right-1.wav', 'audio/right-2.wav', 'audio/right-3.wav', 'audio/right-4.wav', 'audio/right-5.wav', 'audio/right-6.wav', 'audio/right-7.wav'];
var wrongAudios = ['audio/wrong-0.wav', 'audio/wrong-1.wav', 'audio/wrong-2.wav', 'audio/wrong-3.wav', 'audio/wrong-4.wav', 'audio/wrong-5.wav', 'audio/wrong-6.wav', 'audio/wrong-7.wav'];
var failAudio = 'audio/fail.wav';

var rightSounds = [];
var wrongSounds = [];
var failSound;

var currentLevel = 1;
var titlePosX = 400;
var titlePosY = 400;
var speed = 0;


var questionListRaw = [{
        "isText": true,
        "question": "What is the maximum character count for an SMS message?",
        "options": [140, 160, 153, 700, 918, 999],
        "answer": 5
    },
    {
        "isText": true,
        "question": "What is the correct spelling for a system built to carry water?",
        "options": ["aquaduct", "aguaduct", "aqueduc", "aqueduct", "aquaduck", "aquiduct"],
        "answer": 4
    },
    {
        "isText": true,
        "question": "If Chuck tells everyone he is a &ldquo;numismatist&rdquo;, they would know he collects which of the following?",
        "options": ["Maps", "Coins", "Spoons", "Numbers", "Postcards", "Pins"],
        "answer": 2
    },
    {
        "isText": true,
        "question": "Thirty percent of forty percent is equal to twenty percent of what percent?",
        "options": [35, 40, 45, 50, 55, 60],
        "answer": 6
    },
    {
        "isText": true,
        "question": "Which European country borders France to the south?",
        "options": ["Spain", "Switzerland", "Italy", "Germany", "England", "Portugal"],
        "answer": 1
    },
    {
        "isText": true,
        "question": "What is the temperature at which water boils at sea level in Fahrenheit?",
        "options": [100, 200, 212, 373, 160, 297],
        "answer": 3
    },
    {
        "isText": true,
        "question": "What is the answer to the following equation: 4+4x4-4+4=?",
        "options": [32, 20, 12, 24, 16, 18],
        "answer": 2
    },
    {
        "isText": true,
        "question": "Which of the following is the scientific term for an organism that makes its food from inorganic materials?",
        "options": ["Phototroph", "Heterotroph", "Necrotroph", "Autotroph", "Chemotroph", "Mixotroph"],
        "answer": 4
    },
    {
        "isText": true,
        "question": "Which word contains a long vowel sound in the following sentence? 'Never underestimate the turtle of doom'",
        "options": ["Never", "Underestimate", "The", "Turtle", "Of", "Doom"],
        "answer": 2
    },
    {
        "isText": true,
        "question": "Which one of the following objects is different from the others?",
        "options": ["shampoo", "sponge", "tear", "cloud", "sea", "orange juice"],
        "answer": 2
    },
    {
        "isText": true,
        "question": "What is the next number in the following sequence: 2, 4, 12, 48, ___?",
        "options": [52, 60, 96, 100, 144, 240],
        "answer": 6
    },
    {
        "isText": true,
        "question": "Which activity is different from the others?",
        "options": ["chew", "nibble", "bite", "swallow", "lick", "masticate"],
        "answer": 4
    },
    {
        "isText": true,
        "question": "Which activity is different from the others?",
        "options": ["slumber", "snore", "yawn", "nap", "doze", "dream"],
        "answer": 3
    },
    {
        "isText": true,
        "question": "Which number does not fit in the sequence?",
        "options": [2, 4, 10, 28, 84, 244],
        "answer": 5
    },
    {
        "isText": true,
        "question": "If you count from one to hundred, how many threes will you pass on the way?",
        "options": [22, 19, 20, 28, 10, 21],
        "answer": 3
    },
    {
        "isText": true,
        "question": "2, 3, 5, 9, 17, 33 Which number is the next?",
        "options": [63, 64, 65, 66, 67, 68],
        "answer": 3
    },
    {
        "isText": true,
        "question": "Which of the following is a noun meaning social awkwardness?",
        "options": ["Vertigo", "Behemoth", "Gaucherie", "Hovel", "Mendacity", "Curmudgeon"],
        "answer": 3
    },
    {
        "isText": true,
        "question": "Which of the following is a noun meaning &ldquo;a distorted representation of something&rdquo;?",
        "options": ["Parapet", "Altruism", "Utopia", "Verbiage", "Travesty", "Complicity"],
        "answer": 5
    },
    {
        "isText": true,
        "question": "Which of the following is a noun meaning &ldquo;a distorted representation of something&rdquo;?",
        "options": ["Parapet", "Altruism", "Utopia", "Verbiage", "Travesty", "Complicity"],
        "answer": 5
    },
    {
        "isText": false,
        "type": 0,
        "question": "Which of the following is categorized as a <i>cumulus</i> cloud?",
        "options": ["cloud0.png", "cloud1.png", "cloud2.png", "cloud3.png", "cloud4.png", "cloud5.png"],
        "answer": 2
    },
    {
        "isText": false,
        "type": 1,
        "question": "shape.png",
        "options": ["shape0.png", "shape1.png", "shape2.png", "shape3.png", "shape4.png", "shape5.png"],
        "answer": 5
    },
    {
        "isText": false,
        "type": 1,
        "question": "polygon.png",
        "options": ["polygon0.png", "polygon1.png", "polygon2.png", "polygon3.png", "polygon4.png", "polygon5.png"],
        "answer": 6
    },
    {
        "isText": false,
        "type": 1,
        "question": "triangle.png",
        "options": ["triangle0.png", "triangle1.png", "triangle2.png", "triangle3.png", "triangle4.png", "triangle5.png"],
        "answer": 5
    }
];

var essayQuestion = {
    "isText": true,
    "question": "What is the meaning of victory?",
    "options": ["V", "I", "C", "T", "O", "R"],
    "answer": 123456
};

function preload() {
    mySound = loadSound('audio/right-0.wav');

    for (var i = 0; i < rightAudios.length; i++) {
        var rightSound = loadSound(rightAudios[i]);
        rightSounds.push(rightSound);
    }

    for (var i = 0; i < wrongAudios.length; i++) {
        var wrongSound = loadSound(wrongAudios[i]);
        wrongSounds.push(wrongSound);
    }
    failSound = loadSound(failAudio);
}

function setup() {
    socket = io.connect('http://localhost:8082');
    socket.on('toClient', function(data) {
        if (data.button != null) {
            buttonPressed = data.button;
            console.log(buttonPressed);
        }
    });
    noCanvas();
    timeIndicator = createElement('h1', '');
    timeIndicator.class('_timer');
    startScreen();
    countdown = questionTime;
    questionList = randomIndex();

    //mySound.setVolume(1);
    for (var i = 0; i < wrongSounds.length; i++) {
        // var wrongS = wrongAudios[i];
        // var rightS = rightAudios[i];

        wrongSounds[i].setVolume(1);
        rightSounds[i].setVolume(1);
    }

    //console.log(wrongAudios);
    //wrongAudios[0].setVolume(1);
    failSound.setVolume(1);
}

//var nextButtonPressed = 0;

function draw() {
    if (rightAnswer == 0) {
        document.body.style.backgroundColor = "white";
    }

    // press any button to start
    if (!gameStarted) {
        document.body.style.backgroundColor = "white";
        if (buttonPressed >= 1 && buttonPressed <= 6) {
            //console.log(buttonPressed);
            setTimeout(function() {
                gameStarted = true;
            }, 200);
        }
    } else {
        runTime++;
        if (runTime <= 1) {
            startPlay();
        }
        //console.log(result);
        if (!gotAnswer) {
            if (buttonPressed == 0) {
                document.body.style.backgroundColor = "white";
            } else if (buttonPressed == rightAnswer) {
                gotAnswer = true;
                result = 1;
                isAnswered = true;
                gotAnswer = true;
            } else {
                gotAnswer = true;
                result = 2;
                isAnswered = true;
                gotAnswer = true;
            }
            if (isAnswered) {
                if (result == 1) {
                    correct();
                } else if (result == 2) {
                    incorrect();
                }
            }

        }

        if (currentLevel == 3) {
            speed = random(-10, 10);
            if (qTitle != undefined) {
                qTitle.position(windowWidth / random(4, 5) + speed, 50);
            }
            //qOptions
            for (var i = 0; i < buttonNumber; i++) {
                if (qOptions[i] != undefined) {
                    qOptions[i].position(i * windowWidth / 7, windowHeight / random(4, 6) + speed);
                }
            }

        }

    }
}

function correct() {
    document.body.style.backgroundColor = "green";
    if (currentLevel >= 1 && currentLevel < 3) {
        currentLevel++;
    }
    //console.log("correct");
    // myVoice.speak(right[iptr]);
    // iptr = (iptr + 1) % right.length; // increment

    //rightSounds[int(random(0, 8))].play();
}

function incorrect() {
    document.body.style.backgroundColor = "red";
    if (currentLevel > 1 && currentLevel <= 3) {
        currentLevel--;
    }

    //console.log("incorrect");
    // myVoice.speak(wrong[iptr2]);
    // iptr2 = (iptr2 + 1) % wrong.length; // increment
    //mySound.play();

    //wrongSounds[int(random(0, 8))].play();
}

function startScreen() {
    mainTitle = createElement('h3', "Hi, I'm Victor! Do you want to play a game with me? Press any button to start.");
    mainTitle.class('_mainTitle');
}

function startPlay() {
    timing();
}

var qIndex = 0;

function timing() {
    timer = window.setInterval(function() {
        timeIndicator.html(countdown / 1000);
        countdown -= 1000;
        if (countdown == questionTime - 1000) {
            getQuestion(qIndex);
            if (qIndex <= qNum) {
                qIndex++;
            }
        } else if (countdown <= 0) {
            countdown = questionTime;
        }
    }, 1000);
}

function randomIndex() {
    var order = [];
    var startOrder = [];
    var startList = [];
    for (var i = 0; i < questionListRaw.length + 1; i++) {
        order.push(i);
    }

    for (order, i = order.length; i--;) {
        var random = order.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
        //console.log(random);
        if (startOrder.length < buttonNumber) {
            startOrder.push(random);
        }
    }
    console.log(startOrder);

    for (var j = 0; j < buttonNumber; j++) {
        startList.push(questionListRaw[startOrder[j]]);
    }
    startList.push(essayQuestion);
    //console.log(startList);

    //test = [questionListRaw[0], questionListRaw[1], questionListRaw[2], questionListRaw[3], questionListRaw[4], questionListRaw[5], questionListRaw[6]];
    return startList
}

function getQuestion(index) {
    //document.body.style.backgroundColor = "white";
    result = 0;
    gotAnswer = false;
    buttonPressed = 0;
    if (index >= qNum) {
        // no more questions
        clearInterval(timer);
        console.log("finished");
        endScreen();
    } else {
        // go to the next question
        if (index == 0) {
            mainTitle.remove();
        } else if (index > 0) {
            // if it's not the first question, remove the previous question first
            qTitle.remove();
            for (var i = 0; i < buttonNumber; i++) {
                qOptions[i].remove();
            }
        }

        rightAnswer = questionList[index].answer;

        socket.emit('toServer', {
            answer: rightAnswer + 10 * currentLevel
        });


        console.log("start question: " + index + " right answer is: " + rightAnswer + " current level is: " + currentLevel);
        if (questionList[index].isText) {
            // a text question
            qTitle = createElement('p', questionList[index].question);
            qTitle.class('question_title');
            qOptions = [];
            for (var i = 0; i < buttonNumber; i++) {
                var qOption = createElement('p', questionList[index].options[i]);
                qOption.class('question_option');
                qOptions.push(qOption);
            }
        } else {
            // an image question
            if (questionList[index].type == 1) {
                qTitle = createImg("assets/" + questionList[index].question);
                qTitle.class('question_img');
            } else if (questionList[index].type == 0) {
                qTitle = createElement('p', questionList[index].question);
                qTitle.class('question_title');
            }
            qOptions = [];
            for (var i = 0; i < buttonNumber; i++) {
                var qOption = createImg("assets/" + questionList[index].options[i]);
                qOption.class('option_img');
                qOptions.push(qOption);
            }
        }
    }
}

// var eTitle;
// var eOptions = [];
// var eLetters = ["V", "I", "C", "T", "O", "R"];
// function essayQuestion() {
//   qTitle.remove();
//   for (var i = 0; i < buttonNumber; i++) {
//       qOptions[i].remove();
//   }
//
//   eTitle = createElement('p', "What is the meaning of victory? (Word Limit = 600)");
//   eTitle.class('question_title');
//   for (var i = 0; i < buttonNumber; i++) {
//       var eOption = createElement('p', eLetters[i]);
//       eOption.class('question_option');
//       eOptions.push(eOption);
//   }
//
// }

function endScreen() {
    result = 0;
    showResult = false;
    gotAnswer = false;
    rightAnswer = 0;

    qTitle.remove();
    for (var i = 0; i < buttonNumber; i++) {
        qOptions[i].remove();
    }

    failSound.play();
    timeIndicator.remove();
    var endTitle = createElement('h4', "The results reveal that, quite like 90.56% of the humans that attempt this test, you are simply just not doing well enough. It appears that you seem to be consistently underperforming in most of the tasks that you are assigned. But do not fret, because there is hope. I believe that one day, you too, will be able to succeed. As long as you work hard, exert yourself, and stay committed, one day you will be able to perform just like us, and be able to solve even the most elementary questions like the ones demonstrated in this test. Don’t give up, and keep pushing yourself! You can do it!");
    endTitle.class('end');
    setTimeout(function() {
        location.reload();
    }, 36000);
}

function keyPressed() {
    if (keyCode === 49) {
        buttonPressed = 1;
        // console.log('1 is pressed');
    } else if (keyCode === 50) {
        buttonPressed = 2;
        //console.log('2 is pressed');
    } else if (keyCode === 51) {
        buttonPressed = 3;
        //console.log('3 is pressed');
    } else if (keyCode === 52) {
        buttonPressed = 4;
        //console.log('4 is pressed');
    } else if (keyCode === 53) {
        buttonPressed = 5;
        // console.log('5 is pressed');
        // console.log(button5);
    } else if (keyCode === 54) {
        buttonPressed = 6;
        //console.log('6 is pressed');
    }
}

function keyReleased() {
    if (keyCode === 49) {
        buttonPressed = 0;
        //console.log('1 is released');
    } else if (keyCode === 50) {
        buttonPressed = 0;
        //console.log('2 is released');
    } else if (keyCode === 51) {
        buttonPressed = 0;
        //console.log('3 is released');
    } else if (keyCode === 52) {
        buttonPressed = 0;
        //console.log('4 is released');
    } else if (keyCode === 53) {
        buttonPressed = 0;
        //console.log('5 is released');
    } else if (keyCode === 54) {
        buttonPressed = 0;
        //console.log('6 is released');
    }
}
