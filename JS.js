// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.service-card, .advantage-card, .contact-card, .stat-item, .process-step'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
        observer.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            requestAnimationFrame(() => {
                if (heroImage) {
                    heroImage.style.transform = `translateY(${scrolled * 0.15}px)`;
                }
            });
        }
    });

    // Animate statistics numbers
    const animateNumber = (element, target) => {
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '') + 
                                     (element.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '') + 
                                     (element.textContent.includes('%') ? '%' : '');
            }
        }, 16);
    };

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target.querySelector('.stat-number');
                const text = number.textContent;
                const value = parseInt(text.replace(/\D/g, ''));
                number.textContent = '0' + (text.includes('+') ? '+' : '') + (text.includes('%') ? '%' : '');
                animateNumber(number, value);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(stat => {
        statObserver.observe(stat);
    });

    // Card hover effects with 3D tilt
    const cards = document.querySelectorAll('.service-card, .advantage-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transition = 'all 0.1s ease';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Process timeline animation
    const processSteps = document.querySelectorAll('.process-step');
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                processObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(40px)';
        step.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        processObserver.observe(step);
    });

    // Magnetic effect for buttons
    const buttons = document.querySelectorAll('.btn-primary, .social-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });

    // Cursor trail effect (optional, subtle)
    let cursorTrail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (cursorTrail.length > trailLength) {
            cursorTrail.shift();
        }
    });

    // Page load animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.6s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    // Mobile menu toggle (if needed in future)
    const createMobileMenu = () => {
        if (window.innerWidth <= 968) {
            // Mobile menu logic can be added here
        }
    };

    window.addEventListener('resize', createMobileMenu);
    createMobileMenu();

    // Lazy loading for images
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Performance optimization
    let ticking = false;
    
    const optimizedScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Scroll-based animations here
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', optimizedScroll, { passive: true });

    // Add active state to navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Console easter egg
console.log('%c👩‍⚖️ Максимова Снежана Рафаилевна', 'font-size: 20px; font-weight: bold; color: #d4af37;');
console.log('%cАдвокат высшей категории', 'font-size: 14px; color: #b8c5d6;');
console.log('%cСайт разработан с вниманием к деталям', 'font-size: 12px; color: #6b7c93;');