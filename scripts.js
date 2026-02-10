document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const mobileMenu = document.querySelector('#mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                }
                
                // Smooth scroll com easing customizado
                const startPosition = window.scrollY;
                const targetPosition = targetElement.offsetTop - 80;
                const distance = targetPosition - startPosition;
                const duration = 1200; // 1.2s para mais suavidade
                let start = null;

                function easeInOutCubic(t) {
                    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                }

                function animateScroll(timestamp) {
                    if (!start) start = timestamp;
                    const elapsed = timestamp - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const ease = easeInOutCubic(progress);
                    
                    window.scrollTo(0, startPosition + distance * ease);
                    
                    if (progress < 1) {
                        requestAnimationFrame(animateScroll);
                    }
                }

                requestAnimationFrame(animateScroll);
            }
        });
    });

    // Add animation to sections when they come into view
    const sections = document.querySelectorAll('main > section');

    const setupDesktopAnimations = () => {
        // Evita flicker: só marca para animar quem ainda não está visível
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 50) {
                section.classList.add('fade-in');
            } else {
                section.classList.add('will-animate');
            }
        });

        const animateOnScroll = () => {
            sections.forEach(section => {
                if (!section.classList.contains('will-animate')) return;
                const sectionTop = section.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (sectionTop < windowHeight - 50) {
                    section.classList.add('fade-in');
                }
            });
        };

        // Initial check
        animateOnScroll();

        // Check on scroll with debounce para melhor performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(animateOnScroll, 50);
        });
    };

    const setupMobileAnimations = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 50) {
                section.classList.add('fade-in');
            } else {
                section.classList.add('mobile-will-animate');
            }
        });

        const animateOnScroll = () => {
            sections.forEach(section => {
                if (!section.classList.contains('mobile-will-animate')) return;
                const sectionTop = section.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (sectionTop < windowHeight - 50) {
                    section.classList.add('fade-in');
                }
            });
        };

        animateOnScroll();

        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(animateOnScroll, 50);
        });
    };

    if (window.innerWidth >= 768) {
        setupDesktopAnimations();
    } else {
        setupMobileAnimations();
    }
    
    // Check on scroll with debounce para melhor performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(animateOnScroll, 50);
    });

    // Contact form toggle
    const contactCta = document.getElementById('contact-cta');
    const contactFormContainer = document.getElementById('contact-form-container');
    const closeFormBtn = document.getElementById('close-form');
    const faleComigoBtnAttempt = contactCta.querySelector('button');

    // Listener para o botão "Fale comigo"
    if (faleComigoBtnAttempt) {
        faleComigoBtnAttempt.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que o clique suba para o pai
            contactCta.classList.remove('active');
            contactFormContainer.classList.add('active');
            
            // Smooth scroll para o formulário (calcula posição após exibir)
            requestAnimationFrame(() => {
                const startPosition = window.scrollY;
                const targetRect = contactFormContainer.getBoundingClientRect();
                const targetPosition = targetRect.top + window.scrollY - 80;
                const distance = targetPosition - startPosition;
                const duration = 1200;
                let start = null;

                function easeInOutCubic(t) {
                    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                }

                function animateScroll(timestamp) {
                    if (!start) start = timestamp;
                    const elapsed = timestamp - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const ease = easeInOutCubic(progress);
                    
                    window.scrollTo(0, startPosition + distance * ease);
                    
                    if (progress < 1) {
                        requestAnimationFrame(animateScroll);
                    }
                }

                requestAnimationFrame(animateScroll);
            });
        });
    }

    closeFormBtn.addEventListener('click', () => {
        contactFormContainer.classList.remove('active');
        contactCta.classList.add('active');
    });

    // Enviar formulário via WhatsApp
    const contactForm = document.querySelector('#contact-form-container form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = contactForm.querySelector('#name')?.value.trim() || 'Visitante';
            const email = contactForm.querySelector('#email')?.value.trim() || 'Não informado';
            const subject = contactForm.querySelector('#subject')?.value.trim() || 'Sem assunto';
            const message = contactForm.querySelector('#message')?.value.trim() || '';

            const phone = '5511949438693';
            const text = `Olá, sou ${name}. Assunto: ${subject}. Email: ${email}. Mensagem: ${message}`;
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

            window.open(url, '_blank');
        });
    }
});