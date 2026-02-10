class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                .footer {
                    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
                }
                .social-icon {
                    transition: transform 0.3s ease, color 0.3s ease;
                }
                .social-icon:hover {
                    transform: translateY(-3px);
                    color: #bfdbfe;
                }
            </style>
            <footer class="footer text-white py-12">
                <div class="container mx-auto px-6 md:px-12">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div>
                            <h3 class="text-2xl font-bold mb-4">Lucas<span class="text-blue-200">.Fullstack</span></h3>
                            <p class="text-blue-100 mb-6">Soluções Full Stack para otimizar e automatizar seus processos de negócio.</p>
                            <div class="flex space-x-4">
                                <a href="https://www.linkedin.com/in/lucas-alcantara-mina-capelli-63a5b420b/" target="_blank" rel="noopener noreferrer" class="social-icon text-white hover:text-blue-200">
                                    <i data-feather="linkedin"></i>
                                </a>
                                <a href="https://github.com/lucascapelli" target="_blank" rel="noopener noreferrer" class="social-icon text-white hover:text-blue-200">
                                    <i data-feather="github"></i>
                                </a>
                                <a href="https://www.instagram.com/lucas.fullstack/?next=%2Fluscapelli%2F" target="_blank" rel="noopener noreferrer" class="social-icon text-white hover:text-blue-200">
                                    <i data-feather="instagram"></i>
                                </a>
                                <a href="https://www.facebook.com/profile.php?id=61585609077657&locale=pt_BR" target="_blank" rel="noopener noreferrer" class="social-icon text-white hover:text-blue-200">
                                    <i data-feather="facebook"></i>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold mb-4">Links Rápidos</h4>
                            <ul class="space-y-2">
                                <li><a href="#about" class="text-blue-100 hover:text-white transition">Sobre</a></li>
                                <li><a href="#services" class="text-blue-100 hover:text-white transition">Serviços</a></li>
                                <li><a href="#contact" class="text-blue-100 hover:text-white transition">Contato</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold mb-4">Contato</h4>
                            <ul class="space-y-2">
                                <li class="flex items-center">
                                    <i data-feather="mail" class="w-5 h-5 mr-2"></i>
                                    <span class="text-blue-100">alcantaraminacapellilucas@gmail.com</span>
                                </li>
                                <li class="flex items-center">
                                    <i data-feather="phone" class="w-5 h-5 mr-2"></i>
                                    <span class="text-blue-100">+55 (11) 94943-8693</span>
                                </li>
                                <li class="flex items-center">
                                    <i data-feather="map-pin" class="w-5 h-5 mr-2"></i>
                                    <span class="text-blue-100">São Paulo, Brasil</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        `;
        feather.replace();
    }
}

customElements.define('custom-footer', CustomFooter);