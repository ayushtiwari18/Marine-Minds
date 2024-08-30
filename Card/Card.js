document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.querySelector(".card-container");
  const cardWidth = 320; // card width + gap
  let scrollPosition = 0;
  const scrollSpeed = 0.5; // Adjust this value to change scroll speed
  let isAutoScrolling = true;

  // Add navigation buttons
  const scrollLeftBtn = document.createElement("button");
  scrollLeftBtn.innerHTML = "&#9664;";
  scrollLeftBtn.classList.add("scroll-button", "scroll-left");

  const scrollRightBtn = document.createElement("button");
  scrollRightBtn.innerHTML = "&#9654;";
  scrollRightBtn.classList.add("scroll-button", "scroll-right");

  document.querySelector(".card-section").appendChild(scrollLeftBtn);
  document.querySelector(".card-section").appendChild(scrollRightBtn);

  function autoScroll() {
    if (!isAutoScrolling) return;

    scrollPosition += scrollSpeed;
    if (
      scrollPosition >=
      cardContainer.scrollWidth - cardContainer.clientWidth
    ) {
      scrollPosition = 0;
    }
    cardContainer.scrollTo(scrollPosition, 0);
    requestAnimationFrame(autoScroll);
  }

  function startAutoScroll() {
    isAutoScrolling = true;
    autoScroll();
  }

  function stopAutoScroll() {
    isAutoScrolling = false;
  }

  cardContainer.addEventListener("mouseover", stopAutoScroll);
  cardContainer.addEventListener("mouseout", startAutoScroll);

  scrollLeftBtn.addEventListener("click", () => {
    stopAutoScroll();
    scrollPosition -= cardWidth;
    if (scrollPosition < 0) scrollPosition = 0;
    cardContainer.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  });

  scrollRightBtn.addEventListener("click", () => {
    stopAutoScroll();
    scrollPosition += cardWidth;
    if (
      scrollPosition >
      cardContainer.scrollWidth - cardContainer.clientWidth
    ) {
      scrollPosition = cardContainer.scrollWidth - cardContainer.clientWidth;
    }
    cardContainer.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  });

  startAutoScroll();
});
