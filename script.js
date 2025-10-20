// ==========================================
// POSITIVUS - HOMEPAGE JAVASCRIPT
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

            // Anima il menu hamburger
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active')
                ? 'rotate(45deg) translate(5px, 5px)'
                : 'none';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active')
                ? 'rotate(-45deg) translate(7px, -6px)'
                : 'none';
        });

        // Chiudi il menu quando si clicca su un link
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
    // ACCORDION DEL PROCESSO DI LAVORO
    // ==========================================
    const processItems = document.querySelectorAll('.process-item');

    processItems.forEach(item => {
        const header = item.querySelector('.process-header');

        header.addEventListener('click', () => {
            // Chiudi tutti gli altri accordion
            processItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle dell'accordion corrente
            item.classList.toggle('active');
        });
    });

    // ==========================================
    // SLIDER TESTIMONIANZE
    // ==========================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;

    function showSlide(index) {
        // Nascondi tutte le testimonianze
        testimonialCards.forEach(card => {
            card.style.display = 'none';
        });

        // Rimuovi la classe active da tutti i dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Mostra la testimonianza corrente
        if (testimonialCards[index]) {
            testimonialCards[index].style.display = 'block';
        }

        // Attiva il dot corrente
        if (dots[index]) {
            dots[index].classList.add('active');
        }

        currentSlide = index;
    }

    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= testimonialCards.length) {
            next = 0;
        }
        showSlide(next);
    }

    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) {
            prev = testimonialCards.length - 1;
        }
        showSlide(prev);
    }

    // Event listeners per i pulsanti
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Event listeners per i dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Auto-play dello slider (ogni 5 secondi)
    let autoplayInterval = setInterval(nextSlide, 5000);

    // Pausa l'autoplay quando si passa il mouse sullo slider
    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });

        slider.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(nextSlide, 5000);
        });
    }

    // ==========================================
    // ANIMAZIONE SCROLL
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Osserva tutti gli elementi che devono animarsi
    const animateElements = document.querySelectorAll('.service-card, .team-card, .case-study-card, .process-item');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // ==========================================
    // SMOOTH SCROLL PER LINK DI NAVIGAZIONE
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Ignora i link vuoti (#)
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
    // HEADER STICKY CON EFFETTO SHADOW
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
    // FORM VALIDATION E SUBMIT
    // ==========================================
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Ottieni i valori del form
            const formData = {
                inquiry: document.querySelector('input[name="inquiry"]:checked')?.value,
                name: document.querySelector('#name').value,
                email: document.querySelector('#email').value,
                message: document.querySelector('#message').value
            };

            // Validazione base
            if (!formData.email || !formData.message) {
                alert('Per favore compila tutti i campi obbligatori!');
                return;
            }

            // Validazione email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Per favore inserisci un indirizzo email valido!');
                return;
            }

            // Simulazione invio (sostituisci con la tua logica di backend)
            console.log('Form inviato:', formData);

            // Feedback visivo
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Inviato! ✓';
            submitBtn.style.backgroundColor = '#B9FF66';
            submitBtn.style.color = '#191A23';

            // Reset del form
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.color = '';
            }, 3000);
        });
    }

    // ==========================================
    // NEWSLETTER FORM
    // ==========================================
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = newsletterForm.querySelector('input[type="email"]').value;

            // Validazione email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Per favore inserisci un indirizzo email valido!');
                return;
            }

            // Simulazione iscrizione
            console.log('Newsletter subscription:', email);

            // Feedback visivo
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Iscritto! ✓';
            submitBtn.style.backgroundColor = '#B9FF66';

            setTimeout(() => {
                newsletterForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        });
    }

    // ==========================================
    // ANIMAZIONE NUMERI CONTATORI (Se aggiungi statistiche)
    // ==========================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16); // 60 FPS

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // ==========================================
    // PARALLAX EFFECT SU ELEMENTI HERO
    // ==========================================
    const floatingElements = document.querySelectorAll('.floating-element');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ==========================================
    // PRELOAD IMMAGINI
    // ==========================================
    function preloadImages() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadImages();

    // ==========================================
    // PERFORMANCE: DEBOUNCE SCROLL EVENTS
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

    // Applica debounce agli eventi scroll
    window.addEventListener('scroll', debounce(() => {
        // Eventuali funzioni scroll ottimizzate
    }, 10));

    // ==========================================
    // DARK MODE TOGGLE (Opzionale)
    // ==========================================
    function initDarkMode() {
        const darkModeToggle = document.querySelector('.dark-mode-toggle');

        if (darkModeToggle) {
            // Controlla la preferenza salvata
            const darkMode = localStorage.getItem('darkMode');
            if (darkMode === 'enabled') {
                document.body.classList.add('dark-mode');
            }

            darkModeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');

                if (document.body.classList.contains('dark-mode')) {
                    localStorage.setItem('darkMode', 'enabled');
                } else {
                    localStorage.setItem('darkMode', null);
                }
            });
        }
    }

    // initDarkMode(); // Decommenta se vuoi attivare il dark mode

    // ==========================================
    // LOADING ANIMATION
    // ==========================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');

        // Rimuovi eventuali loader
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });

    // ==========================================
    // ACCESSIBILITY: SKIP TO MAIN CONTENT
    // ==========================================
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const main = document.querySelector('main') || document.querySelector('.hero');
            if (main) {
                main.setAttribute('tabindex', '-1');
                main.focus();
            }
        });
    }

    // ==========================================
    // EASTER EGG: KONAMI CODE
    // ==========================================
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    window.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-konamiPattern.length);

        if (konamiCode.join(',') === konamiPattern.join(',')) {
            // Easter egg attivato!
            document.body.style.animation = 'rainbow 2s infinite';
            console.log('🎉 Konami Code attivato! Positivus rocks!');

            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });

    // ==========================================
    // CONSOLE MESSAGE
    // ==========================================
    console.log('%c🚀 Positivus Homepage', 'font-size: 20px; color: #B9FF66; background: #191A23; padding: 10px;');
    console.log('%cDesigned & Developed with ❤️', 'font-size: 14px; color: #191A23;');

})();

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Set cookie
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}
