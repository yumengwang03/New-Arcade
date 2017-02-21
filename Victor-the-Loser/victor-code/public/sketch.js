var socket;
var gameStarted = false;

var isAnswered = false;

var hardQ = [];
var mediumQ = [];
var easyQ = [];

var buttonNumber = 6;
var timer = 8000;
var countdown;
var timeIndicator;
var currentQuestion = 0;
var timeout1;
var timeout2;
var timeout3;
var timeout4;

// start screen
var mainTitle;
var startB;
var nextB1, nextB2, nextB3;

// hard question (number, pattern)
var hqTitle;
var hqOptions = [];

// medium question 1
var mqTitle1;
var mqOptions1 = [];

// medium question 2
var mqTitle2;
var mqOptions2 = [];

// easy question
var eqTitle;
var eqOptions = [];

// Arduino stuff
var buttonPressed = 0;

var rightAnswer = 0;
var runTime = 0;
var result = 0;

var gotAnswer = false;



// speech
// var right = [
//     "Meh, moving on.", "You are quite a lucky person!", "[Silence]", "No Comment.", "That wasn’t so hard, was it now?", "Oh?", "Huh?", "Honestly, I’d be concerned for you if you got that wrong.", "Hmm...", "Ok...", "Sure..."
// ];
// var wrong = [
//     "Why can’t you even get something like this right?", "Ah, that was so close!", "You almost got it right!", "You just have to try a little bit more.", "You’re making me cry!", "I’m disappointed.", "Are you satisfied with your performance?", "How do you feel about your answer to this question?"
// ];
//
// var failSpeech = "The results reveal that, quite like 90 point 56 percent of the humans that attempt this test, you are simply just not doing well enough. It appears that you seem to be consistently underperforming in most of the tasks that you are assigned. But do not fret, because there is hope. I believe that one day, you too, will be able to succeed. As long as you work hard, exert yourself, and stay committed, one day you will be able to perform just like us, and be able to solve even the most elementary questions like the ones demonstrated in this test. Don’t give up, and keep pushing yourself! You can do it! Ok, Good. Next Person. Next Person?";
//
// var myVoice = new p5.Speech('Google UK English Male'); // new P5.Speech object
// myVoice.interupt = 1;

// var iptr = 0; // a counter for the words
// var iptr2 = 0; // a counter for the words

var rightAudios = ['audio/right-0.wav', 'audio/right-1.wav', 'audio/right-2.wav', 'audio/right-3.wav', 'audio/right-4.wav', 'audio/right-5.wav', 'audio/right-6.wav', 'audio/right-7.wav'];
var wrongAudios = ['audio/wrong-0.wav', 'audio/wrong-1.wav', 'audio/wrong-2.wav', 'audio/wrong-3.wav', 'audio/wrong-4.wav', 'audio/wrong-5.wav', 'audio/wrong-6.wav', 'audio/wrong-7.wav'];
var failAudio = 'audio/fail.wav';

var rightSounds = [];
var wrongSounds = [];
var failSound;

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
    //startPlay();
    countdown = timer;

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


function draw() {
    //console.log(iptr);
    //console.log(gotAnswer);

    if (rightAnswer == 0) {
        document.body.style.backgroundColor = "white";
    }

    if (!gameStarted) {
        if (buttonPressed == 1 || buttonPressed == 2 || buttonPressed == 3 || buttonPressed == 4 || buttonPressed == 5 || buttonPressed == 6) {
            setTimeout(function() {
                gameStarted = true;
            }, 600);

            //startPlay();
            // console.log("lalala");
        }
    }

    if (gameStarted) {
        runTime++;
        if (runTime <= 1) {
            startPlay();
        }
    }


    if (!gameStarted) {
        document.body.style.backgroundColor = "white";
    } else {
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
    }

    //console.log(isAnswered);
}

function correct() {
    document.body.style.backgroundColor = "green";
    // myVoice.speak(right[iptr]);
    // iptr = (iptr + 1) % right.length; // increment
    rightSounds[int(random(0, 8))].play();
}

function incorrect() {
    document.body.style.backgroundColor = "red";
    // myVoice.speak(wrong[iptr2]);
    // iptr2 = (iptr2 + 1) % wrong.length; // increment
    //mySound.play();
    wrongSounds[int(random(0, 8))].play();
}



function startScreen() {

    mainTitle = createElement('h3', "Hi, I'm Victor! Do you want to play a game with me? Press any button to start.");
    mainTitle.class('_mainTitle');

    // startB = createButton('Yes');
    // startB.class('_startB');


}

