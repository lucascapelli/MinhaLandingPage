class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                .navbar {
                    transition: all 0.3s ease;
                }
                .navbar.scrolled {
                    background-color: white;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .navbar.scrolled .navbar-text {
                    color: #1e40af !important;
                }
                .navbar.scrolled .navbar-text span {
                    color: #4f46e5 !important;
                }
                .navbar.scrolled .nav-link {
                    color: #374151 !important;
                }
                .navbar.scrolled .nav-link:hover {
                    color: #1e40af !important;
                }
                .navbar.scrolled #mobile-menu-button {
                    color: #1e40af !important;
                }
                .navbar.scrolled .mobile-menu a {
                    color: #374151 !important;
                }
                .nav-link {
                    position: relative;
                }
                .nav-link:after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: 0;
                    left: 0;
                    background-color: #3b82f6;
                    transition: width 0.3s ease;
                }
                .nav-link:hover:after {
                    width: 100%;
                }
                .mobile-menu {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease-out;
                }
                .mobile-menu.open {
                    max-height: 500px;
                }
            </style>
            <!-- ⚠️ NÃO MEXER NESSA LINHA! A COR PRECISA SER EXATAMENTE bg-#1e3a8a -->
            <nav class="navbar fixed w-full z-50 bg-#1e3a8a md:bg-transparent py-4 px-6 md:px-12">
                <div class="container mx-auto flex justify-between items-center">
                    <a href="#" class="text-2xl font-bold text-white md:text-white navbar-text">Lucas<span class="text-blue-100 md:text-blue-200">fullstack</span></a>
                    <!-- Desktop Navigation -->
                    <div class="hidden md:flex space-x-8">
                        <a href="#about" class="nav-link text-gray-700 md:text-white hover:text-blue-800 md:hover:text-blue-200">Sobre</a>
                        <a href="#portfolio" class="nav-link text-gray-700 md:text-white hover:text-blue-800 md:hover:text-blue-200">Portfólio</a>
                        <a href="#services" class="nav-link text-gray-700 md:text-white hover:text-blue-800 md:hover:text-blue-200">Serviços</a>
                        <a href="#contact" class="nav-link text-gray-700 md:text-white hover:text-blue-800 md:hover:text-blue-200">Contato</a>
                    </div>
                    <!-- Mobile Menu Button -->
                    <button id="mobile-menu-button" class="md:hidden text-white focus:outline-none">
                        <i data-feather="menu"></i>
                    </button>
                </div>
                <!-- Mobile Navigation -->
                <div id="mobile-menu" class="mobile-menu md:hidden bg-white">
                    <div class="px-2 pt-2 pb-4 space-y-2">
                        <a href="#about" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-blue-50">Sobre</a>
                        <a href="#portfolio" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-blue-50">Portfólio</a>
                        <a href="#services" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-blue-50">Serviços</a>
                        <a href="#contact" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-blue-50">Contato</a>
                    </div>
                </div>
            </nav>
        `;
        feather.replace();
        // Mobile menu toggle
        const mobileMenuButton = this.querySelector('#mobile-menu-button');
        const mobileMenu = this.querySelector('#mobile-menu');
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('open')) {
                icon.setAttribute('data-feather', 'x');
            } else {
                icon.setAttribute('data-feather', 'menu');
            }
            feather.replace();
        });
        // Navbar scroll effect
        const navbar = this.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

customElements.define('custom-navbar', CustomNavbar);