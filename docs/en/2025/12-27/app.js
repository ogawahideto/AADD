// Timeline data - key events in IMF and World Bank history
const timelineEvents = [
    {
        year: 1944,
        title: "The Bretton Woods Conference",
        description: "Delegates from 44 allied nations met at Mount Washington Hotel in Bretton Woods, New Hampshire to plan the post-war economic order. John Maynard Keynes (UK) and Harry Dexter White (US) led the negotiations that designed the IMF and World Bank frameworks."
    },
    {
        year: 1945,
        title: "Official Establishment",
        description: "On December 27, the International Monetary Fund and International Bank for Reconstruction and Development (World Bank) were officially created when 29 countries signed their Articles of Agreement. Their mission: prevent economic crises and rebuild post-war economies."
    },
    {
        year: 1947,
        title: "First Operations Begin",
        description: "The IMF began financial operations on March 1, and France became the first country to borrow funds in May. The World Bank issued its first loan of $250 million to France for post-war reconstruction, followed by similar loans to other European nations."
    },
    {
        year: 1960,
        title: "Expanding Development Focus",
        description: "The World Bank established the International Development Association (IDA) to provide loans on more favorable terms to the poorest developing countries, broadening its focus beyond post-war reconstruction to global development."
    },
    {
        year: 1971,
        title: "End of Bretton Woods System",
        description: "President Nixon suspended the dollar's convertibility to gold, effectively ending the fixed exchange rate system established at Bretton Woods. The IMF adapted to a new role supervising the floating exchange rate system."
    },
    {
        year: 1980,
        title: "Structural Adjustment Era",
        description: "During the debt crisis of the 1980s, the IMF and World Bank began attaching policy conditions to their loans, requiring countries to implement market-oriented reforms known as 'structural adjustment programs,' which became highly controversial."
    },
    {
        year: 1997,
        title: "Asian Financial Crisis",
        description: "The IMF played a major role in responding to the Asian financial crisis, providing over $40 billion in loans to Thailand, Indonesia, and South Korea while requiring significant policy reforms. The crisis sparked debates about IMF policies and global financial architecture."
    },
    {
        year: 2008,
        title: "Global Financial Crisis Response",
        description: "Following the 2008 financial crisis, the G20 agreed to triple the IMF's lending capacity to $750 billion. The World Bank created rapid financing facilities and increased lending to $100+ billion to help countries cope with the crisis."
    },
    {
        year: 2015,
        title: "Sustainable Development Goals",
        description: "The World Bank aligned its mission with the UN's Sustainable Development Goals, focusing on ending extreme poverty and promoting shared prosperity. The IMF expanded its work on income inequality and sustainable growth."
    },
    {
        year: 2020,
        title: "COVID-19 Pandemic Response",
        description: "Both institutions mobilized unprecedented financial support in response to COVID-19. The IMF deployed over $100 billion to 80+ countries, while the World Bank committed $157 billion, their largest crisis response in history."
    },
    {
        year: 2025,
        title: "80 Years of Global Impact",
        description: "As the IMF and World Bank mark their 80th anniversary, they face new challenges: climate change, rising inequality, digital currencies, and shifting geopolitical power. Their evolution continues to shape the global economic landscape."
    }
];

// DOM elements
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const timelineCards = document.getElementById('timeline-cards');
const progressBar = document.getElementById('progress-bar');

// Timeline state
let currentIndex = 0;
const totalEvents = timelineEvents.length;

// Initialize timeline
function initTimeline() {
    // Create all timeline cards
    timelineEvents.forEach(event => {
        const card = document.createElement('div');
        card.className = 'timeline-card';
        card.innerHTML = `
            <div class="timeline-year">${event.year}</div>
            <div class="timeline-content">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
            </div>
        `;
        timelineCards.appendChild(card);
    });

    // Initial display
    updateTimeline();
}

// Update timeline display
function updateTimeline() {
    // Update transform to show current card
    timelineCards.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update progress bar
    const progress = ((currentIndex) / (totalEvents - 1)) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Update button states
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === totalEvents - 1;
}

// Event listeners for navigation
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateTimeline();
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex < totalEvents - 1) {
        currentIndex++;
        updateTimeline();
    }
});

// Initialize keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--;
        updateTimeline();
    } else if (e.key === 'ArrowRight' && currentIndex < totalEvents - 1) {
        currentIndex++;
        updateTimeline();
    }
});

// Initialize timeline on page load
document.addEventListener('DOMContentLoaded', initTimeline);

// Add swipe support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

timelineCards.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

timelineCards.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX + swipeThreshold < touchStartX && currentIndex < totalEvents - 1) {
        // Swipe left - show next
        currentIndex++;
        updateTimeline();
    } else if (touchEndX > touchStartX + swipeThreshold && currentIndex > 0) {
        // Swipe right - show previous
        currentIndex--;
        updateTimeline();
    }
}

// Highlight 1945 event initially (when the institutions were established)
document.addEventListener('DOMContentLoaded', () => {
    // Find index of 1945 event
    const establishmentIndex = timelineEvents.findIndex(event => event.year === 1945);
    if (establishmentIndex !== -1) {
        currentIndex = establishmentIndex;
        updateTimeline();
    }
});