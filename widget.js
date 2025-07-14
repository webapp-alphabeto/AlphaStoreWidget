/**
 * Alphabeto Store Locator Widget
 * Version: 1.0.0
 */

(function() {
    'use strict';

    // Verificar se o widget já foi carregado
    if (window.AlphabetoWidget) {
        console.warn('Alphabeto Widget já está carregado');
        return;
    }

    // Namespace do widget
    window.AlphabetoWidget = {
        config: {
            position: { bottom: '24px', right: '24px' },
            colors: { primary: '#FF6B35', secondary: '#F7931E' }
        },

        // Estilos CSS do widget
        styles: `
            .alphabeto-widget-wrapper * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }
            
            .alphabeto-widget-button {
                position: fixed;
                width: 64px;
                height: 64px;
                border-radius: 50%;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
                border: none;
                cursor: pointer;
                z-index: 999999;
            }
            
            .alphabeto-widget-button:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
            }
            
            .alphabeto-widget-button svg {
                width: 32px;
                height: 32px;
                fill: white;
            }
            
            .alphabeto-widget-pulse {
                position: absolute;
                top: -4px;
                right: -4px;
                width: 12px;
                height: 12px;
                background: #22c55e;
                border-radius: 50%;
                animation: alphabeto-pulse 2s infinite;
            }
            
            @keyframes alphabeto-pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            
            .alphabeto-widget-modal {
                position: fixed;
                right: 0;
                top: 0;
                height: 100%;
                width: 100%;
                max-width: 400px;
                background: white;
                box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
                z-index: 999999;
                transition: transform 0.3s ease;
                transform: translateX(100%);
                display: flex;
                flex-direction: column;
            }
            
            .alphabeto-widget-modal.open {
                transform: translateX(0);
            }
            
            .alphabeto-widget-header {
                background: linear-gradient(to right, #FF6B35, #F7931E);
                color: white;
                padding: 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-shrink: 0;
            }
            
            .alphabeto-widget-header h2 {
                font-size: 24px;
                font-weight: bold;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            
            .alphabeto-widget-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 24px;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                transition: background 0.2s;
            }
            
            .alphabeto-widget-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .alphabeto-widget-content {
                flex: 1;
                overflow-y: auto;
                padding: 24px;
            }
            
            .alphabeto-widget-input {
                width: 100%;
                padding: 12px 16px;
                border: 2px solid #fed7aa;
                border-radius: 8px;
                font-size: 16px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                transition: border-color 0.2s;
            }
            
            .alphabeto-widget-input:focus {
                outline: none;
                border-color: #FF6B35;
            }
            
            .alphabeto-widget-btn {
                width: 100%;
                padding: 12px 16px;
                background: linear-gradient(to right, #FF6B35, #F7931E);
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: bold;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                cursor: pointer;
                transition: opacity 0.2s;
            }
            
            .alphabeto-widget-btn:hover {
                opacity: 0.9;
            }
            
            .alphabeto-widget-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            .alphabeto-widget-store {
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 16px;
                margin-bottom: 12px;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .alphabeto-widget-store:hover {
                background: #f9fafb;
                border-color: #d1d5db;
            }
            
            .alphabeto-widget-store h5 {
                font-weight: bold;
                margin-bottom: 4px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            
            .alphabeto-widget-store p {
                font-size: 14px;
                color: #6b7280;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            
            .alphabeto-widget-overlay {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 999998;
                opacity: 0;
                transition: opacity 0.3s;
                pointer-events: none;
            }
            
            .alphabeto-widget-overlay.show {
                opacity: 1;
                pointer-events: auto;
            }
            
            @media (max-width: 640px) {
                .alphabeto-widget-modal {
                    max-width: 100%;
                }
            }
        `,

        // Lista de lojas
        stores: [
            {
                id: 1,
                name: "Alphabeto Shopping Manauara",
                address: "Avenida Mário Ypiranga, 1300 - Adrianópolis",
                city: "Manaus",
                state: "AM",
                whatsapp: "559294481001"
            },
            {
                id: 37,
                name: "Alphabeto Aliança Shopping",
                address: "Praça Doutor Augusto Glória, 327 - Centro",
                city: "São João Nepomuceno",
                state: "MG",
                whatsapp: "5532991295904"
            },
            {
                id: 31,
                name: "Alphabeto Barra Shopping",
                address: "Avenida das Américas, 4666 - Barra da Tijuca",
                city: "Rio de Janeiro",
                state: "RJ",
                whatsapp: "5521996628735"
            },
            {
                id: 6,
                name: "Alphabeto Morumbi Shopping",
                address: "Avenida Roque Petroni Júnior, 1089 - Vila Gertrudes",
                city: "São Paulo",
                state: "SP",
                whatsapp: "5511930402110"
            },
            {
                id: 36,
                name: "Alphabeto Shopping Minas",
                address: "Avenida Cristiano Machado, 4000 - União",
                city: "Belo Horizonte",
                state: "MG",
                whatsapp: "5531982839637"
            }
        ],

        // Estado do widget
        state: {
            isOpen: false,
            currentView: 'list',
            searchQuery: ''
        },

        // Inicializar widget
        init: function(customConfig) {
            // Mesclar configurações
            if (customConfig) {
                this.config = Object.assign({}, this.config, customConfig);
            }

            // Injetar estilos
            this.injectStyles();

            // Criar estrutura HTML
            this.createWidget();

            // Adicionar event listeners
            this.attachEventListeners();
        },

        // Injetar CSS
        injectStyles: function() {
            const styleElement = document.createElement('style');
            styleElement.textContent = this.styles;
            document.head.appendChild(styleElement);
        },

        // Criar estrutura HTML do widget
        createWidget: function() {
            const wrapper = document.createElement('div');
            wrapper.className = 'alphabeto-widget-wrapper';
            wrapper.innerHTML = `
                <!-- Botão flutuante -->
                <button class="alphabeto-widget-button" id="alphabeto-widget-toggle" style="bottom: ${this.config.position.bottom}; right: ${this.config.position.right};">
                    <svg viewBox="0 0 24 24">
                        <path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4M5 21V10.85M19 21V10.85"/>
                    </svg>
                    <div class="alphabeto-widget-pulse"></div>
                </button>

                <!-- Modal -->
                <div class="alphabeto-widget-modal" id="alphabeto-widget-modal">
                    <div class="alphabeto-widget-header">
                        <h2>Lojas Alphabeto</h2>
                        <button class="alphabeto-widget-close" id="alphabeto-widget-close">×</button>
                    </div>
                    <div class="alphabeto-widget-content" id="alphabeto-widget-content">
                        ${this.renderStoreList()}
                    </div>
                </div>

                <!-- Overlay -->
                <div class="alphabeto-widget-overlay" id="alphabeto-widget-overlay"></div>
            `;

            // Adicionar ao DOM
            const container = document.getElementById('alphabeto-store-locator-root') || document.body;
            container.appendChild(wrapper);
        },

        // Renderizar lista de lojas
        renderStoreList: function() {
            return `
                <div style="margin-bottom: 24px;">
                    <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                        Encontre uma loja próxima
                    </h3>
                    <input 
                        type="text" 
                        placeholder="Digite sua cidade..." 
                        class="alphabeto-widget-input" 
                        id="alphabeto-widget-search"
                        style="margin-bottom: 16px;"
                    />
                </div>
                <div id="alphabeto-widget-stores-list">
                    ${this.stores.map(store => `
                        <div class="alphabeto-widget-store" data-whatsapp="${store.whatsapp}" data-store-name="${store.name}" data-store-address="${store.address}">
                            <h5>${store.name}</h5>
                            <p>${store.city}, ${store.state}</p>
                            <p style="font-size: 12px; margin-top: 4px;">${store.address}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        },

        // Adicionar event listeners
        attachEventListeners: function() {
            const self = this;
            
            // Toggle do modal
            document.getElementById('alphabeto-widget-toggle').addEventListener('click', function() {
                self.toggleModal();
            });

            // Fechar modal
            document.getElementById('alphabeto-widget-close').addEventListener('click', function() {
                self.closeModal();
            });

            // Overlay click
            document.getElementById('alphabeto-widget-overlay').addEventListener('click', function() {
                self.closeModal();
            });

            // Busca
            document.getElementById('alphabeto-widget-search').addEventListener('input', function(e) {
                self.filterStores(e.target.value);
            });

            // Clique nas lojas
            document.querySelectorAll('.alphabeto-widget-store').forEach(function(storeEl) {
                storeEl.addEventListener('click', function() {
                    self.openWhatsApp(this.dataset.whatsapp, this.dataset.storeName, this.dataset.storeAddress);
                });
            });
        },

        // Toggle modal
        toggleModal: function() {
            this.state.isOpen = !this.state.isOpen;
            const modal = document.getElementById('alphabeto-widget-modal');
            const overlay = document.getElementById('alphabeto-widget-overlay');
            
            if (this.state.isOpen) {
                modal.classList.add('open');
                if (window.innerWidth <= 640) {
                    overlay.classList.add('show');
                }
            } else {
                modal.classList.remove('open');
                overlay.classList.remove('show');
            }
        },

        // Fechar modal
        closeModal: function() {
            this.state.isOpen = false;
            document.getElementById('alphabeto-widget-modal').classList.remove('open');
            document.getElementById('alphabeto-widget-overlay').classList.remove('show');
        },

        // Filtrar lojas
        filterStores: function(query) {
            const normalizedQuery = query.toLowerCase().trim();
            const stores = document.querySelectorAll('.alphabeto-widget-store');
            
            stores.forEach(function(store) {
                const text = store.textContent.toLowerCase();
                if (text.includes(normalizedQuery) || normalizedQuery === '') {
                    store.style.display = 'block';
                } else {
                    store.style.display = 'none';
                }
            });
        },

        // Abrir WhatsApp
        openWhatsApp: function(whatsapp, storeName, storeAddress) {
            const now = new Date();
            const hour = now.getHours();
            
            let greeting = "Olá!";
            if (hour < 12) greeting = "Bom dia!";
            else if (hour < 18) greeting = "Boa tarde!";
            else greeting = "Boa noite!";
            
            const message = `${greeting} 👶\n\nGostaria de mais informações sobre a ${storeName}!\n\nEndereço: ${storeAddress}`;
            const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappUrl, '_blank');
        }
    };

    // Auto-inicializar se não houver configuração customizada
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            window.AlphabetoWidget.init();
        });
    } else {
        window.AlphabetoWidget.init();
    }
})();