var timeLeft = 10;

function timer() {
  var timerInterval = setInterval(function () {
    timeLeft--;
    console.log(timeLeft);
    if (timeLeft === 0) {
      //stops interval
      clearInterval(timerInterval);
    }
  }, 100);
}

timer();
