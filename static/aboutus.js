// Navigation Toggle Function
function toggleNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    navbar.classList.toggle('active');
    navToggle.classList.toggle('active');
    overlay.classList.toggle('active');







    // Prevent scrolling when navbar is open
    if (navbar.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
}

// Close navbar when clicking outside
document.addEventListener('click', (e) => {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    if (navbar.classList.contains('active') && 
        !navbar.contains(e.target) && 
        !navToggle.contains(e.target)) {
        navbar.classList.remove('active');
        navToggle.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = 'auto'; // Restore scrolling
    }
});

// Smooth Footer Hide/Show on Scroll (Debounce Function)
let lastScrollPosition = 0;
let isScrolling;
const footer = document.querySelector('.minimalist-footer');

window.addEventListener('scroll', () => {
    clearTimeout(isScrolling);

    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScrollPosition) {
        // Scrolling down
        footer.style.transform = 'translateY(100%)';
    } else {
        // Scrolling up
        footer.style.transform = 'translateY(0)';
    }

    lastScrollPosition = currentScroll;

    // Add delay before restoring footer visibility
    isScrolling = setTimeout(() => {
        footer.style.transform = 'translateY(0)';
    }, 300);
});



