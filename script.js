const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const game = document.getElementById('game');
const hudEl =document.getElementById('hud')
const endEl = document.querySelector('#end')
btnStartElList = document.querySelector('#btn-start').addEventListener('click',startOnClick)
btnNextElList = document.querySelector('#btn-high-score').addEventListener('click',startHighScore)
btnGoBackElList = document.querySelector('#btn-go-back').addEventListener('click',goBackHome)
containerEl = document.querySelector('.container')
scoreEl = document.querySelector('#score')
btnPlayAgainEl = document.querySelector('#btn-play-again').addEventListener('click',startOnClick2)


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;

let availableQuesions = [];

let questions = [
    {
        question: 'JavaScript is a ___ -side programming language.',
        choice1: 'Client',
        choice2: 'Server',
        choice3: 'Both',
        choice4: 'None',
        answer: 2,
    },
    {
        question: "Which of the following will write the message “Hello DataFlair!” in an alert box?",
        choice1: "alertBox(“Hello DataFlair!”);",
        choice2: "alert(Hello DataFlair!);",
        choice3: "msgAlert(“Hello DataFlair!”);",
        choice4: "alert(“Hello DataFlair!”);",
        answer: 4,
    },
    {
        question: "How do you find the minimum of x and y using JavaScript?",
        choice1: "min(x,y);",
        choice2: "Math.min(x,y)",
        choice3: "Math.min(xy)",
        choice4: "min(xy);",
        answer: 2,
    },
    {
        question: "If the value of x is 40, then what is the output of the following program? (x % 10 == 0)? console.log(“Divisible by 10”) : console.log(“Not divisible by 10”);",
        choice1: "ReferenceError",
        choice2: "Divisible by 10",
        choice3: "Not divisible by 10",
        choice4: "None of the above",
        answer: 2,
    }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS || secondsLeft === 0) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return test()
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        });
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

let secondsLeft = 31
let gameElement = document.querySelector('#game')
timerEl = document.getElementById('timer');

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function () {
      secondsLeft--;
      //it adds the score to the node
      timerEl.textContent = secondsLeft;
    //   Create a variable to select the parent where I want to put append the child
      gameElement.appendChild(timerEl);
      gameElement.classList.replace('hidden','visible');
      if (secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and append image
        sendMessage();
        secondsLeft = 30;
        timerEl.classList.replace('visible','hidden');
        clearPage ()
        timeIsOver ()
      }
    }, 1000);
}

function test () {
    sendMessage();
    clearPage ();
    secondsLeft = 30;
    timerEl.classList.replace('visible','hidden');
    clearPage ()
    timeIsOver ()
}

function sendMessage() {
    // timeEl.textContent = " ";
    var messageElement = document.createElement('h2')
    messageElement.classList.add('message', 'justify-center','flex-column')
    messageElement.textContent = "The game is over!";
    gameElement.appendChild(messageElement);
      }

function clearPage() {
    var choices = document.querySelectorAll("div.choice-container");
    for (const choice of choices){
        choice.classList.add("hidden")
    }
    question.classList.add('hidden')
}

function showQuestions() {
    var choices = document.querySelectorAll("div.choice-container");
    for (const choice of choices){
        choice.classList.remove("hidden")
    }
    question.classList.remove('hidden')
}

function startOnClick () {
    startGame()
    setTime()
    showQuestions()
    document.querySelector('#btn-start').classList.add("hidden")
    document.querySelector('#btn-high-score').classList.add("hidden")
}

function removeMessage () {
    messageEl = document.querySelector('.message')
    if (typeof(messageEl) === 'object') {
        messageEl = document.querySelector('.message')
        messageEl.remove()
    }
}

function startOnClick2 () {
    startOnClick()
    removeMessage()
    endEl.classList.add('hidden')
}

function startHighScore (){
    clearPage()
    document.querySelector('#btn-start').classList.add("hidden")
    document.querySelector('#btn-high-score').classList.add("hidden")
    document.querySelector('#hud').classList.add("hidden")
    document.querySelector('#game').classList.add('hidden')
    document.querySelector('#highScores').classList.remove('hidden')
}

function goBackHome () {
    document.querySelector('#btn-start').classList.remove("hidden")
    document.querySelector('#btn-high-score').classList.remove("hidden")
    document.querySelector('#hud').classList.remove("hidden")
    document.querySelector('#highScores').classList.add('hidden')
    document.querySelector('#game').classList.remove('hidden')
}

function timeIsOver () {
    document.querySelector('#end').classList.remove("hidden")
}


// USERNAME PAGE //
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('score');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});



saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
};

let savebtnEl = document.querySelector('#saveScoreBtn').addEventListener('click',saveHighScore)

// MORE
const highScoresList = document.getElementById("highScoresList");

highScoresList.innerHTML = highScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");


