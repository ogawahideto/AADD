// Timeline data
const timelineEvents = [
  {
    date: "December 30, 1936",
    title: "The Strike Begins",
    description: "Workers at Fisher Body Plant No. 1 sit down and occupy the factory after hearing rumors of machine relocation.",
    perspectives: {
      worker: "We heard they were going to move the dies to non-union plants. If we'd walked out, they would have just moved the equipment. Staying put was our only option.",
      management: "We never expected these men to take over our factories. It's unprecedented. They're treating our property as if it's their own.",
      public: "Have you heard? Workers have barricaded themselves inside the factory! The newspapers are calling it a 'sit-down' strike. Can they really do that?"
    }
  },
  {
    date: "January 2, 1937",
    title: "Fisher Body Plant No. 2 Joins",
    description: "The strike expands as workers at Fisher Body Plant No. 2 join the sit-down movement.",
    perspectives: {
      worker: "We've built a city inside these walls. We have our own government, sanitation department, security force, and even recreational committees.",
      management: "This is spreading like wildfire. We have a situation where workers are essentially holding our factories hostage.",
      public: "It's amazing how organized they are. They're maintaining production equipment better than when working, keeping everything clean and orderly."
    }
  },
  {
    date: "January 11, 1937",
    title: "Battle of Running Bulls",
    description: "Police attempt to stop food delivery to strikers. Workers fight back with fire hoses and car door hinges, forcing police to retreat.",
    perspectives: {
      worker: "They shut off our heat in freezing weather, then tried to starve us out. When we saw police at the gates, we knew we had to defend ourselves.",
      management: "These radicals have violently assaulted police officers who were simply trying to protect private property from trespassers.",
      public: "The radio reports are wild - police firing tear gas, workers fighting back with fire hoses and car parts. Now the National Guard has been called!"
    }
  },
  {
    date: "February 1, 1937",
    title: "Women's Emergency Brigade Forms",
    description: "Genora Johnson Dollinger organizes the Women's Emergency Brigade, creating a crucial support network.",
    perspectives: {
      worker: "When the women showed up in their red berets and armbands, we knew we weren't alone. They were ready to break windows if the police used gas again.",
      management: "Now they've involved women in their illegal activities. It's shameful to put mothers and wives in harm's way for this cause.",
      public: "These women are extraordinary - they're running kitchens feeding thousands, forming human shields against police, and keeping morale high."
    }
  },
  {
    date: "February 4, 1937",
    title: "UAW Takes Chevy Plant 4",
    description: "In a daring maneuver, workers capture the strategic Chevrolet Plant 4, giving the strikers leverage over GM's engine production.",
    perspectives: {
      worker: "Taking Plant 4 was the turning point. Without engine production, GM was finally truly crippled. Now they had to negotiate seriously.",
      management: "This seizure of Chevrolet Plant 4 is costing the company millions daily. The governor must send in troops to end this anarchy.",
      public: "The city is divided. Some merchants are going bankrupt without worker paychecks. Others are donating food to strikers' families."
    }
  },
  {
    date: "February 11, 1937",
    title: "GM Recognizes UAW",
    description: "After 44 days, General Motors agrees to recognize UAW as the workers' bargaining representative.",
    perspectives: {
      worker: "We won! We stood our ground for 44 days and forced the largest corporation in the world to recognize our union. Everything changes now.",
      management: "We've made concessions to restore production. This troubling labor unrest has cost us millions, but we'll adapt to these new conditions.",
      public: "The strikers are heroes to many - ordinary workers who took on General Motors and won. They're marching out of the factories victorious."
    }
  }
];

// Surprising facts carousel
const facts = document.querySelectorAll('.fact');
const factContainer = document.querySelector('.fact-indicators');
const prevFactBtn = document.getElementById('prev-fact');
const nextFactBtn = document.getElementById('next-fact');
let currentFactIndex = 0;

