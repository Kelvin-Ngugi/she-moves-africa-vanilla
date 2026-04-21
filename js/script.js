// JavaScript for handling carousels and any interactive elements

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    initializeNavigation();
    initializeSmoothScrolling();
    initializeContactForm();
    handleScrollRestoration();
});

// Carousel Functionality
function nextSlide(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const items = container.getElementsByClassName('carousel-item');
    if (items.length === 0) return;

    let activeIndex = Array.from(items).findIndex(item => item.classList.contains('active'));
    if (activeIndex === -1) activeIndex = 0;

    items[activeIndex].classList.remove('active');
    activeIndex = (activeIndex + 1) % items.length;
    items[activeIndex].classList.add('active');
}

function previousSlide(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const items = container.getElementsByClassName('carousel-item');
    if (items.length === 0) return;

    let activeIndex = Array.from(items).findIndex(item => item.classList.contains('active'));
    if (activeIndex === -1) activeIndex = 0;

    items[activeIndex].classList.remove('active');
    activeIndex = (activeIndex - 1 + items.length) % items.length;
    items[activeIndex].classList.add('active');
}

// Initialize carousel with auto-play and pause on hover
function initializeCarousel() {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        if (carousel.dataset.initialized) return;
        carousel.dataset.initialized = 'true';

        const items = carousel.querySelectorAll('.carousel-item');
        if (items.length > 0 && !carousel.querySelector('.active')) {
            items[0].classList.add('active');
        }

        let intervalId = setInterval(() => {
            nextSlide(carousel.id);
        }, 5000);

        carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
        carousel.addEventListener('mouseleave', () => {
            intervalId = setInterval(() => nextSlide(carousel.id), 5000);
        });
    });
}

// Navbar toggle for mobile view
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            if (validateForm(formObject)) {
                showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
                contactForm.reset();
            }

            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
    }
}

// Form validation
function validateForm(data) {
    const required = ['firstName', 'lastName', 'email', 'subject', 'message'];

    for (let field of required) {
        if (!data[field] || data[field].trim() === '') {
            showMessage(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`, 'error');
            return false;
        }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return false;
    }

    return true;
}

// Show message to user
function showMessage(message, type) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) existingMessage.remove();

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 6px;
        font-weight: 600;
        ${type === 'success' ?
            'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' :
            'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
    `;

    const form = document.getElementById('contact-form');
    if (form) {
        form.insertBefore(messageDiv, form.firstChild);
        setTimeout(() => messageDiv.remove(), 5000);
    }
}

// Scrollspy & accessibility enhancements
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;

        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
});

// Handle scroll restoration manually
function handleScrollRestoration() {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
}

// Add loading animation
document.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
