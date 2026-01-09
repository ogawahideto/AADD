// Character relationships data
const characterRelationships = {
    arcadius: {
        name: "Emperor Arcadius",
        text: "Eudoxia's husband was Emperor Arcadius (reigned 395-408 CE), known to be weak-willed and easily influenced. Their marriage was arranged by the eunuch Eutropius, but Eudoxia quickly gained dominance over her husband. While Arcadius was technically the ruler, it was widely known that Eudoxia made many important decisions. Despite this power imbalance, historical accounts suggest they maintained a close relationship, with Arcadius deeply in love with his beautiful and charismatic wife."
    },
    chrysostom: {
        name: "John Chrysostom",
        text: "Perhaps Eudoxia's most famous adversary was John Chrysostom, the Archbishop of Constantinople. Initially on good terms, their relationship soured when Chrysostom began criticizing extravagance among court women. The breaking point came when he supposedly compared Eudoxia to Jezebel in a sermon after she had a silver statue of herself erected near his cathedral. Eudoxia considered this an insult to imperial authority and orchestrated Chrysostom's exile in 404 CE, cementing her reputation as a ruthless defender of imperial power."
    },
    eutropius: {
        name: "Eutropius",
        text: "The powerful court eunuch Eutropius initially brought Eudoxia to court and arranged her marriage to Arcadius, likely hoping to control the imperial couple. His plan backfired spectacularly. Once secure in her position as empress, Eudoxia allied with the military commander Gainas to engineer Eutropius' downfall. When Eutropius sought sanctuary in a church, Eudoxia convinced her husband to respect this right of asylum, but only to banish rather than execute him – a calculated move that made her appear merciful while removing her rival."
    },
    stilicho: {
        name: "Stilicho",
        text: "Stilicho was the powerful half-Vandal general who effectively ruled the Western Roman Empire as regent for Arcadius' younger brother, Honorius. Eudoxia viewed Stilicho with suspicion, believing he harbored ambitions to control both halves of the empire. Through careful political maneuvering, she helped maintain the independence of the Eastern court from Western interference. This East-West rivalry, partly fueled by Eudoxia's determination to protect her husband's sovereignty, would contribute to the permanent division of the Roman Empire."
    }
};

// Interactive relationship map
document.addEventListener('DOMContentLoaded', () => {
    // Character relationships
    const characters = document.querySelectorAll('.character');
    const relationshipDetail = document.getElementById('relationshipDetail');
    const characterName = document.getElementById('characterName');
    const relationshipText = document.getElementById('relationshipText');
    const closeDetail = document.getElementById('closeDetail');
    
    characters.forEach(character => {
        character.addEventListener('click', () => {
            const characterId = character.getAttribute('data-character');
            const relationship = characterRelationships[characterId];
            
            characterName.textContent = relationship.name;
            relationshipText.textContent = relationship.text;
            relationshipDetail.classList.add('active');
            
            // Scroll to make sure the detail is visible
            relationshipDetail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });
    
    closeDetail.addEventListener('click', () => {
        relationshipDetail.classList.remove('active');
    });
    
    // Facts carousel
    const facts = document.querySelectorAll('.fact');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.getElementById('prevFact');
    const nextButton = document.getElementById('nextFact');
    let currentFactIndex = 0;
    
    function showFact(index) {
        // Hide all facts
        facts.forEach(fact => {
            fact.classList.remove('active');
        });
        
        // Deactivate all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show current fact and activate its indicator
        facts[index].classList.add('active');
        indicators[index].classList.add('active');
    }
    
    nextButton.addEventListener('click', () => {
        currentFactIndex = (currentFactIndex + 1) % facts.length;
        showFact(currentFactIndex);
    });
    
    prevButton.addEventListener('click', () => {
        currentFactIndex = (currentFactIndex - 1 + facts.length) % facts.length;
        showFact(currentFactIndex);
    });
    
    // Optional: Auto-advance facts every 10 seconds
    let factInterval = setInterval(() => {
        currentFactIndex = (currentFactIndex + 1) % facts.length;
        showFact(currentFactIndex);
    }, 10000);
    
    // Clear interval when user interacts with carousel
    [prevButton, nextButton].forEach(button => {
        button.addEventListener('click', () => {
            clearInterval(factInterval);
            factInterval = setInterval(() => {
                currentFactIndex = (currentFactIndex + 1) % facts.length;
                showFact(currentFactIndex);
            }, 10000);
        });
    });
    
    // Make indicators clickable
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentFactIndex = index;
            showFact(currentFactIndex);
            clearInterval(factInterval);
            factInterval = setInterval(() => {
                currentFactIndex = (currentFactIndex + 1) % facts.length;
                showFact(currentFactIndex);
            }, 10000);
        });
    });
});

// Add smooth scroll behavior for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});