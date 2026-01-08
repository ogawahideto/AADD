// Book content for the interactive explorer
const bookPages = [
  {
    title: "The First Page",
    content: `
      <p>The opening of Mažvydas' catechism begins with an acrostic poem where the first letters of each line spell "MARTINUS MASVIDIUS" — the Latinized version of his name.</p>
      <p>This wasn't just artistic flourish. At a time when authorship was sometimes dangerous, especially for religious texts, this subtle signature was both a claim to his work and a demonstration of his literary skill.</p>
      <p>The first line, "Bralei seseris imkiet mani ir skaitikiet" (Brothers and sisters, take me and read me), directly addresses ordinary Lithuanians — revolutionary for a time when books were primarily for clergy and nobility.</p>
    `
  },
  {
    title: "The Alphabet",
    content: `
      <p>What makes Mažvydas' book truly revolutionary is that it includes the first printed Lithuanian alphabet and primer.</p>
      <p>Before readers could understand the religious teachings, they needed to learn how to read. Mažvydas recognized this challenge and created a standardized writing system for a language that had primarily existed in spoken form.</p>
      <p>The book contains 23 letters, missing modern Lithuanian letters like Ą, Ę, Į, Ų. This reflects both the printing limitations of the time and the evolving nature of the language's written form.</p>
    `
  },
  {
    title: "Hidden Rebellion",
    content: `
      <p>While outwardly a religious text supporting the Protestant Reformation, the book contained subtle elements of rebellion against cultural assimilation.</p>
      <p>By choosing to write in Lithuanian rather than Polish or Latin, Mažvydas was making a powerful statement about the value and dignity of the Lithuanian language and its speakers.</p>
      <p>The book even contains what might be the first recorded Lithuanian folk saying: "Deiwas dawe dantis; Deiwas duos ir duonos" (God gave teeth; God will also give bread) — preserving elements of folk wisdom within a religious text.</p>
    `
  },
  {
    title: "The Missing Book",
    content: `
      <p>For centuries, Mažvydas' catechism was known only through historical references. Scholars believed all copies had been lost to time.</p>
      <p>Then in 1974, an extraordinary discovery: a Polish researcher found the only surviving complete copy in Vilnius University Library, where it had been misfiled for centuries.</p>
      <p>This single surviving book—only 79 pages long and smaller than a modern paperback—is now one of Lithuania's most treasured cultural artifacts, valued beyond measure.</p>
    `
  },
  {
    title: "A Book That Saved a Nation",
    content: `
      <p>In the centuries that followed, Lithuanian books became powerful symbols of resistance. During the 40-year Lithuanian press ban (1864-1904), when the Russian Empire forbade Lithuanian publications in Latin characters, book smugglers risked imprisonment and exile to bring Lithuanian texts across the border.</p>
      <p>These knygnešiai (book carriers) helped maintain Lithuanian literacy and national identity despite imperial attempts at Russification. An estimated one-third of all books in Lithuania during this period were smuggled.</p>
      <p>Lithuania remains the only country in the world to have erected monuments to book smugglers, honoring their role in preserving the language that Mažvydas first committed to print.</p>
    `
  }
];

// Initialize interactive book explorer
document.addEventListener('DOMContentLoaded', () => {
  const pageContent = document.getElementById('page-content');
  const prevButton = document.getElementById('prev-page');
  const nextButton = document.getElementById('next-page');
  const pageIndicator = document.getElementById('page-indicator');
  
  let currentPage = 0;
  
  // Function to update page content
  function updatePage() {
    const page = bookPages[currentPage];
    
    // Create HTML for current page
    let html = `<h3>${page.title}</h3>${page.content}`;
    
    // Update the DOM
    pageContent.innerHTML = html;
    pageIndicator.textContent = `Page ${currentPage + 1} of ${bookPages.length}`;
    
    // Update button states
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === bookPages.length - 1;
    
    // Scroll to top of content
    pageContent.scrollTop = 0;
  }
  
  // Event listeners for navigation buttons
  prevButton.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      updatePage();
    }
  });
  
  nextButton.addEventListener('click', () => {
    if (currentPage < bookPages.length - 1) {
      currentPage++;
      updatePage();
    }
  });
  
  // Initialize with first page
  updatePage();
  
  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentPage > 0) {
      currentPage--;
      updatePage();
    } else if (e.key === 'ArrowRight' && currentPage < bookPages.length - 1) {
      currentPage++;
      updatePage();
    }
  });
  
  // Make 3D book rotate more on hover
  const book = document.querySelector('.book');
  if (book) {
    book.addEventListener('mouseenter', () => {
      book.style.transform = 'rotateY(15deg)';
    });
    
    book.addEventListener('mouseleave', () => {
      book.style.transform = 'rotateY(30deg)';
    });
  }
});