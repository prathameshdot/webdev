/*
==========================================================================
                          Sangam Website
                         Interactive JavaScript Controller
==========================================================================
*/

// Deferred DOM variables (will be assigned in cacheDOM())
let toggleBtn, themeIcon, mobileToggleBtn, mobileThemeIcon;
let bodyEl, navLinks, mobileMenuBtn, closeMobileMenuBtn, mobileNavOverlay, mobileNavDrawer, mobileNavLinks;
let contactForm, serviceCards;
let testimonialsContainer, dots, prevBtn, nextBtn, slides, totalSlides;
let eyeTestModal, lineButtons, testResult, resultText;
let currentSlide = 0;

/*
==========================================================================
                            DOM CACHE & INIT
==========================================================================
*/

function cacheDOM() {
    bodyEl = document.body;
    toggleBtn = document.getElementById('toggleTheme');
    themeIcon = document.getElementById('theme-icon');
    mobileToggleBtn = document.getElementById('mobileToggleTheme');
    mobileThemeIcon = document.getElementById('mobile-theme-icon');

    navLinks = document.querySelectorAll('.nav-link');
    mobileMenuBtn = document.getElementById('mobileMenuBtn');
    closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
    mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    mobileNavDrawer = document.querySelector('.mobile-nav-drawer');
    mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    contactForm = document.getElementById('contact-form');
    serviceCards = document.querySelectorAll('.service-card');

    testimonialsContainer = document.querySelector('.testimonials-container');
    dots = document.querySelectorAll('.dot');
    prevBtn = document.querySelector('.prev-btn');
    nextBtn = document.querySelector('.next-btn');
    slides = document.querySelectorAll('.testimonial');
    totalSlides = slides.length;

    eyeTestModal = document.getElementById('eyeTestModal');
    lineButtons = document.querySelectorAll('.line-btn');
    testResult = document.getElementById('testResult');
    resultText = document.getElementById('resultText');
}

function initializeWebsite() {
    // cache DOM after components are injected
    cacheDOM();

    initNavbarScroll();
    initMobileNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initServiceCards();
    initFormValidation();
    initTestimonialsCarousel();

    // Load JSON content to populate text and images
    fetchContentAndPopulate();
}

// expose initializer for index.html loader
window.initializeWebsite = initializeWebsite;

/*
==========================================================================
                           THEME MANAGEMENT MODULE
==========================================================================
*/

/**
 * Initialize theme based on user preference or system setting
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        savedTheme === 'dark' ? enableDarkMode() : enableLightMode();
    } else if (prefersDark) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
}

/**
 * Enable dark theme mode
 */
function enableDarkMode() {
    if (!bodyEl) cacheDOM();
    bodyEl.classList.add('dark');
    if (themeIcon) themeIcon.className = 'fas fa-sun';
    if (mobileThemeIcon) mobileThemeIcon.className = 'fas fa-sun';
    localStorage.setItem('theme', 'dark');
}

/**
 * Enable light theme mode
 */
function enableLightMode() {
    if (!bodyEl) cacheDOM();
    bodyEl.classList.remove('dark');
    if (themeIcon) themeIcon.className = 'fas fa-moon';
    if (mobileThemeIcon) mobileThemeIcon.className = 'fas fa-moon';
    localStorage.setItem('theme', 'light');
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
    if (!bodyEl) cacheDOM();
    bodyEl.classList.contains('dark') ? enableLightMode() : enableDarkMode();
}

/*
==========================================================================
                        SMOOTH SCROLLING MODULE
==========================================================================
*/

/**
 * Smooth scroll to specific section
 * @param {string} sectionId - The ID of the section to scroll to
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 100;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
}

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    if (!navLinks || navLinks.length === 0) return;
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection(link.getAttribute('href').substring(1));
        });
    });
}

/*
==========================================================================
                        SCROLL ANIMATIONS MODULE
==========================================================================
*/

/**
 * Initialize scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.glass, .feature, .team-member, .tech-item, .stat-item, .action-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

/*
==========================================================================
                         NAVBAR SCROLL MODULE
==========================================================================
*/

/**
 * Initialize navbar scroll behavior - adds/removes scrolled class
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/*
==========================================================================
                         SERVICE CARDS MODULE
==========================================================================
*/

/**
 * Initialize service card toggle functionality
 */
function initServiceCards() {
    if (!serviceCards) return;
    serviceCards.forEach(card => {
        const btn = card.querySelector('.service-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                card.classList.toggle('active');
            });
        }
    });
}

