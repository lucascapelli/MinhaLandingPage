class PortfolioCarousel extends HTMLElement {
    connectedCallback() {
        const projects = JSON.parse(this.getAttribute('projects') || '[]');
        
        if (projects.length === 0) return;

        let currentIndex = 0;
        let autoplayInterval = null;

        this.innerHTML = `
            <style>
                .carousel-container {
                    position: relative;
                    overflow: hidden;
                    border-radius: 1.5rem;
                }
                
                .carousel-wrapper {
                    display: flex;
                    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    will-change: transform;
                }
                
                .carousel-slide {
                    min-width: 100%;
                    padding: 2rem;
                }

                .project-card {
                    background: white;
                    border-radius: 1.25rem;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .project-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                }

                .project-image {
                    width: 100%;
                    height: 280px;
                    background: linear-gradient(135deg, #0b1224 0%, #1e3a8a 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1.25rem;
                }

                .project-image.gradient-1 {
                    background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15), transparent 40%),
                                linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
                }

                .project-image.gradient-2 {
                    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12), transparent 45%),
                                linear-gradient(135deg, #1f1135 0%, #5b21b6 100%);
                }

                .project-image.gradient-3 {
                    background: radial-gradient(circle at 25% 25%, rgba(255,255,255,0.14), transparent 40%),
                                linear-gradient(135deg, #0b2f26 0%, #0f766e 100%);
                }

                .project-image.gradient-4 {
                    background: radial-gradient(circle at 35% 35%, rgba(255,255,255,0.13), transparent 45%),
                                linear-gradient(135deg, #2d0b0b 0%, #b91c1c 100%);
                }

                .mock-window {
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.06);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 1rem;
                    backdrop-filter: blur(2px);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.25);
                    display: flex;
                    flex-direction: column;
                    padding: 1rem 1.25rem;
                    gap: 0.85rem;
                }

                .mock-header {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.35);
                    box-shadow: 0 0 0 1px rgba(0,0,0,0.08);
                }

                .dot.red { background: #f87171; }
                .dot.yellow { background: #fbbf24; }
                .dot.green { background: #34d399; }

                .mock-title {
                    color: rgba(255,255,255,0.9);
                    font-weight: 700;
                    font-size: 0.95rem;
                    margin-left: 0.35rem;
                    letter-spacing: 0.01em;
                }

                .mock-body {
                    display: flex;
                    flex-direction: column;
                    gap: 0.6rem;
                }

                .bar {
                    height: 12px;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.18);
                    backdrop-filter: blur(2px);
                }

                .bar.thick {
                    height: 16px;
                    background: rgba(255,255,255,0.22);
                }

                .bars-row {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 0.5rem;
                }

                .pill {
                    height: 34px;
                    border-radius: 0.9rem;
                    background: linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.28));
                    border: 1px solid rgba(255,255,255,0.16);
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
                }

                .project-content {
                    padding: 2rem;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .project-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #1e3a8a;
                    margin-bottom: 0.75rem;
                }

                .project-description {
                    color: #4b5563;
                    margin-bottom: 1.5rem;
                    flex: 1;
                    line-height: 1.6;
                }

                .project-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                }

                .tag {
                    background: #eff6ff;
                    color: #1e3a8a;
                    padding: 0.375rem 0.875rem;
                    border-radius: 9999px;
                    font-size: 0.875rem;
                    font-weight: 500;
                }

                .project-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: linear-gradient(to right, #1e40af, #4f46e5);
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    text-decoration: none;
                    font-weight: 600;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    width: fit-content;
                }

                .project-link:hover {
                    transform: translateX(5px);
                    box-shadow: 0 10px 20px rgba(30, 64, 175, 0.3);
                }

                .carousel-indicators {
                    position: absolute;
                    bottom: 1rem;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 0.5rem;
                    z-index: 10;
                }

                .dot {
                    width: 0.75rem;
                    height: 0.75rem;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .dot.active {
                    background: white;
                    width: 1.5rem;
                    border-radius: 9999px;
                }

                .carousel-container:hover .dot {
                    opacity: 1;
                }

                @media (max-width: 768px) {
                    .carousel-slide {
                        padding: 1rem;
                    }

                    .project-content {
                        padding: 1.5rem;
                    }

                }
            </style>

            <div class="carousel-container bg-gradient-to-b from-gray-50 to-white">
                <div class="carousel-wrapper">
                    ${projects.map((project, index) => `
                        <div class="carousel-slide">
                            <div class="project-card">
                                <div class="project-image gradient-${(index % 4) + 1}">
                                    <div class="mock-window">
                                        <div class="mock-header">
                                            <span class="dot red"></span>
                                            <span class="dot yellow"></span>
                                            <span class="dot green"></span>
                                            <span class="mock-title">${project.title}</span>
                                        </div>
                                        <div class="mock-body">
                                            <div class="bar thick"></div>
                                            <div class="bar"></div>
                                            <div class="bars-row">
                                                <div class="pill"></div>
                                                <div class="pill"></div>
                                                <div class="pill"></div>
                                            </div>
                                            <div class="bar"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="project-content">
                                    <h3 class="project-title">${project.title}</h3>
                                    <p class="project-description">${project.description}</p>
                                    <div class="project-tags">
                                        ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                                    </div>
                                    ${project.link ? `
                                        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">
                                            Ver projeto
                                            <i data-feather="external-link" style="width: 1rem; height: 1rem;"></i>
                                        </a>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="carousel-indicators">
                    ${projects.map((_, index) => `
                        <button class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
                    `).join('')}
                </div>
            </div>
        `;

        feather.replace();

        const wrapper = this.querySelector('.carousel-wrapper');
        const dots = this.querySelectorAll('.dot');
        const container = this.querySelector('.carousel-container');

        const updateCarousel = () => {
            wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % projects.length;
            updateCarousel();
            resetAutoplay();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + projects.length) % projects.length;
            updateCarousel();
            resetAutoplay();
        };

        const goToSlide = (index) => {
            currentIndex = index;
            updateCarousel();
            resetAutoplay();
        };

        const startAutoplay = () => {
            autoplayInterval = setInterval(nextSlide, 6000);
        };

        const stopAutoplay = () => {
            if (autoplayInterval) clearInterval(autoplayInterval);
        };

        const resetAutoplay = () => {
            stopAutoplay();
            startAutoplay();
        };

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });

        // Swipe / drag support
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;

        const setSliderPosition = () => {
            wrapper.style.transform = `translateX(${currentTranslate}px)`;
        };

        const pointerDown = (clientX) => {
            isDragging = true;
            startX = clientX;
            prevTranslate = -currentIndex * container.clientWidth;
            stopAutoplay();
            wrapper.style.transition = 'none';
        };

        const pointerMove = (clientX) => {
            if (!isDragging) return;
            const delta = clientX - startX;
            currentTranslate = prevTranslate + delta;
            setSliderPosition();
        };

        const pointerUp = (clientX) => {
            if (!isDragging) return;
            isDragging = false;
            const delta = clientX - startX;
            const threshold = container.clientWidth * 0.15;

            if (delta < -threshold) {
                nextSlide();
            } else if (delta > threshold) {
                prevSlide();
            } else {
                updateCarousel();
            }

            wrapper.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            resetAutoplay();
        };

        // Mouse events
        container.addEventListener('mousedown', (e) => pointerDown(e.clientX));
        container.addEventListener('mousemove', (e) => pointerMove(e.clientX));
        container.addEventListener('mouseup', (e) => pointerUp(e.clientX));
        container.addEventListener('mouseleave', () => { if (isDragging) pointerUp(startX); });

        // Touch events
        container.addEventListener('touchstart', (e) => pointerDown(e.touches[0].clientX), { passive: true });
        container.addEventListener('touchmove', (e) => pointerMove(e.touches[0].clientX), { passive: true });
        container.addEventListener('touchend', (e) => pointerUp(e.changedTouches[0].clientX));

        startAutoplay();
    }
}

customElements.define('portfolio-carousel', PortfolioCarousel);
