class ServiceCard extends HTMLElement {
    connectedCallback() {
        const icon = this.getAttribute('icon') || 'code';
        const title = this.getAttribute('title') || 'Service';
        const items = JSON.parse(this.getAttribute('items') || '[]');
        const color = this.getAttribute('color') || 'blue';

        this.innerHTML = `
            <style>
                .card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .card:hover {
                    transform: translateY(-5px);
                }
                .icon-container {
                    transition: background-color 0.3s ease;
                }
            </style>
            <div class="card bg-white rounded-xl shadow-lg p-8 h-full hover:shadow-xl">
                <div class="icon-container bg-${color}-100 text-${color}-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <i data-feather="${icon}" class="w-8 h-8"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-4">${title}</h3>
                <ul class="space-y-3">
                    ${items.map(item => `
                        <li class="flex items-start">
                            <i data-feather="check" class="text-${color}-500 w-5 h-5 mr-2 mt-0.5 flex-shrink-0"></i>
                            <span class="text-gray-700">${item}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
        feather.replace();
    }
}

customElements.define('service-card', ServiceCard);