// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize quiz functionality
    initQuiz();
    
    // Initialize the then-now slider
    initThenNowSlider();
    
    // Add scroll animations
    initScrollAnimations();
});

/**
 * Initialize the interactive quiz
 */
function initQuiz() {
    const quizData = [
        {
            question: "How old was Eleanor of Provence when she married King Henry III?",
            options: ["8 years old", "12 years old", "16 years old", "21 years old"],
            correct: 1,
            feedback: "Eleanor was only 12 years old when she married 28-year-old Henry III, which was young even by medieval standards but not uncommon for royal marriages."
        },
        {
            question: "What cultural innovation did Eleanor bring to the English court?",
            options: ["Nordic sagas", "Provençal poetry", "German music", "Russian architecture"],
            correct: 1,
            feedback: "Eleanor introduced Provençal troubadour poetry and southern French culture to England, influencing art, literature, and courtly customs."
        },
        {
            question: "Which architectural project did Henry III and Eleanor famously renovate?",
            options: ["Tower of London", "Westminster Abbey", "Windsor Castle", "Canterbury Cathedral"],
            correct: 1,
            feedback: "Their renovation of Westminster Abbey was one of their most significant cultural contributions, establishing it as the primary venue for royal ceremonies."
        }
    ];
    
    const startButton = document.getElementById('start-quiz');
    const quizIntro = document.querySelector('.quiz-intro');
    const questionContainer = document.getElementById('question-container');
    const resultsContainer = document.getElementById('results-container');
    
    let currentQuestion = 0;
    let score = 0;
    let answeredQuestions = 0;
    
    // Start the quiz when the start button is clicked
    startButton.addEventListener('click', () => {
        quizIntro.classList.remove('active');
        questionContainer.style.display = 'block';
        showQuestion(currentQuestion);
    });
    
    // Function to display a question
    function showQuestion(index) {
        questionContainer.innerHTML = '';
        
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        
        questionDiv.innerHTML = `
            <h4>${quizData[index].question}</h4>
            <div class="options"></div>
            <div class="question-feedback"></div>
            <div class="quiz-nav"></div>
        `;
        
        questionContainer.appendChild(questionDiv);
        
        const optionsContainer = questionDiv.querySelector('.options');
        
        // Create option buttons
        quizData[index].options.forEach((option, optionIndex) => {
            const button = document.createElement('button');
            button.classList.add('option-button');
            button.textContent = option;
            
            button.addEventListener('click', () => {
                // Disable all option buttons after selection
                document.querySelectorAll('.option-button').forEach(btn => {
                    btn.disabled = true;
                });
                
                // Check if answer is correct
                if (optionIndex === quizData[index].correct) {
                    button.classList.add('correct');
                    score++;
                } else {
                    button.classList.add('incorrect');
                    // Highlight the correct answer
                    document.querySelectorAll('.option-button')[quizData[index].correct].classList.add('correct');
                }
                
                answeredQuestions++;
                
                // Show feedback
                const feedback = questionDiv.querySelector('.question-feedback');
                feedback.textContent = quizData[index].feedback;
                feedback.style.display = 'block';
                
                // Show navigation buttons
                const navContainer = questionDiv.querySelector('.quiz-nav');
                
                if (answeredQuestions < quizData.length) {
                    const nextButton = document.createElement('button');
                    nextButton.classList.add('next-question');
                    nextButton.textContent = 'Next Question';
                    nextButton.addEventListener('click', () => {
                        currentQuestion++;
                        showQuestion(currentQuestion);
                    });
                    navContainer.appendChild(nextButton);
                } else {
                    const finishButton = document.createElement('button');
                    finishButton.classList.add('next-question');
                    finishButton.textContent = 'Show Results';
                    finishButton.addEventListener('click', showResults);
                    navContainer.appendChild(finishButton);
                }
            });
            
            optionsContainer.appendChild(button);
        });
    }
    
    // Function to show the final results
    function showResults() {
        questionContainer.style.display = 'none';
        resultsContainer.style.display = 'block';
        
        // Calculate percentage
        const percentage = Math.round((score / quizData.length) * 100);
        
        let message = '';
        if (percentage === 100) {
            message = "Incredible! You're a medieval history expert!";
        } else if (percentage >= 66) {
            message = "Well done! You have good knowledge of this royal history.";
        } else {
            message = "Thanks for playing! You've learned some new royal history today.";
        }
        
        resultsContainer.innerHTML = `
            <h4>Quiz Complete!</h4>
            <p>You scored ${score} out of ${quizData.length}</p>
            <p>${message}</p>
            <button id="restart-quiz" class="next-question">Try Again</button>
        `;
        
        document.getElementById('restart-quiz').addEventListener('click', () => {
            // Reset quiz
            currentQuestion = 0;
            score = 0;
            answeredQuestions = 0;
            
            // Show intro again
            resultsContainer.style.display = 'none';
            quizIntro.classList.add('active');
        });
    }
}

/**
 * Initialize the Then & Now slider interaction
 */
function initThenNowSlider() {
    const slider = document.getElementById('slider-handle');
    const thenSide = document.querySelector('.then-side');
    const nowSide = document.querySelector('.now-side');
    
    let isDragging = false;
    let sliderPosition = 50; // Start at 50%
    
    // Handle drag start
    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        e.preventDefault();
    });
    
    slider.addEventListener('touchstart', (e) => {
        isDragging = true;
    });
    
    // Handle drag end
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    document.addEventListener('touchend', () => {
        isDragging = false;
    });
    
    // Handle dragging
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const container = slider.parentElement;
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        
        // Calculate percentage (constrained between 10% and 90%)
        sliderPosition = Math.max(10, Math.min(90, (x / rect.width) * 100));
        
        updateSliderPosition();
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const touch = e.touches[0];
        const container = slider.parentElement;
        const rect = container.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        
        // Calculate percentage (constrained between 10% and 90%)
        sliderPosition = Math.max(10, Math.min(90, (x / rect.width) * 100));
        
        updateSliderPosition();
    });
    
    // Update the slider position
    function updateSliderPosition() {
        slider.style.left = `${sliderPosition}%`;
        thenSide.style.clipPath = `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`;
        nowSide.style.clipPath = `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`;
    }
}

/**
 * Add scroll animations to elements
 */
function initScrollAnimations() {
    // Simple function to check if an element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Elements to animate
    const elements = document.querySelectorAll('.story-section, .quiz-section, .compare-section');
    
    // Add initial state
    elements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    });
    
    // Function to check scroll position and animate elements
    function checkScroll() {
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    }
    
    // Run once to check initial state
    checkScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', checkScroll);
}