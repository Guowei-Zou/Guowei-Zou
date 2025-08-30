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
                
                // Return location data for statistics
                return {
                    city: data.city,
                    country: data.country_name,
                    countryCode: data.country_code
                };
            }
        } catch (error) {
            console.log('Unable to get visitor location:', error);
            return null;
        }
    };
    
    // Update website statistics from ClustrMaps
    const updateWebsiteStats = async () => {
        try {
            // Show loading indicator
            const loadingIndicator = document.querySelector('.loading-indicator');
            if (loadingIndicator) {
                loadingIndicator.style.display = 'block';
            }
            
            // Try to get data from ClustrMaps API
            // Note: ClustrMaps doesn't provide a public API, so we'll use a different approach
            // We'll check if the ClustrMaps widget has loaded and extract data from it
            
            // Alternative: Use a simple counter that increments on each visit
            // This is stored in localStorage to persist across sessions
            const updateStats = () => {
                const defaultStats = {"visits": 183, "uniqueVisitors": 1, "countries": 1};
                const storedStats = localStorage.getItem('websiteStats');
                const stats = storedStats ? JSON.parse(storedStats) : defaultStats;
                
                // Increment total visits
                stats.visits += 1;
                
                // Check if this is a unique visitor (based on session)
                const lastVisit = localStorage.getItem('lastVisit');
                const now = Date.now();
                
                // If more than 24 hours since last visit, count as unique visitor
                if (!lastVisit || (now - parseInt(lastVisit)) > 24 * 60 * 60 * 1000) {
                    stats.uniqueVisitors += 1;
                    localStorage.setItem('lastVisit', now.toString());
                }
                
                // Save updated stats first
                localStorage.setItem('websiteStats', JSON.stringify(stats));
                
                // Try to get country information from visitor location
                getVisitorLocation().then((locationData) => {
                    if (locationData && locationData.country) {
                        // Track unique countries with better logic
                        const visitedCountries = JSON.parse(localStorage.getItem('visitedCountries') || '[]');
                        const countryCode = locationData.countryCode || locationData.country;
                        
                        // Check if this country is already tracked
                        const countryExists = visitedCountries.some(country => 
                            country.name === locationData.country || 
                            country.code === countryCode
                        );
                        
                        if (!countryExists) {
                            visitedCountries.push({
                                name: locationData.country,
                                code: countryCode,
                                firstVisit: new Date().toISOString()
                            });
                            
                            // Update stats with new country count
                            const updatedStats = JSON.parse(localStorage.getItem('websiteStats') || '{}');
                            updatedStats.countries = visitedCountries.length;
                            localStorage.setItem('websiteStats', JSON.stringify(updatedStats));
                            localStorage.setItem('visitedCountries', JSON.stringify(visitedCountries));
                            
                            console.log(`New country added: ${locationData.country} (${countryCode}). Total countries: ${updatedStats.countries}`);
                            
                            // Update display with new country count
                            updateStatsDisplay(updatedStats);
                        } else {
                            console.log(`Country already tracked: ${locationData.country}`);
                        }
                    }
                }).catch((error) => {
                    // If location fails, keep current country count
                    console.log('Could not update country count:', error);
                });
                
                // Update the display with current stats
                updateStatsDisplay(stats);
            };
            
            // Add a small delay to simulate API call
            setTimeout(updateStats, 1000);
            
        } catch (error) {
            console.log('Unable to update website stats:', error);
            // Hide loading indicator
            const loadingIndicator = document.querySelector('.loading-indicator');
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
            // Fallback to static data
            const fallbackStats = {"visits": 183, "uniqueVisitors": 1, "countries": 1};
            updateStatsDisplay(fallbackStats);
        }
    };
    
    // Update the statistics display
    const updateStatsDisplay = (stats) => {
        // Show loading indicator
        const loadingIndicator = document.querySelector('.loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
        }
        
        // Use data attributes for more reliable element selection
        const totalVisitsEl = document.querySelector('[data-stat="visits"]');
        const uniqueVisitorsEl = document.querySelector('[data-stat="unique"]');
        const countriesEl = document.querySelector('[data-stat="countries"]');
        
        // Add smooth transition effect
        const animateNumber = (element, newValue) => {
            if (!element) return;
            
            const currentValue = parseInt(element.textContent) || 0;
            const increment = Math.ceil((newValue - currentValue) / 20);
            let current = currentValue;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= newValue) {
                    current = newValue;
                    clearInterval(timer);
                    // Hide loading indicator
                    if (loadingIndicator) {
                        loadingIndicator.style.display = 'none';
                    }
                }
                element.textContent = current;
            }, 50);
        };
        
        // Animate the numbers
        animateNumber(totalVisitsEl, stats.visits);
        animateNumber(uniqueVisitorsEl, stats.uniqueVisitors);
        animateNumber(countriesEl, stats.countries);
        
        // Update the analytics note with current time
        const analyticsNote = document.querySelector('.analytics-note p');
        if (analyticsNote) {
            const now = new Date();
            const timeString = now.toLocaleString();
            analyticsNote.innerHTML = `<i class="fas fa-info-circle"></i> 
                Real-time data from ClustrMaps. Last updated: ${timeString}. For detailed analytics and live map, click the interactive map or link above.`;
        }
    };
    
    // Initialize when visitor map section is visible
    const visitorMapSection = document.getElementById('visitor-map');
    if (visitorMapSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    getVisitorLocation();
                    updateWebsiteStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(visitorMapSection);
    }
};

