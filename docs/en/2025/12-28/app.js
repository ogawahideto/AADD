// Timeline data
const timelineEvents = [
  {
    date: "1895",
    title: "First Commercial Screening",
    description: "The Lumière brothers hold the first paid public screening of films at the Grand Café in Paris, marking the birth of cinema as a commercial medium."
  },
  {
    date: "1896-1897",
    title: "Global Expansion",
    description: "Cinema rapidly expands globally as Lumière cameramen travel worldwide, filming and screening movies in major cities across Europe, Asia, and the Americas."
  },
  {
    date: "Early 1900s",
    title: "Narrative Filmmaking",
    description: "Filmmakers like Georges Méliès and Edwin S. Porter begin developing narrative techniques, transforming cinema from simple recordings to storytelling."
  },
  {
    date: "1910s-1920s",
    title: "Hollywood's Rise",
    description: "Hollywood emerges as the center of film production with the studio system. Charlie Chaplin, Buster Keaton, and other silent film stars become global celebrities."
  },
  {
    date: "1927",
    title: "Sound Revolution",
    description: "The Jazz Singer premieres as the first feature-length motion picture with synchronized dialogue, beginning the transition from silent films to 'talkies'."
  },
  {
    date: "1930s-1940s",
    title: "Golden Age",
    description: "Cinema's Golden Age brings classics like Gone with the Wind, Citizen Kane, and Casablanca, establishing film as a dominant cultural force."
  },
  {
    date: "1950s-1960s",
    title: "New Waves",
    description: "Italian Neorealism, French New Wave, and other movements revolutionize filmmaking with new styles and approaches, challenging Hollywood conventions."
  },
  {
    date: "1970s-1980s",
    title: "Blockbuster Era",
    description: "Films like Jaws, Star Wars, and E.T. usher in the blockbuster era, transforming the business model of cinema with merchandising and franchises."
  },
  {
    date: "1990s-2000s",
    title: "Digital Revolution",
    description: "Digital filmmaking and CGI transform production, while DVD and home theater systems change viewing habits."
  },
  {
    date: "2010s-Present",
    title: "Streaming Era",
    description: "Netflix, Disney+, and other streaming platforms disrupt traditional distribution, while filmmaking becomes more diverse and globally connected."
  }
];

// Initialize the timeline
let currentEventIndex = 0;

// DOM elements
const timelineViewer = document.getElementById('timeline-viewer');
const prevButton = document.getElementById('prev-event');
const nextButton = document.getElementById('next-event');

// Create and initialize all timeline events
function initializeTimeline() {
  timelineEvents.forEach((event, index) => {
    const eventElement = document.createElement('div');
    eventElement.className = `timeline-event ${index === 0 ? 'active' : ''}`;
    eventElement.id = `event-${index}`;
    
    eventElement.innerHTML = `
      <div class="event-date">${event.date}</div>
      <h3 class="event-title">${event.title}</h3>
      <p class="event-description">${event.description}</p>
    `;
    
    timelineViewer.appendChild(eventElement);
  });
  
  // Add event listeners to the navigation buttons
  prevButton.addEventListener('click', showPreviousEvent);
  nextButton.addEventListener('click', showNextEvent);
  
  // Update button states
  updateButtonStates();
}

// Show the previous event in the timeline
function showPreviousEvent() {
  if (currentEventIndex > 0) {
    // Remove active class from current event
    document.getElementById(`event-${currentEventIndex}`).classList.remove('active');
    document.getElementById(`event-${currentEventIndex}`).classList.add('previous');
    
    // Decrement index
    currentEventIndex--;
    
    // Add active class to new current event
    document.getElementById(`event-${currentEventIndex}`).classList.remove('previous');
    document.getElementById(`event-${currentEventIndex}`).classList.add('active');
    
    // Update button states
    updateButtonStates();
  }
}

// Show the next event in the timeline
function showNextEvent() {
  if (currentEventIndex < timelineEvents.length - 1) {
    // Remove active class from current event
    document.getElementById(`event-${currentEventIndex}`).classList.remove('active');
    
    // Increment index
    currentEventIndex++;
    
    // Add active class to new current event
    document.getElementById(`event-${currentEventIndex}`).classList.add('active');
    
    // Update button states
    updateButtonStates();
  }
}

// Update the enabled/disabled state of the navigation buttons
function updateButtonStates() {
  prevButton.disabled = currentEventIndex === 0;
  nextButton.disabled = currentEventIndex === timelineEvents.length - 1;
  
  // Visual feedback
  prevButton.style.opacity = prevButton.disabled ? "0.5" : "1";
  nextButton.style.opacity = nextButton.disabled ? "0.5" : "1";
}

// Countdown timer to the anniversary date
function initCountdown() {
  const targetDate = new Date('December 28, 2025 00:00:00').getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;
    
    if (timeRemaining > 0) {
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      
      document.getElementById('days').textContent = String(days).padStart(2, '0');
      document.getElementById('hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
    }
  }
  
  // Update the countdown every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeTimeline();
  initCountdown();
});