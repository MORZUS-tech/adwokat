// Эффект прокрутки для навбара
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Плавная прокрутка к секциям
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Закрыть мобильное меню после клика
            const navLinksContainer = document.querySelector('.nav-links');
            const burger = document.querySelector('.nav-burger');
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                burger.classList.remove('active');
            }
        }
    });
});

// Активная ссылка при прокрутке
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Бургер меню для мобильных
const burger = document.querySelector('.nav-burger');
const navLinksContainer = document.querySelector('.nav-links');

if (burger) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });
}

// Закрыть меню при клике вне его
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinksContainer.classList.remove('active');
        burger.classList.remove('active');
    }
});