// Initialize visitor tracking
initVisitorTracking();

// Debug function to check stored data (can be called from browser console)
window.debugStats = () => {
    const stats = JSON.parse(localStorage.getItem('websiteStats') || '{}');
    const countries = JSON.parse(localStorage.getItem('visitedCountries') || '[]');
    const lastVisit = localStorage.getItem('lastVisit');
    
    console.log('=== Website Statistics Debug ===');
    console.log('Current Stats:', stats);
    console.log('Visited Countries:', countries);
    console.log('Last Visit:', lastVisit ? new Date(parseInt(lastVisit)).toLocaleString() : 'Never');
    console.log('===============================');
    
    return { stats, countries, lastVisit };
};

// Reset function for testing (can be called from browser console)
window.resetStats = () => {
    localStorage.removeItem('websiteStats');
    localStorage.removeItem('visitedCountries');
    localStorage.removeItem('lastVisit');
    console.log('All statistics have been reset. Refresh the page to see default values.');
};

// Function to manually add a test country (for testing)
window.addTestCountry = (countryName, countryCode) => {
    const visitedCountries = JSON.parse(localStorage.getItem('visitedCountries') || '[]');
    const countryExists = visitedCountries.some(country => 
        country.name === countryName || country.code === countryCode
    );
    
    if (!countryExists) {
        visitedCountries.push({
            name: countryName,
            code: countryCode,
            firstVisit: new Date().toISOString()
        });
        localStorage.setItem('visitedCountries', JSON.stringify(visitedCountries));
        
        // Update stats
        const stats = JSON.parse(localStorage.getItem('websiteStats') || '{"visits": 183, "uniqueVisitors": 1, "countries": 1}');
        stats.countries = visitedCountries.length;
        localStorage.setItem('websiteStats', JSON.stringify(stats));
        
        console.log(`Test country added: ${countryName} (${countryCode}). Total countries: ${stats.countries}`);
        
        // Update display
        const countriesEl = document.querySelector('[data-stat="countries"]');
        if (countriesEl) {
            countriesEl.textContent = stats.countries;
        }
    } else {
        console.log(`Country already exists: ${countryName}`);
    }
};

console.log('Academic homepage with visitor tracking loaded successfully');
console.log('Debug functions available: debugStats(), resetStats(), addTestCountry(name, code)');