function startPlay() {
    //startB.mousePressed(function() {
    //console.log("start");
    //if (gameStarted) {

    window.setInterval(function() {
        timeIndicator.html(countdown / 1000 - 1);
        countdown -= 1000;
        //gameStarted = true;
    }, 1000);

    var qIndex = round(random(1, 2));
    hq(qIndex);

    socket.emit('toServer', {
        answer: rightAnswer + 10
    });
    timeout1 = setTimeout(function() {
        console.log("next question");
        countdown = timer;
        mq1(round(random(1, 2)));
        socket.emit('toServer', {
            answer: rightAnswer + 10
        });
        timeout2 = setTimeout(function() {
            console.log("next question");
            countdown = timer;
            mq2(round(random(0.501, 3.499)));
            //mq2(3);
            socket.emit('toServer', {
                answer: rightAnswer + 10
            });
            timeout3 = setTimeout(function() {
                console.log("next question");
                countdown = timer;
                eq(round(random(1, 2)));
                socket.emit('toServer', {
                    answer: rightAnswer + 10
                });
                timeout4 = setTimeout(function() {
                    console.log("end");
                    endScreen();
                }, timer);
            }, timer);
        }, timer);
    }, timer);
    //});
    //}

}

//hard questions
function hq(index) {
    mainTitle.remove();
    //startB.remove();
    isAnswered = false;
    gotAnswer = false;
    resutl = 0;

    // nextB1 = createButton('next');
    // nextB1.class('_nextB');
    // nextB1.mousePressed(function() {
    //   var qIndex = round(random(1, 2));
    //   mq1(qIndex);
    // });

    if (index == 1) {
        currentQuestion = 1;
        rightAnswer = 5;
        //console.log("hard question no. 1");
        var numSequenceH = [2, 4, 10, 28, 84, 244];
        hqTitle = createElement('p', 'Which number does not fit in the sequence?');
        hqTitle.class('question_title');
        for (var i = 0; i < buttonNumber; i++) {
            var hqOption = createElement('p', numSequenceH[i]);
            hqOption.class('question_option');
            hqOptions.push(hqOption);
        }
        // right answer: button 5
        //if (button5 == 1) {
        //console.log(button5);
        //}
    } else if (index == 2) {
        currentQuestion = 2;
        rightAnswer = 4;
        //console.log("hard question no. 2");
        hqTitle = createImg('assets/triangle.png');
        hqTitle.class('question_img');
        for (var i = 0; i < buttonNumber; i++) {
            var hqOption = createImg('assets/triangle' + i + '.png');
            hqOption.class('option_img');
            hqOptions.push(hqOption);
        }
    }
}

//medium questions 1
function mq1(index) {
    document.body.style.backgroundColor = "white";
    // nextB1.remove();
    hqTitle.remove();
    for (var i = 0; i < buttonNumber; i++) {
        hqOptions[i].remove();
    }
    isAnswered = false;
    gotAnswer = false;
    result = 0;


    // nextB2 = createButton('next');
    // nextB2.class('_nextB');
    // nextB2.mousePressed(function() {
    //   var qIndex = round(random(0.501, 3.499));
    //   mq2(qIndex);
    // });

    if (index == 1) {
        currentQuestion = 3;
        rightAnswer = 3; // change to 3
        console.log("medium question no. 1");
        var numSequenceH = [22, 19, 20, 28, 10, 21];
        mqTitle1 = createElement('p', "If you count from 1 to 100, how many 3's will you pass on the way?");
        mqTitle1.class('question_title');
        for (var i = 0; i < buttonNumber; i++) {
            var mqOption1 = createElement('p', numSequenceH[i]);
            mqOption1.class('question_option');
            mqOptions1.push(mqOption1);
        }
    } else if (index == 2) {
        currentQuestion = 4;
        rightAnswer = 2; //change to 2
        console.log("medium question no. 2");
        var numSequenceH = ['shampoo', 'rock', 'tear', 'cloud', 'sea', 'orange juice'];
        mqTitle1 = createElement('p', "Which one of the following objects is different from the others?");
        mqTitle1.class('question_title');
        for (var i = 0; i < buttonNumber; i++) {
            var mqOption1 = createElement('p', numSequenceH[i]);
            mqOption1.class('question_option');
            mqOptions1.push(mqOption1);
        }
    }
}

