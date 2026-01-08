// Elements
const countdownElement = document.getElementById('countdown');
const timelineTrack = document.getElementById('timeline-track');
const timelineApple = document.getElementById('timeline-apple');
const timelineMarkers = document.querySelectorAll('.timeline-marker');
const mass1Slider = document.getElementById('mass1');
const mass2Slider = document.getElementById('mass2');
const distanceSlider = document.getElementById('distance');
const mass1Value = document.getElementById('mass1-value');
const mass2Value = document.getElementById('mass2-value');
const distanceValue = document.getElementById('distance-value');
const forceValue = document.getElementById('force-value');
const planet1 = document.getElementById('planet1');
const planet2 = document.getElementById('planet2');
const forceLine = document.getElementById('force-line');
const prevFactBtn = document.getElementById('prev-fact');
const nextFactBtn = document.getElementById('next-fact');
const factsContainer = document.getElementById('facts-container');
const facts = document.querySelectorAll('.fact');
const factIndicatorsContainer = document.getElementById('fact-indicators');

// Constants
const G = 6.67430e-11; // Gravitational constant
const birthDate = new Date('January 4, 2026');

// Initialize the app
function initApp() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
  initTimeline();
  initGravitySimulator();
  initFactsCarousel();
}

// Update countdown to Newton's birth anniversary
function updateCountdown() {
  const now = new Date();
  const diff = birthDate - now;
  
  if (diff <= 0) {
    countdownElement.textContent = "Happy 383rd Birthday, Sir Isaac Newton!";
    return;
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s until Newton's 383rd birthday`;
}

// Timeline functionality
function initTimeline() {
  // Position timeline markers
  timelineMarkers.forEach((marker, index) => {
    const year = parseInt(marker.getAttribute('data-year'));
    const startYear = 1642;
    const endYear = 1727;
    const totalYears = endYear - startYear;
    const percentage = ((year - startYear) / totalYears) * 100;
    
    marker.style.left = `${percentage}%`;
  });
  
  // Make the apple draggable
  let isDragging = false;
  let startX, startOffset;
  
  timelineApple.addEventListener('mousedown', startDrag);
  timelineApple.addEventListener('touchstart', startDrag, { passive: false });
  
  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag, { passive: false });
  
  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag);
  
  function startDrag(e) {
    isDragging = true;
    timelineApple.style.cursor = 'grabbing';
    
    if (e.type === 'mousedown') {
      startX = e.clientX;
    } else if (e.type === 'touchstart') {
      startX = e.touches[0].clientX;
      e.preventDefault(); // Prevent scrolling while dragging
    }
    
    startOffset = timelineTrack.getBoundingClientRect().left;
  }
  
  function drag(e) {
    if (!isDragging) return;
    
    let currentX;
    if (e.type === 'mousemove') {
      currentX = e.clientX;
    } else if (e.type === 'touchmove') {
      currentX = e.touches[0].clientX;
      e.preventDefault(); // Prevent scrolling while dragging
    }
    
    const trackWidth = timelineTrack.offsetWidth;
    const containerWidth = timelineTrack.parentElement.offsetWidth;
    
    // Calculate the new position percentage
    const dragDistance = currentX - startX;
    const maxOffset = trackWidth - containerWidth;
    let newOffsetPercentage = (dragDistance / containerWidth) * 100;
    
    // Limit the drag range
    const currentOffsetPercentage = parseFloat(timelineTrack.style.transform?.replace('translateX(-', '').replace('%)', '') || 0);
    let targetPercentage = currentOffsetPercentage - newOffsetPercentage;
    
    if (targetPercentage < 0) targetPercentage = 0;
    if (targetPercentage > 100) targetPercentage = 100;
    
    // Apply the translation
    timelineTrack.style.transform = `translateX(-${targetPercentage}%)`;
    
    // Calculate which year is closest to the apple position
    updateActiveTimelineMarker();
  }
  
  function endDrag() {
    isDragging = false;
    timelineApple.style.cursor = 'grab';
  }
  
  function updateActiveTimelineMarker() {
    const applePosition = timelineApple.getBoundingClientRect().left + (timelineApple.offsetWidth / 2);
    
    let closestMarker = null;
    let closestDistance = Infinity;
    
    timelineMarkers.forEach(marker => {
      marker.classList.remove('active');
      const markerPosition = marker.getBoundingClientRect().left + (marker.offsetWidth / 2);
      const distance = Math.abs(markerPosition - applePosition);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestMarker = marker;
      }
    });
    
    if (closestMarker && closestDistance < 50) {
      closestMarker.classList.add('active');
    }
  }
}

