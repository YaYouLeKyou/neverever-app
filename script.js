const questions = [
    "Never have I ever faked a phone call to get out of a conversation.",
    "Never have I ever stalked an ex on social media.",
    "Never have I ever pretended to understand a joke I didn't get.",
    "Never have I ever eaten food that fell on the floor.",
    "Never have I ever used my pet's name as a password.",
    "Never have I ever lied about my age.",
    "Never have I ever sent a text to the wrong person.",
    "Never have I ever had a crush on a fictional character.",
    "Never have I ever practiced a conversation in the mirror.",
    "Never have I ever worn the same outfit two days in a row.",
    "Never have I ever gone skinny dipping.",
    "Never have I ever had a one-night stand.",
    "Never have I ever kissed a stranger.",
    "Never have I ever used a cheesy pickup line.",
    "Never have I ever been in a friends-with-benefits situation.",
    "Never have I ever lied on a first date.",
    "Never have I ever had a dream about someone in this room.",
    "Never have I ever sent a racy text.",
    "Never have I ever been caught watching something I shouldn't have been.",
    "Never have I ever made out in a public place."
];

const actions = [
    "Do 10 pushups.",
    "Sing a song chosen by the other players.",
    "Talk in a funny accent for the next 3 rounds.",
    "Let someone draw on your face with a pen.",
    "Do your best impression of a celebrity.",
    "Send a text to your crush.",
    "Let the group post a story on your Instagram.",
    "Tell an embarrassing story.",
    "Give a lap dance to the person of your choice.",
    "Remove an item of clothing."
];

const questionText = document.getElementById('question-text');
const nextQuestionButton = document.getElementById('next-question');
const choicesContainer = document.getElementById('choices');
const doButton = document.getElementById('do-button');
const actionModal = document.getElementById('action-modal');
const actionText = document.getElementById('action-text');
const closeModalButton = document.getElementById('close-modal');

let lastQuestionIndex = -1;
let lastActionIndex = -1;

function getNewQuestion() {
    let newQuestionIndex;
    do {
        newQuestionIndex = Math.floor(Math.random() * questions.length);
    } while (newQuestionIndex === lastQuestionIndex);
    lastQuestionIndex = newQuestionIndex;
    return questions[newQuestionIndex];
}

function getNewAction() {
    let newActionIndex;
    do {
        newActionIndex = Math.floor(Math.random() * actions.length);
    } while (newActionIndex === lastActionIndex);
    lastActionIndex = newActionIndex;
    return actions[newActionIndex];
}

function displayNewQuestion() {
    questionText.classList.add('fade');
    choicesContainer.classList.add('hidden');
    actionModal.classList.add('hidden');

    setTimeout(() => {
        questionText.innerText = getNewQuestion();
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
