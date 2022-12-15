var timeEl = document.querySelector("#time");
var startScreenEl = document.querySelector("#start-screen");
var startButtonEl = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var questionTitleEl = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
var endScreenEl = document.querySelector("#end-screen");
var submitButtonEl = document.querySelector("#submit");
var finalScoreSpanEl = document.querySelector("#final-score");
var inputEl = document.querySelector("#initials");
var bodyEl = document.querySelector("body");

var score = 0;
var secondsLeft = 0;
var selectedQuestion = 0;

class Question {
    constructor(q, a1, v1, a2, v2, a3, v3, a4, v4) {
        this.question = q,
            this.choice = [
                [a1, v1],
                [a2, v2],
                [a3, v3],
                [a4, v4]
            ];
    }
}

var questionsArr = [
    new Question("Commonly used data types DO NOT include:"
    , "strings", false
    , "booleans", false
    , "alerts", true
    , "numbers", false
    ),

    new Question("The condition in an if/else statement is enclosed within _____"
    , "quotes", false
    , "curly brackets", false 
    , "square brackets", false
    , "parenthesis", true
    ),

    new Question("Arrays in JavaScript can be used to store_____"
    , "numbers and strings", false
    , "other arrays", false
    , "booleans", false
    , "all of the above", true
    ),
];

startButtonEl.addEventListener("click", startGame);
submitButtonEl.addEventListener("click", submitScore);

function submitScore() {
    if (inputEl.value.length < 2) {
        var message = document.createElement("h3")
        message.setAttribute("class", "wrapper")
        message.setAttribute("style", "color: red;")
        message.textContent = "Name Cannot be less than 2 characters";
        bodyEl.appendChild(message);
    } else {
        var user = [];
        var scoreTrack = [];
        var storagedUsers = JSON.parse(localStorage.getItem("user"));
        var storagedScore = JSON.parse(localStorage.getItem("score"));

        if (storagedScore) {
            user = storagedUsers;
            scoreTrack = storagedScore;
        }

        user.push(inputEl.value.trim());
        scoreTrack.push(score);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("score", JSON.stringify(scoreTrack));

        window.location.href = "highscores.html";
    }
}

function setTime() {
    secondsLeft = 30;
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft === 0 || secondsLeft < 0 || selectedQuestion > questionsArr.length) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            //show score and rank register
            finalScoreSpanEl.textContent = score;
            questionsEl.setAttribute("class", "hide");
            endScreenEl.setAttribute("class", "start");
        }
    }, 1000);
}

function startGame() {
    setTime();
    startScreenEl.setAttribute("class", "hide");
    questionsEl.setAttribute("class", "start");
    getQuestion();
}


function nextQuestion(event) {
    var message = document.createElement("h2")
    if (event.currentTarget.getAttribute("data-correctAnswer") === 'true') {
        score += 5;
        message.textContent = "Right answer";
    } else {
        message.textContent = "Wrong answer";
        secondsLeft -= 10;
    };
    event.currentTarget.parentElement.appendChild(message);
    setTimeout(getQuestion, 1000);
}

function getQuestion() {
    choicesEl.innerHTML = '';
    if (questionsArr[selectedQuestion]) {
        questionTitleEl.textContent = questionsArr[selectedQuestion].question;
        for (i = 0; i < questionsArr[selectedQuestion].choice.length; i++) {
            var choices = document.createElement("button");
            choices.textContent = questionsArr[selectedQuestion].choice[i][0];
            choices.setAttribute("data-correctAnswer", questionsArr[selectedQuestion].choice[i][1]);
            choicesEl.appendChild(choices);
            choices.addEventListener("click", nextQuestion);
        }
    }
    selectedQuestion++;
}