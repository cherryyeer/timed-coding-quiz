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

//constructor for questions which "q" is the question "aX" is the answer and "vX" is true of false considering the right answer
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
// Create first question and choices options
var questionsArray = [
    new Question("localStorage stores data as the followin type ________"
        , "Boolean", false
        , "Integer", false
        , "String", true
        , "Undefined", false
    ),

    new Question("What does the following code will return: console.log('test'.length);"
        , "print value '4' on the console", true
        , "print value undefined on the console log", false
        , "error", false
        , "none of the above", false
    )];

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
        // save data
        var user = [];
        var scoreTrack = [];
        var storagedUsers = JSON.parse(localStorage.getItem("user"));
        var storagedScore = JSON.parse(localStorage.getItem("score"));
        //if not undefined (there is registered names keep them)
        if (storagedScore) {
            user = storagedUsers;
            scoreTrack = storagedScore;
        }
        //add new register to array
        user.push(inputEl.value.trim());
        scoreTrack.push(score);
        //add to localstorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("score", JSON.stringify(scoreTrack));

        //call highscores
        window.location.href = "highscores.html";
    }
}

function setTime() {
    secondsLeft = 30;
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft === 0 || secondsLeft < 0 || selectedQuestion > questionsArray.length) {
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
    // set timer
    setTime();
    // hide startScreen
    startScreenEl.setAttribute("class", "hide");
    // show question area
    questionsEl.setAttribute("class", "start");
    //create questions    
    getQuestion();
}


function nextQuestion(event) {
    //if right answer add to score otherwise subtract 10 sec from timer   
    var message = document.createElement("h2")
    if (event.currentTarget.getAttribute("data-correctAnswer") === 'true') {
        score += 5;
        message.textContent = "Right answer";
    } else {
        message.textContent = "Wrong answer";
        secondsLeft -= 10;
    };
    event.currentTarget.parentElement.appendChild(message);
    //wait 1 second then get next question
    setTimeout(getQuestion, 1000);
}

function getQuestion() {
    //clear old choices
    choicesEl.innerHTML = '';
    if (questionsArray[selectedQuestion]) {
        //get question and add to the Title
        questionTitleEl.textContent = questionsArray[selectedQuestion].question;
        //get all possible answer/choices for this question
        for (i = 0; i < questionsArray[selectedQuestion].choice.length; i++) {
            var choices = document.createElement("button");
            choices.textContent = questionsArray[selectedQuestion].choice[i][0];
            // store in the html if is right/wrong answer as dataset.
            choices.setAttribute("data-correctAnswer", questionsArray[selectedQuestion].choice[i][1]);
            choicesEl.appendChild(choices);
            choices.addEventListener("click", nextQuestion);
        }
    }
    selectedQuestion++;
}
