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
                    object-fit: cover;
                    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 3rem;
                }

                .project-image.gradient-1 {
                    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
                }

                .project-image.gradient-2 {
                    background: linear-gradient(135deg, #5b21b6 0%, #a855f7 100%);
                }

                .project-image.gradient-3 {
                    background: linear-gradient(135deg, #059669 0%, #10b981 100%);
                }

                .project-image.gradient-4 {
                    background: linear-gradient(135deg, #dc2626 0%, #f87171 100%);
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

                .carousel-controls {
                    position: absolute;
                    bottom: 2rem;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 1rem;
                    z-index: 10;
                }

                .carousel-button {
                    width: 2.5rem;
                    height: 2.5rem;
                    border-radius: 50%;
                    background: white;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    transition: all 0.3s ease;
                }

                .carousel-button:hover {
                    background: #1e3a8a;
                    color: white;
                    transform: scale(1.1);
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

                .carousel-container:hover .carousel-button,
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

                    .carousel-controls {
                        bottom: 1rem;
                    }

                    .carousel-button {
                        width: 2rem;
                        height: 2rem;
                    }
                }
            </style>

            <div class="carousel-container bg-gradient-to-b from-gray-50 to-white">
                <div class="carousel-wrapper">
                    ${projects.map((project, index) => `
                        <div class="carousel-slide">
                            <div class="project-card">
                                <div class="project-image gradient-${(index % 4) + 1}">
                                    <i data-feather="${['cpu', 'zap', 'bar-chart-2', 'smartphone'][index % 4]}" style="width: 4rem; height: 4rem; color: white;"></i>
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

                <div class="carousel-controls">
                    <button class="carousel-button" id="prev-btn">
                        <i data-feather="chevron-left" style="width: 1.25rem; height: 1.25rem;"></i>
                    </button>
                    <button class="carousel-button" id="next-btn">
                        <i data-feather="chevron-right" style="width: 1.25rem; height: 1.25rem;"></i>
                    </button>
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
        const prevBtn = this.querySelector('#prev-btn');
        const nextBtn = this.querySelector('#next-btn');
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
            autoplayInterval = setInterval(nextSlide, 5000);
        };

        const stopAutoplay = () => {
            if (autoplayInterval) clearInterval(autoplayInterval);
        };

        const resetAutoplay = () => {
            stopAutoplay();
            startAutoplay();
        };

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });

        container.addEventListener('mouseenter', stopAutoplay);
        container.addEventListener('mouseleave', startAutoplay);

        startAutoplay();
    }
}

customElements.define('portfolio-carousel', PortfolioCarousel);
