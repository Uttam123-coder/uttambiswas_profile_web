// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Add scroll progress bar
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
});

// Smooth scrolling for navigation links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Enhanced fade in animation on scroll with different delays
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${index * 0.1}s`;
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Enhanced header scroll effect with class toggle
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }
    
    if (currentScroll > 100) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
    
    lastScroll = currentScroll;
});

// Enhanced typing effect for hero section
const heroTitle = document.querySelector('.hero h1');
const heroSubtitle = document.querySelector('.hero .subtitle');

function typeWriter(element, text, delay = 100, callback) {
    let i = 0;
    element.innerHTML = '';
    element.style.opacity = '1';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            if (callback) callback();
        }
    }, delay);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Initialize animations
window.addEventListener('load', () => {
    // Add active class to hero content for initial animation
    document.querySelector('.hero-content').classList.add('active');
    
    // Start typing animation with callback chain
    setTimeout(() => {
        typeWriter(heroTitle, 'Uttam Biswas', 150, () => {
            setTimeout(() => {
                typeWriter(heroSubtitle, 'AI & Machine Learning Developer', 100);
            }, 500);
        });
    }, 500);
});

// Add hover effect to skill categories
document.querySelectorAll('.skill-category').forEach(category => {
    category.addEventListener('mousemove', (e) => {
        const rect = category.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        category.style.setProperty('--mouse-x', `${x}px`);
        category.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Add active state to navigation links based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const currentScroll = window.pageYOffset;
        
        if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
            const targetLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
            navLinks.forEach(link => link.classList.remove('active'));
            if (targetLink) targetLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
updateActiveNavLink(); 