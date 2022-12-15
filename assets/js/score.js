var highscoresEl = document.querySelector("#highscores");
var clearButtonEl = document.querySelector("#clear");
var storagedUsers = [];
var storagedScore = [];

var storagedUsers = JSON.parse(localStorage.getItem("user"));
var storagedScore = JSON.parse(localStorage.getItem("score"));

if (storagedUsers) {
    for (i = 0; i < storagedUsers.length; i++) {
        var score = document.createElement("li");
        score.textContent = storagedUsers[i] + " - " + storagedScore[i];
        highscoresEl.appendChild(score);
    }
}
clearButtonEl.addEventListener("click", ClearScore);

function ClearScore() {
    localStorage.clear();
    highscoresEl.innerHTML = '';
}