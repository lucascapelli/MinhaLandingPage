class CustomHero extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                .hero {
                    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
                }
                .hero-content {
                    animation: fadeInUp 0.8s ease-out;
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            </style>
            <section class="hero text-white pt-32 pb-20 md:pt-40 md:pb-28">
                <div class="container mx-auto px-6 md:px-12">
                    <div class="hero-content max-w-3xl">
                        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Resolvendo os desafios do seu negócio com <span class="text-blue-200">tecnologia Full Stack</span></h1>
                        <p class="text-xl md:text-2xl text-blue-100 mb-8">Soluções especializadas em resolver seus problemas operacionais através de automação, integração de sistemas e desenvolvimento de software customizado.</p>
                        <div class="flex flex-col sm:flex-row gap-4">
                            <a href="#contact" class="bg-white text-blue-800 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg text-center transition duration-300">
                                Fale comigo
                            </a>
                            <a href="#services" class="border-2 border-white hover:bg-white hover:bg-opacity-10 font-medium py-3 px-8 rounded-lg text-center transition duration-300">
                                Meus serviços
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        `;
        feather.replace();
    }
}

customElements.define('custom-hero', CustomHero);