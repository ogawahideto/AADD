// Emperor data for the interactive section
const emperorData = {
    galba: {
        title: "Servius Sulpicius Galba",
        dates: "Ruled June 68 CE - January 15, 69 CE (7 months)",
        content: "Galba was the first emperor in the Year of Four Emperors. Already 73 years old when he took power, he was a respected aristocrat but proved to be an unpopular emperor. His refusal to pay the promised donative to the soldiers, his excessive strictness, and his perceived miserliness alienated the troops. On January 15, 69 CE, just 12 days after the Rhine legions rejected him, Galba was assassinated in the Roman Forum by the Praetorian Guard who supported Otho.",
        fate: "Beheaded in the Forum. According to Suetonius, his head was carried on a pole by a soldier to Otho."
    },
    otho: {
        title: "Marcus Salvius Otho",
        dates: "Ruled January 15, 69 CE - April 16, 69 CE (3 months)",
        content: "Once Nero's friend and husband to Poppaea (before Nero took her as his wife), Otho had supported Galba initially but turned against him when he chose someone else as his heir. After orchestrating Galba's assassination, Otho became emperor but immediately faced the challenge of Vitellius, who was marching toward Rome with the Rhine legions. After his forces were defeated at the First Battle of Bedriacum, Otho chose to commit suicide rather than continue a civil war.",
        fate: "Committed suicide by stabbing himself in the heart to prevent further bloodshed, saying 'It is far more just to perish one for all, than many for one.'"
    },
    vitellius: {
        title: "Aulus Vitellius",
        dates: "Ruled April 17, 69 CE - December 20, 69 CE (8 months)",
        content: "Proclaimed emperor by the Rhine legions on January 3, Vitellius was the commander of Germania Inferior. He was known for his gluttony and extravagance. After defeating Otho's forces, he entered Rome in July. His brief reign was marked by lavish feasts and games to gain popularity. However, when the eastern legions declared for Vespasian in July, his fate was sealed. By December, Vespasian's supporters had reached Rome, and Vitellius was captured while attempting to flee.",
        fate: "Tortured and executed by Vespasian's supporters. His body was dragged through Rome and thrown into the Tiber River."
    },
    vespasian: {
        title: "Titus Flavius Vespasianus",
        dates: "Ruled December 21, 69 CE - June 23, 79 CE (10 years)",
        content: "A successful general commanding legions in Judaea, Vespasian was proclaimed emperor by his troops in July 69 CE. Unlike his three predecessors that year, he was an experienced administrator from a humble background rather than aristocratic. After his forces defeated Vitellius, Vespasian established the Flavian dynasty and brought stability back to the empire. He reformed the army, began construction of the Colosseum, and restored the treasury through careful financial management.",
        fate: "The only one of the four emperors to die of natural causes, reportedly joking on his deathbed: 'Dear me, I think I'm becoming a god.'"
    }
};

// Quiz data
const quizQuestions = [
    {
        question: "What significant precedent did the events of 69 CE establish in the Roman Empire?",
        options: [
            "That emperors could be made outside of Rome by provincial armies",
            "That the Senate alone could choose the emperor",
            "That only members of the aristocracy could become emperor",
            "That the empire should be divided between co-emperors"
        ],
        correct: 0,
        explanation: "The events of 69 CE revealed that emperors could be proclaimed by armies outside Rome, fundamentally changing how imperial power worked."
    },
    {
        question: "What was Galba's fatal mistake that alienated the legions?",
        options: [
            "He attacked Germania",
            "He refused to pay the promised bonus (donative) to soldiers",
            "He executed all of Nero's supporters",
            "He abolished the Praetorian Guard"
        ],
        correct: 1,
        explanation: "Galba's refusal to pay the promised bonus to soldiers who supported him was seen as miserly and untrustworthy, turning the military against him."
    },
    {
        question: "How many emperors ruled Rome in the year 69 CE?",
        options: [
            "Two",
            "Three",
            "Four",
            "Five"
        ],
        correct: 2,
        explanation: "69 CE is known as the Year of Four Emperors: Galba, Otho, Vitellius, and Vespasian all ruled within a single year."
    },
    {
        question: "Which of these emperors founded a lasting dynasty after the civil war?",
        options: [
            "Galba",
            "Otho",
            "Vitellius",
            "Vespasian"
        ],
        correct: 3,
        explanation: "Vespasian founded the Flavian dynasty that would rule Rome for the next 27 years through himself and his sons Titus and Domitian."
    }
];

