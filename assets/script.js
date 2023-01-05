var questionEl = document.querySelector(".question");
var answersEl = document.querySelector(".answers");
var allanswers = document.querySelectorAll(".answer-button");
var startButton = document.querySelector(".start-button");
var answerOneButton = document.querySelector("#answer-1");
var answerTwoButton = document.querySelector("#answer-2");
var answerThreeButton = document.querySelector("#answer-3");
var answerFourButton = document.querySelector("#answer-4");
var highScoreDisplayEl = document.querySelector(".high-score-diplay");
var scoreEl = document.querySelector(".score");
var timeRemainingEl = document.querySelector(".time-remaining");
var highScoreEl = document.querySelector("#high-score");
var scoreByEl = document.querySelector("#by");
var nameEntryEl = document.querySelector(".name-entry");
var bodyTag = document.querySelector("#bod");
//var highScoreInputEl = document.querySelector("#high-score-input").value;
var clearHighButton = document.querySelector(".clear-high-scores");
var submitButton = document.querySelector(".submit");
var toastyButton = document.querySelector(".toasty");

var questions = [
  "What does C.S.S. mean?",
  "What does HTML mean?",
  "What is OOP?",
  "Who made Linux",
  "You finished on time",
];

var firstAnswers = [
  "Calcified Crustaceous Simbiotes",
  "Hyper-Text Markup Language",
  "Only Oinge Please",
  "Kernal Sanders",
];

var secondAnswers = [
  "Cascading Style Sheets",
  "Hate These Mondays... ...Lasagna!",
  "Out Of Planchettes",
  "Al Gore",
];

var thirdAnswers = [
  "Clandestine Smoked Salmon",
  "Hear These Melty Licks!",
  "Object Oriented Programming",
  "Al Bore(land)",
];

var fourthAnswers = [
  "Crankin Some Sepultura!",
  "Had to Make Lasagna",
  "Other Peoples' Properties",
  "Linus ...something",
];

var quest;

var timeLeft = 10;
var currentQuestion = 1;
var points = 0;
var highScore = -5;

var toasty = false;

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

    if (currentQuestion === 4) {
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
  //points--;
  timeLeft -= 10;
  scoreEl.textContent = "SCORE: ";
  scoreEl.textContent += points;
  theGame();
}

function theGame() {
  questionEl.textContent = questions[currentQuestion];
  answerOneButton.textContent = firstAnswers[currentQuestion];
  answerTwoButton.textContent = secondAnswers[currentQuestion];
  answerThreeButton.textContent = thirdAnswers[currentQuestion];
  answerFourButton.textContent = fourthAnswers[currentQuestion];
  if (currentQuestion === 0) {
    answerOneButton.addEventListener("click", wrongAnswer);
    answerTwoButton.addEventListener("click", rightAnswer);
    answerThreeButton.addEventListener("click", wrongAnswer);
    answerFourButton.addEventListener("click", wrongAnswer);
  } else if (currentQuestion === 1) {
    // conflicting event listeners must be removed
    answerTwoButton.removeEventListener("click", rightAnswer);
    answerOneButton.removeEventListener("click", wrongAnswer);
    answerOneButton.addEventListener("click", rightAnswer);
    answerTwoButton.addEventListener("click", wrongAnswer);
  } else if (currentQuestion === 2) {
    answerOneButton.removeEventListener("click", rightAnswer);
    answerOneButton.addEventListener("click", wrongAnswer);
    answerThreeButton.removeEventListener("click", wrongAnswer);
    answerThreeButton.addEventListener("click", rightAnswer);
  } else if (currentQuestion === 3) {
    answerThreeButton.removeEventListener("click", rightAnswer);
    answerThreeButton.addEventListener("click", wrongAnswer);
    answerFourButton.removeEventListener("click", wrongAnswer);
    answerFourButton.addEventListener("click", rightAnswer);
  } else if (currentQuestion === 4) {
    answerOneButton.removeEventListener("click", wrongAnswer);
    answerTwoButton.removeEventListener("click", wrongAnswer);
    answerThreeButton.removeEventListener("click", wrongAnswer);
    answerFourButton.removeEventListener("click", rightAnswer);
    answersEl.style.display = "none";
    scoreEl.textContent = "SCORE: " + points + " out of 4";
    renderHighScore();
  }
}

function startQuiz() {
  points = 0;
  scoreEl.textContent = "SCORE: " + points;
  currentQuestion = 0;
  //set time left 1 second higher because it will display after 1 second
  timeLeft = 60;
  //changes to flex from "none" in css
  answersEl.style.display = "flex";
  timer();
  theGame();
}

function renderHighScore() {
  thisScore = points;
  if (thisScore > highScore) {
    highScore = thisScore;
    localStorage.setItem("highScore", highScore);
    highScoreEl.textContent = "HIGH SCORE: ";
    highScoreEl.textContent += highScore;
    nameEntryEl.style.display = "flex";
    localStorage.setItem("highScoreName", highScoreInputEl);
  }
}

startButton.addEventListener("click", startQuiz);

//adds a function to the clear high scores button to wipe localstorage and display of high score and name
clearHighButton.addEventListener("click", function () {
  localStorage.clear();
  console.log("cleared");
  scoreByEl.textContent = "By: ";
  highScoreEl.textContent = "HIGH SCORE: ";
});

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var highScoreInputEl = document.querySelector("#high-score-input").value;
  if (highScoreInputEl === "") {
    alert("name cannot be blank");
  } else {
    localStorage.setItem("highScoreName", highScoreInputEl);
    scoreByEl.textContent = "By: ";
    scoreByEl.textContent += localStorage.getItem("highScoreName");
    nameEntryEl.style.display = "none";
  }
});

toastyButton.addEventListener("click", function () {
  if (toasty == false) {
    bodyTag.classList.add("toasty-body");
    toasty = true;
    toastyButton.textContent = "Too toasty! go back to the boring theme";
  } else {
    bodyTag.classList.remove("toasty-body");
    toasty = false;
    toastyButton.textContent = "Toasty Theme? (❁´◡`❁)";
  }
});
