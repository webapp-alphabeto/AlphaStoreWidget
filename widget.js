/**
 * Alphabeto Store Locator Widget
 * Version: 2.0.0 - Com Geolocalização e Busca por Proximidade
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

        // Lista completa de lojas
        stores: [
            { id: 1, name: "Alphabeto Shopping Manauara", address: "Avenida Mário Ypiranga, 1300 - Adrianópolis", city: "Manaus", state: "AM", whatsapp: "559294481001", lat: -3.1170, lng: -60.0258, hours: "Seg-Sáb: 10h-22h | Dom: 12h-21h" },
            { id: 2, name: "Alphabeto Salvador Shopping", address: "Avenida Tancredo Neves, 3133 - Caminho das Árvores", city: "Salvador", state: "BA", whatsapp: "5571996803770", lat: -12.9777, lng: -38.5016, hours: "Seg-Sáb: 9h-22h | Dom: 13h-21h" },
            { id: 3, name: "Alphabeto Shopping Barra", address: "Avenida Centenário, 2992 - Chame-Chame", city: "Salvador", state: "BA", whatsapp: "5571999963037", lat: -12.9777, lng: -38.5016, hours: "Seg-Sáb: 9h-22h | Dom: 12h-20h" },
            { id: 4, name: "Alphabeto Shopping Campo Grande", address: "Avenida Afonso Pena, 4909 - Cidade Jardim", city: "Campo Grande", state: "MS", whatsapp: "5567992312928", lat: -20.4428, lng: -54.6464, hours: "Seg-Sáb: 10h-22h | Dom: 12h-20h" },
            { id: 5, name: "Alphabeto Shopping da Bahia", address: "Avenida Tancredo Neves, 148 - Caminho das Árvores", city: "Salvador", state: "BA", whatsapp: "5571996636656", lat: -12.9777, lng: -38.5016, hours: "Seg-Sáb: 9h-22h | Dom: 13h-21h" },
            { id: 6, name: "Alphabeto Morumbi Shopping", address: "Avenida Roque Petroni Júnior, 1089 - Vila Gertrudes", city: "São Paulo", state: "SP", whatsapp: "5511930402110", lat: -23.5505, lng: -46.6333, hours: "Seg-Sáb: 10h-22h | Dom: 14h-20h" },
            { id: 7, name: "Alphabeto Shopping Partage", address: "Avenida Presidente Kennedy, 425 - Centro", city: "São Gonçalo", state: "RJ", whatsapp: "5521979216267", lat: -22.8271, lng: -43.0544, hours: "Seg-Sáb: 10h-22h | Dom: 13h-21h" },
            { id: 8, name: "Alphabeto Shopping Sulacap", address: "Avenida Marechal Fontenele, 3545 - Jardim Sulacap", city: "Rio de Janeiro", state: "RJ", whatsapp: "5521981210062", lat: -22.8886, lng: -43.3963, hours: "Seg-Sáb: 10h-22h | Dom: 15h-21h" },
            { id: 9, name: "Alphabeto Shopping Recreio", address: "Avenida das Américas, 19019 - Recreio dos Bandeirantes", city: "Rio de Janeiro", state: "RJ", whatsapp: "5521983378151", lat: -23.0174, lng: -43.4937, hours: "Seg-Sáb: 10h-22h | Dom: 15h-21h" },
            { id: 24, name: "Alphabeto Shopping Rio Sul", address: "Avenida Lauro Sodré, 445 - Botafogo", city: "Rio de Janeiro", state: "RJ", whatsapp: "5521971247415", lat: -22.9519, lng: -43.1778, hours: "Seg-Sáb: 10h-22h | Dom: 15h-21h" },
            { id: 29, name: "Alphabeto Centro Juiz de Fora", address: "Rua Barão de São João Nepomuceno, 409 - Centro", city: "Juiz de Fora", state: "MG", whatsapp: "5532984097290", lat: -21.7622, lng: -43.3434, hours: "Seg-Sex: 10h-19h | Sáb: 10h-15h" },
            { id: 30, name: "Alphabeto Shopping Independência", address: "Avenida Presidente Itamar Franco, 3600 - São Mateus", city: "Juiz de Fora", state: "MG", whatsapp: "553299109256", lat: -21.7622, lng: -43.3434, hours: "Seg-Sáb: 10h-22h | Dom: 13h-21h" },
            { id: 31, name: "Alphabeto Barra Shopping", address: "Avenida das Américas, 4666 - Barra da Tijuca", city: "Rio de Janeiro", state: "RJ", whatsapp: "5521996628735", lat: -23.0049, lng: -43.3211, hours: "Seg-Sáb: 10h-22h | Dom: 13h-21h" },
            { id: 34, name: "Alphabeto Shopping Via Barreiro", address: "Avenida Afonso Vaz de Melo, 640 - Barreiro", city: "Belo Horizonte", state: "MG", whatsapp: "553132342805", lat: -19.9760, lng: -44.0263, hours: "Seg-Sáb: 10h-22h | Dom: 14h-20h" },
            { id: 35, name: "Alphabeto Shopping Paragem", address: "Avenida Professor Mário Werneck, 1360 - Estoril", city: "Belo Horizonte", state: "MG", whatsapp: "5531971369325", lat: -19.9665, lng: -43.9901, hours: "Seg-Sáb: 10h-22h | Dom: 14h-20h" },
            { id: 36, name: "Alphabeto Shopping Minas", address: "Avenida Cristiano Machado, 4000 - União", city: "Belo Horizonte", state: "MG", whatsapp: "5531982839637", lat: -19.8483, lng: -43.9232, hours: "Seg-Sáb: 10h-22h | Dom: 14h-20h" },
            { id: 37, name: "Alphabeto Aliança Shopping", address: "Praça Doutor Augusto Glória, 327 - Centro", city: "São João Nepomuceno", state: "MG", whatsapp: "5532991295904", lat: -21.5388, lng: -43.0089, hours: "Seg-Sáb: 9h-18h | Dom: 9h-14h" },
            { id: 38, name: "Alphabeto Shopping Vitória", address: "Avenida Américo Buaiz, 200 - Enseada do Suá", city: "Vitória", state: "ES", whatsapp: "5527981318879", lat: -20.2976, lng: -40.2958, hours: "Seg-Sáb: 10h-22h | Dom: 14h-20h" },
            { id: 39, name: "Alphabeto Praia do Canto", address: "Rua Chapot Presvot, 249 - Praia do Canto", city: "Vitória", state: "ES", whatsapp: "5527981346858", lat: -20.2821, lng: -40.3015, hours: "Seg-Sáb: 9h-19h" },
            { id: 40, name: "Alphabeto Shopping Vila Velha", address: "Avenida Luciano das Neves, 2418 - Centro de Vila Velha", city: "Vila Velha", state: "ES", whatsapp: "5527998994781", lat: -20.3305, lng: -40.2922, hours: "Seg-Sáb: 10h-22h | Dom: 14h-20h" },
            { id: 41, name: "Alphabeto Taguatinga Shopping", address: "QS 1, 40 - Taguatinga", city: "Brasília", state: "DF", whatsapp: "556192165474", lat: -15.8333, lng: -48.0500, hours: "Seg-Sáb: 10h-22h | Dom: 14h-20h" },
            { id: 42, name: "Alphabeto Shopping Pátio Brasil", address: "Setor Comercial Sul - Asa Sul", city: "Brasília", state: "DF", whatsapp: "5561992395778", lat: -15.7939, lng: -47.8828, hours: "Seg-Sáb: 10h-22h | Dom: 14h-20h" },
            { id: 46, name: "Alphabeto Shopping Ibirapuera", address: "Avenida Ibirapuera, 3103 - Indianópolis", city: "São Paulo", state: "SP", whatsapp: "5511932888817", lat: -23.6117, lng: -46.6682, hours: "Seg-Sáb: 10h-22h | Dom: 14h-22h" },
            { id: 52, name: "Alphabeto São José dos Campos", address: "Avenida Andrômeda, 227 - Jardim Satélite", city: "São José dos Campos", state: "SP", whatsapp: "5512974085088", lat: -23.2237, lng: -45.9009, hours: "Seg-Sáb: 10h-22h | Dom: 13h-21h" },
            { id: 55, name: "Alphabeto Grand Plaza", address: "Avenida Industrial, 600 - Jardim", city: "Santo André", state: "SP", whatsapp: "5511997937700", lat: -23.6639, lng: -46.5383, hours: "Seg-Sáb: 10h-22h | Dom: 14h-20h" }
        ],

        // Estado do widget
        state: {
            isOpen: false,
            currentView: 'menu', // menu, searching, results
            userLocation: null,
            searchResults: [],
            isLoading: false
        },

        // Inicializar widget
        init: function(customConfig) {
            var self = this;
            
            if (document.getElementById('alphabeto-widget-wrapper')) {
                return;
            }

            if (customConfig) {
                for (var key in customConfig) {
                    if (customConfig.hasOwnProperty(key)) {
                        this.config[key] = customConfig[key];
                    }
                }
            }

            this.injectStyles();
            this.createWidget();
            
            setTimeout(function() {
                self.attachEventListeners();
            }, 100);
        },

        // Estilos CSS
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
                '.alphabeto-widget-btn { width: 100%; padding: 12px 16px; background: linear-gradient(to right, #FF6B35, #F7931E); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; transition: opacity 0.2s; margin-bottom: 12px; }',
                '.alphabeto-widget-btn:hover { opacity: 0.9; }',
                '.alphabeto-widget-btn:disabled { opacity: 0.5; cursor: not-allowed; }',
                '.alphabeto-widget-btn-secondary { background: white; color: #FF6B35; border: 2px solid #FF6B35; }',
                '.alphabeto-widget-btn-secondary:hover { background: #fff7ed; }',
                '.alphabeto-widget-store { border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 12px; cursor: pointer; transition: all 0.2s; background: white; position: relative; }',
                '.alphabeto-widget-store:hover { background: #f9fafb; border-color: #d1d5db; }',
                '.alphabeto-widget-store.featured { border: 2px solid #FF6B35; background: #fff7ed; }',
                '.alphabeto-widget-store h5 { font-weight: bold; margin-bottom: 4px; color: #111827; }',
                '.alphabeto-widget-store p { font-size: 14px; color: #6b7280; margin: 0; }',
                '.alphabeto-widget-badge { display: inline-block; background: #FF6B35; color: white; font-size: 12px; padding: 2px 8px; border-radius: 9999px; margin-bottom: 8px; }',
                '.alphabeto-widget-distance { position: absolute; top: 16px; right: 16px; font-weight: bold; color: #FF6B35; }',
                '.alphabeto-widget-loading { text-align: center; padding: 40px; }',
                '.alphabeto-widget-spinner { display: inline-block; width: 40px; height: 40px; border: 3px solid #f3f4f6; border-top: 3px solid #FF6B35; border-radius: 50%; animation: spin 1s linear infinite; }',
                '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }',
                '.alphabeto-widget-back { color: #FF6B35; font-weight: bold; cursor: pointer; margin-bottom: 16px; display: inline-flex; align-items: center; }',
                '.alphabeto-widget-back:hover { text-decoration: underline; }',
                '.alphabeto-widget-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); z-index: 999998; opacity: 0; transition: opacity 0.3s; pointer-events: none; }',
                '.alphabeto-widget-overlay.show { opacity: 1; pointer-events: auto; }',
                '@media (max-width: 640px) { .alphabeto-widget-modal { max-width: 100%; } }'
            ].join('\n');

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
            button.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4M5 21V10.85M19 21V10.85"/></svg><div class="alphabeto-widget-pulse"></div>';
            
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
            var R = 6371; // Raio da Terra em km
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
            
            // Mostrar loading
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

        // Buscar por endereço
        searchByAddress: function(address) {
            var self = this;
            
            if (!address || address.trim() === '') {
                alert('Por favor, digite um endereço, cidade ou CEP');
                return;
            }
            
            // Mostrar loading
            document.getElementById('alphabeto-widget-content').innerHTML = this.renderLoading();
            
            // Geocoding via Nominatim
            var searchAddress = address + ', Brasil';
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

        // Processar localização encontrada
        handleLocationSuccess: function(lat, lng) {
            var self = this;
            
            // Calcular distâncias
            var storesWithDistance = [];
            for (var i = 0; i < this.stores.length; i++) {
                var store = Object.assign({}, this.stores[i]);
                store.distance = this.calculateDistance(lat, lng, store.lat, store.lng);
                storesWithDistance.push(store);
            }
            
            // Ordenar por distância
            storesWithDistance.sort(function(a, b) {
                return a.distance - b.distance;
            });
            
            // Salvar resultados
            this.state.searchResults = storesWithDistance;
            
            // Mostrar resultados
            document.getElementById('alphabeto-widget-content').innerHTML = this.renderResults(storesWithDistance);
            this.attachResultsListeners();
        },

        // Event listeners
        attachEventListeners: function() {
            var self = this;
            
            // Toggle
            var toggle = document.getElementById('alphabeto-widget-toggle');
            if (toggle) {
                toggle.onclick = function() {
                    self.toggleModal();
                };
            }
            
            // Close
            var close = document.getElementById('alphabeto-widget-close');
            if (close) {
                close.onclick = function() {
                    self.closeModal();
                };
            }
            
            // Overlay
            var overlay = document.getElementById('alphabeto-widget-overlay');
            if (overlay) {
                overlay.onclick = function() {
                    self.closeModal();
                };
            }
            
            // Menu listeners
            this.attachMenuListeners();
        },

        // Menu listeners
        attachMenuListeners: function() {
            var self = this;
            
            // Geolocalização
            var geoBtn = document.getElementById('alphabeto-widget-geolocation');
            if (geoBtn) {
                geoBtn.onclick = function() {
                    self.useGeolocation();
                };
            }
            
            // Busca
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
            
            // Clique nas lojas
            this.attachStoreClicks();
        },

        // Results listeners
        attachResultsListeners: function() {
            var self = this;
            
            // Voltar
            var back = document.getElementById('alphabeto-widget-back');
            if (back) {
                back.onclick = function() {
                    document.getElementById('alphabeto-widget-content').innerHTML = self.renderMainMenu();
                    self.attachMenuListeners();
                };
            }
            
            // Clique nas lojas
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
        }
    };

    // Auto-inicializar
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