// Gravity simulator functionality
function initGravitySimulator() {
  // Update values display
  mass1Slider.addEventListener('input', updateSimulation);
  mass2Slider.addEventListener('input', updateSimulation);
  distanceSlider.addEventListener('input', updateSimulation);
  
  // Initial update
  updateSimulation();
  
  function updateSimulation() {
    const mass1 = parseInt(mass1Slider.value);
    const mass2 = parseInt(mass2Slider.value);
    const distance = parseInt(distanceSlider.value);
    
    // Update display values
    mass1Value.textContent = mass1;
    mass2Value.textContent = mass2;
    distanceValue.textContent = distance;
    
    // Calculate gravitational force
    const force = calculateGravitationalForce(mass1, mass2, distance);
    forceValue.textContent = force.toExponential(2) + ' N';
    
    // Update visual representation
    updateVisualization(mass1, mass2, distance);
  }
  
  function calculateGravitationalForce(m1, m2, r) {
    // F = G * (m1 * m2) / r²
    return G * (m1 * m2) / (r * r);
  }
  
  function updateVisualization(m1, m2, r) {
    // Size of planets based on mass (with some scaling for visibility)
    const size1 = Math.max(20, Math.min(60, m1 * 0.5));
    const size2 = Math.max(20, Math.min(60, m2 * 0.5));
    
    // Position planets based on distance
    const containerWidth = forceLine.offsetWidth;
    const minDistance = 100; // Minimum visual distance
    const maxDistance = containerWidth - 100; // Maximum visual distance
    const visualDistance = minDistance + ((r - 1) / 19) * (maxDistance - minDistance);
    
    // Set planet sizes
    planet1.style.width = size1 + 'px';
    planet1.style.height = size1 + 'px';
    planet2.style.width = size2 + 'px';
    planet2.style.height = size2 + 'px';
    
    // Position planets
    planet1.style.left = (containerWidth / 2 - visualDistance / 2) + 'px';
    planet2.style.left = (containerWidth / 2 + visualDistance / 2) + 'px';
    
    // Adjust force line
    forceLine.style.left = (containerWidth / 2 - visualDistance / 2) + size1 / 2 + 'px';
    forceLine.style.width = (visualDistance - size1 / 2 - size2 / 2) + 'px';
    
    // Calculate force magnitude for visual effect
    const force = calculateGravitationalForce(m1, m2, r);
    const normalizedForce = Math.min(1, Math.log10(force * 1e11) / 10);
    forceLine.style.opacity = 0.2 + normalizedForce * 0.8;
  }
}

// Facts carousel functionality
function initFactsCarousel() {
  let currentFact = 0;
  
  // Create indicators
  facts.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('fact-indicator');
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => showFact(index));
    factIndicatorsContainer.appendChild(indicator);
  });
  
  const indicators = document.querySelectorAll('.fact-indicator');
  
  // Set up navigation
  prevFactBtn.addEventListener('click', showPreviousFact);
  nextFactBtn.addEventListener('click', showNextFact);
  
  function showFact(index) {
    facts.forEach(fact => fact.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));
    
    facts[index].classList.add('active');
    indicators[index].classList.add('active');
    currentFact = index;
  }
  
  function showNextFact() {
    currentFact = (currentFact + 1) % facts.length;
    showFact(currentFact);
  }
  
  function showPreviousFact() {
    currentFact = (currentFact - 1 + facts.length) % facts.length;
    showFact(currentFact);
  }
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);