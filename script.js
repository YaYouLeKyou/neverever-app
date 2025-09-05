const translations = {
    en: {
        languages: "Languages",
        super_spicy: "Super Spicy 🌶️",
        drink_or: "Truth, drink or",
        do: "Do",
        next_question: "Next Question",
        close: "Close",
        questions: [
            "Never have I ever faked a phone call to get out of a conversation.",
            "Never have I ever stalked an ex on social media.",
        ],
        superSpicyQuestions: [
            "Never have I ever sent a nude.",
            "Never have I ever had a threesome.",
        ],
        actions: [
            "Do 10 pushups.",
            "Sing a song chosen by the other players.",
        ],
        superSpicyActions: [
            "Take a body shot off the person of your choice.",
            "Give a 2-minute massage to the person to your left.",
        ]
    },
    fr: {
        languages: "Langues",
        super_spicy: "Super Pimenté 🌶️",
        drink_or: "Vérité, bois ou",
        do: "Action",
        next_question: "Question Suivante",
        close: "Fermer",
        questions: [
            "Je n'ai jamais fait semblant de recevoir un appel pour quitter une conversation.",
            "Je n'ai jamais espionné un ex sur les réseaux sociaux.",
        ],
        superSpicyQuestions: [
            "Je n'ai jamais envoyé de nu.",
            "Je n'ai jamais fait de plan à three.",
        ],
        actions: [
            "Fais 10 pompes.",
            "Chante une chanson choisie par les autres joueurs.",
        ],
        superSpicyActions: [
            "Prends un body shot sur la personne de ton choix.",
            "Fais un massage de 2 minutes à la personne à ta gauche.",
        ]
    },
    es: {
        languages: "Idiomas",
        super_spicy: "Super Picante 🌶️",
        drink_or: "Verdad, bebe o",
        do: "Acción",
        next_question: "Siguiente Pregunta",
        close: "Cerrar",
        questions: [
            "Nunca he fingido una llamada para salir de una conversación.",
            "Nunca he acosado a un ex en las redes sociales.",
        ],
        superSpicyQuestions: [
            "Nunca he enviado un desnudo.",
            "Nunca he tenido un trío.",
        ],
        actions: [
            "Haz 10 flexiones.",
            "Canta una canción elegida por los demás jugadores.",
        ],
        superSpicyActions: [
            "Toma un chupito del cuerpo de la persona que elijas.",
            "Da un masaje de 2 minutos a la persona a tu izquierda.",
        ]
    },
    ar: {
        languages: "لغات",
        super_spicy: "حار جدا 🌶️",
        drink_or: "حقيقة، اشرب أو",
        do: "فعل",
        next_question: "السؤال التالي",
        close: "إغلاق",
        questions: [
            "لم يسبق لي أن تظاهرت بمكالمة هاتفية للخروج من محادثة.",
            "لم يسبق لي أن طاردت حبيباً سابقاً على وسائل التواصل الاجتماعي.",
        ],
        superSpicyQuestions: [
            "لم يسبق لي أن أرسلت صورة عارية.",
            "لم يسبق لي أن أقمت علاقة ثلاثية.",
        ],
        actions: [
            "قم بعمل 10 تمرينات ضغط.",
            "غن أغنية يختارها اللاعبون الآخرون.",
        ],
        superSpicyActions: [
            "خذ جرعة من جسد الشخص الذي تختاره.",
            "قم بتدليك لمدة دقيقتين للشخص الذي على يسارك.",
        ]
    },
    zh: {
        languages: "语言",
        super_spicy: "超级辣 🌶️",
        drink_or: "真心话，喝酒或",
        do: "做",
        next_question: "下一个问题",
        close: "关闭",
        questions: [
            "我从来没有假装打电话来摆脱谈话。",
            "我从来没有在社交媒体上跟踪过前任。",
        ],
        superSpicyQuestions: [
            "我从来没有发过裸照。",
            "我从来没有玩过三人行。",
        ],
        actions: [
            "做10个俯卧撑。",
            "唱一首其他玩家选择的歌曲。",
        ],
        superSpicyActions: [
            "从你选择的人身上喝一杯。",
            "给你左边的人做2分钟的按摩。",
        ]
    }
};

