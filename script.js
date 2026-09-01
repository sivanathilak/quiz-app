
// Quiz questions
const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "HyperText Markup Language", correct: true },
            { text: "HighText Machine Language", correct: false },
            { text: "HyperTool Multi Language", correct: false },
            { text: "HomeText Markup Language", correct: false }
        ]
    },
    {
        question: "Which language is used to style a webpage?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Python", correct: false },
            { text: "SQL", correct: false }
        ]
    },
    {
        question: "Which language adds interactivity to a webpage?",
        answers: [
            { text: "JavaScript", correct: true },
            { text: "CSS", correct: false },
            { text: "HTML", correct: false },
            { text: "SQL", correct: false }
        ]
    },
    {
        question: "Which JavaScript keyword creates a variable that can be changed?",
        answers: [
            { text: "const", correct: false },
            { text: "let", correct: true },
            { text: "style", correct: false },
            { text: "return", correct: false }
        ]
    },
    {
        question: "Which symbol is used for an ID selector in CSS?",
        answers: [
            { text: ".", correct: false },
            { text: "#", correct: true },
            { text: "*", correct: false },
            { text: "@", correct: false }
        ]
    }
];


// Get HTML elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");

const scoreElement = document.getElementById("score");
const finalScoreElement = document.getElementById("final-score");
const questionNumberElement = document.getElementById("question-number");
const timerElement = document.getElementById("timer");
const resultMessage = document.getElementById("result-message");


// Quiz variables
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;


// Start quiz
startButton.addEventListener("click", startQuiz);


// Restart quiz
restartButton.addEventListener("click", startQuiz);


// Next question
nextButton.addEventListener("click", () => {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }

});


// Start the quiz
function startQuiz() {

    currentQuestionIndex = 0;
    score = 0;

    scoreElement.textContent = score;

    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
}


// Display a question
function showQuestion() {

    resetQuestion();

    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;

    questionNumberElement.textContent =
        `${currentQuestionIndex + 1} / ${questions.length}`;

    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");

        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);
    });

    startTimer();
}


// Reset previous question
function resetQuestion() {

    clearInterval(timer);

    nextButton.classList.add("hidden");

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


// When the user selects an answer
function selectAnswer(event) {

    clearInterval(timer);

    const selectedButton = event.target;

    const isCorrect =
        selectedButton.dataset.correct === "true";


    // Add score if correct
    if (isCorrect) {

        score++;

        scoreElement.textContent = score;

        selectedButton.classList.add("correct");

    } else {

        selectedButton.classList.add("wrong");
    }


    // Show correct answer
    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    });


    nextButton.classList.remove("hidden");
}


// Start timer
function startTimer() {

    timeLeft = 15;

    timerElement.textContent = timeLeft;

    timer = setInterval(() => {

        timeLeft--;

        timerElement.textContent = timeLeft;


        if (timeLeft <= 0) {

            clearInterval(timer);

            handleTimeOut();
        }

    }, 1000);
}


// What happens when time reaches 0
function handleTimeOut() {

    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextButton.classList.remove("hidden");
}


// Show final results
function showResults() {

    clearInterval(timer);

    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    finalScoreElement.textContent =
        `${score} / ${questions.length}`;


    // Result message
    const percentage =
        (score / questions.length) * 100;


    if (percentage === 100) {

        resultMessage.textContent =
            "Perfect score! Great job!";

    } else if (percentage >= 80) {

        resultMessage.textContent =
            "Great job! You know your stuff.";

    } else if (percentage >= 60) {

        resultMessage.textContent =
            "Good job! Keep practicing.";

    } else {

        resultMessage.textContent =
            "Keep practicing and try again!";
    }
}

