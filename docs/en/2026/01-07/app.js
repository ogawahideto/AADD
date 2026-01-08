document.addEventListener('DOMContentLoaded', () => {
    // Timeline events data
    const timelineEvents = [
        {
            year: 1291,
            label: "Birth",
            title: "Birth of a Prince",
            content: `<p>Born to King Dinis of Portugal and Queen Isabel of Aragon, Afonso was never expected to have an easy relationship with his father. From an early age, tension grew as King Dinis favored his illegitimate sons.</p><p>This childhood resentment would shape Afonso's future actions and policies as king.</p>`
        },
        {
            year: 1309,
            label: "Marriage",
            title: "Strategic Marriage",
            content: `<p>At age 18, Afonso married Beatrice of Castile, daughter of Sancho IV of Castile, cementing an alliance between the two kingdoms. This political marriage would later prove crucial in their mutual defense against the Moors.</p><p>Seven children would be born from this union, including the future Pedro I of Portugal.</p>`
        },
        {
            year: 1319,
            label: "Rebellion",
            title: "Civil War Against His Father",
            content: `<p>Tensions erupted into open conflict as Afonso, feeling marginalized, rebelled against his father King Dinis. For two years, Portugal suffered through a civil war between father and son.</p><p>Queen Isabel, later canonized as Saint Elizabeth of Portugal, famously rode between the two armies to prevent bloodshed between her husband and son.</p>`
        },
        {
            year: 1325,
            label: "Coronation",
            title: "The Crown of Portugal",
            content: `<p>On January 7, 1325, following the death of King Dinis, Afonso IV ascended to the Portuguese throne at age 33. The kingdom he inherited was economically prosperous but politically divided.</p><p>His first acts as king included purging the court of his father's favorites and consolidating power among his own supporters.</p>`
        },
        {
            year: 1336,
            label: "Exploration",
            title: "First Atlantic Expeditions",
            content: `<p>In a forward-thinking move, Afonso IV funded expeditions to explore the Canary Islands, marking Portugal's early steps toward Atlantic exploration.</p><p>Though the expeditions didn't lead to immediate colonization, they established Portugal's interest in Atlantic expansion, setting the stage for the later Age of Discovery.</p>`
        },
        {
            year: 1340,
            label: "Battle of Salado",
            title: "Victory Against the Moors",
            content: `<p>Afonso IV joined forces with Alfonso XI of Castile to defeat the Marinid Muslims at the crucial Battle of Salado. This decisive victory helped secure Christian dominance in the Iberian Peninsula.</p><p>For his courage in this battle, Afonso earned his epithet "The Brave" and gained significant prestige throughout Christian Europe.</p>`
        },
        {
            year: 1355,
            label: "Tragedy",
            title: "The Inês de Castro Affair",
            content: `<p>In one of history's most infamous royal tragedies, Afonso IV ordered the execution of Inês de Castro, the beloved mistress of his son Prince Pedro, fearing her Castilian family's influence over the heir.</p><p>This decision would haunt his final years, as his son rebelled in retaliation. After becoming king, Pedro had Inês's body exhumed and crowned as queen posthumously.</p>`
        },
        {
            year: 1357,
            label: "Death",
            title: "The End of a Reign",
            content: `<p>After 32 years on the throne, Afonso IV died at age 66. His son Pedro I succeeded him despite their bitter conflict over Inês de Castro.</p><p>Afonso IV left Portugal stronger than he found it, with secure borders, increased maritime trade, and the beginnings of Atlantic exploration that would eventually transform Portugal into a global power.</p>`
        }
    ];

    // Quiz questions data
    const quizQuestions = [
        {
            question: "Why was Afonso IV called 'The Brave'?",
            options: [
                "For standing up to his father in civil war",
                "For his valor at the Battle of Salado against the Moors",
                "For executing his son's lover despite consequences",
                "For funding dangerous Atlantic explorations"
            ],
            correct: 1
        },
        {
            question: "What tragic decision haunted Afonso IV's later years?",
            options: [
                "Starting a civil war against his father",
                "Failing to stop the Black Death in Portugal",
                "Ordering the execution of Inês de Castro",
                "Losing the Portuguese treasury to Castile"
            ],
            correct: 2
        },
        {
            question: "What early exploration did Afonso IV fund during his reign?",
            options: [
                "Expeditions to the Canary Islands",
                "Voyages around the Cape of Good Hope",
                "Discovery of Brazil",
                "Trade missions to India"
            ],
            correct: 0
        }
    ];

    // Initialize timeline
    function initializeTimeline() {
        const timelineTrack = document.getElementById('timeline-track');
        const trackWidth = timelineTrack.offsetWidth;
        const startYear = 1290;
        const endYear = 1360;
        const timeRange = endYear - startYear;

        timelineEvents.forEach(event => {
            const position = ((event.year - startYear) / timeRange) * 100;
            const eventElement = document.createElement('div');
            eventElement.className = 'event';
            eventElement.style.left = `${position}%`;
            eventElement.innerHTML = `
                <div class="event-dot"></div>
                <div class="event-year">${event.year}</div>
                <div class="event-label">${event.label}</div>
            `;
            eventElement.dataset.year = event.year;
            timelineTrack.appendChild(eventElement);

            eventElement.addEventListener('click', () => {
                // Remove active class from all events
                document.querySelectorAll('.event').forEach(el => {
                    el.classList.remove('active');
                });
                // Add active class to clicked event
                eventElement.classList.add('active');
                
                // Update event details
                const eventDetails = document.getElementById('event-details');
                const eventTitle = document.getElementById('event-title');
                const eventContent = document.getElementById('event-content');
                
                const selectedEvent = timelineEvents.find(e => e.year == event.year);
                eventTitle.textContent = selectedEvent.title;
                eventContent.innerHTML = selectedEvent.content;
                
                // Animate details update
                eventDetails.style.opacity = '0';
                setTimeout(() => {
                    eventDetails.style.opacity = '1';
                }, 300);
            });
        });

        // Set the first event as active by default
        const firstEvent = document.querySelector('.event');
        if (firstEvent) {
            firstEvent.click();
        }
    }

    // Initialize quiz
    function initializeQuiz() {
        const quizContainer = document.getElementById('quiz-container');
        const startButton = document.getElementById('start-quiz');
        const restartButton = document.getElementById('restart-quiz');
        const resultsElement = document.getElementById('quiz-results');
        const scoreElement = document.getElementById('score');
        
        let currentQuestion = 0;
        let score = 0;
        
        // Create question elements
        quizQuestions.forEach((q, index) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'quiz-question';
            questionElement.id = `question-${index}`;
            
            let optionsHTML = '';
            q.options.forEach((option, optionIndex) => {
                optionsHTML += `<button class="option" data-index="${optionIndex}">${option}</button>`;
            });
            
            questionElement.innerHTML = `
                <h4>Question ${index + 1}: ${q.question}</h4>
                <div class="options-container">
                    ${optionsHTML}
                </div>
            `;
            
            quizContainer.insertBefore(questionElement, resultsElement);
        });
        
        // Start quiz
        startButton.addEventListener('click', () => {
            document.getElementById('quiz-start').classList.remove('active');
            document.getElementById(`question-${currentQuestion}`).classList.add('active');
        });
        
        // Handle option selection
        quizContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('option') && !e.target.disabled) {
                const options = e.target.parentElement.querySelectorAll('.option');
                options.forEach(opt => opt.disabled = true);
                
                const selectedIndex = parseInt(e.target.dataset.index);
                const correctIndex = quizQuestions[currentQuestion].correct;
                
                if (selectedIndex === correctIndex) {
                    e.target.classList.add('correct');
                    score++;
                } else {
                    e.target.classList.add('incorrect');
                    options[correctIndex].classList.add('correct');
                }
                
                // Move to next question after a delay
                setTimeout(() => {
                    document.getElementById(`question-${currentQuestion}`).classList.remove('active');
                    currentQuestion++;
                    
                    if (currentQuestion < quizQuestions.length) {
                        document.getElementById(`question-${currentQuestion}`).classList.add('active');
                    } else {
                        // Show results
                        scoreElement.textContent = score;
                        resultsElement.style.display = 'block';
                        resultsElement.classList.add('active');
                    }
                }, 1500);
            }
        });
        
        // Restart quiz
        restartButton.addEventListener('click', () => {
            // Reset quiz state
            currentQuestion = 0;
            score = 0;
            resultsElement.classList.remove('active');
            resultsElement.style.display = 'none';
            
            // Reset options
            document.querySelectorAll('.option').forEach(opt => {
                opt.disabled = false;
                opt.classList.remove('correct', 'incorrect');
            });
            
            // Back to start
            document.getElementById('quiz-start').classList.add('active');
        });
    }

    // Initialize components
    initializeTimeline();
    initializeQuiz();

    // Glitch effect animation
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(element => {
        element.setAttribute('data-text', element.textContent);
    });
});