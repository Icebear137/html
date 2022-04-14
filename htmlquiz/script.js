const startButton = document.getElementById('btn-start');
const nextButton = document.getElementById('btn-next');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;


startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});



function getScore() {
    return quizScore;
}


function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}


function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}


function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}


function resetState() {
    currentQuestionIndex = 0;
    quizScore = 0;
    startButton.classList.remove('hide');
    nextButton.classList.add('hide');
    questionContainerElement.classList.add('hide');
}


function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}


function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}





const questions = [
    {
        question: 'Which one of these is a javascript framework?',
        answers: [
            { text: 'React', correct: true },
            { text: 'Angular', correct: false },
            { text: 'Vue', correct: false },    
            { text: 'Ember', correct: false }  
        ]  
    },
    {
        question: 'Which one of these is a javascript library?',
        answers: [
            { text: 'React', correct: false },
            { text: 'Angular', correct: false },
            { text: 'Vue', correct: true },
            { text: 'Ember', correct: false }
        ]
    },
    {
        question: 'Which country is the most populated country in the world?',
        answers: [
            { text: 'China', correct: false },
            { text: 'India', correct: true },
            { text: 'USA', correct: false },
            { text: 'Russia', correct: false }
        ]
    },
];