//medium questions 2
function mq2(index) {
    document.body.style.backgroundColor = "white";
    // nextB2.remove();
    mqTitle1.remove();
    for (var i = 0; i < buttonNumber; i++) {
        mqOptions1[i].remove();
    }

    isAnswered = false;
    gotAnswer = false;
    result = 0;
    // nextB3 = createButton('next');
    // nextB3.class('_nextB');
    // nextB3.mousePressed(function() {
    //   var qIndex = round(random(1, 2));
    //   eq(qIndex);
    // });

    if (index == 1) {
        currentQuestion = 5;
        rightAnswer = 6;
        console.log("medium question 2 no. 2");
        var numSequenceH = ['slumber', 'snore', 'yawn', 'nap', 'doze', 'dream'];
        mqTitle2 = createElement('p', "Which activity is different from the others?");
        mqTitle2.class('question_title');
        for (var i = 0; i < buttonNumber; i++) {
            var mqOption2 = createElement('p', numSequenceH[i]);
            mqOption2.class('question_option');
            mqOptions2.push(mqOption2);
        }
    } else if (index == 2) {
        currentQuestion = 6;
        rightAnswer = 6;
        console.log("medium question 2 no. 2");
        mqTitle2 = createImg('assets/polygon.png');
        mqTitle2.class('question_img');
        for (var i = 0; i < buttonNumber; i++) {
            var mqOption2 = createImg('assets/polygon' + i + '.png');
            mqOption2.class('option_img');
            mqOptions2.push(mqOption2);
        }
    } else if (index == 3) {
        currentQuestion = 7;
        rightAnswer = 4;
        console.log("medium question 2 no. 3");
        mqTitle2 = createImg('assets/shape.png');
        mqTitle2.class('question_img');
        for (var i = 0; i < buttonNumber; i++) {
            var mqOption2 = createImg('assets/shape' + i + '.png');
            mqOption2.class('option_img');
            mqOptions2.push(mqOption2);
        }
    }
}

//easy questions
function eq(index) {
    document.body.style.backgroundColor = "white";
    // nextB3.remove();
    mqTitle2.remove();
    for (var i = 0; i < buttonNumber; i++) {
        mqOptions2[i].remove();
    }

    isAnswered = false;
    gotAnswer = false;
    result = 0;

    if (index == 1) {
        currentQuestion = 8;
        rightAnswer = 3;
        console.log("easy question no. 2");
        var numSequenceH = [63, 64, 65, 66, 67, 68];
        eqTitle = createElement('p', "2, 3, 5, 9, 17, 33 Which number is the next?");
        eqTitle.class('question_title');
        for (var i = 0; i < buttonNumber; i++) {
            var eqOption = createElement('p', numSequenceH[i]);
            eqOption.class('question_option');
            eqOptions.push(eqOption);
        }
    } else if (index == 2) {
        currentQuestion = 9;
        rightAnswer = 2;
        console.log("easy question no. 2");
        var numSequenceH = [11, 14, 15, 17, 19, 21];
        eqTitle = createElement('p', "Which number doesn't fit in the following sequence?");
        eqTitle.class('question_title');
        for (var i = 0; i < buttonNumber; i++) {
            var eqOption = createElement('p', numSequenceH[i]);
            eqOption.class('question_option');
            eqOptions.push(eqOption);
        }
    }
}

function endScreen() {
    result = 0;
    isAnswered = false;
    gotAnswer = false;
    rightAnswer = 0;
    //myVoice.speak(failSpeech);
    //document.body.style.backgroundColor = "yellow";
    failSound.play();
    timeIndicator.remove();
    eqTitle.remove();
    for (var i = 0; i < buttonNumber; i++) {
        eqOptions[i].remove();
    }

    var endTitle = createElement('h4', "The results reveal that, quite like 90.56% of the humans that attempt this test, you are simply just not doing well enough. It appears that you seem to be consistently underperforming in most of the tasks that you are assigned. But do not fret, because there is hope. I believe that one day, you too, will be able to succeed. As long as you work hard, exert yourself, and stay committed, one day you will be able to perform just like us, and be able to solve even the most elementary questions like the ones demonstrated in this test. Don’t give up, and keep pushing yourself! You can do it!");
    endTitle.class('end');
    setTimeout(function() {
        location.reload();
    }, 36000);
}

function keyPressed() {
    if (keyCode === 49) {
        button1 = 1;
        //console.log('1 is pressed');
    } else if (keyCode === 50) {
        button2 = 1;
        //console.log('2 is pressed');
    } else if (keyCode === 51) {
        button3 = 1;
        //console.log('3 is pressed');
    } else if (keyCode === 52) {
        button4 = 1;
        //console.log('4 is pressed');
    } else if (keyCode === 53) {
        button5 = 1;
        // console.log('5 is pressed');
        // console.log(button5);
    } else if (keyCode === 54) {
        button6 = 1;
        //console.log('6 is pressed');
    }
}

function keyReleased() {
    if (keyCode === 49) {
        button1 = 0;
        console.log('1 is released');
    } else if (keyCode === 50) {
        button2 = 0;
        //console.log('2 is released');
    } else if (keyCode === 51) {
        button3 = 0;
        //console.log('3 is released');
    } else if (keyCode === 52) {
        button4 = 0;
        //console.log('4 is released');
    } else if (keyCode === 53) {
        button5 = 0;
        //console.log('5 is released');
    } else if (keyCode === 54) {
        button6 = 0;
        //console.log('6 is released');
    }
}
