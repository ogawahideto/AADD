// Main JavaScript for Elizabeth I Coronation
document.addEventListener('DOMContentLoaded', () => {
    initializeTimeline();
    initializeQuiz();
});

// Timeline functionality
function initializeTimeline() {
    // Elements
    const prevButton = document.getElementById('prev-event');
    const nextButton = document.getElementById('next-event');
    const timelineDots = document.querySelectorAll('.timeline-dot');
    const totalEvents = document.querySelectorAll('.timeline-event').length;
    let currentEvent = 1;

    // Event listeners
    prevButton.addEventListener('click', () => navigateTimeline(currentEvent - 1));
    nextButton.addEventListener('click', () => navigateTimeline(currentEvent + 1));
    
    timelineDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const eventNumber = parseInt(dot.dataset.event);
            navigateTimeline(eventNumber);
        });
    });

    // Function to navigate timeline
    function navigateTimeline(eventNumber) {
        // Validate event number
        if (eventNumber < 1 || eventNumber > totalEvents) return;
        
        // Hide current event
        const currentEventElement = document.getElementById(`event-${currentEvent}`);
        currentEventElement.classList.add('hidden');
        
        // Update current event number
        currentEvent = eventNumber;
        
        // Show new event
        const newEventElement = document.getElementById(`event-${currentEvent}`);
        newEventElement.classList.remove('hidden');
        
        // Update dots
        timelineDots.forEach(dot => {
            dot.classList.remove('active');
            if (parseInt(dot.dataset.event) === currentEvent) {
                dot.classList.add('active');
            }
        });
        
        // Update button states
        prevButton.disabled = currentEvent === 1;
        nextButton.disabled = currentEvent === totalEvents;
    }
}

// Quiz functionality
function initializeQuiz() {
    // Quiz data
    const questions = [
        {
            question: "How old was Elizabeth I when she was crowned?",
            options: ["16", "25", "30", "42"],
            correct: 1,
            explanation: "Elizabeth was born on September 7, 1533, making her 25 years old at her coronation on January 15, 1559."
        },
        {
            question: "Which monarch ruled immediately before Elizabeth I?",
            options: ["Henry VIII", "Edward VI", "Mary I", "James I"],
            correct: 2,
            explanation: "Mary I, Elizabeth's half-sister, ruled before her. Known as 'Bloody Mary,' she was Catholic and persecuted Protestants."
        },
        {
            question: "What was unique about Elizabeth's coronation ceremony?",
            options: ["It was conducted in secret", "Parts were in English rather than Latin", "She crowned herself", "It was held outdoors"],
            correct: 1,
            explanation: "Breaking with tradition, parts of Elizabeth's ceremony were conducted in English instead of Latin, signaling religious reform."
        },
        {
            question: "During her 44-year reign, how many times did Elizabeth marry?",
            options: ["Once", "Twice", "Three times", "Never"],
            correct: 3,
            explanation: "Despite numerous suitors and political pressure, Elizabeth never married, becoming known as the 'Virgin Queen'."
        }
    ];

    // Elements
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');
    const explanationText = document.getElementById('explanation-text');
    const nextButton = document.getElementById('next-question');
    const currentQuestionSpan = document.getElementById('current-question');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const finalResults = document.getElementById('final-results');
    const finalScore = document.getElementById('final-score');
    const maxScore = document.getElementById('max-score');
    const restartButton = document.getElementById('restart-quiz');

    // Quiz state
    let currentQuestion = 0;
    let score = 0;
    let selectedOption = null;

    // Initialize quiz
    totalQuestionsSpan.textContent = questions.length;
    maxScore.textContent = questions.length;
    loadQuestion();

    // Event listeners
    nextButton.addEventListener('click', () => {
        currentQuestion++;
        
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showFinalResults();
        }
    });

    restartButton.addEventListener('click', () => {
        currentQuestion = 0;
        score = 0;
        finalResults.classList.add('hidden');
        loadQuestion();
    });

    // Functions
    function loadQuestion() {
        // Reset state
        resultContainer.classList.add('hidden');
        nextButton.disabled = true;
        selectedOption = null;
        
        // Update question number
        currentQuestionSpan.textContent = currentQuestion + 1;
        
        // Set question
        const question = questions[currentQuestion];
        questionText.textContent = question.question;
        
        // Clear options
        optionsContainer.innerHTML = '';
        
        // Add options
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.dataset.index = index;
            
            optionElement.addEventListener('click', () => {
                if (selectedOption !== null) return; // Prevent changing answer
                
                selectedOption = index;
                highlightSelectedOption(optionElement);
                checkAnswer(index, question.correct);
                nextButton.disabled = false;
            });
            
            optionsContainer.appendChild(optionElement);
        });
    }

    function highlightSelectedOption(selected) {
        // Remove previous selections
        const options = optionsContainer.querySelectorAll('.option');
        options.forEach(opt => opt.classList.remove('selected'));
        
        // Add selected class
        selected.classList.add('selected');
    }

    function checkAnswer(selected, correct) {
        const options = optionsContainer.querySelectorAll('.option');
        
        // Highlight correct and incorrect answers
        options.forEach((option, index) => {
            if (index === correct) {
                option.classList.add('correct');
            } else if (index === selected && selected !== correct) {
                option.classList.add('incorrect');
            }
        });
        
        // Show result
        resultContainer.classList.remove('hidden');
        
        if (selected === correct) {
            resultContainer.className = 'correct'; // Reset and add correct class
            resultText.textContent = "Correct!";
            score++;
        } else {
            resultContainer.className = 'incorrect'; // Reset and add incorrect class
            resultText.textContent = "Incorrect!";
        }
        
        // Show explanation
        explanationText.textContent = questions[currentQuestion].explanation;
    }

    function showFinalResults() {
        document.getElementById('question-container').classList.add('hidden');
        resultContainer.classList.add('hidden');
        document.getElementById('quiz-navigation').classList.add('hidden');
        
        finalResults.classList.remove('hidden');
        finalScore.textContent = score;
    }
}