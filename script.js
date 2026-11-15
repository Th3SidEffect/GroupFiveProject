// 1. Get elements from HTML
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const images = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

const closeBtn = document.getElementById('close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');
const zoomText = document.getElementById('zoom-text');

// 2. Variables to keep track of state
let currentIndex = 0;
let currentZoom = 1;

// Put all image links in an array so we can cycle through them easily
let imageUrls = [];
for (let i = 0; i < images.length; i++) {
    imageUrls.push(images[i].src);
}

// 3. Dark Mode Logic
themeToggle.addEventListener('click', function() {
    // This adds the class if it's missing, or removes it if it's there
    body.classList.toggle('dark-mode');
});

// 4. Open Lightbox Logic
for (let i = 0; i < images.length; i++) {
    images[i].addEventListener('click', function() {
        currentIndex = i; // Save which image was clicked
        updateLightboxImage();
        lightbox.classList.remove('lightbox-hidden'); // Show the lightbox
    });
}

// 5. Close Lightbox Logic
closeBtn.addEventListener('click', function() {
    lightbox.classList.add('lightbox-hidden'); // Hide the lightbox
    resetZoom();
});

// 6. Next Image Logic
nextBtn.addEventListener('click', function() {
    currentIndex = currentIndex + 1;
    
    // If we go past the last image, loop back to the first (0)
    if (currentIndex >= imageUrls.length) {
        currentIndex = 0;
    }
    
    updateLightboxImage();
});

// 7. Previous Image Logic
prevBtn.addEventListener('click', function() {
    currentIndex = currentIndex - 1;
    
    // If we go past the first image, loop to the last image
    if (currentIndex < 0) {
        currentIndex = imageUrls.length - 1;
    }
    
    updateLightboxImage();
});

// 8. Zoom In Logic
zoomInBtn.addEventListener('click', function() {
    if (currentZoom < 3) { // Stop zooming at 3x
        currentZoom = currentZoom + 0.5;
        applyZoom();
    }
});

// 9. Zoom Out Logic
zoomOutBtn.addEventListener('click', function() {
    if (currentZoom > 1) { // Don't shrink below normal size (1x)
        currentZoom = currentZoom - 0.5;
        applyZoom();
    }
});

// Helper Functions
function updateLightboxImage() {
    lightboxImg.src = imageUrls[currentIndex];
    resetZoom(); // Reset zoom when changing images
}

function applyZoom() {
    lightboxImg.style.transform = "scale(" + currentZoom + ")";
    zoomText.innerText = Math.round(currentZoom * 100) + "%";
}

function resetZoom() {
    currentZoom = 1;
    applyZoom();
}