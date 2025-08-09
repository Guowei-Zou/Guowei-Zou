// Academic Homepage Script - Minimal and Clean

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Simple navbar scroll effect
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add shadow when scrolled
    if (currentScrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScrollY = currentScrollY;
});

// Mobile menu toggle (if needed for responsive design)
const mobileMenuToggle = () => {
    const navMenu = document.querySelector('.nav-menu');
    const burger = document.querySelector('.burger');
    
    if (burger) {
        burger.addEventListener('click', () => {
            navMenu.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }
};

// Initialize mobile menu
mobileMenuToggle();

// Add active nav link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        if (sectionTop <= 150 && sectionTop + sectionHeight > 150) {
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

// Simple fade-in animation for content (minimal)
const observeElements = () => {
    const elements = document.querySelectorAll('.project, .research-item, .experience-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// Initialize fade-in animation
observeElements();

// Print-friendly styles
const addPrintStyles = () => {
    const printStyles = `
        @media print {
            .header { position: static !important; box-shadow: none !important; }
            .nav-menu { display: none !important; }
            .footer { display: none !important; }
            * { color: black !important; background: white !important; }
            .project, .research-item, .experience-item { 
                break-inside: avoid; 
                page-break-inside: avoid; 
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = printStyles;
    document.head.appendChild(style);
};

// Add print styles
addPrintStyles();

// Simple email protection (basic)
const protectEmail = () => {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Could add email protection logic here if needed
        });
    });
};

protectEmail();

// Accessibility improvements
const addA11yFeatures = () => {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #3498db;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 1001;
        border-radius: 4px;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add keyboard navigation for project images
    const images = document.querySelectorAll('.project-media img, .project-media video');
    images.forEach(img => {
        img.setAttribute('tabindex', '0');
        img.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                img.click();
            }
        });
    });
};

addA11yFeatures();

// Visitor location and statistics functionality
const initVisitorTracking = () => {
    // Get visitor location using IP geolocation API
    const getVisitorLocation = async () => {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            if (data.city && data.country_name) {
                const locationElement = document.getElementById('visitor-location');
                if (locationElement) {
                    locationElement.textContent = `${data.city}, ${data.country_name}`;
                }
            }
        } catch (error) {
            console.log('Unable to get visitor location:', error);
        }
    };
    
    // ClustrMaps provides its own statistics, so we don't need to simulate data
    
    // Initialize when visitor map section is visible
    const visitorMapSection = document.getElementById('visitor-map');
    if (visitorMapSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    getVisitorLocation();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(visitorMapSection);
    }
};

// Initialize visitor tracking
initVisitorTracking();

console.log('Academic homepage with visitor tracking loaded successfully');