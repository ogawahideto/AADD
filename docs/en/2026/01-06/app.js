document.addEventListener('DOMContentLoaded', () => {
    // Initialize Timeline
    initializeTimeline();
    
    // Initialize Quiz
    initializeQuiz();
});

// ========== TIMELINE FUNCTIONALITY ==========
function initializeTimeline() {
    const timelineEvents = [
        {
            year: "1521",
            title: "Fall of Tenochtitlan",
            description: "The Aztec capital falls to Spanish conquistador Hernán Cortés and his indigenous allies. This marks the beginning of Spanish colonial rule in central Mexico, leading to dramatic cultural and social changes."
        },
        {
            year: "1536",
            title: "Founding of Colegio de Santa Cruz",
            description: "On January 6, Antonio de Mendoza and Bishop Juan de Zumárraga establish the Colegio as the first institution of higher learning in the Americas. Located at Tlatelolco, it was built on the site of a former Aztec ceremonial center."
        },
        {
            year: "1540s",
            title: "Peak of Academic Excellence",
            description: "The college reaches its zenith, with indigenous students mastering Latin, rhetoric, logic, and philosophy. Some graduates become professors themselves, teaching alongside Spanish friars and creating a unique blend of European and indigenous knowledge."
        },
        {
            year: "1552",
            title: "The Badianus Manuscript",
            description: "The first herbal medicine book in the Americas is created at Tlatelolco by Martín de la Cruz (indigenous physician) and translated into Latin by Juan Badiano (indigenous scholar). This landmark work preserved Aztec medicinal knowledge."
        },
        {
            year: "1575-1577",
            title: "The Florentine Codex",
            description: "Bernardino de Sahagún completes his monumental 'Historia general de las cosas de Nueva España' with the help of indigenous scholars from Tlatelolco. This 12-volume work became one of the most comprehensive documents of indigenous culture in the Americas."
        },
        {
            year: "1600",
            title: "Gradual Decline",
            description: "After decades of decreasing support from colonial authorities, the college begins to lose its prominence. The initial vision of creating indigenous clergy faded as colonial policies shifted toward stricter cultural assimilation."
        },
        {
            year: "Today",
            title: "Archaeological Site and Memorial",
            description: "The ruins of Tlatelolco now stand as an archaeological site in Mexico City. The Plaza de las Tres Culturas ('Square of the Three Cultures') commemorates the pre-Columbian, colonial, and modern Mexican eras that converged at this historic location."
        }
    ];

    let currentEventIndex = 0;
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const timelineProgress = document.getElementById('timeline-progress');
    const timelineYear = document.querySelector('.timeline-year');
    const timelineTitle = document.querySelector('.timeline-title');
    const timelineDescription = document.querySelector('.timeline-description');
    
    // Function to update timeline display
    function updateTimelineDisplay(index) {
        // Fade out effect
        const timelineDisplay = document.querySelector('.timeline-display');
        timelineDisplay.style.opacity = 0;
        
        setTimeout(() => {
            // Update content
            timelineYear.textContent = timelineEvents[index].year;
            timelineTitle.textContent = timelineEvents[index].title;
            timelineDescription.textContent = timelineEvents[index].description;
            
            // Update progress bar
            const progressPercentage = ((index) / (timelineEvents.length - 1)) * 100;
            timelineProgress.style.width = `${progressPercentage}%`;
            
            // Fade in effect
            timelineDisplay.style.opacity = 1;
        }, 300);

        // Update button states
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === timelineEvents.length - 1;
        
        // Visual feedback for disabled buttons
        if (index === 0) {
            prevBtn.style.opacity = 0.5;
        } else {
            prevBtn.style.opacity = 1;
        }
        
        if (index === timelineEvents.length - 1) {
            nextBtn.style.opacity = 0.5;
        } else {
            nextBtn.style.opacity = 1;
        }
    }

    // Set initial state
    updateTimelineDisplay(currentEventIndex);

    // Event listeners for navigation
    prevBtn.addEventListener('click', () => {
        if (currentEventIndex > 0) {
            currentEventIndex--;
            updateTimelineDisplay(currentEventIndex);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentEventIndex < timelineEvents.length - 1) {
            currentEventIndex++;
            updateTimelineDisplay(currentEventIndex);
        }
    });

    // Allow keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentEventIndex > 0) {
            currentEventIndex--;
            updateTimelineDisplay(currentEventIndex);
        }
        if (e.key === 'ArrowRight' && currentEventIndex < timelineEvents.length - 1) {
            currentEventIndex++;
            updateTimelineDisplay(currentEventIndex);
        }
    });
}

