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

var questionsArr = [
    new question("Commonly used data types DO NOT include:"
    , "strings", false
    , "booleans", false
    , "alerts", true
    , "numbers", false
    ),
    new question("The condition in an if/else statement is enclosed within _____"
    , "quotes", false
    , "curly brackets", true
    , "square brackets", false
    , "parenthesis", false
    )
    new question("Arrays in JavaScript can be used to store_____"
    , "numbers and strings", false
    , "other arrays", false
    , "booleans", false
    , "all of the above", true
    )
]