
// function runQuesetion() = setTimeout(function() {
//
// })

// getting the question

var timer = 8000;

// function randomIndex() {
//     for (var i = 0; i < qNum; i++) {
//         var index = round(random(0, questionList.length));
//         var indexList.push({
//             order: i,
//             qIndex: index
//         });
//         return indexList;
//     }
// }

var questionList = [{
        "isText": true,
        "question": "lala?",
        "options": [1, 2, 3, 4, 5, 6],
        "answer": 2
    },
    {
        "isText": false,
        "question": "lala?",
        "options": [1, 2, 3, 4, 5, 6],
        "answer": 2
    }
];
var qTitle;
var qOptions;
var buttonNumber = 6;
var qNum = 6; // numbers of questions

getQuestion(0);

function getQuestion(index) {
    if (index >= qNum) {
        console.log("finished");
    } else {
        console.log("start questions");
        console.log("index is: " + index);
        if (questionList[index].isText) {
            // a text question
            qTitle = createElement('p', questionList[index].question);
            qTitle.class('question_title');
            for (var i = 0; i < buttonNumber; i++) {
                var qOption = createElement('p', questionList[index].options[i]);
                qOption.class('question_option');
                qOptions.push(qOption);
            }
        } else {
            // an image question
            qTitle = createImg('assets/triangle.png');
            qTitle.class('question_img');
            for (var i = 0; i < buttonNumber; i++) {
                var qOption = createImg('assets/triangle' + i + '.png');
                qOption.class('option_img');
                qOptions.push(qOption);
            }
        }
        index++;
        setTimeout(getQuestion(index), timer);
    }
}
