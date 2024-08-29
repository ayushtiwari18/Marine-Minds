// Function to load HTML content into a specified element
function loadSection(sectionId, filePath) {
  fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById(sectionId).innerHTML = html;
    })
    .catch((error) => {
      console.error("Error loading section:", error);
    });
}

// Load each section's HTML into its corresponding div
document.addEventListener("DOMContentLoaded", () => {
  loadSection("Hero-section", "/Hero Section/hero.html");
  loadSection("Card-Section", "/Card/Card.html");
  loadSection("hall-of-fame-section", "/Hall Of Fame/hallOfFame.html");
  loadSection("FAQs-section", "/FAQs/FAQs.html");
  loadSection("Footer-section", "/Footer/footer.html");
});
