const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const game = document.getElementById('game');
const hudEl =document.getElementById('hud')
btnStartElList = document.querySelector('#btn-start').addEventListener('click',startOnClick)
btnNextElList = document.querySelector('#btn-high-score').addEventListener('click',startHighScore)
btnGoBackElList = document.querySelector('#btn-go-back').addEventListener('click',goBackHome)
containerEl = document.querySelector('.container')

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;

let availableQuesions = [];

let questions = [
    {
        question: 'Where did I go to school?',
        choice1: 'UNC',
        choice2: 'NC State',
        choice3: 'UNCC',
        choice4: 'Clemson',
        answer: 3,
    },
    {
        question: "Where am I from?",
        choice1: "Brasil",
        choice2: "Portugal",
        choice3: "Spain",
        choice4: "Venezuela",
        answer: 4,
    },
    {
        question: "What is my Full Name?",
        choice1: "Alberto Jose De Armas",
        choice2: "Alberto Jonathan De Sousa",
        choice3: "Pedro Alberto De Armas",
        choice4: "Alberto Jesus De Armas",
        answer: 1,
    },
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
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return timeIsOver()
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

let secondsLeft = 2
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
      if (secondsLeft === 0 || availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
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

// MORE
const highScoresList = document.getElementById("highScoresList");

highScoresList.innerHTML = highScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");
