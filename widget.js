/**
 * Alphabeto Store Locator Widget Unificado
 * Version: 7.0.0 - Com melhor UI e funcionalidades do React
 */

(function() {
    'use strict';
    
    var WIDGET_VERSION = '7.0.0';
    console.log('Alphabeto Widget Version:', WIDGET_VERSION);

    if (window.AlphabetoWidget) {
        console.warn('Alphabeto Widget já está carregado');
        return;
    }

    window.AlphabetoWidget = {
        version: WIDGET_VERSION,
        config: {
            position: { bottom: '24px', right: '24px' },
            colors: { primary: '#FF6B35', secondary: '#F7931E' },
            storesUrl: 'https://storewidget.netlify.app/stores.json',
            logoUrl: 'https://www.alphabeto.com/live/invoke/website/loaders/image.ts?src=https%3A%2F%2Fdeco-sites-assets.s3.sa-east-1.amazonaws.com%2Falphabeto%2Fe30a75c7-a480-4ecb-828e-e76c39805c71%2Fsvgviewer-output-%2821%29.svg&fit=cover&width=120&height=36'
        },

        stores: [],
        sacInfo: null,
        state: {
            isOpen: false,
            currentView: 'menu',
            userLocation: null,
            searchResults: [],
            isLoading: false,
            storesLoaded: false
        },

        init: function(customConfig) {
            var self = this;
            
            console.log('Alphabeto Widget: Iniciando...');
            
            if (document.getElementById('alphabeto-widget-wrapper')) {
                console.log('Widget já existe');
                return;
            }

            // Aplicar configurações customizadas
            if (customConfig) {
                this.mergeConfig(customConfig);
            }

            this.loadStores(function() {
                self.injectStyles();
                self.createWidget();
                
                setTimeout(function() {
                    self.attachEventListeners();
                    console.log('Alphabeto Widget: Pronto!');
                }, 100);
            });
        },

        mergeConfig: function(customConfig) {
            for (var key in customConfig) {
                if (customConfig.hasOwnProperty(key)) {
                    if (typeof customConfig[key] === 'object' && this.config[key]) {
                        Object.assign(this.config[key], customConfig[key]);
                    } else {
                        this.config[key] = customConfig[key];
                    }
                }
            }
        },

        loadStores: function(callback) {
            var self = this;
            var xhr = new XMLHttpRequest();
            
            console.log('Carregando lojas de:', this.config.storesUrl);
            
            xhr.open('GET', this.config.storesUrl, true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    try {
                        var data = JSON.parse(xhr.responseText);
                        self.stores = data.stores || [];
                        self.sacInfo = data.sac || null;
                        self.state.storesLoaded = true;
                        console.log('Lojas carregadas:', self.stores.length);
                    } catch (e) {
                        console.error('Erro ao parsear JSON:', e);
                        self.loadFallbackStores();
                    }
                } else {
                    console.error('Erro ao carregar lojas:', xhr.status);
                    self.loadFallbackStores();
                }
                
                if (callback) callback();
            };
            
            xhr.onerror = function() {
                console.error('Erro de rede');
                self.loadFallbackStores();
                if (callback) callback();
            };
            
            xhr.send();
        },

        loadFallbackStores: function() {
            this.stores = [
                { id: 37, name: "Alphabeto Aliança Shopping", address: "Praça Doutor Augusto Glória, 327 - Centro", city: "São João Nepomuceno", state: "MG", cep: "36680-000", whatsapp: "5532991295904", lat: -21.5388, lng: -43.0089, hours: "Seg-Sáb: 9h-18h | Dom: 9h-14h" },
                { id: 31, name: "Alphabeto Barra Shopping", address: "Avenida das Américas, 4666 - Barra da Tijuca", city: "Rio de Janeiro", state: "RJ", cep: "22640-102", whatsapp: "5521996628735", lat: -23.0049, lng: -43.3211, hours: "Seg-Sáb: 10h-22h | Dom: 13h-21h" },
                { id: 6, name: "Alphabeto Morumbi Shopping", address: "Avenida Roque Petroni Júnior, 1089 - Vila Gertrudes", city: "São Paulo", state: "SP", cep: "04707-900", whatsapp: "5511930402110", lat: -23.6224, lng: -46.6993, hours: "Seg-Sáb: 10h-22h | Dom: 14h-20h" }
            ];
            this.sacInfo = { name: "Fadinhas do SAC", whatsapp: "5521999999999", message: "Olá! Gostaria de falar com as Fadinhas do SAC da Alphabeto! 🧚‍♀️" };
            this.state.storesLoaded = true;
        },

        injectStyles: function() {
            var styles = `
                /* Reset e Base */
                .alphabeto-widget-wrapper * { 
                    box-sizing: border-box; 
                    margin: 0; 
                    padding: 0; 
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
                }
                
                /* Botão Flutuante - Melhorado */
                .alphabeto-widget-button { 
                    position: fixed; 
                    width: 72px; 
                    height: 72px; 
                    border-radius: 50%; 
                    box-shadow: 0 8px 24px rgba(255, 107, 53, 0.25); 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
                    background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); 
                    border: none; 
                    cursor: pointer; 
                    z-index: 999999;
                    overflow: hidden;
                }
                
                .alphabeto-widget-button:hover { 
                    transform: scale(1.1) translateY(-2px); 
                    box-shadow: 0 12px 32px rgba(255, 107, 53, 0.35); 
                }
                
                .alphabeto-widget-button:active { 
                    transform: scale(1.05); 
                }
                
                .alphabeto-widget-button svg { 
                    width: 36px; 
                    height: 36px; 
                    transition: transform 0.2s ease;
                }
                
                .alphabeto-widget-button:hover svg {
                    transform: scale(1.1);
                }
                
                .alphabeto-widget-pulse { 
                    position: absolute; 
                    top: -4px; 
                    right: -4px; 
                    width: 14px; 
                    height: 14px; 
                    background: #22c55e; 
                    border: 2px solid white;
                    border-radius: 50%; 
                    animation: alphabeto-pulse 2s infinite; 
                }
                
                @keyframes alphabeto-pulse { 
                    0%, 100% { 
                        opacity: 1; 
                        transform: scale(1); 
                    } 
                    50% { 
                        opacity: 0.8; 
                        transform: scale(1.1); 
                    } 
                }
                
                /* Modal - Design Moderno */
                .alphabeto-widget-modal { 
                    position: fixed; 
                    right: 0; 
                    top: 0; 
                    height: 100%; 
                    width: 100%; 
                    max-width: 420px; 
                    background: #FAFAFA; 
                    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.12); 
                    z-index: 999999; 
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
                    transform: translateX(100%); 
                    display: flex; 
                    flex-direction: column; 
                    overflow: hidden;
                }
                
                .alphabeto-widget-modal.open { 
                    transform: translateX(0); 
                }
                
                /* Header Melhorado */
                .alphabeto-widget-header { 
                    background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); 
                    color: white; 
                    padding: 20px 24px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: space-between; 
                    flex-shrink: 0;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }
                
                .alphabeto-widget-header-content {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                
                .alphabeto-widget-logo {
                    height: 32px;
                    filter: brightness(0) invert(1);
                }
                
                .alphabeto-widget-header h2 { 
                    font-size: 18px; 
                    font-weight: 600;
                    opacity: 0.9;
                }
                
                .alphabeto-widget-close { 
                    background: rgba(255, 255, 255, 0.2); 
                    border: none; 
                    color: white; 
                    cursor: pointer; 
                    width: 36px; 
                    height: 36px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    border-radius: 8px; 
                    transition: all 0.2s ease; 
                    font-size: 20px;
                    font-weight: 300;
                }
                
                .alphabeto-widget-close:hover { 
                    background: rgba(255, 255, 255, 0.3); 
                    transform: scale(1.05);
                }
                
                /* Conteúdo */
                .alphabeto-widget-content { 
                    flex: 1; 
                    overflow-y: auto; 
                    padding: 24px; 
                    background: #FAFAFA;
                }
                
                /* Inputs e Botões Modernos */
                .alphabeto-widget-input { 
                    width: 100%; 
                    padding: 14px 16px; 
                    border: 2px solid #E5E7EB; 
                    border-radius: 12px; 
                    font-size: 16px; 
                    transition: all 0.2s ease; 
                    background: white;
                    font-family: inherit;
                }
                
                .alphabeto-widget-input:focus { 
                    outline: none; 
                    border-color: #FF6B35; 
                    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
                }
                
                .alphabeto-widget-btn { 
                    width: 100%; 
                    padding: 14px 24px; 
                    background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); 
                    color: white; 
                    border: none; 
                    border-radius: 12px; 
                    font-size: 16px; 
                    font-weight: 600; 
                    cursor: pointer; 
                    transition: all 0.2s ease; 
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    font-family: inherit;
                }
                
                .alphabeto-widget-btn:hover { 
                    transform: translateY(-1px); 
                    box-shadow: 0 8px 20px rgba(255, 107, 53, 0.25);
                }
                
                .alphabeto-widget-btn:active { 
                    transform: translateY(0); 
                }
                
                .alphabeto-widget-btn:disabled { 
                    opacity: 0.5; 
                    cursor: not-allowed; 
                    transform: none;
                }
                
                .alphabeto-widget-btn-secondary { 
                    background: white; 
                    color: #FF6B35; 
                    border: 2px solid #FF6B35; 
                }
                
                .alphabeto-widget-btn-secondary:hover { 
                    background: #FFF7F3; 
                    transform: translateY(-1px);
                }
                
                .alphabeto-widget-btn-sac { 
                    background: white; 
                    color: #8B5CF6; 
                    padding: 12px 20px; 
                    border-radius: 12px; 
                    font-weight: 600; 
                    transition: all 0.2s ease; 
                    border: 2px solid #E9D5FF; 
                    cursor: pointer; 
                    font-size: 15px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    gap: 8px; 
                    width: 100%;
                    font-family: inherit;
                }
                
                .alphabeto-widget-btn-sac:hover { 
                    background: #FAF5FF; 
                    border-color: #C084FC; 
                    transform: translateY(-1px); 
                }
                
                /* Cards de Loja Modernos */
                .alphabeto-widget-store { 
                    border: 2px solid #F3F4F6; 
                    border-radius: 16px; 
                    padding: 20px; 
                    margin-bottom: 16px; 
                    cursor: pointer; 
                    transition: all 0.2s ease; 
                    background: white; 
                    position: relative; 
                    overflow: hidden;
                }
                
                .alphabeto-widget-store:hover { 
                    transform: translateY(-2px); 
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08); 
                    border-color: #FFE5DB; 
                }
                
                .alphabeto-widget-store.featured { 
                    border-color: #FF6B35; 
                    background: linear-gradient(135deg, #FFF7F3 0%, #FFEDE6 100%); 
                    box-shadow: 0 4px 16px rgba(255, 107, 53, 0.1);
                }
                
                .alphabeto-widget-store h5 { 
                    font-weight: 600; 
                    margin-bottom: 8px; 
                    color: #1F2937; 
                    font-size: 16px;
                    padding-right: 80px;
                }
                
                .alphabeto-widget-store p { 
                    font-size: 14px; 
                    color: #6B7280; 
                    margin: 4px 0; 
                }
                
                .alphabeto-widget-badge { 
                    display: inline-block; 
                    background: #FF6B35; 
                    color: white; 
                    font-size: 12px; 
                    padding: 4px 12px; 
                    border-radius: 20px; 
                    margin-bottom: 12px; 
                    font-weight: 600;
                }
                
                .alphabeto-widget-distance { 
                    position: absolute; 
                    top: 20px; 
                    right: 20px; 
                    background: #FFF7F3;
                    padding: 6px 12px;
                    border-radius: 8px;
                    font-weight: 600; 
                    color: #FF6B35; 
                    font-size: 14px;
                }
                
                /* Loading */
                .alphabeto-widget-loading { 
                    text-align: center; 
                    padding: 60px 20px; 
                }
                
                .alphabeto-widget-spinner { 
                    display: inline-block; 
                    width: 48px; 
                    height: 48px; 
                    border: 3px solid #FFE5DB; 
                    border-top: 3px solid #FF6B35; 
                    border-radius: 50%; 
                    animation: spin 1s linear infinite; 
                    margin: 0 auto;
                }
                
                @keyframes spin { 
                    0% { transform: rotate(0deg); } 
                    100% { transform: rotate(360deg); } 
                }
                
                /* Back Button */
                .alphabeto-widget-back { 
                    color: #FF6B35; 
                    font-weight: 600; 
                    cursor: pointer; 
                    margin-bottom: 24px; 
                    display: flex; 
                    align-items: center; 
                    gap: 8px;
                    font-size: 16px;
                    background: none;
                    border: none;
                    padding: 0;
                    font-family: inherit;
                }
                
                .alphabeto-widget-back:hover { 
                    text-decoration: underline; 
                }
                
                /* Overlay */
                .alphabeto-widget-overlay { 
                    position: fixed; 
                    top: 0; 
                    left: 0; 
                    right: 0; 
                    bottom: 0; 
                    background: rgba(0, 0, 0, 0.6); 
                    z-index: 999998; 
                    opacity: 0; 
                    transition: opacity 0.3s ease; 
                    pointer-events: none; 
                    backdrop-filter: blur(4px);
                }
                
                .alphabeto-widget-overlay.show { 
                    opacity: 1; 
                    pointer-events: auto; 
                }
                
                /* Footer */
                .alphabeto-widget-footer {
                    padding: 16px 24px;
                    background: white;
                    border-top: 1px solid #E5E7EB;
                    text-align: center;
                    flex-shrink: 0;
                }
                
                .alphabeto-widget-footer p {
                    fontSize: 12px;
                    color: #9CA3AF;
                    margin: 0;
                }
                
                /* Títulos e Textos */
                .alphabeto-widget-title {
                    font-size: 24px;
                    font-weight: 700;
                    color: #1F2937;
                    margin-bottom: 8px;
                    text-align: center;
                }
                
                .alphabeto-widget-subtitle {
                    color: #6B7280;
                    font-size: 14px;
                    text-align: center;
                    margin-bottom: 32px;
                }
                
                .alphabeto-widget-divider {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin: 20px 0;
                    color: #9CA3AF;
                }
                
                .alphabeto-widget-divider::before,
                .alphabeto-widget-divider::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: #E5E7EB;
                }
                
                .alphabeto-widget-divider span {
                    font-size: 14px;
                    font-weight: 500;
                }
                
                /* Responsividade */
                @media (max-width: 640px) { 
                    .alphabeto-widget-modal { 
                        max-width: 100%; 
                    }
                    
                    .alphabeto-widget-button {
                        width: 64px;
                        height: 64px;
                        bottom: 20px;
                        right: 20px;
                    }
                    
                    .alphabeto-widget-button svg {
                        width: 32px;
                        height: 32px;
                    }
                }
                
                @media (max-width: 375px) {
                    .alphabeto-widget-content {
                        padding: 20px;
                    }
                    
                    .alphabeto-widget-btn,
                    .alphabeto-widget-btn-secondary,
                    .alphabeto-widget-btn-sac {
                        font-size: 14px;
                        padding: 12px 20px;
                    }
                    
                    .alphabeto-widget-title {
                        font-size: 20px;
                    }
                }
            `;

            var styleElement = document.createElement('style');
            styleElement.textContent = styles;
            document.head.appendChild(styleElement);
        },

        createWidget: function() {
            var wrapper = document.createElement('div');
            wrapper.id = 'alphabeto-widget-wrapper';
            wrapper.className = 'alphabeto-widget-wrapper';
            
            // Botão flutuante
            var button = document.createElement('button');
            button.className = 'alphabeto-widget-button';
            button.id = 'alphabeto-widget-toggle';
            button.style.bottom = this.config.position.bottom;
            button.style.right = this.config.position.right;
            button.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4M5 21V10.85M19 21V10.85"/>
                </svg>
                <div class="alphabeto-widget-pulse"></div>
            `;
            
            // Modal
            var modal = document.createElement('div');
            modal.className = 'alphabeto-widget-modal';
            modal.id = 'alphabeto-widget-modal';
            
            // Header
            var header = document.createElement('div');
            header.className = 'alphabeto-widget-header';
            header.innerHTML = `
                <div class="alphabeto-widget-header-content">
                    <svg width="120" height="36" viewBox="0 0 120 36" fill="white">
                        <text x="10" y="25" font-family="Arial, sans-serif" font-size="20" font-weight="bold">Alphabeto</text>
                    </svg>
                    <span>Lojas</span>
                </div>
                <button class="alphabeto-widget-close" id="alphabeto-widget-close">✕</button>
            `;
            
            // Content
            var content = document.createElement('div');
            content.className = 'alphabeto-widget-content';
            content.id = 'alphabeto-widget-content';
            content.innerHTML = this.renderMainMenu();
            
            // Footer
            var footer = document.createElement('div');
            footer.className = 'alphabeto-widget-footer';
            footer.innerHTML = '<p>© 2025 Alphabeto - Vestindo criança como criança</p>';
            
            // Overlay
            var overlay = document.createElement('div');
            overlay.className = 'alphabeto-widget-overlay';
            overlay.id = 'alphabeto-widget-overlay';
            
            modal.appendChild(header);
            modal.appendChild(content);
            modal.appendChild(footer);
            
            wrapper.appendChild(button);
            wrapper.appendChild(modal);
            wrapper.appendChild(overlay);
            
            document.body.appendChild(wrapper);
        },

        renderMainMenu: function() {
            var html = '<div>';
            
            // Título
            html += '<div style="margin-bottom: 32px;">';
            html += '<h3 class="alphabeto-widget-title">Encontre a loja mais próxima</h3>';
            html += '<p class="alphabeto-widget-subtitle">Mais de ' + this.stores.length + ' lojas em todo Brasil</p>';
            html += '</div>';
            
            // Loading state
            if (!this.state.storesLoaded) {
                html += this.renderLoading('Carregando lojas...');
                html += '</div>';
                return html;
            }
            
            // Botão de geolocalização
            html += '<button class="alphabeto-widget-btn" id="alphabeto-widget-geolocation">';
            html += '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">';
            html += '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>';
            html += '<circle cx="12" cy="9" r="3"/>';
            html += '</svg>';
            html += 'Usar minha localização atual';
            html += '</button>';
            
            // Divider
            html += '<div class="alphabeto-widget-divider"><span>ou</span></div>';
            
            // Campo de busca
            html += '<div style="margin-bottom: 32px;">';
            html += '<input type="text" placeholder="Digite sua cidade, CEP ou endereço..." class="alphabeto-widget-input" id="alphabeto-widget-search-input" style="margin-bottom: 12px;" />';
            html += '<button class="alphabeto-widget-btn alphabeto-widget-btn-secondary" id="alphabeto-widget-search-btn">';
            html += '🔍 Buscar lojas';
            html += '</button>';
            html += '</div>';
            
            // Botão das Fadinhas
            if (this.sacInfo) {
                html += '<div style="margin-top: 40px; padding: 20px; background: #FAF5FF; border-radius: 12px; border: 1px solid #E9D5FF;">';
                html += '<p style="font-size: 13px; color: #7C3AED; text-align: center; margin-bottom: 12px; font-weight: 500;">💬 Precisa de ajuda ou tem alguma dúvida?</p>';
                html += '<button class="alphabeto-widget-btn-sac" id="alphabeto-widget-sac">';
                html += '<span style="font-size: 18px;">🧚‍♀️</span>';
                html += 'Falar com as Fadinhas do SAC';
                html += '</button>';
                html += '</div>';
            }
            
            // Lista de lojas
            html += '<div style="margin-top: 32px;">';
            html += '<h4 style="font-size: 18px; font-weight: 600; margin-bottom: 20px; color: #374151;">Nossas lojas</h4>';
            
            for (var i = 0; i < Math.min(10, this.stores.length); i++) {
                var store = this.stores[i];
                html += '<div class="alphabeto-widget-store" data-store-id="' + store.id + '">';
                html += '<div style="display: flex; justify-content: space-between; align-items: start;">';
                html += '<div style="flex: 1;">';
                html += '<h5>' + store.name + '</h5>';
                html += '<p>📍 ' + store.city + ', ' + store.state + '</p>';
                html += '<p style="font-size: 13px; color: #9CA3AF; margin-top: 4px;">' + store.address + '</p>';
                if (store.cep) {
                    html += '<p style="font-size: 12px; color: #9CA3AF; margin-top: 4px;">CEP: ' + store.cep + '</p>';
                }
                html += '</div>';
                html += '<div style="color: #22C55E; font-size: 24px;">💬</div>';
                html += '</div>';
                html += '</div>';
            }
            
            if (this.stores.length > 10) {
                html += '<p style="text-align: center; color: #9CA3AF; font-size: 14px; margin-top: 20px;">';
                html += 'Mostrando 10 de ' + this.stores.length + ' lojas';
                html += '</p>';
            }
            
            html += '</div></div>';
            return html;
        },

        renderLoading: function(message) {
            message = message || 'Carregando...';
            return '<div class="alphabeto-widget-loading"><div class="alphabeto-widget-spinner"></div><p style="margin-top: 24px; color: #6B7280; font-size: 16px;">' + message + '</p></div>';
        },

        renderResults: function(stores) {
            var html = '<div>';
            
            // Back button
            html += '<button class="alphabeto-widget-back" id="alphabeto-widget-back">';
            html += '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">';
            html += '<path d="M19 12H5M12 19l-7-7 7-7"/>';
            html += '</svg>';
            html += 'Voltar';
            html += '</button>';
            
            if (stores.length === 0) {
                html += '<div style="text-align: center; padding: 60px 20px; background: white; border-radius: 16px; border: 2px dashed #E5E7EB;">';
                html += '<div style="font-size: 64px; margin-bottom: 20px;">🔍</div>';
                html += '<h3 style="font-size: 20px; font-weight: 600; margin-bottom: 12px; color: #374151;">Nenhuma loja encontrada</h3>';
                html += '<p style="color: #6B7280; font-size: 14px;">Tente buscar por outra localização ou entre em contato com o SAC</p>';
                html += '</div>';
            } else {
                html += '<div style="margin-bottom: 24px;">';
                html += '<h3 class="alphabeto-widget-title" style="text-align: left;">Lojas encontradas</h3>';
                html += '<p style="color: #6B7280; font-size: 14px;">';
                html += stores.length + (stores.length === 1 ? ' loja encontrada' : ' lojas encontradas') + ', ordenadas por proximidade';
                html += '</p>';
                html += '</div>';
                
                for (var i = 0; i < stores.length; i++) {
                    var store = stores[i];
                    var isFeatured = i === 0 && store.distance < 50;
                    
                    html += '<div class="alphabeto-widget-store ' + (isFeatured ? 'featured' : '') + '" data-store-id="' + store.id + '">';
                    
                    if (isFeatured) {
                        html += '<span class="alphabeto-widget-badge">⭐ Mais próxima</span>';
                    }
                    
                    if (store.distance !== undefined) {
                        html += '<div class="alphabeto-widget-distance">' + store.distance.toFixed(1) + ' km</div>';
                    }
                    
                    html += '<h5>' + store.name + '</h5>';
                    html += '<p>📍 ' + store.city + ', ' + store.state + '</p>';
                    html += '<p style="font-size: 13px; color: #9CA3AF; margin-bottom: 8px;">' + store.address + '</p>';
                    
                    if (store.cep) {
                        html += '<p style="font-size: 12px; color: #9CA3AF; margin-bottom: 8px;">CEP: ' + store.cep + '</p>';
                    }
                    
                    if (store.hours) {
                        html += '<p style="font-size: 13px; color: #6B7280; margin-bottom: 12px;">⏰ ' + store.hours.split('|')[0] + '</p>';
                    }
                    
                    html += '<div style="display: flex; align-items: center; gap: 8px; color: #22C55E; font-size: 14px; font-weight: 600;">';
                    html += '💬 Conversar no WhatsApp';
                    html += '</div>';
                    
                    html += '</div>';
                }
            }
            
            html += '</div>';
            return html;
        },

        // Utilitários
        formatCEP: function(cep) {
            return cep.replace(/\D/g, '');
        },

        isCEP: function(value) {
            var cleaned = this.formatCEP(value);
            return cleaned.length === 8 && /^\d{8}$/.test(cleaned);
        },

        calculateDistance: function(lat1, lng1, lat2, lng2) {
            var R = 6371;
            var dLat = (lat2 - lat1) * Math.PI / 180;
            var dLng = (lng2 - lng1) * Math.PI / 180;
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                    Math.sin(dLng/2) * Math.sin(dLng/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return R * c;
        },

        // Busca de endereços
        searchViaCEP: function(cep, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://viacep.com.br/ws/' + cep + '/json/', true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    try {
                        var data = JSON.parse(xhr.responseText);
                        if (!data.erro) {
                            callback(null, data.logradouro + ', ' + data.localidade + ', ' + data.uf + ', Brasil');
                        } else {
                            callback('CEP não encontrado');
                        }
                    } catch (e) {
                        callback('Erro ao processar CEP');
                    }
                } else {
                    callback('Erro na consulta do CEP');
                }
            };
            xhr.onerror = function() {
                callback('Erro de rede');
            };
            xhr.send();
        },

        geocodeAddress: function(address, callback) {
            var searchAddress = address + ', Brasil';
            var url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + 
                     encodeURIComponent(searchAddress) + '&countrycodes=br&limit=1';
            
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    try {
                        var data = JSON.parse(xhr.responseText);
                        if (data && data[0]) {
                            callback(null, {
                                lat: parseFloat(data[0].lat),
                                lng: parseFloat(data[0].lon)
                            });
                        } else {
                            callback('Endereço não encontrado');
                        }
                    } catch (e) {
                        callback('Erro ao processar endereço');
                    }
                } else {
                    callback('Erro na busca do endereço');
                }
            };
            xhr.onerror = function() {
                callback('Erro de rede');
            };
            xhr.send();
        },

        // Funcionalidades principais
        useGeolocation: function() {
            var self = this;
            
            if (!navigator.geolocation) {
                alert('Seu navegador não suporta geolocalização');
                return;
            }
            
            this.state.isLoading = true;
            this.state.currentView = 'loading';
            document.getElementById('alphabeto-widget-content').innerHTML = this.renderLoading('Buscando lojas próximas...');
            
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    self.handleLocationSuccess(position.coords.latitude, position.coords.longitude);
                },
                function(error) {
                    var message = 'Não foi possível obter sua localização.';
                    if (error.code === 1) {
                        message = 'Permissão de localização negada. Por favor, digite seu endereço.';
                    } else if (error.code === 2) {
                        message = 'Localização indisponível. Verifique se o GPS está ativado.';
                    } else if (error.code === 3) {
                        message = 'Tempo esgotado. Tente novamente ou digite seu endereço.';
                    }
                    alert(message);
                    self.state.currentView = 'menu';
                    self.state.isLoading = false;
                    document.getElementById('alphabeto-widget-content').innerHTML = self.renderMainMenu();
                    self.attachMenuListeners();
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        },

        searchByAddress: function(address) {
            var self = this;
            
            if (!address || address.trim() === '') {
                alert('Por favor, digite um endereço, cidade ou CEP');
                return;
            }
            
            this.state.isLoading = true;
            this.state.currentView = 'loading';
            document.getElementById('alphabeto-widget-content').innerHTML = this.renderLoading('Buscando lojas próximas...');
            
            if (this.isCEP(address)) {
                var cepFormatted = this.formatCEP(address);
                
                this.searchViaCEP(cepFormatted, function(error, formattedAddress) {
                    if (error) {
                        self.geocodeAddress(address, function(geoError, coordinates) {
                            if (geoError) {
                                alert('Não foi possível encontrar o endereço. Tente ser mais específico.');
                                self.resetToMenu();
                            } else {
                                self.handleLocationSuccess(coordinates.lat, coordinates.lng);
                            }
                        });
                    } else {
                        self.geocodeAddress(formattedAddress, function(geoError, coordinates) {
                            if (geoError) {
                                alert('Não foi possível encontrar o endereço. Tente ser mais específico.');
                                self.resetToMenu();
                            } else {
                                self.handleLocationSuccess(coordinates.lat, coordinates.lng);
                            }
                        });
                    }
                });
            } else {
                this.geocodeAddress(address, function(error, coordinates) {
                    if (error) {
                        alert('Não foi possível encontrar o endereço. Tente ser mais específico.');
                        self.resetToMenu();
                    } else {
                        self.handleLocationSuccess(coordinates.lat, coordinates.lng);
                    }
                });
            }
        },

        handleLocationSuccess: function(lat, lng) {
            var self = this;
            
            var storesWithDistance = [];
            for (var i = 0; i < this.stores.length; i++) {
                var store = Object.assign({}, this.stores[i]);
                store.distance = this.calculateDistance(lat, lng, store.lat, store.lng);
                storesWithDistance.push(store);
            }
            
            storesWithDistance.sort(function(a, b) {
                return a.distance - b.distance;
            });
            
            this.state.searchResults = storesWithDistance;
            this.state.currentView = 'results';
            this.state.isLoading = false;
            
            document.getElementById('alphabeto-widget-content').innerHTML = this.renderResults(storesWithDistance);
            this.attachResultsListeners();
        },

        resetToMenu: function() {
            this.state.currentView = 'menu';
            this.state.isLoading = false;
            document.getElementById('alphabeto-widget-content').innerHTML = this.renderMainMenu();
            this.attachMenuListeners();
        },

        // Event listeners
        attachEventListeners: function() {
            var self = this;
            
            var toggle = document.getElementById('alphabeto-widget-toggle');
            if (toggle) {
                toggle.onclick = function() {
                    self.toggleModal();
                };
            }
            
            var close = document.getElementById('alphabeto-widget-close');
            if (close) {
                close.onclick = function() {
                    self.closeModal();
                };
            }
            
            var overlay = document.getElementById('alphabeto-widget-overlay');
            if (overlay) {
                overlay.onclick = function() {
                    self.closeModal();
                };
            }
            
            this.attachMenuListeners();
        },

        attachMenuListeners: function() {
            var self = this;
            
            var geoBtn = document.getElementById('alphabeto-widget-geolocation');
            if (geoBtn) {
                geoBtn.onclick = function() {
                    self.useGeolocation();
                };
            }
            
            var searchBtn = document.getElementById('alphabeto-widget-search-btn');
            var searchInput = document.getElementById('alphabeto-widget-search-input');
            
            if (searchBtn) {
                searchBtn.onclick = function() {
                    self.searchByAddress(searchInput.value);
                };
            }
            
            if (searchInput) {
                searchInput.onkeypress = function(e) {
                    if (e.key === 'Enter') {
                        self.searchByAddress(searchInput.value);
                    }
                };
            }
            
            var sacBtn = document.getElementById('alphabeto-widget-sac');
            if (sacBtn && self.sacInfo) {
                sacBtn.onclick = function() {
                    self.openSACWhatsApp();
                };
            }
            
            this.attachStoreClicks();
        },

        attachResultsListeners: function() {
            var self = this;
            
            var back = document.getElementById('alphabeto-widget-back');
            if (back) {
                back.onclick = function() {
                    self.resetToMenu();
                };
            }
            
            this.attachStoreClicks();
        },

        attachStoreClicks: function() {
            var self = this;
            var stores = document.querySelectorAll('.alphabeto-widget-store');
            
            for (var i = 0; i < stores.length; i++) {
                stores[i].onclick = function() {
                    var storeId = parseInt(this.getAttribute('data-store-id'));
                    var store = self.getStoreById(storeId);
                    if (store) {
                        self.openWhatsApp(store);
                    }
                };
            }
        },

        getStoreById: function(id) {
            for (var i = 0; i < this.stores.length; i++) {
                if (this.stores[i].id === id) {
                    return this.stores[i];
                }
            }
            return null;
        },

        // Modal controls
        toggleModal: function() {
            this.state.isOpen = !this.state.isOpen;
            var modal = document.getElementById('alphabeto-widget-modal');
            var overlay = document.getElementById('alphabeto-widget-overlay');
            
            if (this.state.isOpen) {
                modal.classList.add('open');
                if (window.innerWidth <= 640) {
                    overlay.classList.add('show');
                }
            } else {
                modal.classList.remove('open');
                overlay.classList.remove('show');
                
                // Reset após fechar
                setTimeout(() => {
                    if (!this.state.isOpen) {
                        this.state.currentView = 'menu';
                        document.getElementById('alphabeto-widget-content').innerHTML = this.renderMainMenu();
                        this.attachMenuListeners();
                    }
                }, 300);
            }
        },

        closeModal: function() {
            this.state.isOpen = false;
            var modal = document.getElementById('alphabeto-widget-modal');
            var overlay = document.getElementById('alphabeto-widget-overlay');
            
            modal.classList.remove('open');
            overlay.classList.remove('show');
            
            // Reset após fechar
            setTimeout(() => {
                this.state.currentView = 'menu';
                document.getElementById('alphabeto-widget-content').innerHTML = this.renderMainMenu();
                this.attachMenuListeners();
            }, 300);
        },

        // WhatsApp
        openWhatsApp: function(store) {
            var now = new Date();
            var hour = now.getHours();
            
            var greeting = "Olá!";
            if (hour < 12) greeting = "Bom dia!";
            else if (hour < 18) greeting = "Boa tarde!";
            else greeting = "Boa noite!";
            
            var message = greeting + " 👶\n\nGostaria de mais informações sobre a " + store.name + "!\n\nEndereço: " + store.address;
            var whatsappUrl = "https://wa.me/" + store.whatsapp + "?text=" + encodeURIComponent(message);
            
            window.open(whatsappUrl, '_blank');
        },

        openSACWhatsApp: function() {
            if (!this.sacInfo) return;
            
            var whatsappUrl = "https://wa.me/" + this.sacInfo.whatsapp + "?text=" + encodeURIComponent(this.sacInfo.message);
            window.open(whatsappUrl, '_blank');
        }
    };

    // Auto-inicializar
    console.log('Alphabeto Widget: Carregado');
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            window.AlphabetoWidget.init();
        });
    } else {
        setTimeout(function() {
            window.AlphabetoWidget.init();
        }, 10);
    }
})();