/*
==========================================================================
                      TESTIMONIALS CAROUSEL MODULE
==========================================================================
*/

function updateCarousel() {
    if (!testimonialsContainer) return;
    testimonialsContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    if (!slides || slides.length === 0) return;
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    if (!slides || slides.length === 0) return;
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
}

function initTestimonialsCarousel() {
    if (!nextBtn || !prevBtn) return;
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentSlide = parseInt(dot.dataset.slide);
            updateCarousel();
        });
    });

    // Auto-play carousel
    setInterval(nextSlide, 5000);
}

/*
==========================================================================
                         EYE TEST MODAL MODULE
==========================================================================
*/

/**
 * Open the eye test modal
 */
function openEyeTest() {
    if (!eyeTestModal) return;
    eyeTestModal.style.display = 'block';
}

/**
 * Close the eye test modal and hide results
 */
function closeEyeTest() {
    if (!eyeTestModal) return;
    eyeTestModal.style.display = 'none';
    if (testResult) testResult.style.display = 'none';
}

/**
 * Initialize eye test modal functionality
 */
function initEyeTestModal() {
    if (!lineButtons) return;
    lineButtons.forEach(button => {
        button.addEventListener('click', () => {
            const line = parseInt(button.dataset.line);
            let result;

            if (line >= 6) {
                result = "Your vision seems good, but regular check-ups are important.";
            } else if (line >= 4) {
                result = "You may have some vision difficulty. We recommend a professional exam.";
            } else {
                result = "It seems you have significant vision difficulty. Please book an appointment for a comprehensive eye exam.";
            }

            if (resultText) resultText.textContent = result;
            if (testResult) testResult.style.display = 'block';
        });
    });

    // Close modal on outside click
    window.onclick = function(event) {
        if (event.target == eyeTestModal) {
            closeEyeTest();
        }
    }
}

/*
==========================================================================
                        FORM VALIDATION MODULE
==========================================================================
*/

/**
 * Initialize contact form validation and WhatsApp integration
 */
function initFormValidation() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', e => {
        e.preventDefault();

        // Get form data
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const preferredDate = document.getElementById('preferredDate').value;
        const preferredTime = document.getElementById('preferredTime').value;
        const message = document.getElementById('message').value.trim();

        // Validate required fields
        if (!firstName || !lastName || !email || !service) {
            alert('Please fill in all required fields (*).');
            return;
        }

        // Format message for WhatsApp
        const fullMessage = `
Hello Sangam, I would like to book an appointment.

*Name:* ${firstName} ${lastName}
*Email:* ${email}
*Phone:* ${phone || 'Not provided'}
*Service:* ${service}
*Preferred Date:* ${preferredDate || 'Not specified'}
*Preferred Time:* ${preferredTime || 'Not specified'}
*Additional Info:* ${message || 'None'}
        `.trim().replace(/\n\s*\n/g, '\n'); // Clean up extra blank lines

        // Open WhatsApp
        const whatsappNumber = '919999999999'; // Replace with real number
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;

        window.open(whatsappUrl, '_blank');

        alert('You will be redirected to WhatsApp to send your appointment request. Please press send in WhatsApp.');
        contactForm.reset();
    });
}

/*
==========================================================================
                       MOBILE NAVIGATION MODULE
==========================================================================
*/

/**
 * Open mobile navigation menu
 */
function openMobileMenu() {
    if (!mobileNavOverlay || !mobileNavDrawer) return;
    mobileNavOverlay.classList.add('active');
    mobileNavDrawer.classList.add('active');
    if (bodyEl) bodyEl.style.overflow = 'hidden';
}

/**
 * Close mobile navigation menu
 */
function closeMobileMenu() {
    if (!mobileNavOverlay || !mobileNavDrawer) return;
    mobileNavOverlay.classList.remove('active');
    mobileNavDrawer.classList.remove('active');
    if (bodyEl) bodyEl.style.overflow = '';
}

/**
 * Initialize mobile navigation functionality
 */
function initMobileNavigation() {
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
    if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
    if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileMenu);

    if (mobileToggleBtn) {
        mobileToggleBtn.addEventListener('click', toggleTheme);
    }

    if (mobileNavLinks) {
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
                scrollToSection(link.getAttribute('href').substring(1));
            });
        });
    }
}

/*
==========================================================================
                       CONTENT JSON LOADING
==========================================================================
*/

