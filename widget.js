/**
 * Alphabeto Store Locator Widget
 * Version: 1.0.1 - ES5 Compatible
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

        // Lista de lojas completa
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
                id: 2,
                name: "Alphabeto Salvador Shopping",
                address: "Avenida Tancredo Neves, 3133 - Caminho das Árvores",
                city: "Salvador",
                state: "BA",
                whatsapp: "5571996803770"
            },
            {
                id: 3,
                name: "Alphabeto Shopping Barra",
                address: "Avenida Centenário, 2992 - Chame-Chame",
                city: "Salvador",
                state: "BA",
                whatsapp: "5571999963037"
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
                id: 24,
                name: "Alphabeto Shopping Rio Sul",
                address: "Avenida Lauro Sodré, 445 - Botafogo",
                city: "Rio de Janeiro",
                state: "RJ",
                whatsapp: "5521971247415"
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
            },
            {
                id: 30,
                name: "Alphabeto Shopping Independência",
                address: "Avenida Presidente Itamar Franco, 3600 - São Mateus",
                city: "Juiz de Fora",
                state: "MG",
                whatsapp: "553299109256"
            },
            {
                id: 38,
                name: "Alphabeto Shopping Vitória",
                address: "Avenida Américo Buaiz, 200 - Enseada do Suá",
                city: "Vitória",
                state: "ES",
                whatsapp: "5527981318879"
            }
        ],

        // Estado do widget
        state: {
            isOpen: false
        },

        // Inicializar widget
        init: function(customConfig) {
            var self = this;
            
            // Verificar se já foi inicializado
            if (document.getElementById('alphabeto-widget-wrapper')) {
                return;
            }

            // Mesclar configurações
            if (customConfig) {
                for (var key in customConfig) {
                    if (customConfig.hasOwnProperty(key)) {
                        this.config[key] = customConfig[key];
                    }
                }
            }

            // Injetar estilos
            this.injectStyles();

            // Criar estrutura HTML
            this.createWidget();

            // Adicionar event listeners após um pequeno delay
            setTimeout(function() {
                self.attachEventListeners();
            }, 100);
        },

        // Injetar CSS
        injectStyles: function() {
            var styles = [
                '.alphabeto-widget-wrapper * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }',
                '.alphabeto-widget-button { position: fixed; width: 64px; height: 64px; border-radius: 50%; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); border: none; cursor: pointer; z-index: 999999; }',
                '.alphabeto-widget-button:hover { transform: scale(1.1); box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2); }',
                '.alphabeto-widget-button svg { width: 32px; height: 32px; fill: white; }',
                '.alphabeto-widget-pulse { position: absolute; top: -4px; right: -4px; width: 12px; height: 12px; background: #22c55e; border-radius: 50%; animation: alphabeto-pulse 2s infinite; }',
                '@keyframes alphabeto-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }',
                '.alphabeto-widget-modal { position: fixed; right: 0; top: 0; height: 100%; width: 100%; max-width: 400px; background: white; box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1); z-index: 999999; transition: transform 0.3s ease; transform: translateX(100%); display: flex; flex-direction: column; }',
                '.alphabeto-widget-modal.open { transform: translateX(0); }',
                '.alphabeto-widget-header { background: linear-gradient(to right, #FF6B35, #F7931E); color: white; padding: 20px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }',
                '.alphabeto-widget-header h2 { font-size: 24px; font-weight: bold; }',
                '.alphabeto-widget-close { background: none; border: none; color: white; cursor: pointer; font-size: 28px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 4px; transition: background 0.2s; line-height: 1; padding: 0; }',
                '.alphabeto-widget-close:hover { background: rgba(255, 255, 255, 0.2); }',
                '.alphabeto-widget-content { flex: 1; overflow-y: auto; padding: 24px; }',
                '.alphabeto-widget-input { width: 100%; padding: 12px 16px; border: 2px solid #fed7aa; border-radius: 8px; font-size: 16px; transition: border-color 0.2s; }',
                '.alphabeto-widget-input:focus { outline: none; border-color: #FF6B35; }',
                '.alphabeto-widget-store { border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 12px; cursor: pointer; transition: all 0.2s; background: white; }',
                '.alphabeto-widget-store:hover { background: #f9fafb; border-color: #d1d5db; }',
                '.alphabeto-widget-store h5 { font-weight: bold; margin-bottom: 4px; color: #111827; }',
                '.alphabeto-widget-store p { font-size: 14px; color: #6b7280; margin: 0; }',
                '.alphabeto-widget-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); z-index: 999998; opacity: 0; transition: opacity 0.3s; pointer-events: none; }',
                '.alphabeto-widget-overlay.show { opacity: 1; pointer-events: auto; }',
                '@media (max-width: 640px) { .alphabeto-widget-modal { max-width: 100%; } }'
            ].join('\n');

            var styleElement = document.createElement('style');
            styleElement.textContent = styles;
            document.head.appendChild(styleElement);
        },

        // Criar estrutura HTML do widget
        createWidget: function() {
            var self = this;
            
            var wrapper = document.createElement('div');
            wrapper.id = 'alphabeto-widget-wrapper';
            wrapper.className = 'alphabeto-widget-wrapper';
            
            // Criar botão
            var button = document.createElement('button');
            button.className = 'alphabeto-widget-button';
            button.id = 'alphabeto-widget-toggle';
            button.style.bottom = this.config.position.bottom;
            button.style.right = this.config.position.right;
            button.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4M5 21V10.85M19 21V10.85"/></svg><div class="alphabeto-widget-pulse"></div>';
            
            // Criar modal
            var modal = document.createElement('div');
            modal.className = 'alphabeto-widget-modal';
            modal.id = 'alphabeto-widget-modal';
            
            // Header do modal
            var header = document.createElement('div');
            header.className = 'alphabeto-widget-header';
            header.innerHTML = '<h2>Lojas Alphabeto</h2><button class="alphabeto-widget-close" id="alphabeto-widget-close">×</button>';
            
            // Conteúdo do modal
            var content = document.createElement('div');
            content.className = 'alphabeto-widget-content';
            content.id = 'alphabeto-widget-content';
            content.innerHTML = this.renderStoreList();
            
            // Overlay
            var overlay = document.createElement('div');
            overlay.className = 'alphabeto-widget-overlay';
            overlay.id = 'alphabeto-widget-overlay';
            
            // Montar estrutura
            modal.appendChild(header);
            modal.appendChild(content);
            
            wrapper.appendChild(button);
            wrapper.appendChild(modal);
            wrapper.appendChild(overlay);
            
            // Adicionar ao DOM
            document.body.appendChild(wrapper);
        },

        // Renderizar lista de lojas
        renderStoreList: function() {
            var html = '<div style="margin-bottom: 24px;">';
            html += '<h3 style="font-size: 20px; font-weight: bold; margin-bottom: 16px;">Encontre uma loja próxima</h3>';
            html += '<input type="text" placeholder="Digite sua cidade..." class="alphabeto-widget-input" id="alphabeto-widget-search" style="margin-bottom: 16px;" />';
            html += '</div>';
            html += '<div id="alphabeto-widget-stores-list">';
            
            for (var i = 0; i < this.stores.length; i++) {
                var store = this.stores[i];
                html += '<div class="alphabeto-widget-store" data-whatsapp="' + store.whatsapp + '" data-store-name="' + store.name + '" data-store-address="' + store.address + '">';
                html += '<h5>' + store.name + '</h5>';
                html += '<p>' + store.city + ', ' + store.state + '</p>';
                html += '<p style="font-size: 12px; margin-top: 4px;">' + store.address + '</p>';
                html += '</div>';
            }
            
            html += '</div>';
            return html;
        },

        // Adicionar event listeners
        attachEventListeners: function() {
            var self = this;
            
            // Toggle do modal
            var toggleBtn = document.getElementById('alphabeto-widget-toggle');
            if (toggleBtn) {
                toggleBtn.onclick = function() {
                    self.toggleModal();
                };
            }

            // Fechar modal
            var closeBtn = document.getElementById('alphabeto-widget-close');
            if (closeBtn) {
                closeBtn.onclick = function() {
                    self.closeModal();
                };
            }

            // Overlay click
            var overlay = document.getElementById('alphabeto-widget-overlay');
            if (overlay) {
                overlay.onclick = function() {
                    self.closeModal();
                };
            }

            // Busca
            var searchInput = document.getElementById('alphabeto-widget-search');
            if (searchInput) {
                searchInput.oninput = function(e) {
                    self.filterStores(e.target.value);
                };
            }

            // Clique nas lojas
            var stores = document.querySelectorAll('.alphabeto-widget-store');
            for (var i = 0; i < stores.length; i++) {
                stores[i].onclick = function() {
                    self.openWhatsApp(
                        this.getAttribute('data-whatsapp'),
                        this.getAttribute('data-store-name'),
                        this.getAttribute('data-store-address')
                    );
                };
            }
        },

        // Toggle modal
        toggleModal: function() {
            this.state.isOpen = !this.state.isOpen;
            var modal = document.getElementById('alphabeto-widget-modal');
            var overlay = document.getElementById('alphabeto-widget-overlay');
            
            if (this.state.isOpen) {
                modal.className = 'alphabeto-widget-modal open';
                if (window.innerWidth <= 640) {
                    overlay.className = 'alphabeto-widget-overlay show';
                }
            } else {
                modal.className = 'alphabeto-widget-modal';
                overlay.className = 'alphabeto-widget-overlay';
            }
        },

        // Fechar modal
        closeModal: function() {
            this.state.isOpen = false;
            var modal = document.getElementById('alphabeto-widget-modal');
            var overlay = document.getElementById('alphabeto-widget-overlay');
            
            modal.className = 'alphabeto-widget-modal';
            overlay.className = 'alphabeto-widget-overlay';
        },

        // Filtrar lojas
        filterStores: function(query) {
            var normalizedQuery = query.toLowerCase().trim();
            var stores = document.querySelectorAll('.alphabeto-widget-store');
            
            for (var i = 0; i < stores.length; i++) {
                var store = stores[i];
                var text = store.textContent || store.innerText;
                
                if (text.toLowerCase().indexOf(normalizedQuery) !== -1 || normalizedQuery === '') {
                    store.style.display = 'block';
                } else {
                    store.style.display = 'none';
                }
            }
        },

        // Abrir WhatsApp
        openWhatsApp: function(whatsapp, storeName, storeAddress) {
            var now = new Date();
            var hour = now.getHours();
            
            var greeting = "Olá!";
            if (hour < 12) greeting = "Bom dia!";
            else if (hour < 18) greeting = "Boa tarde!";
            else greeting = "Boa noite!";
            
            var message = greeting + " 👶\n\nGostaria de mais informações sobre a " + storeName + "!\n\nEndereço: " + storeAddress;
            var whatsappUrl = "https://wa.me/" + whatsapp + "?text=" + encodeURIComponent(message);
            
            window.open(whatsappUrl, '_blank');
        }
    };

    // Auto-inicializar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            window.AlphabetoWidget.init();
        });
    } else {
        // Pequeno delay para garantir que tudo está carregado
        setTimeout(function() {
            window.AlphabetoWidget.init();
        }, 10);
    }
})();