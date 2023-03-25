//set of questions
var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    question: "The condition in an if/else statement is enclosed within _____.",
    choices: [
      "1. quotes",
      "2. curly brackets",
      "3. parentheses",
      "4. square brackets",
    ],
    answer: "3. parentheses",
  },
  {
    question: "Arrays in JavaScript can be used to store _____.",
    choices: [
      "1. numbers and strings",
      "2. other arrays",
      "3. boolean values",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    question:
      "String values must be enclosed within _____ when being assigned to variables.",
    choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
    answer: "3. quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: [
      "1. Javascript",
      "2. terminal / bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
];

// Global Variables -  placeholders
var viewHighScoreBtn = document.getElementById("viewHighScoreBtn");
var timerDiv = document.getElementById("timer");
var timeLeftEl = document.querySelector("#timeLeft");
var timeUpDiv = document.getElementById("timeUp");
var bucketEl = document.querySelector("#bucket");
var startBtnEl = document.querySelector("#startBtn");
var startDiv = document.getElementById("startDiv");

var questionDiv = document.getElementById("questionDiv");
var questionTitleEl = document.querySelector("#questionTitle");
var choice0 = document.getElementById("btn0");
var choice1 = document.getElementById("btn1");
var choice2 = document.getElementById("btn2");
var choice3 = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");
var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");
var highScoreEl = document.getElementById("highScore");
var scoreEl = document.querySelector("#score");
var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn");
var highScoreListEl = document.querySelector("#highScoreList");

var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;
var totalTime = 76;

// start quiz
function Quiz() {
  startDiv.style.display = "none";
  questionDiv.style.display = "block";
  timeUpDiv.style.display = "none";

  nextQuestion();
}

// ShowQuiz() is the next question reusable container
// function showQuiz() {
//   nextQuestion();
// }

function nextQuestion() {
  questionTitleEl.innerHTML = questions[questionIndex].question;
  choice0.innerHTML = questions[questionIndex].choices[0];
  choice1.innerHTML = questions[questionIndex].choices[1];
  choice2.innerHTML = questions[questionIndex].choices[2];
  choice3.innerHTML = questions[questionIndex].choices[3];
}

// after question is answered, show if correct or wrong
function checkAnswer(answer) {
  answerCheck.style.display = "none";

  if (
    questions[questionIndex].answer === questions[questionIndex].choices[answer]
  ) {
    // correct add to score
    // Correct or Incorrect answer status will show for 10 millisecond then move on to the next question with
    // no answer status showing.
    correctAns++;
    // console.log(correctAns);
    answerCheck.style.display = "block";
    answerCheck.innerHTML = "Correct";
    startTimerCor = 10;
    var startTimerCor = setInterval(function () {
      startTimerCor--;
      if (startTimerCor === 0) {
        answerCheck.style.display = "none";
        clearInterval(startTimerCor);
      }
    }, 100);
  } else {
    //    incorrect answer -10 seconds
    totalTime -= 10;
    timeLeftEl.innerHTML = totalTime;
    answerCheck.style.display = "block";
    answerCheck.innerHTML = "Incorrect";
    startTimerInc = 10;
    var startTimerInc = setInterval(function () {
      startTimerInc--;
      if (startTimerInc === 0) {
        answerCheck.style.display = "none";
        clearInterval(startTimerInc);
      }
    }, 100);
  }

  // Primary timer placed inside checkAnswer() to allow access to questionIndex and questions.length property.
  questionIndex++;

  var startTimer = setInterval(function () {
    totalTime--;
    timeLeftEl.innerHTML = totalTime;
    if (totalTime <= 0) {
      clearInterval(startTimer);

      endQuestions();
    } else if (questionIndex < questions.length) {
      nextQuestion();
    } else {
      summary.style.display = "block";
      endQuestions();
    }
  }, 1000);
}

function endQuestions() {
  summary.style.display = "block";
  questionDiv.style.display = "none";
  startDiv.style.display = "none";
  timerDiv.style.display = "none";
  timeUpDiv.style.display = "block";
  scoreEl.innerHTML = correctAns;
}

// enter initial and store high score in local storage

// store high score

function storeHighScores(event) {
  event.preventDefault();
  startDiv.style.display = "none";
  timerDiv.style.display = "none";
  timeUpDiv.style.display = "none";
  summary.style.display = "none";
  highScoreEl.style.display = "block";

  var savedHighScores = localStorage.getItem("high scores");
  var scoresArray;

  if (savedHighScores === null) {
    scoresArray = [];
  } else {
    scoresArray = JSON.parse(savedHighScores);
  }

  var userScore = {
    initials: initialInput.value,
    score: finalScore.textContent,
  };

  scoresArray.push(userScore);

  var scoresArrayString = JSON.stringify(scoresArray);
  localStorage.setItem("high scores", scoresArrayString);

  showHighScores();
}

// show high score

function showHighScores() {
  startDiv.style.display = "none";
  timerDiv.style.display = "none";
  questionDiv.style.display = "none";
  timeUpDiv.style.display = "none";
  summary.style.display = "none";
  highScoreEl.style.display = "block";

  var savedHighScores = localStorage.getItem("high scores");

  // check if there is any in local storage
  if (savedHighScores === null) {
    return;
  }
  // console.log(savedHighScores);

  var storedHighScores = JSON.parse(savedHighScores);

  // for (i=0; i < storedHighScores.length; i++) {
  var newHighScore = document.createElement("p");
  newHighScore.innerHTML = `${storedHighScores[i].initials}: ${storedHighScores[i].score}`;
  highScoreListEl.appendChild(newHighScore);
  // }
}

// Answers

function chooseZero() {
  checkAnswer(0);
}

function chooseOne() {
  checkAnswer(1);
}

function chooseTwo() {
  checkAnswer(2);
}

function chooseThree() {
  checkAnswer(3);
}

// answer event listeners

startBtnEl.addEventListener("click", Quiz);
choice0.addEventListener("click", chooseZero);
choice1.addEventListener("click", chooseOne);
choice2.addEventListener("click", chooseTwo);
choice3.addEventListener("click", chooseThree);

// local storage
var savedHighScores = localStorage.getItem("high scores");

// clear local storage
clearHighScoreBtn.addEventListener("click", function () {
  localStorage.removeItem("high scores");
  highScoreListEl.innerHTML = "Scores Cleared!";
  highScoreListEl.setAttribute(
    "style",
    "font-family: Arial, Helvetica, sans-serif sans-serif;"
  );
});

// high score utility event listeners

submitInitialBtn.addEventListener("click", function (event) {
  storeHighScores(event);
});

viewHighScoreBtn.addEventListener("click", function (event) {
  highScoreEl.style.display = "block";

  showHighScores(event); // ?
});

goBackBtn.addEventListener("click", function () {
  startDiv.style.display = "block";

  highScoreEl.style.display = "none";
});
