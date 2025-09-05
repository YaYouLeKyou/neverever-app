const questions = [
    "Never have I ever faked a phone call to get out of a conversation.",
    "Never have I ever stalked an ex on social media.",
    "Never have I ever pretended to understand a joke I didn't get.",
    "Never have I ever eaten food that fell on the floor.",
    "Never have I ever used my pet's name as a password.",
];

const superSpicyQuestions = [
    "Never have I ever sent a nude.",
    "Never have I ever had a threesome.",
    "Never have I ever cheated on a partner.",
    "Never have I ever been arrested.",
    "Never have I ever used a fake ID."
];

const actions = [
    "Do 10 pushups.",
    "Sing a song chosen by the other players.",
    "Talk in a funny accent for the next 3 rounds.",
    "Let someone draw on your face with a pen.",
    "Do your best impression of a celebrity."
];

const superSpicyActions = [
    "Take a body shot off the person of your choice.",
    "Give a 2-minute massage to the person to your left.",
    "Remove two items of clothing.",
    "Show the most embarrassing photo on your phone.",
    "Try to lick your elbow while singing the alphabet."
];

const questionText = document.getElementById('question-text');
const nextQuestionButton = document.getElementById('next-question');
const choicesContainer = document.getElementById('choices');
const doButton = document.getElementById('do-button');
const actionModal = document.getElementById('action-modal');
const actionText = document.getElementById('action-text');
const closeModalButton = document.getElementById('close-modal');
const card = document.querySelector('.card');

let lastQuestionIndex = -1;
let lastActionIndex = -1;
let lastSpicyQuestionIndex = -1;
let lastSpicyActionIndex = -1;

let isSpicy = false;
let questionCounter = 0;
let nextSpicy = Math.floor(Math.random() * 3) + 3; // 3 to 5

function getNewQuestion() {
    questionCounter++;
    if (questionCounter >= nextSpicy) {
        questionCounter = 0;
        nextSpicy = Math.floor(Math.random() * 3) + 3;
        isSpicy = true;
        let newSpicyQuestionIndex;
        do {
            newSpicyQuestionIndex = Math.floor(Math.random() * superSpicyQuestions.length);
        } while (newSpicyQuestionIndex === lastSpicyQuestionIndex);
        lastSpicyQuestionIndex = newSpicyQuestionIndex;
        return superSpicyQuestions[newSpicyQuestionIndex];
    } else {
        isSpicy = false;
        let newQuestionIndex;
        do {
            newQuestionIndex = Math.floor(Math.random() * questions.length);
        } while (newQuestionIndex === lastQuestionIndex);
        lastQuestionIndex = newQuestionIndex;
        return questions[newQuestionIndex];
    }
}

function getNewAction() {
    if (isSpicy) {
        let newSpicyActionIndex;
        do {
            newSpicyActionIndex = Math.floor(Math.random() * superSpicyActions.length);
        } while (newSpicyActionIndex === lastSpicyActionIndex);
        lastSpicyActionIndex = newSpicyActionIndex;
        return superSpicyActions[newSpicyActionIndex];
    } else {
        let newActionIndex;
        do {
            newActionIndex = Math.floor(Math.random() * actions.length);
        } while (newActionIndex === lastActionIndex);
        lastActionIndex = newActionIndex;
        return actions[newActionIndex];
    }
}

function displayNewQuestion() {
    questionText.classList.add('fade');
    choicesContainer.classList.add('hidden');
    actionModal.classList.add('hidden');
    card.classList.remove('super-spicy', 'glitch');

    setTimeout(() => {
        questionText.innerText = getNewQuestion();
        if (isSpicy) {
            card.classList.add('super-spicy');
            card.classList.add('glitch');
        }
        questionText.classList.remove('fade');
        choicesContainer.classList.remove('hidden');
    }, 500); // Match the CSS transition time
}

doButton.addEventListener('click', () => {
    actionText.innerText = getNewAction();
    actionModal.classList.remove('hidden');
});

closeModalButton.addEventListener('click', () => {
    actionModal.classList.add('hidden');
});

nextQuestionButton.addEventListener('click', displayNewQuestion);

// Display the first question on load
displayNewQuestion();