// Timeline elements
const timelineTrack = document.querySelector('.timeline-track');
const eventDetails = document.getElementById('event-details');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let currentEventIndex = 0;

// Initialize timeline
function initTimeline() {
  // Create timeline markers
  timelineEvents.forEach((event, index) => {
    const marker = document.createElement('div');
    marker.classList.add('timeline-marker');
    marker.setAttribute('data-index', index);
    marker.setAttribute('aria-label', event.title);
    
    marker.addEventListener('click', () => {
      setCurrentEvent(index);
    });
    
    timelineTrack.appendChild(marker);
  });
  
  // Set initial event
  setCurrentEvent(0);
  
  // Add event listeners for navigation
  prevBtn.addEventListener('click', showPrevEvent);
  nextBtn.addEventListener('click', showNextEvent);
  
  // Add perspective toggle functionality
  const perspectiveBtns = document.querySelectorAll('.perspective-btn');
  perspectiveBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const perspective = btn.getAttribute('data-perspective');
      changePerspective(perspective);
      
      // Update active state
      perspectiveBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function setCurrentEvent(index) {
  currentEventIndex = index;
  updateTimelineMarkers();
  updateEventDetails();
}

function updateTimelineMarkers() {
  const markers = document.querySelectorAll('.timeline-marker');
  markers.forEach((marker, index) => {
    if (index === currentEventIndex) {
      marker.classList.add('active');
    } else {
      marker.classList.remove('active');
    }
  });
}

function updateEventDetails() {
  const event = timelineEvents[currentEventIndex];
  const dateEl = document.querySelector('.event-date');
  const titleEl = document.querySelector('.event-title');
  const descEl = document.querySelector('.event-description');
  const storyEl = document.querySelector('.event-story');
  
  // Fade out effect
  eventDetails.style.opacity = '0';
  
  setTimeout(() => {
    dateEl.textContent = event.date;
    titleEl.textContent = event.title;
    descEl.textContent = event.description;
    
    // Set default perspective (worker)
    storyEl.textContent = event.perspectives.worker;
    
    // Reset perspective buttons
    const perspectiveBtns = document.querySelectorAll('.perspective-btn');
    perspectiveBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-perspective') === 'worker') {
        btn.classList.add('active');
      }
    });
    
    eventDetails.style.opacity = '1';
  }, 300);
}

function showPrevEvent() {
  if (currentEventIndex > 0) {
    setCurrentEvent(currentEventIndex - 1);
  }
}

function showNextEvent() {
  if (currentEventIndex < timelineEvents.length - 1) {
    setCurrentEvent(currentEventIndex + 1);
  }
}

function changePerspective(perspective) {
  const event = timelineEvents[currentEventIndex];
  const storyEl = document.querySelector('.event-story');
  
  storyEl.textContent = event.perspectives[perspective];
}

// Initialize facts carousel
function initFactsCarousel() {
  // Create indicators
  facts.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('fact-indicator');
    if (index === 0) {
      indicator.classList.add('active');
    }
    
    indicator.addEventListener('click', () => {
      showFact(index);
    });
    
    factContainer.appendChild(indicator);
  });
  
  prevFactBtn.addEventListener('click', showPrevFact);
  nextFactBtn.addEventListener('click', showNextFact);
}

function showFact(index) {
  facts.forEach(fact => fact.classList.remove('active'));
  const indicators = document.querySelectorAll('.fact-indicator');
  indicators.forEach(indicator => indicator.classList.remove('active'));
  
  currentFactIndex = index;
  facts[currentFactIndex].classList.add('active');
  indicators[currentFactIndex].classList.add('active');
}

function showPrevFact() {
  let newIndex = currentFactIndex - 1;
  if (newIndex < 0) newIndex = facts.length - 1;
  showFact(newIndex);
}

function showNextFact() {
  let newIndex = currentFactIndex + 1;
  if (newIndex >= facts.length) newIndex = 0;
  showFact(newIndex);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initTimeline();
  initFactsCarousel();
});