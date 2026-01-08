// Timeline data
const timelineEvents = [
    {
        year: "533 CE",
        title: "Pagan Name Problem",
        detail: "Mercurius faced a dilemma: his birth name honored Mercury, a pagan deity. For a Christian leader, this created a theological contradiction that needed to be resolved."
    },
    {
        year: "533 CE",
        title: "A New Tradition",
        detail: "Mercurius chose to be called John II, honoring both the Apostle John and the previous Pope John I (523-526 CE), who had died as a martyr under Ostrogothic King Theodoric."
    },
    {
        year: "535 CE",
        title: "Papal Precedent",
        detail: "Though John II's papacy was brief, his successor continued the tradition. For the next thousand years, many popes would follow his example, choosing names with significant Christian meaning."
    },
    {
        year: "1555 CE",
        title: "Tradition Established",
        detail: "After Pope Marcellus II's brief 22-day papacy, all subsequent popes would adopt new names. The name change had evolved from an option to an expectation."
    }
];

// Papal name meanings
const namesMeanings = {
    "John": "Honors John the Apostle, the 'beloved disciple' and author of the Gospel of John. Also commemorates John the Baptist. A name representing love and fidelity.",
    "Gregory": "From Greek meaning 'watchful' or 'vigilant'. Associated with Gregory the Great, known for liturgical reforms and missionary zeal.",
    "Benedict": "From Latin meaning 'blessed'. Honors St. Benedict, founder of Western monasticism and the Benedictine Order.",
    "Pius": "Latin for 'dutiful', 'pious', or 'devoted'. Signifies devotion to God and religious duties.",
    "Leo": "Latin for 'lion', symbolizing strength and courage. Associated with Leo the Great, who famously turned back Attila the Hun.",
    "Francis": "Honors St. Francis of Assisi, known for humility, poverty, and love of nature. Chosen by Pope Francis as a call to serve the poor.",
    "Urban": "Latin for 'of the city' or 'refined'. Several Urban popes were notable reformers.",
    "Innocent": "Signifies purity and guiltlessness. Several influential reformers chose this name."
};

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Timeline
    setupTimeline();
    
    // Initialize Name Selector
    setupNameSelector();
});

function setupTimeline() {
    const container = document.getElementById('timeline-container');
    
    // Create timeline line
    const timelineLine = document.createElement('div');
    timelineLine.className = 'timeline-line';
    container.appendChild(timelineLine);
    
    // Create events container
    const eventsContainer = document.createElement('div');
    eventsContainer.className = 'timeline-events';
    container.appendChild(eventsContainer);
    
    // Create detail container
    const detailContainer = document.createElement('div');
    detailContainer.className = 'event-detail';
    detailContainer.id = 'event-detail';
    container.appendChild(detailContainer);
    
    // Add timeline events
    timelineEvents.forEach((event, index) => {
        const eventElement = document.createElement('div');
        eventElement.className = 'timeline-event';
        eventElement.innerHTML = `
            <div class="event-marker"></div>
            <div class="event-year">${event.year}</div>
            <div class="event-title">${event.title}</div>
        `;
        eventsContainer.appendChild(eventElement);
        
        // Add click event
        eventElement.addEventListener('click', () => {
            // Remove active class from all events
            document.querySelectorAll('.timeline-event').forEach(el => {
                el.classList.remove('active');
            });
            
            // Add active class to clicked event
            eventElement.classList.add('active');
            
            // Update detail
            detailContainer.innerHTML = `<p>${event.detail}</p>`;
            detailContainer.classList.add('active');
        });
        
        // Auto-select first event
        if (index === 0) {
            setTimeout(() => {
                eventElement.click();
            }, 500);
        }
    });
}

function setupNameSelector() {
    const nameButtons = document.querySelectorAll('.name-btn');
    const papalNameDisplay = document.getElementById('papal-name');
    const meaningText = document.getElementById('meaning-text');
    const yourNameInput = document.getElementById('your-name');
    
    // Add event listeners to name buttons
    nameButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            nameButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the selected name
            const selectedName = this.getAttribute('data-name');
            
            // Get birth name from input
            const birthName = yourNameInput.value.trim() || 'Your Name';
            
            // Update the papal name display
            papalNameDisplay.textContent = `${selectedName}`;
            
            // Update the meaning text
            meaningText.textContent = namesMeanings[selectedName];
        });
    });
    
    // Update papal name when birth name changes
    yourNameInput.addEventListener('input', function() {
        const activeButton = document.querySelector('.name-btn.active');
        if (activeButton) {
            const selectedName = activeButton.getAttribute('data-name');
            papalNameDisplay.textContent = `${selectedName}`;
        }
    });
    
    // Auto-select first name after a short delay
    setTimeout(() => {
        if (nameButtons.length > 0) {
            nameButtons[0].click();
        }
    }, 500);
}