// PRICING PAGE - POSITIVUS

(function() {
    'use strict';

    // MOBILE MENU
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active')
                ? 'rotate(45deg) translate(5px, 5px)' : 'none';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active')
                ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
        });
    }

    // BILLING TOGGLE (Monthly/Yearly)
    const billingSwitch = document.getElementById('billingSwitch');
    const priceAmounts = document.querySelectorAll('.amount');

    if (billingSwitch) {
        billingSwitch.addEventListener('change', function() {
            const isYearly = this.checked;

            priceAmounts.forEach(amount => {
                const monthlyPrice = amount.dataset.monthly;
                const yearlyPrice = amount.dataset.yearly;

                // Animate price change
                amount.style.opacity = '0';
                amount.style.transform = 'translateY(-10px)';

                setTimeout(() => {
                    amount.textContent = isYearly ? yearlyPrice : monthlyPrice;
                    amount.style.opacity = '1';
                    amount.style.transform = 'translateY(0)';
                }, 200);
            });
        });
    }

    // FAQ ACCORDION
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all FAQs
            faqItems.forEach(faq => faq.classList.remove('active'));

            // Open clicked FAQ if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // SCROLL ANIMATIONS
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

    const animatedElements = document.querySelectorAll('.pricing-card, .faq-item');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // SMOOTH SCROLL
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
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // HEADER SHADOW ON SCROLL
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }
    });

    // PLAN BUTTON CLICK
    const planButtons = document.querySelectorAll('.btn-plan');
    planButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const planName = this.closest('.pricing-card').querySelector('.plan-name').textContent;
            console.log(`Selected plan: ${planName}`);

            // Visual feedback
            this.textContent = 'Processing...';
            this.style.backgroundColor = 'var(--color-primary)';

            setTimeout(() => {
                this.textContent = btn.classList.contains('primary') ? 'Get Started' :
                                  planName === 'Enterprise' ? 'Contact Sales' : 'Get Started';
                this.style.backgroundColor = '';
                alert(`Thank you for choosing the ${planName} plan! We'll contact you shortly.`);
            }, 1000);
        });
    });

    console.log('%c🚀 Pricing Page - Positivus', 'font-size: 20px; color: #B9FF66; background: #191A23; padding: 10px;');
})();
