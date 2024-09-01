// Function to load HTML content into a specified element
function loadSection(sectionId, filePath, callback) {
  fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById(sectionId).innerHTML = html;
      if (callback) callback(); // Call the callback function after content loads
    })
    .catch((error) => {
      console.error("Error loading section:", error);
    });
}

// Load sections and initialize specific functionalities once they are loaded
document.addEventListener("DOMContentLoaded", () => {
  loadSection("Hero-section", "/Hero Section/hero.html");
  loadSection("Vedio-section", "/Vedio Player/Vedio.html");
  loadSection("Card-Section", "/Card/Card.html", initializeCardScrolling);
  loadSection("hall-of-fame-section", "/Hall Of Fame/hallOfFame.html");
  loadSection("FAQs-section", "/FAQs/FAQs.html");
  loadSection("Footer-section", "/Footer/footer.html");

  // Initialize scroll sound functionality
  initializeScrollSound();
});

// Function to initialize scroll sound functionality
function initializeScrollSound() {
  const scrollSound = document.getElementById("scroll-sound");
  let lastScrollTop = 0;
  let isPlaying = false;

  // Function to play sound on scroll
  function playScrollSound() {
    const st = window.pageYOffset || document.documentElement.scrollTop;

    // Check if we're actually scrolling (not just a small fluctuation)
    if (Math.abs(lastScrollTop - st) <= 5) return;

    if (!isPlaying) {
      scrollSound.play().catch((error) => {
        console.error("Sound playback failed:", error);
      });
      isPlaying = true;

      // Reset playing state after sound ends
      scrollSound.addEventListener(
        "ended",
        () => {
          isPlaying = false;
        },
        { once: true }
      );
    }

    lastScrollTop = st <= 0 ? 0 : st; // For mobile or negative scrolling
  }

  // Debounce function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Add event listener for scrolling with debounce
  window.addEventListener("scroll", debounce(playScrollSound, 150));
}

// Log to console when script is loaded
// console.log("Combined scroll functionality script loaded");
