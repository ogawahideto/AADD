// Timeline data
const timelineEvents = [
    {
        year: 1876,
        title: "Birth of a Legend",
        description: "Pablo Casals was born in Catalonia, Spain, to a church organist father who gave him his first music lessons. At age four, he heard a local musician playing the cello and immediately fell in love with the instrument.",
        fact: "Casals' father built him his first instrument—a crude cello made from a gourd."
    },
    {
        year: 1889,
        title: "Discovery of Bach's Cello Suites",
        description: "At age 13, Casals discovered a tattered copy of Bach's forgotten Cello Suites in a second-hand music shop in Barcelona. This chance discovery would change musical history forever.",
        fact: "Before Casals, these suites were considered merely technical exercises. He studied them for 12 years before performing them publicly."
    },
    {
        year: 1899,
        title: "International Debut",
        description: "After studying in Madrid and Brussels, Casals made his international debut in Paris, where his revolutionary technique and emotional playing stunned audiences and critics alike.",
        fact: "Casals completely transformed cello technique, introducing innovations in fingering, bowing, and expressivity that cellists still use today."
    },
    {
        year: 1919,
        title: "Orchestra Founder",
        description: "Casals founded the Orquestra Pau Casals in Barcelona, bringing world-class music to his homeland and providing opportunities for Catalan musicians.",
        fact: "Despite his success, Casals maintained a practice regimen of 5-6 hours daily throughout his life."
    },
    {
        year: 1939,
        title: "Exile for Principles",
        description: "When Franco's fascist forces won the Spanish Civil War, Casals began a self-imposed exile, vowing never to return to Spain until democracy was restored. He refused to perform in any country that recognized Franco's government.",
        fact: "Casals gave up countless opportunities and income at the height of his career to stand by his principles—a exile that would last until his death."
    },
    {
        year: 1950,
        title: "The Prades Festival",
        description: "To commemorate the 200th anniversary of Bach's death, Casals emerged from performance retirement to organize a festival in Prades, France, near the Spanish border. This began an annual tradition.",
        fact: "Though he was 73 years old, his performances at this festival are considered among the most important musical events of the 20th century."
    },
    {
        year: 1971,
        title: "United Nations Peace Medal",
        description: "At age 95, Casals performed at the United Nations where he was awarded the U.N. Peace Medal. His performance of the Catalan folk song 'El Cant dels Ocells' (Song of the Birds) and his passionate speech moved the world.",
        fact: "'El Cant dels Ocells' became a symbol of Catalan identity and Casals' yearning for peace. He played it at the end of every concert during his exile."
    }
];

// Quiz questions
const quizQuestions = [
    {
        question: "What instrument did Casals revolutionize?",
        options: ["Violin", "Piano", "Cello", "Flute"],
        correctAnswer: 2,
        explanation: "Pablo Casals revolutionized cello playing, transforming it from primarily an accompaniment instrument to a respected solo instrument."
    },
    {
        question: "What significant musical work did Casals rediscover at age 13?",
        options: ["Mozart's Requiem", "Bach's Cello Suites", "Vivaldi's Four Seasons", "Beethoven's 9th Symphony"],
        correctAnswer: 1,
        explanation: "Casals discovered a forgotten copy of Bach's Cello Suites in a secondhand music shop in Barcelona. Before his interpretations, they were considered merely technical exercises."
    },
    {
        question: "Why did Casals leave Spain in 1939?",
        options: ["To pursue a better career", "To protest Franco's fascist regime", "For health reasons", "To teach in America"],
        correctAnswer: 1,
        explanation: "Casals began a self-imposed exile in 1939 to protest Franco's fascist regime. He vowed not to return to Spain until democracy was restored."
    },
    {
        question: "What was Casals' daily ritual for over 80 years?",
        options: ["Writing in his journal", "Playing Bach's cello suites", "Composing new music", "Giving master classes"],
        correctAnswer: 1,
        explanation: "For more than 80 years, Casals began every day by playing Bach's six cello suites, which he described as 'rediscovering the world each day.'"
    }
];

// Bach Suite information
const bachSuites = [
    {
        suite: 1,
        title: "Suite No. 1 in G Major, BWV 1007",
        description: "Prélude: The most famous of all Bach's cello pieces, this flowing movement revolutionized cello playing. When Casals discovered these forgotten suites at age 13, they were considered merely technical exercises."
    },
    {
        suite: 2,
        title: "Suite No. 2 in D Minor, BWV 1008",
        description: "Sarabande: This profound movement showcases the depth and expressivity Casals brought to Bach's music. Its minor key allowed Casals to demonstrate how the cello could convey deep human emotion."
    },
    {
        suite: 3,
        title: "Suite No. 3 in C Major, BWV 1009",
        description: "Bourrées: These lively dance movements exemplify how Casals balanced technical precision with musical joy. His recordings made between 1936-1939 set the standard for generations."
    }
];

