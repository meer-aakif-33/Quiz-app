const questions = [
    {
        question: "What is the tallest land animal in the world?",
        answers: [
            {text: "Giraffe", correct: true},
            {text: "Elephant", correct: false},
            {text: "Hippopotamus", correct: false},
            {text: "Rhinoceros", correct: false},
        ]
    },
    {
        question: "Which animal is known as the 'King of the Jungle'?",
        answers: [
            {text: "Lion", correct: true},
            {text: "Tiger", correct: false},
            {text: "Leopard", correct: false},
            {text: "Cheetah", correct: false}
        ]
    },
    {
        question: "What is the largest species of bear in the world?",
        answers: [
            {text: "Polar Bear", correct: true},
            {text: "Grizzly Bear", correct: false},
            {text: "Black Bear", correct: false},
            {text: "Brown Bear", correct: false}
        ]
    },
    {
        question: "Which bird is known for its ability to mimic human speech?",
        answers: [
            {text: "Parrot", correct: true},
            {text: "Eagle", correct: false},
            {text: "Ostrich", correct: false},
            {text: "Penguin", correct: false}
        ]
    },
    {
        question: "What is the fastest land animal in the world?",
        answers: [
            {text: "Cheetah", correct: true},
            {text: "Lion", correct: false},
            {text: "Leopard", correct: false},
            {text: "Gazelle", correct: false}
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score ++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex ++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",() => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
