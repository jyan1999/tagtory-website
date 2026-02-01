/**
 * Tagtory Website Scripts
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initFAQAccordion();
    initMobileMenu();
    initSmoothScroll();
    initThemeToggle();
    initScreenshotCarousel();
});

/**
 * FAQ Accordion
 */
function initFAQAccordion() {
    const questions = document.querySelectorAll('.faq-question');

    questions.forEach(function(question) {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = this.classList.contains('active');

            // Close all other answers
            questions.forEach(function(q) {
                if (q !== question) {
                    q.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current answer
            if (!isOpen) {
                this.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                this.classList.remove('active');
                answer.style.maxHeight = null;
            }
        });
    });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                // Account for fixed nav height
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Hero Screenshot Rotation
 */
function initScreenshotCarousel() {
    const screenshots = document.querySelectorAll('.hero-screenshot');
    const captions = document.querySelectorAll('.hero-caption');

    if (screenshots.length <= 1) return;

    let currentIndex = 0;

    // Rotate every 5 seconds
    setInterval(function() {
        screenshots[currentIndex].classList.remove('active');
        if (captions[currentIndex]) {
            captions[currentIndex].classList.remove('active');
        }

        currentIndex = (currentIndex + 1) % screenshots.length;

        screenshots[currentIndex].classList.add('active');
        if (captions[currentIndex]) {
            captions[currentIndex].classList.add('active');
        }
    }, 5000);
}

/**
 * Theme Toggle (Light/Dark Mode)
 */
function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    // Check for saved preference or default to system
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    toggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme;

        if (currentTheme === 'dark') {
            newTheme = 'light';
        } else if (currentTheme === 'light') {
            newTheme = 'dark';
        } else {
            // No manual theme set, check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            newTheme = prefersDark ? 'light' : 'dark';
        }

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}