let currentLanguage = 'en';

const questionText = document.getElementById('question-text');
const nextQuestionButton = document.getElementById('next-question');
const choicesContainer = document.getElementById('choices');
const doButton = document.getElementById('do-button');
const actionModal = document.getElementById('action-modal');
const actionText = document.getElementById('action-text');
const closeModalButton = document.getElementById('close-modal');
const card = document.querySelector('.card');
const langMenuButton = document.getElementById('lang-menu-button');
const langModal = document.getElementById('lang-modal');
const closeLangModalButton = document.getElementById('close-lang-modal');

let lastQuestionIndex = -1;
let lastActionIndex = -1;
let lastSpicyQuestionIndex = -1;
let lastSpicyActionIndex = -1;

let isSpicy = false;
let questionCounter = 0;
let nextSpicy = Math.floor(Math.random() * 3) + 3; // 3 to 5

function t(key) {
    return translations[currentLanguage][key];
}

function updateUIText() {
    document.querySelectorAll('[data-i18n-key]').forEach(element => {
        const key = element.getAttribute('data-i18n-key');
        element.innerText = t(key);
    });
}

function getNewQuestion() {
    questionCounter++;
    if (questionCounter >= nextSpicy) {
        questionCounter = 0;
        nextSpicy = Math.floor(Math.random() * 3) + 3;
        isSpicy = true;
        let newSpicyQuestionIndex;
        do {
            newSpicyQuestionIndex = Math.floor(Math.random() * t('superSpicyQuestions').length);
        } while (newSpicyQuestionIndex === lastSpicyQuestionIndex);
        lastSpicyQuestionIndex = newSpicyQuestionIndex;
        return t('superSpicyQuestions')[newSpicyQuestionIndex];
    } else {
        isSpicy = false;
        let newQuestionIndex;
        do {
            newQuestionIndex = Math.floor(Math.random() * t('questions').length);
        } while (newQuestionIndex === lastQuestionIndex);
        lastQuestionIndex = newQuestionIndex;
        return t('questions')[newQuestionIndex];
    }
}

function getNewAction() {
    if (isSpicy) {
        let newSpicyActionIndex;
        do {
            newSpicyActionIndex = Math.floor(Math.random() * t('superSpicyActions').length);
        } while (newSpicyActionIndex === lastSpicyActionIndex);
        lastSpicyActionIndex = newSpicyActionIndex;
        return t('superSpicyActions')[newSpicyActionIndex];
    } else {
        let newActionIndex;
        do {
            newActionIndex = Math.floor(Math.random() * t('actions').length);
        } while (newActionIndex === lastActionIndex);
        lastActionIndex = newActionIndex;
        return t('actions')[newActionIndex];
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

function setLanguage(lang) {
    currentLanguage = lang;
    if (lang === 'ar') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
    updateUIText();
    displayNewQuestion();
    langModal.classList.add('hidden');
}

langMenuButton.addEventListener('click', () => {
    langModal.classList.remove('hidden');
});

closeLangModalButton.addEventListener('click', () => {
    langModal.classList.add('hidden');
});

document.querySelectorAll('.lang-select').forEach(button => {
    button.addEventListener('click', () => {
        setLanguage(button.getAttribute('data-lang'));
    });
});

doButton.addEventListener('click', () => {
    actionText.innerText = getNewAction();
    actionModal.classList.remove('hidden');
});

closeModalButton.addEventListener('click', () => {
    actionModal.classList.add('hidden');
});

nextQuestionButton.addEventListener('click', displayNewQuestion);

// Initial setup
updateUIText();
displayNewQuestion();