async function fetchContentAndPopulate() {
    try {
        const res = await fetch('data/content.json');
        if (!res.ok) throw new Error('Failed to load content.json');
        const data = await res.json();
        
        console.log('Content loaded successfully:', data);

        // Hero - Update if data exists
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroTitle && data.hero && data.hero.title) {
            heroTitle.textContent = data.hero.title;
            console.log('Hero title updated');
        }
        if (heroSubtitle && data.hero && data.hero.subtitle) {
            heroSubtitle.textContent = data.hero.subtitle;
            console.log('Hero subtitle updated');
        }

        // Hero Stats - Update if data exists
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats && data.hero && data.hero.stats) {
            heroStats.innerHTML = data.hero.stats.map(stat => `
                <div class="stat">
                    <h3>${stat.value}</h3>
                    <p>${stat.label}</p>
                </div>
            `).join('');
            console.log('Hero stats updated');
        }

        // About
        const aboutHeading = document.querySelector('.about .about-info h3');
        const aboutParas = document.querySelectorAll('.about .about-info p');
        if (aboutHeading && data.about && data.about.heading) aboutHeading.textContent = data.about.heading;
        if (aboutParas && data.about && data.about.paragraphs) {
            aboutParas.forEach((p, i) => { if (data.about.paragraphs[i]) p.textContent = data.about.paragraphs[i]; });
        }

        // Contact (address, phone, email)
        if (data.contact) {
            const addrEl = document.querySelector('#contact .info-content p');
            const phoneEl = document.querySelector('#contact .primary-phone');
            const emailEls = document.querySelectorAll('#contact .info-content p');
            const getDirections = document.querySelector('#contact .get-directions');
            const hoursList = document.querySelector('#contact .hours-list');
            const badgesContainer = document.querySelector('.contact-badges');
            
            if (addrEl && data.contact.address) addrEl.innerHTML = data.contact.address.replace(/\n/g, '<br>');
            if (phoneEl && data.contact.primaryPhone) phoneEl.textContent = data.contact.primaryPhone;
            if (getDirections && data.contact.directionsLink) getDirections.href = data.contact.directionsLink;
            
            if (hoursList && data.contact.hours) {
                hoursList.innerHTML = data.contact.hours.map(hour => `
                    <div class="hour-item">
                        <span>${hour.days}</span>
                        <span>${hour.time}</span>
                    </div>
                `).join('');
            }
            
            if (badgesContainer && data.contact.badges) {
                badgesContainer.innerHTML = data.contact.badges.map(badge => `
                    <span class="contact-badge">
                        <i class="${badge.icon}"></i> ${badge.text}
                    </span>
                `).join('');
            }
        }

        // Services - map JSON services to existing cards by data-service attribute
        if (data.services && Array.isArray(data.services)) {
            data.services.forEach(svc => {
                const card = document.querySelector(`.service-card[data-service="${svc.id}"]`);
                if (card) {
                    const h3 = card.querySelector('h3');
                    const p = card.querySelector('p');
                    const price = card.querySelector('.service-price');
                    const list = card.querySelector('.service-details ul');
                    if (h3 && svc.title) h3.textContent = svc.title;
                    if (p && svc.description) p.textContent = svc.description;
                    if (price && svc.price) price.textContent = svc.price;
                    if (list && svc.items) {
                        list.innerHTML = svc.items.map(i => `<li>${i}</li>`).join('');
                    }
                }
            });
        }

        // Gallery / hero images - if provided, set background or image tags
        if (data.gallery && Array.isArray(data.gallery)) {
            const heroSection = document.querySelector('.hero');
            if (heroSection && data.gallery[0]) {
                heroSection.style.background = `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${data.gallery[0]}) center/cover no-repeat`;
            }
        }

    } catch (err) {
        console.warn('Could not load content.json', err);
    }
}

/*
==========================================================================
                      APPLICATION INITIALIZATION
==========================================================================
*/

/**
 * Initialize all application modules when DOM is loaded
 */
function initializeApp() {
    // Core functionality
    initTheme();
    initSmoothScrolling();
    initScrollAnimations();
    initNavbarScroll();
    
    // Interactive features
    initServiceCards();
    initTestimonialsCarousel();
    initEyeTestModal();
    initFormValidation();
    initMobileNavigation();
    
    // Initial UI state
    updateCarousel();
    
    // Theme toggle event listeners
    toggleBtn.addEventListener('click', toggleTheme);
}

/*
==========================================================================
                          EVENT LISTENERS
==========================================================================
*/

// Initialize app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);
