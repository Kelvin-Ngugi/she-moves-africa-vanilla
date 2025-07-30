// JavaScript for handling carousels and any interactive elements

// Carousel Functionality
function nextSlide(containerId) {
    const container = document.getElementById(containerId);
    const items = container.getElementsByClassName('carousel-item');
    let activeIndex = Array.from(items).findIndex(item => item.classList.contains('active'));

    items[activeIndex].classList.remove('active');
    activeIndex = (activeIndex + 1) % items.length;
    items[activeIndex].classList.add('active');
}

function previousSlide(containerId) {
    const container = document.getElementById(containerId);
    const items = container.getElementsByClassName('carousel-item');
    let activeIndex = Array.from(items).findIndex(item => item.classList.contains('active'));

    items[activeIndex].classList.remove('active');
    activeIndex = (activeIndex - 1 + items.length) % items.length;
    items[activeIndex].classList.add('active');
}

// Navbar toggle for mobile view
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});