// ========== QUIZ FUNCTIONALITY ==========
function initializeQuiz() {
    const quizData = [
        {
            question: "When was Colegio de Santa Cruz de Tlatelolco founded?",
            options: ["1492", "1521", "1536", "1636"],
            correct: 2,
            feedback: {
                correct: "Correct! The college was founded on January 6, 1536, just 15 years after the fall of the Aztec Empire.",
                incorrect: "The college was founded on January 6, 1536, about 15 years after the Spanish conquest of Mexico."
            }
        },
        {
            question: "Which languages were taught at the Colegio de Santa Cruz?",
            options: ["Only Spanish", "Spanish and Latin", "Spanish, Latin, and Nahuatl", "Spanish and English"],
            correct: 2,
            feedback: {
                correct: "That's right! The college was trilingual, teaching in Spanish, Latin, and Nahuatl (the Aztec language).",
                incorrect: "The college was actually trilingual - Spanish, Latin, and Nahuatl (the Aztec language) were all taught and used."
            }
        },
        {
            question: "What important document was created with help from scholars at Tlatelolco?",
            options: ["The Treaty of Guadalupe Hidalgo", "The Florentine Codex", "The Mexican Constitution", "The Treaty of Tordesillas"],
            correct: 1,
            feedback: {
                correct: "Correct! The Florentine Codex, a comprehensive encyclopedia of Aztec culture and knowledge, was created with help from indigenous scholars at Tlatelolco.",
                incorrect: "The Florentine Codex, a 12-volume encyclopedia documenting Aztec culture, medicine, and history, was created with the assistance of indigenous scholars from the college."
            }
        },
        {
            question: "How does Colegio de Santa Cruz compare to other early American educational institutions?",
            options: ["It was established after Harvard", "It was the first European-style university in the Americas", "It only taught religious subjects", "It only admitted Spanish students"],
            correct: 1,
            feedback: {
                correct: "That's right! Tlatelolco predated Harvard by over a century, making it the first European-style institution of higher learning in the Americas.",
                incorrect: "The Colegio de Santa Cruz was actually the first European-style institution of higher learning in the Americas, established more than 100 years before Harvard University."
            }
        }
    ];

    let currentQuizQuestion = 0;
    let score = 0;
    let hasAnswered = false;

    const quizContainer = document.getElementById('quiz-container');
    const questionElement = document.getElementById('quiz-question');
    const optionsElement = document.getElementById('quiz-options');
    const feedbackElement = document.getElementById('quiz-feedback');
    const nextButton = document.getElementById('quiz-next');
    const resultsElement = document.getElementById('quiz-results');
    const scoreElement = document.getElementById('quiz-score');
    const totalElement = document.getElementById('quiz-total');
    const restartButton = document.getElementById('quiz-restart');

    function showQuestion(index) {
        const question = quizData[index];
        hasAnswered = false;
        
        // Set question
        questionElement.textContent = question.question;
        
        // Clear options
        optionsElement.innerHTML = '';
        
        // Create options
        question.options.forEach((option, i) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('quiz-option');
            optionElement.textContent = option;
            optionElement.dataset.index = i;
            optionElement.addEventListener('click', checkAnswer);
            optionsElement.appendChild(optionElement);
        });
        
        // Hide feedback and next button
        feedbackElement.classList.add('hidden');
        nextButton.classList.add('hidden');
    }

    function checkAnswer(e) {
        if (hasAnswered) return;
        
        const selectedOption = e.target;
        const selectedIndex = parseInt(selectedOption.dataset.index);
        const correctIndex = quizData[currentQuizQuestion].correct;
        
        // Mark as answered
        hasAnswered = true;
        
        // Update selected option styles
        const options = document.querySelectorAll('.quiz-option');
        options.forEach((option, i) => {
            if (i === correctIndex) {
                option.classList.add('correct');
            } else if (i === selectedIndex) {
                option.classList.add('selected');
                if (selectedIndex !== correctIndex) {
                    option.classList.add('incorrect');
                }
            }
        });
        
        // Update score
        if (selectedIndex === correctIndex) {
            score++;
            feedbackElement.textContent = quizData[currentQuizQuestion].feedback.correct;
            feedbackElement.classList.add('correct');
        } else {
            feedbackElement.textContent = quizData[currentQuizQuestion].feedback.incorrect;
            feedbackElement.classList.add('incorrect');
        }
        
        // Show feedback and next button
        feedbackElement.classList.remove('hidden');
        if (currentQuizQuestion < quizData.length - 1) {
            nextButton.classList.remove('hidden');
        } else {
            // Show final results if this is the last question
            setTimeout(showResults, 1500);
        }
    }

    function nextQuestion() {
        currentQuizQuestion++;
        
        if (currentQuizQuestion < quizData.length) {
            showQuestion(currentQuizQuestion);
        } else {
            showResults();
        }
    }

    function showResults() {
        questionElement.classList.add('hidden');
        optionsElement.classList.add('hidden');
        feedbackElement.classList.add('hidden');
        nextButton.classList.add('hidden');
        
        scoreElement.textContent = score;
        totalElement.textContent = quizData.length;
        resultsElement.classList.remove('hidden');
    }

    function restartQuiz() {
        currentQuizQuestion = 0;
        score = 0;
        
        resultsElement.classList.add('hidden');
        questionElement.classList.remove('hidden');
        optionsElement.classList.remove('hidden');
        
        showQuestion(currentQuizQuestion);
    }

    // Event listeners
    nextButton.addEventListener('click', nextQuestion);
    restartButton.addEventListener('click', restartQuiz);

    // Start the quiz
    showQuestion(currentQuizQuestion);
}