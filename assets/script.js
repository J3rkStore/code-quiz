var questionEl = document.querySelector(".question");
var startButton = document.querySelector(".start-button");
var questions = ["first question", "second question"];
var timeLeft = 10;

function loseGame() {
  questionEl.textContent = "You lost";
}

function timer() {
  var timerInterval = setInterval(function () {
    timeLeft--;
    console.log(timeLeft);
    if (timeLeft < 1) {
      loseGame();
      //stops interval
      clearInterval(timerInterval);
    }
  }, 100);
}

function startGame() {
  timeLeft = 10;
  questionEl.textContent = questions[0];
  timer();
}

startButton.addEventListener("click", startGame);
//timer();
