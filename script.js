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
});

// Function to initialize card scrolling
function initializeCardScrolling() {
  const cardSection = document.querySelector("#Card-Section");
  const cardContainer = cardSection.querySelector(".card-container");

  // Check if the elements exist before proceeding
  if (!cardSection || !cardContainer) {
    console.error("Required elements are not found in the DOM.");
    return;
  }

  const cardWidth = 320; // Adjust based on the card size and gap
  let scrollPosition = 0;
  const scrollSpeed = 1; // Adjust scroll speed
  let isAutoScrolling = true;
  let scrollAnimationFrame; // Reference to the animation frame

  // Create scroll buttons
  const scrollLeftBtn = document.createElement("button");
  scrollLeftBtn.innerHTML = "&#9664;"; // Left arrow symbol
  scrollLeftBtn.classList.add("scroll-button", "scroll-left");

  const scrollRightBtn = document.createElement("button");
  scrollRightBtn.innerHTML = "&#9654;"; // Right arrow symbol
  scrollRightBtn.classList.add("scroll-button", "scroll-right");

  // Append buttons to the card section
  cardSection.appendChild(scrollLeftBtn);
  cardSection.appendChild(scrollRightBtn);

  // Function to auto-scroll the cards
  function autoScroll() {
    if (!isAutoScrolling) return;

    scrollPosition += scrollSpeed;
    if (
      scrollPosition >=
      cardContainer.scrollWidth - cardContainer.clientWidth
    ) {
      scrollPosition = 0; // Reset scroll position when reaching the end
    }
    cardContainer.scrollTo(scrollPosition, 0);
    scrollAnimationFrame = requestAnimationFrame(autoScroll); // Continue scrolling
  }

  // Start auto-scroll
  function startAutoScroll() {
    isAutoScrolling = true;
    cancelAnimationFrame(scrollAnimationFrame); // Cancel any previous frame to avoid overlap
    autoScroll();
  }

  // Stop auto-scroll
  function stopAutoScroll() {
    isAutoScrolling = false;
    cancelAnimationFrame(scrollAnimationFrame); // Stop the animation
  }

  // Event listeners for manual control
  scrollLeftBtn.addEventListener("click", () => {
    stopAutoScroll();
    scrollPosition -= cardWidth; // Scroll left by one card width
    if (scrollPosition < 0) scrollPosition = 0; // Prevent scrolling past the start
    cardContainer.scrollTo({ left: scrollPosition, behavior: "smooth" });
  });

  scrollRightBtn.addEventListener("click", () => {
    stopAutoScroll();
    scrollPosition += cardWidth; // Scroll right by one card width
    if (
      scrollPosition >
      cardContainer.scrollWidth - cardContainer.clientWidth
    ) {
      scrollPosition = cardContainer.scrollWidth - cardContainer.clientWidth; // Prevent scrolling past the end
    }
    cardContainer.scrollTo({ left: scrollPosition, behavior: "smooth" });
  });

  // Start auto-scroll on mouse out and stop on hover
  cardContainer.addEventListener("mouseover", stopAutoScroll);
  cardContainer.addEventListener("mouseout", startAutoScroll);

  // Initialize auto-scroll on load
  startAutoScroll();
}
