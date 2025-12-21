// ===================================
// Smooth Scroll Navigation
// ===================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section, .hero');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ===================================
// Active Section Highlighting
// ===================================
function highlightActiveSection() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===================================
// Typing Animation for Hero
// ===================================
const typedTextElement = document.getElementById('typed-text');
const textArray = [
    'Frontend Web Developer',
    'Software Engineering Student',
    'React Specialist',
    'MERN Stack Developer',
    'UI/UX Enthusiast'
];
let textArrayIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 150;

function typeText() {
    const currentText = textArray[textArrayIndex];

    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 75;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 150;
    }

    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end
        typingDelay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        typingDelay = 500;
    }

    setTimeout(typeText, typingDelay);
}

// ===================================
// Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements that should animate on scroll
function observeElements() {
    const animatedElements = document.querySelectorAll(`
        .skill-category,
        .project-card,
        .timeline-item,
        .education-card,
        .language-item,
        .contact-card,
        .about-text
    `);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===================================
// Scroll Progress Indicator (Optional)
// ===================================
function updateScrollProgress() {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    // You can add a progress bar element if desired
    // For now, we'll just keep this function for potential future use
}

// ===================================
// Smooth Hover Effects
// ===================================
function addHoverEffects() {
    const cards = document.querySelectorAll(`
        .skill-category,
        .project-card,
        .education-card,
        .contact-card
    `);

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

// ===================================
// Initialize on Page Load
// ===================================
window.addEventListener('DOMContentLoaded', () => {
    // Start typing animation after a short delay
    setTimeout(typeText, 1000);

    // Set up scroll observers
    observeElements();

    // Add hover effects
    addHoverEffects();

    // Initial navbar state
    handleNavbarScroll();

    // Initial active section
    highlightActiveSection();
});

// ===================================
// Event Listeners
// ===================================
window.addEventListener('scroll', () => {
    handleNavbarScroll();
    highlightActiveSection();
    updateScrollProgress();
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Re-calculate positions on resize
        highlightActiveSection();
    }, 250);
});

// ===================================
// Prevent default anchor behavior for smooth scroll
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Page Visibility Change (Pause animations when tab is not active)
// ===================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause heavy animations when page is not visible
    } else {
        // Resume animations
    }
});

// ===================================
// Console Message
// ===================================
console.log('%c✨ Portfolio by Shafiqullah Khan ✨', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub!', 'color: #06b6d4; font-size: 14px;');
