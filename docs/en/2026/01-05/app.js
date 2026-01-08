document.addEventListener('DOMContentLoaded', () => {
    // Timeline Data
    const timelineEvents = [
        {
            year: 1916,
            title: "The Dream",
            content: `<p>City engineer Michael O'Shaughnessy and Joseph Strauss develop preliminary designs for a bridge spanning the Golden Gate. At the time, many experts called it "impossible" due to the mile-wide strait, strong currents, deep water, and frequent fog.</p>
                      <p>Fun fact: The "Golden Gate" isn't the color of the bridge—it's the name of the strait the bridge spans, named by John C. Frémont in 1846 who thought it resembled the Golden Horn harbor in Istanbul.</p>`
        },
        {
            year: 1923,
            title: "Legal Battle",
            content: `<p>The Southern Pacific Railroad Company, which operated a profitable ferry service across the bay, led fierce opposition against the bridge. They filed lawsuits and spread propaganda claiming the bridge would interfere with ship traffic and be vulnerable to earthquakes.</p>
                      <p>Nearly 2,300 lawsuits were filed against the bridge before construction even began!</p>`
        },
        {
            year: 1930,
            title: "Financial Breakthrough",
            content: `<p>Despite the Great Depression, voters in six counties approved $35 million in bond sales ($557 million today) to finance the bridge. Local citizens put up their homes, farms and business properties as collateral.</p>
                      <p>Amazing fact: The project created jobs for thousands during America's darkest economic period, with workers grateful for the steady paycheck of $10.50 per day.</p>`
        },
        {
            year: 1933,
            title: "Construction Begins",
            content: `<p>On January 5, 1933, construction officially began. The first task was building the massive concrete anchorages to hold the main cables. Divers had to work 65 feet below water in pitch darkness to lay foundations.</p>
                      <p>Workers faced 60-mph winds and frigid waters. Strauss insisted on new safety measures, including hard hats (one of the first major construction projects to require them) and the enormous safety net.</p>`
        },
        {
            year: 1935,
            title: "The Towers Rise",
            content: `<p>The twin towers were completed—each standing 746 feet tall, then the tallest bridge towers in the world. They contained 600,000 rivets each, with many workers losing hearing from the constant din of rivet guns.</p>
                      <p>Surprising fact: The towers can sway up to 16 feet in strong winds—they were designed to flex rather than break.</p>`
        },
        {
            year: 1936,
            title: "Spinning the Cables",
            content: `<p>Workers began "spinning" the two main cables that would support the roadway. Each cable was made from 27,572 individual wires, thin enough to fit in your hand, yet together strong enough to hold up the entire bridge.</p>
                      <p>If stretched end to end, the wire in the cables would circle the Earth three times! Special "spinning wheels" moved back and forth across the strait to lay each wire in perfect position.</p>`
        },
        {
            year: 1937,
            title: "Grand Opening",
            content: `<p>May 27, 1937: After four years of construction, the Golden Gate Bridge opened to the public. On the first day, 200,000 people walked across it. The next day, cars were allowed.</p>
                      <p>The stunning "International Orange" color was originally just a primer. Consulting architect Irving Morrow insisted on keeping it because it complemented the natural surroundings and stood out in the fog.</p>`
        }
    ];

    // Quiz Data
    const quizQuestions = [
        {
            question: "What was Joseph Strauss's occupation before building the Golden Gate Bridge?",
            options: [
                "Railroad engineer",
                "Designer of drawbridges", 
                "Ship captain", 
                "Architecture professor"
            ],
            correct: 1,
            feedback: "Before the Golden Gate Bridge, Joseph Strauss specialized in designing more than 400 drawbridges, mostly for railroads. The Golden Gate was his first suspension bridge project!"
        },
        {
            question: "What natural obstacle made building the Golden Gate Bridge especially challenging?",
            options: [
                "Constant rain", 
                "Earthquake-prone area", 
                "Strong currents and winds",
                "Solid bedrock was too deep"
            ],
            correct: 2,
            feedback: "The strait experiences extremely strong currents, winds up to 60 mph, dense fog, and deep water. Workers often had to battle these elements daily."
        },
        {
            question: "What revolutionary safety feature did Strauss implement during construction?",
            options: [
                "Hard hats", 
                "Safety harnesses", 
                "Underwater breathing apparatus", 
                "A giant safety net under the bridge"
            ],
            correct: 3,
            feedback: "Strauss installed a massive safety net beneath the bridge at a cost of $130,000. It saved 19 lives and those workers called themselves the 'Halfway to Hell Club.'"
        },
        {
            question: "Why is the Golden Gate Bridge its distinctive orange-red color?",
            options: [
                "To match the California state flag", 
                "The color was originally just primer that looked good", 
                "To make it visible in fog", 
                "B and C are both correct"
            ],
            correct: 3,
            feedback: "The 'International Orange' color was initially just a primer coat, but architect Irving Morrow loved how it stood out in the fog and complemented the surrounding landscapes, so they kept it!"
        }
    ];

    // Initialize timeline
    function initializeTimeline() {
        const timelineDots = document.getElementById('timeline-dots');
        const eventContent = document.getElementById('event-content');
        const prevButton = document.getElementById('prev-event');
        const nextButton = document.getElementById('next-event');
        const eventIndicator = document.getElementById('event-indicator');
        
        let currentEvent = 0;
        
        // Create timeline dots
        timelineEvents.forEach((event, index) => {
            const dot = document.createElement('div');
            dot.classList.add('timeline-dot');
            dot.setAttribute('data-year', event.year);
            dot.addEventListener('click', () => {
                showEvent(index);
            });
            timelineDots.appendChild(dot);
        });
        
        // Show initial event
        showEvent(currentEvent);
        
        // Event navigation
        prevButton.addEventListener('click', () => {
            if (currentEvent > 0) {
                showEvent(currentEvent - 1);
            }
        });
        
        nextButton.addEventListener('click', () => {
            if (currentEvent < timelineEvents.length - 1) {
                showEvent(currentEvent + 1);
            }
        });
        
        function showEvent(index) {
            // Update dots
            document.querySelectorAll('.timeline-dot').forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            // Update content with animation
            eventContent.style.opacity = '0';
            
            setTimeout(() => {
                eventContent.innerHTML = `
                    <h3>${timelineEvents[index].title} (${timelineEvents[index].year})</h3>
                    ${timelineEvents[index].content}
                `;
                eventContent.style.opacity = '1';
            }, 300);
            
            // Update indicator and current event
            currentEvent = index;
            eventIndicator.textContent = `${currentEvent + 1} of ${timelineEvents.length}`;
            
            // Update button states
            prevButton.disabled = currentEvent === 0;
            nextButton.disabled = currentEvent === timelineEvents.length - 1;
        }
    }

    // Initialize quiz
    function initializeQuiz() {
        const quizContainer = document.getElementById('quiz-container');
        const questionElement = document.getElementById('quiz-question');
        const optionsElement = document.getElementById('quiz-options');
        const feedbackElement = document.getElementById('quiz-feedback');
        const nextButton = document.getElementById('quiz-next');
        const currentQuestionElement = document.getElementById('current-question');
        const totalQuestionsElement = document.getElementById('total-questions');
        const resultsElement = document.getElementById('quiz-results');
        const scoreElement = document.getElementById('quiz-score');
        const totalElement = document.getElementById('quiz-total');
        const restartButton = document.getElementById('quiz-restart');
        
        let currentQuestion = 0;
        let score = 0;
        let answered = false;
        
        // Initialize quiz stats
        totalQuestionsElement.textContent = quizQuestions.length;
        totalElement.textContent = quizQuestions.length;
        
        // Load first question
        loadQuestion();
        
        // Event listeners
        nextButton.addEventListener('click', () => {
            currentQuestion++;
            
            if (currentQuestion < quizQuestions.length) {
                loadQuestion();
            } else {
                showResults();
            }
        });
        
        restartButton.addEventListener('click', () => {
            currentQuestion = 0;
            score = 0;
            resultsElement.classList.add('hidden');
            quizContainer.classList.remove('hidden');
            loadQuestion();
        });
        
        function loadQuestion() {
            answered = false;
            nextButton.disabled = true;
            feedbackElement.style.display = 'none';
            feedbackElement.className = 'quiz-feedback';
            
            // Update current question number
            currentQuestionElement.textContent = currentQuestion + 1;
            
            // Load question and options
            const question = quizQuestions[currentQuestion];
            questionElement.textContent = question.question;
            
            // Clear previous options
            optionsElement.innerHTML = '';
            
            // Add new options
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.classList.add('quiz-option');
                optionElement.textContent = option;
                
                optionElement.addEventListener('click', () => {
                    if (!answered) {
                        answered = true;
                        checkAnswer(index, optionElement, question);
                    }
                });
                
                optionsElement.appendChild(optionElement);
            });
        }
        
        function checkAnswer(index, optionElement, question) {
            // Clear previous selections
            document.querySelectorAll('.quiz-option').forEach(option => {
                option.classList.remove('selected', 'correct', 'incorrect');
            });
            
            // Mark selected option
            optionElement.classList.add('selected');
            
            // Check if answer is correct
            if (index === question.correct) {
                optionElement.classList.add('correct');
                feedbackElement.textContent = 'Correct! ' + question.feedback;
                feedbackElement.classList.add('correct');
                score++;
            } else {
                optionElement.classList.add('incorrect');
                
                // Highlight correct answer
                document.querySelectorAll('.quiz-option')[question.correct].classList.add('correct');
                
                feedbackElement.textContent = 'Incorrect. ' + question.feedback;
                feedbackElement.classList.add('incorrect');
            }
            
            feedbackElement.style.display = 'block';
            nextButton.disabled = false;
        }
        
        function showResults() {
            quizContainer.classList.add('hidden');
            resultsElement.classList.remove('hidden');
            scoreElement.textContent = score;
        }
    }

    // Initialize bridge animation
    function animateBridge() {
        const leftCable = document.querySelector('.left-cable');
        const rightCable = document.querySelector('.right-cable');
        
        leftCable.style.transform = 'rotateZ(3deg)';
        rightCable.style.transform = 'rotateZ(-3deg)';
        
        setInterval(() => {
            leftCable.style.transform = leftCable.style.transform === 'rotateZ(3deg)' ? 'rotateZ(2deg)' : 'rotateZ(3deg)';
            rightCable.style.transform = rightCable.style.transform === 'rotateZ(-3deg)' ? 'rotateZ(-2deg)' : 'rotateZ(-3deg)';
        }, 2000);
    }

    // Initialize all components
    initializeTimeline();
    initializeQuiz();
    animateBridge();
});