// Initialize timeline functionality
let currentEventIndex = 0;

function initTimeline() {
    const timelineContainer = document.getElementById('timeline-events');
    const eventDetails = document.getElementById('event-details');
    const eventIndicator = document.getElementById('event-indicator');
    const prevButton = document.getElementById('prev-event');
    const nextButton = document.getElementById('next-event');
    
    // Create timeline events
    timelineEvents.forEach((event, index) => {
        const eventElement = document.createElement('div');
        eventElement.className = 'timeline-event';
        eventElement.dataset.index = index;
        eventElement.addEventListener('click', () => showEvent(index));
        timelineContainer.appendChild(eventElement);
    });
    
    // Set up navigation
    prevButton.addEventListener('click', () => {
        currentEventIndex = (currentEventIndex > 0) ? currentEventIndex - 1 : timelineEvents.length - 1;
        showEvent(currentEventIndex);
    });
    
    nextButton.addEventListener('click', () => {
        currentEventIndex = (currentEventIndex < timelineEvents.length - 1) ? currentEventIndex + 1 : 0;
        showEvent(currentEventIndex);
    });
    
    // Initial event
    showEvent(currentEventIndex);
    
    function showEvent(index) {
        // Update event details
        const event = timelineEvents[index];
        eventDetails.innerHTML = `
            <div class="event-year">${event.year}</div>
            <div class="event-title">${event.title}</div>
            <p>${event.description}</p>
            <p><strong>Did you know?</strong> ${event.fact}</p>
        `;
        
        // Update indicator
        eventIndicator.textContent = `${index + 1} of ${timelineEvents.length}`;
        
        // Update active state
        document.querySelectorAll('.timeline-event').forEach((el, i) => {
            el.classList.toggle('active', i === index);
        });
        
        currentEventIndex = index;
    }
}

// Initialize Bach player functionality
function initBachPlayer() {
    const suites = document.querySelectorAll('.suite');
    const movementInfo = document.getElementById('movement-info');
    
    suites.forEach(suite => {
        suite.addEventListener('click', () => {
            // Remove active class from all suites
            suites.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked suite
            suite.classList.add('active');
            
            // Update movement info
            const suiteNumber = parseInt(suite.dataset.suite);
            const suiteData = bachSuites.find(s => s.suite === suiteNumber);
            
            movementInfo.innerHTML = `
                <p>${suiteData.title}</p>
                <p>${suiteData.description}</p>
            `;
        });
    });
}

// Initialize quiz functionality
function initQuiz() {
    let currentQuestionIndex = 0;
    let score = 0;
    
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const resultContainer = document.getElementById('result-container');
    const resultMessage = document.getElementById('result-message');
    const explanation = document.getElementById('explanation');
    const nextQuestionButton = document.getElementById('next-question');
    const finalResults = document.getElementById('final-results');
    const scoreDisplay = document.getElementById('score-display');
    const restartQuizButton = document.getElementById('restart-quiz');
    
    function showQuestion(index) {
        const question = quizQuestions[index];
        
        // Set question text
        questionElement.textContent = question.question;
        
        // Clear options container
        optionsContainer.innerHTML = '';
        
        // Add options
        question.options.forEach((option, i) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.dataset.index = i;
            
            optionElement.addEventListener('click', () => {
                // Remove selected class from all options
                document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
                
                // Add selected class to clicked option
                optionElement.classList.add('selected');
                
                // Check answer
                const selectedIndex = parseInt(optionElement.dataset.index);
                const isCorrect = selectedIndex === question.correctAnswer;
                
                // Show result
                resultContainer.classList.remove('hidden', 'correct', 'incorrect');
                resultContainer.classList.add(isCorrect ? 'correct' : 'incorrect');
                
                resultMessage.textContent = isCorrect ? 
                    'Correct! Well done.' : 
                    `Incorrect. The right answer is "${question.options[question.correctAnswer]}".`;
                
                explanation.textContent = question.explanation;
                
                if (isCorrect) score++;
            });
            
            optionsContainer.appendChild(optionElement);
        });
        
        // Show question container, hide result container
        questionContainer.classList.remove('hidden');
        resultContainer.classList.add('hidden');
        finalResults.classList.add('hidden');
    }
    
    function showNextQuestion() {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            // Show final results
            questionContainer.classList.add('hidden');
            resultContainer.classList.add('hidden');
            finalResults.classList.remove('hidden');
            
            scoreDisplay.textContent = `You scored ${score} out of ${quizQuestions.length}!`;
        }
    }
    
    // Event listeners
    nextQuestionButton.addEventListener('click', showNextQuestion);
    
    restartQuizButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        showQuestion(currentQuestionIndex);
    });
    
    // Start the quiz
    showQuestion(currentQuestionIndex);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTimeline();
    initBachPlayer();
    initQuiz();
});