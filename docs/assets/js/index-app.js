// AADD Index Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('AADD Index loaded');

    // Make app cards clickable
    const appCards = document.querySelectorAll('.app-card');
    appCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't navigate if clicking on a link
            if (e.target.tagName === 'A') {
                return;
            }

            const link = card.querySelector('.app-link');
            if (link) {
                window.location.href = link.href;
            }
        });
    });

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
