/**
 * Alphabeto Store Locator Widget
 * Version: 5.0.1 - Com versionamento e visual atualizado
 */

(function() {
    'use strict';
    
    // Versão do widget
    var WIDGET_VERSION = '6.0.1';
    console.log('Alphabeto Widget Version:', WIDGET_VERSION);

    // Verificar se o widget já foi carregado
    if (window.AlphabetoWidget) {
        console.warn('Alphabeto Widget já está carregado');
        return;
    }

    // Namespace do widget
    window.AlphabetoWidget = {
        version: WIDGET_VERSION,
        config: {
            position: { bottom: '24px', right: '24px' },
            colors: { primary: '#FF6B35', secondary: '#F7931E' },
            storesUrl: 'https://storewidget.netlify.app/stores.json'
        },

        // Dados carregados
        stores: [],
        sacInfo: null,

        // Estado do widget
        state: {
            isOpen: false,
            currentView: 'menu',
            userLocation: null,
            searchResults: [],
            isLoading: false
        },

        // Inicializar widget
        init: function(customConfig) {
            var self = this;
            
            console.log('Alphabeto Widget: Iniciando...');
            
            if (document.getElementById('alphabeto-widget-wrapper')) {
                console.log('Widget já existe');
                return;
            }

            if (customConfig) {
                for (var key in customConfig) {
                    if (customConfig.hasOwnProperty(key) && this.config.hasOwnProperty(key)) {
                        this.config[key] = customConfig[key];
                    }
                }
            }

            // Carregar lojas do GitHub via jsDelivr
            this.loadStores(function() {
                self.injectStyles();
                self.createWidget();
                
                setTimeout(function() {
                    self.attachEventListeners();
                    console.log('Alphabeto Widget: Pronto!');
                }, 100);
            });
        },

        // Carregar lojas do GitHub
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
                        console.log('Lojas carregadas com sucesso:', self.stores.length);
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
                console.error('Erro de rede ao carregar lojas');
                self.loadFallbackStores();
                if (callback) callback();
            };
            
            xhr.send();
        },

        // Carregar lojas de fallback
        loadFallbackStores: function() {
            console.log('Usando lojas de fallback');
            this.stores = [
                { id: 37, name: "Alphabeto Aliança Shopping", address: "Praça Doutor Augusto Glória, 327 - Centro", city: "São João Nepomuceno", state: "MG", cep: "36680-000", whatsapp: "5532991295904", lat: -21.5388, lng: -43.0089, hours: "Seg-Sáb: 9h-18h | Dom: 9h-14h" },
                { id: 31, name: "Alphabeto Barra Shopping", address: "Avenida das Américas, 4666 - Barra da Tijuca", city: "Rio de Janeiro", state: "RJ", cep: "22640-102", whatsapp: "5521996628735", lat: -23.0049, lng: -43.3211, hours: "Seg-Sáb: 10h-22h | Dom: 13h-21h" },
                { id: 6, name: "Alphabeto Morumbi Shopping", address: "Avenida Roque Petroni Júnior, 1089 - Vila Gertrudes", city: "São Paulo", state: "SP", cep: "04707-900", whatsapp: "5511930402110", lat: -23.6224, lng: -46.6993, hours: "Seg-Sáb: 10h-22h | Dom: 14h-20h" }
            ];
            this.sacInfo = { name: "Fadinhas do SAC", whatsapp: "5521999999999", message: "Olá! Gostaria de falar com as Fadinhas do SAC da Alphabeto! 🧚‍♀️" };
        },

        // Estilos CSS
        injectStyles: function() {
            var styles = `
                .alphabeto-widget-wrapper * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
                .alphabeto-widget-button { position: fixed; width: 64px; height: 64px; border-radius: 50%; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); border: none; cursor: pointer; z-index: 999999; }
                .alphabeto-widget-button:hover { transform: scale(1.1); box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2); }
                .alphabeto-widget-button svg { width: 32px; height: 32px; }
                .alphabeto-widget-pulse { position: absolute; top: -4px; right: -4px; width: 12px; height: 12px; background: #22c55e; border-radius: 50%; animation: alphabeto-pulse 2s infinite; }
                @keyframes alphabeto-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
                .alphabeto-widget-modal { position: fixed; right: 0; top: 0; height: 100%; width: 100%; max-width: 400px; background: white; box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1); z-index: 999999; transition: transform 0.3s ease; transform: translateX(100%); display: flex; flex-direction: column; }
                .alphabeto-widget-modal.open { transform: translateX(0); }
                .alphabeto-widget-header { background: linear-gradient(to right, #FF6B35, #F7931E); color: white; padding: 20px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
                .alphabeto-widget-header h2 { font-size: 24px; font-weight: bold; }
                .alphabeto-widget-close { background: none; border: none; color: white; cursor: pointer; font-size: 28px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 4px; transition: background 0.2s; line-height: 1; padding: 0; }
                .alphabeto-widget-close:hover { background: rgba(255, 255, 255, 0.2); }
                .alphabeto-widget-content { flex: 1; overflow-y: auto; padding: 24px; }
                .alphabeto-widget-input { width: 100%; padding: 12px 16px; border: 2px solid #fed7aa; border-radius: 8px; font-size: 16px; transition: border-color 0.2s; }
                .alphabeto-widget-input:focus { outline: none; border-color: #FF6B35; }
                .alphabeto-widget-btn { width: 100%; padding: 12px 16px; background: linear-gradient(to right, #FF6B35, #F7931E); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; transition: opacity 0.2s; margin-bottom: 12px; }
                .alphabeto-widget-btn:hover { opacity: 0.9; }
                .alphabeto-widget-btn:disabled { opacity: 0.5; cursor: not-allowed; }
                .alphabeto-widget-btn-secondary { background: white; color: #FF6B35; border: 2px solid #FF6B35; }
                .alphabeto-widget-btn-secondary:hover { background: #fff7ed; }
                .alphabeto-widget-btn-sac { background: white; color: #8B5CF6; padding: 12px 20px; border-radius: 12px; font-weight: 600; transition: all 0.2s ease; border: 2px solid #E9D5FF; cursor: pointer; font-size: 15px; display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; }
                .alphabeto-widget-btn-sac:hover { background: #FAF5FF; border-color: #C084FC; transform: translateY(-1px); }
                .alphabeto-widget-store { border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 12px; cursor: pointer; transition: all 0.2s; background: white; position: relative; }
                .alphabeto-widget-store:hover { background: #f9fafb; border-color: #d1d5db; }
                .alphabeto-widget-store.featured { border: 2px solid #FF6B35; background: #fff7ed; }
                .alphabeto-widget-store h5 { font-weight: bold; margin-bottom: 4px; color: #111827; }
                .alphabeto-widget-store p { font-size: 14px; color: #6b7280; margin: 0; }
                .alphabeto-widget-badge { display: inline-block; background: #FF6B35; color: white; font-size: 12px; padding: 2px 8px; border-radius: 9999px; margin-bottom: 8px; }
                .alphabeto-widget-distance { position: absolute; top: 16px; right: 16px; font-weight: bold; color: #FF6B35; }
                .alphabeto-widget-loading { text-align: center; padding: 40px; }
                .alphabeto-widget-spinner { display: inline-block; width: 40px; height: 40px; border: 3px solid #f3f4f6; border-top: 3px solid #FF6B35; border-radius: 50%; animation: spin 1s linear infinite; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                .alphabeto-widget-back { color: #FF6B35; font-weight: bold; cursor: pointer; margin-bottom: 16px; display: inline-flex; align-items: center; }
                .alphabeto-widget-back:hover { text-decoration: underline; }
                .alphabeto-widget-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); z-index: 999998; opacity: 0; transition: opacity 0.3s; pointer-events: none; }
                .alphabeto-widget-overlay.show { opacity: 1; pointer-events: auto; }
                .alphabeto-widget-divider { height: 1px; background: #e5e7eb; margin: 24px 0; }
                @media (max-width: 640px) { .alphabeto-widget-modal { max-width: 100%; } }
            `;

            var styleElement = document.createElement('style');
            styleElement.textContent = styles;
            document.head.appendChild(styleElement);
        },

        // Criar HTML do widget
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
            button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4M5 21V10.85M19 21V10.85"/></svg><div class="alphabeto-widget-pulse"></div>';
            
            // Modal
            var modal = document.createElement('div');
            modal.className = 'alphabeto-widget-modal';
            modal.id = 'alphabeto-widget-modal';
            
            // Header
            var header = document.createElement('div');
            header.className = 'alphabeto-widget-header';
            header.innerHTML = '<h2>Lojas Alphabeto</h2><button class="alphabeto-widget-close" id="alphabeto-widget-close">×</button>';
            
            // Content
            var content = document.createElement('div');
            content.className = 'alphabeto-widget-content';
            content.id = 'alphabeto-widget-content';
            content.innerHTML = this.renderMainMenu();
            
            // Overlay
            var overlay = document.createElement('div');
            overlay.className = 'alphabeto-widget-overlay';
            overlay.id = 'alphabeto-widget-overlay';
            
            modal.appendChild(header);
            modal.appendChild(content);
            
            wrapper.appendChild(button);
            wrapper.appendChild(modal);
            wrapper.appendChild(overlay);
            
            document.body.appendChild(wrapper);
        },

        // Menu principal
        renderMainMenu: function() {
            var html = '<div>';
            html += '<h3 style="font-size: 20px; font-weight: bold; margin-bottom: 24px;">Encontre a loja mais próxima</h3>';
            
            // Botão de geolocalização
            html += '<button class="alphabeto-widget-btn" id="alphabeto-widget-geolocation">';
            html += '📍 Usar minha localização atual';
            html += '</button>';
            
            html += '<div style="text-align: center; margin: 16px 0; color: #6b7280;">ou</div>';
            
            // Campo de busca
            html += '<input type="text" placeholder="Digite sua cidade, CEP ou endereço..." class="alphabeto-widget-input" id="alphabeto-widget-search-input" style="margin-bottom: 12px;" />';
            html += '<button class="alphabeto-widget-btn alphabeto-widget-btn-secondary" id="alphabeto-widget-search-btn">🔍 Buscar lojas</button>';
            
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
            
            // Todas as lojas
            html += '<div style="margin-top: 32px;">';
            html += '<h4 style="font-size: 16px; font-weight: bold; margin-bottom: 16px;">Todas as lojas</h4>';
            
            // Mostrar apenas as primeiras 10 lojas
            for (var i = 0; i < Math.min(10, this.stores.length); i++) {
                var store = this.stores[i];
                html += '<div class="alphabeto-widget-store" data-store-id="' + store.id + '">';
                html += '<h5>' + store.name + '</h5>';
                html += '<p>' + store.city + ', ' + store.state + '</p>';
                html += '<p style="font-size: 12px; margin-top: 4px; color: #9ca3af;">' + store.address + '</p>';
                html += '</div>';
            }
            
            html += '</div></div>';
            return html;
        },

        // Formatar CEP
        formatCEP: function(cep) {
            return cep.replace(/\D/g, '');
        },

        // Verificar se é CEP
        isCEP: function(value) {
            var cleaned = this.formatCEP(value);
            return cleaned.length === 8 && /^\d{8}$/.test(cleaned);
        },

        // Buscar por endereço melhorado
        searchByAddress: function(address) {
            var self = this;
            
            if (!address || address.trim() === '') {
                alert('Por favor, digite um endereço, cidade ou CEP');
                return;
            }
            
            document.getElementById('alphabeto-widget-content').innerHTML = this.renderLoading();
            
            if (this.isCEP(address)) {
                var cepFormatted = this.formatCEP(address);
                
                var viacepUrl = 'https://viacep.com.br/ws/' + cepFormatted + '/json/';
                var xhr = new XMLHttpRequest();
                xhr.open('GET', viacepUrl, true);
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        try {
                            var data = JSON.parse(xhr.responseText);
                            if (!data.erro) {
                                var searchAddress = data.logradouro + ', ' + data.localidade + ', ' + data.uf + ', Brasil';
                                self.geocodeAddress(searchAddress);
                            } else {
                                self.geocodeAddress(address + ', Brasil');
                            }
                        } catch (e) {
                            self.geocodeAddress(address + ', Brasil');
                        }
                    } else {
                        self.geocodeAddress(address + ', Brasil');
                    }
                };
                xhr.onerror = function() {
                    self.geocodeAddress(address + ', Brasil');
                };
                xhr.send();
            } else {
                this.geocodeAddress(address + ', Brasil');
            }
        },

        // Geocoding melhorado
        geocodeAddress: function(searchAddress) {
            var self = this;
            
            var url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + 
                     encodeURIComponent(searchAddress) + '&countrycodes=br&limit=1';
            
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    if (data && data[0]) {
                        var lat = parseFloat(data[0].lat);
                        var lng = parseFloat(data[0].lon);
                        self.handleLocationSuccess(lat, lng);
                    } else {
                        alert('Endereço não encontrado. Tente ser mais específico.');
                        document.getElementById('alphabeto-widget-content').innerHTML = self.renderMainMenu();
                        self.attachMenuListeners();
                    }
                } else {
                    alert('Erro ao buscar endereço. Tente novamente.');
                    document.getElementById('alphabeto-widget-content').innerHTML = self.renderMainMenu();
                    self.attachMenuListeners();
                }
            };
            xhr.send();
        },

        // Renderizar loading
        renderLoading: function() {
            return '<div class="alphabeto-widget-loading"><div class="alphabeto-widget-spinner"></div><p style="margin-top: 16px; color: #6b7280;">Buscando lojas próximas...</p></div>';
        },

        // Renderizar resultados
        renderResults: function(stores) {
            var html = '<div>';
            html += '<div class="alphabeto-widget-back" id="alphabeto-widget-back">← Voltar</div>';
            
            if (stores.length === 0) {
                html += '<div style="text-align: center; padding: 40px;">';
                html += '<p style="font-size: 48px; margin-bottom: 16px;">😔</p>';
                html += '<h3 style="font-size: 20px; font-weight: bold; margin-bottom: 8px;">Nenhuma loja encontrada</h3>';
                html += '<p style="color: #6b7280;">Tente buscar por outra localização</p>';
                html += '</div>';
            } else {
                html += '<h3 style="font-size: 20px; font-weight: bold; margin-bottom: 16px;">Lojas encontradas</h3>';
                html += '<p style="color: #6b7280; margin-bottom: 24px;">Ordenadas por proximidade</p>';
                
                for (var i = 0; i < stores.length; i++) {
                    var store = stores[i];
                    var isFeatured = i === 0 && store.distance < 50;
                    
                    html += '<div class="alphabeto-widget-store ' + (isFeatured ? 'featured' : '') + '" data-store-id="' + store.id + '">';
                    
                    if (isFeatured) {
                        html += '<div class="alphabeto-widget-badge">Mais próxima</div>';
                    }
                    
                    if (store.distance !== undefined) {
                        html += '<div class="alphabeto-widget-distance">' + store.distance.toFixed(1) + ' km</div>';
                    }
                    
                    html += '<h5>' + store.name + '</h5>';
                    html += '<p>' + store.city + ', ' + store.state + '</p>';
                    html += '<p style="font-size: 12px; margin-top: 4px; color: #9ca3af;">' + store.address + '</p>';
                    
                    if (store.hours) {
                        html += '<p style="font-size: 12px; margin-top: 8px; color: #6b7280;">⏰ ' + store.hours.split('|')[0] + '</p>';
                    }
                    
                    html += '</div>';
                }
            }
            
            html += '</div>';
            return html;
        },

        // Calcular distância
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

        // Usar geolocalização
        useGeolocation: function() {
            var self = this;
            
            if (!navigator.geolocation) {
                alert('Seu navegador não suporta geolocalização');
                return;
            }
            
            document.getElementById('alphabeto-widget-content').innerHTML = this.renderLoading();
            
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    self.handleLocationSuccess(position.coords.latitude, position.coords.longitude);
                },
                function(error) {
                    var message = 'Não foi possível obter sua localização.';
                    if (error.code === 1) {
                        message = 'Permissão de localização negada. Por favor, digite seu endereço.';
                    }
                    alert(message);
                    document.getElementById('alphabeto-widget-content').innerHTML = self.renderMainMenu();
                    self.attachMenuListeners();
                },
                { enableHighAccuracy: true, timeout: 10000 }
            );
        },

        // Processar localização encontrada
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
            
            document.getElementById('alphabeto-widget-content').innerHTML = this.renderResults(storesWithDistance);
            this.attachResultsListeners();
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

        // Menu listeners
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

        // Results listeners
        attachResultsListeners: function() {
            var self = this;
            
            var back = document.getElementById('alphabeto-widget-back');
            if (back) {
                back.onclick = function() {
                    document.getElementById('alphabeto-widget-content').innerHTML = self.renderMainMenu();
                    self.attachMenuListeners();
                };
            }
            
            this.attachStoreClicks();
        },

        // Store clicks
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

        // Get store by ID
        getStoreById: function(id) {
            for (var i = 0; i < this.stores.length; i++) {
                if (this.stores[i].id === id) {
                    return this.stores[i];
                }
            }
            return null;
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

        // Close modal
        closeModal: function() {
            this.state.isOpen = false;
            var modal = document.getElementById('alphabeto-widget-modal');
            var overlay = document.getElementById('alphabeto-widget-overlay');
            
            modal.className = 'alphabeto-widget-modal';
            overlay.className = 'alphabeto-widget-overlay';
        },

        // Open WhatsApp
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

        // Open SAC WhatsApp
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