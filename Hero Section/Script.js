document.querySelector(".hero").style.opacity = 0;
document.querySelector(".hero").style.animation = "fadeIn 1.5s forwards 0.5s";

const underwaterContainer = document.getElementById("underwater");

// Create bubbles
for (let i = 0; i < 50; i++) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.top = `${Math.random() * 100}%`;
  bubble.style.width = `${Math.random() * 30 + 10}px`;
  bubble.style.height = bubble.style.width;
  bubble.style.animationDuration = `${Math.random() * 10 + 5}s`;
  bubble.style.animationDelay = `${Math.random() * 5}s`;
  underwaterContainer.appendChild(bubble);
}

// Create fish
for (let i = 0; i < 8; i++) {
  const fish = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  fish.setAttribute("class", "fish");
  fish.setAttribute("width", "100");
  fish.setAttribute("height", "50");
  fish.setAttribute("viewBox", "0 0 100 50");
  fish.innerHTML = `
          <path d="M10 25 Q 30 10, 50 25 T 90 25 L 80 15 L 80 35 L 90 25" fill="#4ecdc4" />
          <circle cx="85" cy="25" r="2" fill="white" />
        `;
  fish.style.top = `${Math.random() * 80 + 10}%`;
  fish.style.animationDuration = `${Math.random() * 20 + 20}s`;
  fish.style.animationDelay = `${Math.random() * 10}s`;
  fish.style.opacity = Math.random() * 0.5 + 0.5;
  fish.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
  underwaterContainer.appendChild(fish);
}

// Create seaweed
for (let i = 0; i < 5; i++) {
  const seaweed = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  seaweed.setAttribute("class", "seaweed");
  seaweed.setAttribute("width", "50");
  seaweed.setAttribute("height", "100");
  seaweed.setAttribute("viewBox", "0 0 50 100");
  seaweed.innerHTML = `
          <path d="M25 100 Q 40 70 25 40 T 25 0" stroke="#2ecc71" stroke-width="5" fill="none" />
        `;
  seaweed.style.left = `${Math.random() * 100}%`;
  seaweed.style.animationDelay = `${Math.random() * 2}s`;
  seaweed.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
  underwaterContainer.appendChild(seaweed);
}

// Carousel functionality
const carouselImages = document.querySelectorAll(".carousel-inner img ");
let currentImageIndex = 0;

function nextImage() {
  carouselImages[currentImageIndex].classList.remove("active");
  currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
  carouselImages[currentImageIndex].classList.add("active");
}

setInterval(nextImage, 1000); // Change image every 5 seconds
