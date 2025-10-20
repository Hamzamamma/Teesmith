// ==========================================
// ABOUT US PAGE - POSITIVUS
// ==========================================

(function() {
    'use strict';

    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active')
                ? 'rotate(45deg) translate(5px, 5px)'
                : 'none';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active')
                ? 'rotate(-45deg) translate(7px, -6px)'
                : 'none';
        });

        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.value-card, .different-item, .timeline-item, .stat-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // ==========================================
    // COUNTER ANIMATION
    // ==========================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.dataset.suffix || '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.dataset.suffix || '');
            }
        }, 16);
    }

    // Anima i counter quando entrano in viewport
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const number = entry.target.querySelector('.stat-number, .stat-box-number');
                if (number) {
                    const text = number.textContent.trim();
                    const value = parseInt(text.replace(/\D/g, ''));
                    const suffix = text.replace(/\d/g, '');

                    number.dataset.suffix = suffix;
                    number.textContent = '0' + suffix;

                    setTimeout(() => {
                        animateCounter(number, value);
                    }, 200);

                    entry.target.classList.add('counted');
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item, .stat-box-item').forEach(stat => {
        counterObserver.observe(stat);
    });

    // ==========================================
    // SMOOTH SCROLL
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
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

    // ==========================================
    // HEADER SCROLL EFFECT
    // ==========================================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }

        lastScroll = currentScroll;
    });

    // ==========================================
    // TIMELINE ANIMATION
    // ==========================================
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transition = 'all 0.6s ease';

        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }

        timelineObserver.observe(item);
    });

    // ==========================================
    // PARALLAX EFFECT
    // ==========================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const decorationCircle = document.querySelector('.decoration-circle');

        if (decorationCircle) {
            decorationCircle.style.transform = `translate(-50%, -50%) scale(${1 + scrolled * 0.0005})`;
        }

        // Parallax per hero background
        const heroSection = document.querySelector('.about-hero');
        if (heroSection) {
            const offset = scrolled * 0.5;
            heroSection.style.backgroundPosition = `center ${offset}px`;
        }
    });

    // ==========================================
    // VALUE CARDS STAGGER ANIMATION
    // ==========================================
    const valueCards = document.querySelectorAll('.value-card');

    const valueObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });

    valueCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        valueObserver.observe(card);
    });

    // ==========================================
    // STATS BOX ANIMATION
    // ==========================================
    const statsBox = document.querySelector('.stats-box');

    if (statsBox) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.stat-box-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.5 });

        const statBoxItems = statsBox.querySelectorAll('.stat-box-item');
        statBoxItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            item.style.transition = 'all 0.5s ease';
        });

        statsObserver.observe(statsBox);
    }

    // ==========================================
    // ADD ACTIVE CLASS TO NAV ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navLink) {
                    document.querySelectorAll('.nav-menu a').forEach(link => {
                        link.classList.remove('active');
                    });
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    // ==========================================
    // PERFORMANCE: DEBOUNCE
    // ==========================================
    function debounce(func, wait = 10) {
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

    window.addEventListener('scroll', debounce(() => {
        // Eventuali funzioni scroll ottimizzate
    }, 10));

    // ==========================================
    // LOADING ANIMATION
    // ==========================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');

        // Trigger initial animations
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description');
            heroElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 150);
            });
        }, 100);
    });

    // ==========================================
    // CONSOLE MESSAGE
    // ==========================================
    console.log('%c🚀 About Us - Positivus', 'font-size: 20px; color: #B9FF66; background: #191A23; padding: 10px;');
    console.log('%cDesigned & Developed with ❤️', 'font-size: 14px; color: #191A23;');

})();
