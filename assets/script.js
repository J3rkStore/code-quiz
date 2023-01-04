var questionEl = document.querySelector(".question");
var answersEl = document.querySelector(".answers");
var startButton = document.querySelector(".start-button");
var answerOneButton = document.querySelector("#answer-1");
var answerTwoButton = document.querySelector("#answer-2");
var answerThreeButton = document.querySelector("#answer-3");
var answerFourButton = document.querySelector("#answer-4");
var scoreEl = document.querySelector(".score");
var timeRemainingEl = document.querySelector(".time-remaining");

var questions = [
  "Select answer 2",
  "Which of the following is answer 1?",
  "You finished on time",
];
var timeLeft = 10;
var currentQuestion = 1;
var points = 0;

function quizOver() {
  questionEl.textContent = "You ran out of time :(";
  answersEl.style.display = "none";
}

function timer() {
  var timerInterval = setInterval(function () {
    timeRemainingEl.textContent = "Time remaining: ";
    timeLeft--;
    timeRemainingEl.textContent += timeLeft;
    console.log(timeLeft);

    if (currentQuestion === 3) {
      clearInterval(timerInterval);
    } else if (timeLeft < 1) {
      quizOver();
      //stops interval
      clearInterval(timerInterval);
    }
  }, 1000);
}

function rightAnswer() {
  console.log("correct");
  currentQuestion++;
  points++;
  scoreEl.textContent = "SCORE: ";
  scoreEl.textContent += points;
  theGame();
}

function wrongAnswer() {
  console.log("wrong");
  currentQuestion++;
  points--;
  scoreEl.textContent = "SCORE: ";
  scoreEl.textContent += points;
  theGame();
}

function theGame() {
  if (currentQuestion === 1) {
    questionEl.textContent = questions[0];
    answerOneButton.addEventListener("click", wrongAnswer);
    answerTwoButton.addEventListener("click", rightAnswer);
    answerThreeButton.addEventListener("click", wrongAnswer);
    answerFourButton.addEventListener("click", wrongAnswer);
  } else if (currentQuestion === 2) {
    questionEl.textContent = questions[1];
    // conflicting event listeners must be removed
    answerTwoButton.removeEventListener("click", rightAnswer);
    answerOneButton.removeEventListener("click", wrongAnswer);
    answerOneButton.addEventListener("click", rightAnswer);
    answerTwoButton.addEventListener("click", wrongAnswer);
  } else if (currentQuestion === 3) {
    questionEl.textContent = questions[2];
    answersEl.style.display = "none";
  }
}

function startQuiz() {
  points = 0;
  currentQuestion = 1;
  //set time left 1 second higher because it will display after 1 second
  timeLeft = 11;
  //questionEl.textContent = questions[0];
  //changes to flex from "none" in css
  answersEl.style.display = "flex";
  timer();
  theGame();
}

startButton.addEventListener("click", startQuiz);