// Initialize the emperor interactive section
document.addEventListener('DOMContentLoaded', function() {
    // Emperor interaction
    const emperorCards = document.querySelectorAll('.emperor-card');
    const emperorContent = document.getElementById('emperor-content');

    emperorCards.forEach(card => {
        card.addEventListener('click', function() {
            const emperor = this.getAttribute('data-emperor');
            const data = emperorData[emperor];
            
            // Remove active class from all cards
            emperorCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Fade out content, update, then fade in
            emperorContent.style.opacity = 0;
            
            setTimeout(() => {
                emperorContent.innerHTML = `
                    <h4 class="emperor-title">${data.title}</h4>
                    <div class="emperor-dates">${data.dates}</div>
                    <p>${data.content}</p>
                    <p><strong>Fate:</strong> ${data.fate}</p>
                `;
                emperorContent.style.opacity = 1;
            }, 300);
        });
    });

    // Initialize quiz
    initQuiz();
});

// Quiz functionality
function initQuiz() {
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const resultContainer = document.getElementById('result-container');
    const nextButton = document.getElementById('next-button');
    const restartButton = document.getElementById('restart-button');
    const scoreContainer = document.getElementById('score-container');
    
    let currentQuestion = 0;
    let score = 0;
    let quizComplete = false;
    
    // Start quiz
    showQuestion();
    
    // Display current question
    function showQuestion() {
        if (currentQuestion >= quizQuestions.length) {
            finishQuiz();
            return;
        }
        
        const question = quizQuestions[currentQuestion];
        questionContainer.textContent = question.question;
        
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            button.addEventListener('click', () => selectAnswer(index));
            optionsContainer.appendChild(button);
        });
        
        resultContainer.textContent = '';
        nextButton.style.display = 'none';
    }
    
    // Handle answer selection
    function selectAnswer(index) {
        const question = quizQuestions[currentQuestion];
        const options = document.querySelectorAll('.option-btn');
        
        // Disable all options
        options.forEach(option => {
            option.disabled = true;
        });
        
        // Show correct/incorrect feedback
        if (index === question.correct) {
            options[index].classList.add('correct');
            resultContainer.textContent = 'Correct! ' + question.explanation;
            score++;
        } else {
            options[index].classList.add('incorrect');
            options[question.correct].classList.add('correct');
            resultContainer.textContent = 'Incorrect. ' + question.explanation;
        }
        
        nextButton.style.display = 'block';
    }
    
    // Go to next question
    nextButton.addEventListener('click', () => {
        currentQuestion++;
        showQuestion();
    });
    
    // Finish quiz and show results
    function finishQuiz() {
        questionContainer.textContent = 'Quiz Complete!';
        optionsContainer.innerHTML = '';
        resultContainer.textContent = '';
        nextButton.style.display = 'none';
        
        scoreContainer.textContent = `Your score: ${score} out of ${quizQuestions.length}`;
        scoreContainer.style.display = 'block';
        restartButton.style.display = 'block';
        quizComplete = true;
    }
    
    // Restart quiz
    restartButton.addEventListener('click', () => {
        currentQuestion = 0;
        score = 0;
        quizComplete = false;
        scoreContainer.style.display = 'none';
        restartButton.style.display = 'none';
        showQuestion();
    });
}