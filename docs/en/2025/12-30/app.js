document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const startJourneyBtn = document.getElementById('start-journey');
    const introSection = document.getElementById('intro');
    const timelineSection = document.getElementById('timeline-section');
    const impactSection = document.getElementById('impact-section');
    const quizSection = document.getElementById('quiz-section');
    const prevEventBtn = document.getElementById('prev-event');
    const nextEventBtn = document.getElementById('next-event');
    const currentDayDisplay = document.getElementById('current-day');
    const progressIndicator = document.querySelector('.progress-indicator');
    const eventDate = document.querySelector('.event-date');
    const eventTitle = document.querySelector('.event-title');
    const eventDescription = document.querySelector('.event-description');
    const eventQuote = document.querySelector('.event-quote');
    const eventIllustration = document.querySelector('.event-illustration');
    const sliderHandle = document.getElementById('slider-handle');
    const restartTimelineBtn = document.getElementById('restart-timeline');

    // Quiz Elements
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const resultContainer = document.getElementById('result-container');
    const questionText = document.getElementById('question-text');
    const resultText = document.getElementById('result-text');
    const explanationText = document.getElementById('explanation-text');
    const nextQuestionBtn = document.getElementById('next-question');
    const quizComplete = document.getElementById('quiz-complete');
    const finalScore = document.getElementById('final-score');

    // Timeline events data
    const timelineEvents = [
        {
            day: 1,
            date: "December 30, 1936",
            title: "The Strike Begins",
            description: "Workers at Fisher Body Plant No. 1 in Flint discover that GM is planning to move dies used to make car bodies – a sign the company might be preparing to relocate production. In response, workers sit down and refuse to leave the factory.",
            quote: "We figured that we couldn't win with an ordinary strike, because they'd bring in scabs and militia. We figured the only way we could win was to stay in and keep the plant from operating.",
            visualStyle: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), repeating-linear-gradient(45deg, #333, #333 10px, #444 10px, #444 20px)"
        },
        {
            day: 8,
            date: "January 6, 1937",
            title: "Battle of Running Bulls",
            description: "GM cuts heat to the plant and police attempt to block food deliveries. When police try to storm Fisher Body Plant No. 2, workers fight back with fire hoses, soda bottles and car door hinges. 13 workers are injured by police gunfire.",
            quote: "When the cops went into action, I got hit on the head and knocked out for a while. When I came to, the fighting was still going on.",
            visualStyle: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), radial-gradient(circle at center, #555 1%, transparent 60%)"
        },
        {
            day: 11,
            date: "January 9, 1937",
            title: "Governor Intervenes",
            description: "Michigan Governor Frank Murphy calls in the National Guard, not to break the strike but to maintain peace and prevent further violence from both police and company agents.",
            quote: "I am not going to shoot my way into the governorship of the next state. I am not going to use the troops to break up a strike.",
            visualStyle: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), linear-gradient(to right, #444, #222)"
        },
        {
            day: 16,
            date: "January 14, 1937",
            title: "Women's Emergency Brigade",
            description: "The Women's Emergency Brigade forms, made up of wives, mothers, and sisters of strikers. They create a human shield around the plant, bringing food and supplies while deterring police actions.",
            quote: "We broke windows in the plant so the boys could get air. The police were throwing tear gas in and they couldn't breathe.",
            visualStyle: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), repeating-linear-gradient(30deg, #700, #700 10px, #800 10px, #800 20px)"
        },
        {
            day: 32,
            date: "January 30, 1937",
            title: "Chevrolet Plant 4 Seized",
            description: "In a brilliant tactical move, strikers seize control of Chevrolet Plant 4, a crucial engine production facility. They use diversionary tactics to confuse police and company guards.",
            quote: "It was like a war. The lights went out and the men were fighting all over the place. But we took control and shut it down.",
            visualStyle: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), radial-gradient(circle at center, #333 30%, #222 100%)"
        },
        {
            day: 44,
            date: "February 11, 1937",
            title: "Victory",
            description: "After 44 days, GM signs an agreement with the UAW. The company recognizes the union as the exclusive bargaining representative for its members, agrees to rehire all strikers, and commits to future negotiations.",
            quote: "The sitdown has demonstrated, as never before in American history, the powerlessness of the employer to break a strike and the helplessness of local and state authorities.",
            visualStyle: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), repeating-radial-gradient(circle, #930, #930 10px, #a40 10px, #a40 20px)"
        }
    ];

    // Quiz questions
    const quizQuestions = [
        {
            question: "Why did workers choose a sit-down strike instead of a traditional strike?",
            options: [
                "It was more comfortable than picketing outside in winter",
                "To prevent the company from bringing in replacement workers",
                "They wanted to damage factory equipment",
                "It was illegal, giving them more publicity"
            ],
            correct: 1,
            explanation: "The sit-down tactic prevented GM from bringing in replacement workers ('scabs') and continuing production. By occupying the factories, workers effectively held the means of production hostage."
        },
        {
            question: "What role did women play in the Flint Sit-Down Strike?",
            options: [
                "They weren't involved at all",
                "They only worked in food preparation",
                "They formed the Women's Emergency Brigade to protect strikers",
                "They negotiated directly with GM executives"
            ],
            correct: 2,
            explanation: "The Women's Emergency Brigade was crucial to the strike's success, forming human shields around plants, breaking windows when tear gas was used, and keeping morale high. Many put themselves at risk of police violence to protect the strikers."
        },
        {
            question: "What was the most significant outcome of the Flint Sit-Down Strike?",
            options: [
                "Higher wages for auto workers",
                "Shorter working hours",
                "Recognition of the UAW as the workers' bargaining representative",
                "Improved factory safety conditions"
            ],
            correct: 2,
            explanation: "While all these were important, union recognition was revolutionary. For the first time, a major U.S. corporation formally recognized an industrial union, forever changing labor relations in America and paving the way for collective bargaining."
        }
    ];

    // State variables
    let currentEventIndex = 0;
    let currentQuestionIndex = 0;
    let quizScore = 0;
    let isDragging = false;

    // Initialize the app
    function init() {
        // Display first timeline event
        updateTimelineEvent();
        
        // Set up event listeners
        startJourneyBtn.addEventListener('click', startJourney);
        prevEventBtn.addEventListener('click', showPrevEvent);
        nextEventBtn.addEventListener('click', showNextEvent);
        sliderHandle.addEventListener('mousedown', startDrag);
        sliderHandle.addEventListener('touchstart', startDrag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        nextQuestionBtn.addEventListener('click', showNextQuestion);
        restartTimelineBtn.addEventListener('click', restartTimeline);
    }

    // Start the journey
    function startJourney() {
        introSection.classList.add('hidden');
        timelineSection.classList.remove('hidden');
        window.scrollTo(0, 0);
    }

    // Update the timeline event display
    function updateTimelineEvent() {
        const event = timelineEvents[currentEventIndex];
        
        // Update text content
        eventDate.textContent = event.date;
        eventTitle.textContent = event.title;
        eventDescription.textContent = event.description;
        eventQuote.textContent = event.quote;
        currentDayDisplay.textContent = event.day;
        
        // Update progress bar
        const progress = (event.day / 44) * 100;
        progressIndicator.style.width = `${progress}%`;
        
        // Update visual
        eventIllustration.style.background = event.visualStyle;
        
        // Enable/disable navigation buttons
        prevEventBtn.disabled = currentEventIndex === 0;
        
        if (currentEventIndex === timelineEvents.length - 1) {
            nextEventBtn.innerHTML = 'See Impact <span>→</span>';
            nextEventBtn.addEventListener('click', showImpactSection);
            nextEventBtn.removeEventListener('click', showNextEvent);
        } else {
            nextEventBtn.innerHTML = '<span>▶</span>';
            nextEventBtn.addEventListener('click', showNextEvent);
            nextEventBtn.removeEventListener('click', showImpactSection);
        }
    }

    // Show previous event
    function showPrevEvent() {
        if (currentEventIndex > 0) {
            currentEventIndex--;
            updateTimelineEvent();
        }
    }

    // Show next event
    function showNextEvent() {
        if (currentEventIndex < timelineEvents.length - 1) {
            currentEventIndex++;
            updateTimelineEvent();
        }
    }

    // Show impact section
    function showImpactSection() {
        timelineSection.classList.add('hidden');
        impactSection.classList.remove('hidden');
        window.scrollTo(0, 0);
        
        // Add a button to go to quiz
        const quizBtn = document.createElement('button');
        quizBtn.classList.add('cta-button');
        quizBtn.style.marginTop = '2rem';
        quizBtn.textContent = 'Test Your Knowledge';
        quizBtn.addEventListener('click', showQuizSection);
        
        const finalQuote = document.querySelector('.final-quote');
        if (!document.querySelector('.cta-button')) {
            finalQuote.after(quizBtn);
        }
    }

    // Slider functionality
    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
    }

    function stopDrag() {
        isDragging = false;
    }

    function drag(e) {
        if (!isDragging) return;
        
        const sliderContainer = document.querySelector('.slider-container');
        const containerRect = sliderContainer.getBoundingClientRect();
        
        let clientX;
        if (e.type.includes('mouse')) {
            clientX = e.clientX;
        } else {
            clientX = e.touches[0].clientX;
        }
        
        const position = (clientX - containerRect.left) / containerRect.width;
        const clampedPosition = Math.max(0.1, Math.min(0.9, position));
        
        sliderHandle.style.left = `${clampedPosition * 100}%`;
        
        // Adjust content widths
        const before = document.querySelector('.before');
        const after = document.querySelector('.after');
        
        before.style.flex = clampedPosition;
        after.style.flex = 1 - clampedPosition;
    }

    // Quiz functionality
    function showQuizSection() {
        impactSection.classList.add('hidden');
        quizSection.classList.remove('hidden');
        window.scrollTo(0, 0);
        
        // Reset quiz state
        currentQuestionIndex = 0;
        quizScore = 0;
        
        // Show first question
        showQuestion(currentQuestionIndex);
    }

    function showQuestion(index) {
        resultContainer.classList.add('hidden');
        quizComplete.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        
        const question = quizQuestions[index];
        questionText.textContent = question.question;
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        
        // Add options
        question.options.forEach((option, i) => {
            const button = document.createElement('button');
            button.classList.add('option-button');
            button.textContent = option;
            button.dataset.index = i;
            button.addEventListener('click', () => checkAnswer(i));
            optionsContainer.appendChild(button);
        });
    }

    function checkAnswer(selectedIndex) {
        const question = quizQuestions[currentQuestionIndex];
        const isCorrect = selectedIndex === question.correct;
        
        // Highlight correct/incorrect answers
        const options = document.querySelectorAll('.option-button');
        options.forEach((option, i) => {
            option.disabled = true;
            if (i === question.correct) {
                option.classList.add('correct');
            } else if (i === selectedIndex) {
                option.classList.add('incorrect');
            }
        });
        
        // Update score
        if (isCorrect) {
            quizScore++;
        }
        
        // Show result
        resultText.textContent = isCorrect ? 'Correct!' : 'Incorrect!';
        explanationText.textContent = question.explanation;
        resultContainer.classList.remove('hidden');
        
        // Show end of quiz or next question button
        if (currentQuestionIndex === quizQuestions.length - 1) {
            nextQuestionBtn.textContent = 'See Your Results';
        }
    }

    function showNextQuestion() {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            // Show quiz results
            questionContainer.classList.add('hidden');
            resultContainer.classList.add('hidden');
            quizComplete.classList.remove('hidden');
            finalScore.textContent = quizScore;
        }
    }

    function restartTimeline() {
        quizSection.classList.add('hidden');
        currentEventIndex = 0;
        updateTimelineEvent();
        timelineSection.classList.remove('hidden');
        window.scrollTo(0, 0);
    }

    // Initialize the app
    init();
});