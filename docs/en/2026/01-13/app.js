// Timeline data
const timelineEvents = [
    {
        year: 1402,
        title: "European Conquest Begins",
        description: "Jean de Béthencourt and Gadifer de la Salle, under the authority of the Kingdom of Castile, begin conquest of the Canary Islands, encountering the indigenous Guanche people."
    },
    {
        year: 1419,
        title: "Slave Raids Intensify",
        description: "Portuguese and Spanish settlers increase slave-raiding activities in the Canary Islands, capturing Guanches to work on plantations or to sell in European markets."
    },
    {
        year: 1434,
        title: "Eugene IV Becomes Pope",
        description: "Gabriele Condulmer becomes Pope Eugene IV. He would face numerous challenges, including the Council of Basel and growing reports of abuses in newly discovered territories."
    },
    {
        year: 1435,
        title: "Sicut Dudum Issued",
        description: "On January 13, Pope Eugene IV issues the papal bull Sicut Dudum, explicitly condemning the enslavement of the Guanches who had converted to Christianity, ordering their release within 15 days under pain of excommunication."
    },
    {
        year: 1455,
        title: "Romanus Pontifex",
        description: "Pope Nicholas V issues Romanus Pontifex, which contradicted Sicut Dudum by authorizing Portugal to enslave non-Christians, showing the inconsistency in Church positions during this period."
    },
    {
        year: 1496,
        title: "Complete Conquest",
        description: "The Spanish complete their conquest of the Canary Islands. Despite Sicut Dudum, many Guanches had been enslaved, killed in conflict, or died from European diseases."
    }
];

// Facts about Sicut Dudum
const decreeFacts = [
    "Sicut Dudum is often overshadowed by later bulls like Sublimus Dei (1537), but it came more than a century earlier, making it one of the first European documents to condemn indigenous enslavement.",
    
    "The bull threatened excommunication—the Church's most severe penalty—for those who kept Guanches enslaved, showing the seriousness with which Pope Eugene IV viewed the matter.",
    
    "Despite its strong language, the decree was largely ignored by Spanish and Portuguese colonizers, demonstrating the growing gap between ecclesiastical authority and colonial practice.",
    
    "Sicut Dudum specifically protected converts to Christianity, revealing how religious conversion was sometimes used by indigenous peoples as a strategy to gain protection from European powers.",
    
    "The document provides evidence that reports of abuse reached the highest levels of European authority, contradicting the notion that people at the time were unaware of the brutality of early colonization."
];

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Timeline initialization
    const timeline = document.getElementById('timeline');
    const eventTitle = document.getElementById('eventTitle');
    const eventDescription = document.getElementById('eventDescription');
    const prevEventBtn = document.getElementById('prevEvent');
    const nextEventBtn = document.getElementById('nextEvent');
    
    // Decree facts carousel
    const currentFact = document.getElementById('currentFact');
    const factCounter = document.getElementById('factCounter');
    const prevFactBtn = document.getElementById('prevFact');
    const nextFactBtn = document.getElementById('nextFact');
    
    // Initialize timeline
    let currentEventIndex = 3; // Start with Sicut Dudum (1435)
    
    // Create timeline points
    const timelineWidth = timeline.offsetWidth;
    const startYear = timelineEvents[0].year;
    const endYear = timelineEvents[timelineEvents.length - 1].year;
    const yearSpan = endYear - startYear;
    
    timelineEvents.forEach((event, index) => {
        const point = document.createElement('div');
        point.className = 'timeline-point';
        point.dataset.index = index;
        
        // Calculate position based on year
        const position = ((event.year - startYear) / yearSpan) * 100;
        point.style.left = `${position}%`;
        
        // Add label
        const label = document.createElement('div');
        label.className = 'timeline-label';
        label.textContent = event.year;
        
        point.appendChild(label);
        timeline.appendChild(point);
        
        // Add click event
        point.addEventListener('click', () => {
            setCurrentEvent(index);
        });
    });
    
    // Update timeline display
    function setCurrentEvent(index) {
        // Clear previous active state
        document.querySelectorAll('.timeline-point').forEach(p => {
            p.classList.remove('active');
        });
        
        // Set new active state
        document.querySelectorAll('.timeline-point')[index].classList.add('active');
        
        // Update content
        eventTitle.textContent = `${timelineEvents[index].year}: ${timelineEvents[index].title}`;
        eventDescription.textContent = timelineEvents[index].description;
        
        currentEventIndex = index;
    }
    
    // Initialize to Sicut Dudum
    setCurrentEvent(currentEventIndex);
    
    // Event navigation
    prevEventBtn.addEventListener('click', () => {
        if (currentEventIndex > 0) {
            setCurrentEvent(currentEventIndex - 1);
        }
    });
    
    nextEventBtn.addEventListener('click', () => {
        if (currentEventIndex < timelineEvents.length - 1) {
            setCurrentEvent(currentEventIndex + 1);
        }
    });
    
    // Decree facts carousel
    let currentFactIndex = 0;
    
    function setCurrentFact(index) {
        currentFact.textContent = decreeFacts[index];
        factCounter.textContent = `${index + 1}/${decreeFacts.length}`;
        
        // Add fade-in animation
        currentFact.style.opacity = '0';
        setTimeout(() => {
            currentFact.style.opacity = '1';
        }, 50);
    }
    
    // Initialize facts
    setCurrentFact(currentFactIndex);
    
    // Fact navigation
    prevFactBtn.addEventListener('click', () => {
        currentFactIndex = (currentFactIndex - 1 + decreeFacts.length) % decreeFacts.length;
        setCurrentFact(currentFactIndex);
    });
    
    nextFactBtn.addEventListener('click', () => {
        currentFactIndex = (currentFactIndex + 1) % decreeFacts.length;
        setCurrentFact(currentFactIndex);
    });
    
    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
        // Timeline navigation
        if (e.key === 'ArrowLeft') {
            if (currentEventIndex > 0) {
                setCurrentEvent(currentEventIndex - 1);
            }
        } else if (e.key === 'ArrowRight') {
            if (currentEventIndex < timelineEvents.length - 1) {
                setCurrentEvent(currentEventIndex + 1);
            }
        }
    });
});