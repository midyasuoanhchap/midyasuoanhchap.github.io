
// Global variables for dynamic data
let floodAlerts = [];
let waterStations = [];
let mapInstance = null;
let alertMarkers = [];
let stationMarkers = [];

// Simulated API endpoints
const API_BASE = 'https://api.openweathermap.org/data/2.5';

// Initialize real-time data
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    loadFloodAlerts();
    loadWaterStations();
    startRealTimeUpdates();
});

function initializeMap() {
    // Map will be initialized in the DOMContentLoaded event in index.html
    // This function can be used for additional map setup if needed
}

function loadFloodAlerts() {
    const alertsContainer = document.getElementById('alerts-container');
    
    // Show loading state
    alertsContainer.innerHTML = `
        <div class="animate-pulse text-center py-8">
            <i data-feather="loader" class="animate-spin mx-auto"></i>
            <p class="mt-2 text-gray-500">Loading flood data...</p>
        </div>
    `;
    
    // Simulate API call with real weather data
    setTimeout(() => {
        // Generate dynamic flood alerts based on conditions
        floodAlerts = [
            {
                id: Date.now() + 1,
                district: "Binh Thanh",
                level: "severe",
                message: "Severe flooding reported in central Binh Thanh district. Avoid travel in the area.",
                time: "15 minutes ago",
                coordinates: [10.803, 106.711]
            },
            {
                id: Date.now() + 2,
                district: "District 4",
                level: "moderate",
                message: "Moderate flooding at Nguyen Tat Thanh street. Water level rising.",
                time: "1 hour ago",
                coordinates: [10.760, 106.707]
            },
            {
                id: Date.now() + 3,
                district: "District 7",
                level: "minor",
                message: "Minor flooding near Phu My Hung area. No major disruptions reported.",
                time: "2 hours ago",
                coordinates: [10.735, 106.722]
            }
        ];
        
        renderAlerts();
    }, 1000);
}

function renderAlerts() {
    const alertsContainer = document.getElementById('alerts-container');
    alertsContainer.innerHTML = '';
    
    if (floodAlerts.length === 0) {
        alertsContainer.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i data-feather="check-circle" class="w-12 h-12 mx-auto mb-2 text-green-500"></i>
                <p>No active flood alerts</p>
            </div>
        `;
        feather.replace();
        return;
    }
    
    floodAlerts.forEach(alert => {
        const alertLevelClass = alert.level === 'severe' ? 'bg-red-100 border-red-300' : 
                              alert.level === 'moderate' ? 'bg-yellow-100 border-yellow-300' : 
                              'bg-blue-100 border-blue-300';
        
        const alertLevelText = alert.level === 'severe' ? 'Severe' : 
                              alert.level === 'moderate' ? 'Moderate' : 'Minor';
        
        const alertElement = document.createElement('div');
        alertElement.className = `p-3 mb-3 rounded-lg border ${alertLevelClass} cursor-pointer hover:shadow-md transition-shadow`;
        alertElement.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <span class="font-bold capitalize">${alertLevelText}</span>
                    <span class="text-gray-500 text-sm ml-2">${alert.time}</span>
                </div>
                ${alert.level === 'severe' ? '<span class="px-2 py-1 bg-red-500 text-white text-xs rounded-full">URGENT</span>' : ''}
            </div>
            <p class="mt-1 text-gray-800 text-sm">${alert.message}</p>
            <div class="mt-2 flex items-center justify-between text-sm text-gray-600">
                <div class="flex items-center">
                    <i data-feather="map-pin" class="w-4 h-4 mr-1"></i>
                    ${alert.district}
                </div>
                <button onclick="focusOnAlert(${alert.coordinates[0]}, ${alert.coordinates[1]})" class="text-blue-500 hover:text-blue-700 font-medium">
                    View on Map
                </button>
            </div>
        `;
        
        alertElement.onclick = function(e) {
            if (!e.target.closest('button')) {
                focusOnAlert(alert.coordinates[0], alert.coordinates[1]);
            }
        };
        
        alertsContainer.appendChild(alertElement);
    });
    
    feather.replace();
}
function loadWaterStations() {
    const stationsContainer = document.getElementById('stations-container');
    
    // Show loading state
    stationsContainer.innerHTML = `
        <div class="animate-pulse text-center py-8">
            <i data-feather="loader" class="animate-spin mx-auto"></i>
            <p class="mt-2 text-gray-500">Loading station data...</p>
        </div>
    `;
    
    // Simulate API call
    setTimeout(() => {
        // Initialize waterStations if not already exists
        if (typeof waterStations === 'undefined') {
            window.waterStations = [];
        }
        
        // Add default stations if array is empty
        if (waterStations.length === 0) {
            waterStations.push(
                { id: 1, name: 'District 1', level: 1.2, status: 'normal', coordinates: [10.770, 106.700] },
                { id: 2, name: 'District 4', level: 1.8, status: 'warning', coordinates: [10.760, 106.710] },
                { id: 3, name: 'Binh Thanh', level: 2.4, status: 'danger', coordinates: [10.810, 106.720] },
                { id: 4, name: 'District 7', level: 0.8, status: 'normal', coordinates: [10.740, 106.730] },
                { id: 5, name: 'Thu Duc', level: 1.5, status: 'warning', coordinates: [10.840, 106.760] },
                { id: 6, name: 'District 2', level: 0.9, status: 'normal', coordinates: [10.790, 106.760] },
                { id: 7, name: 'District 3', level: 1.6, status: 'warning', coordinates: [10.780, 106.690] }
            );
        }
        
        renderStations();
    }, 1200);
}
function renderStations() {
    const stationsContainer = document.getElementById('stations-container');
    stationsContainer.innerHTML = '';
    
    waterStations.forEach(station => {
        const statusColor = station.status === 'danger' ? 'bg-red-500' : 
                           station.status === 'warning' ? 'bg-yellow-500' : 
                           'bg-green-500';
        
        const statusText = station.status === 'danger' ? 'Critical' : 
                          station.status === 'warning' ? 'Warning' : 
                          'Normal';
        
        const stationElement = document.createElement('div');
        stationElement.className = 'flex justify-between items-center border-b pb-3 mb-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors';
        stationElement.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="w-3 h-3 rounded-full ${statusColor} animate-pulse"></div>
                <div>
                    <span class="font-medium">${station.name}</span>
                    <div class="text-xs text-gray-500">${statusText}</div>
                </div>
            </div>
            <div class="text-right">
                <span class="font-bold text-lg">${station.level}m</span>
                <div class="text-xs text-gray-500">Level</div>
            </div>
        `;
        
        stationElement.onclick = function() {
            focusOnStation(station.coordinates[0], station.coordinates[1], station.name);
        };
        
        stationsContainer.appendChild(stationElement);
    });
}

// Interactive functions
function focusOnAlert(lat, lng) {
    if (typeof L !== 'undefined' && window.map) {
        window.map.setView([lat, lng], 15);
        
        // Add temporary highlight
        const highlightIcon = L.divIcon({
            html: `<div class="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-red-400 opacity-75"></div>
                   <div class="relative inline-flex rounded-full h-4 w-4 bg-red-500"></div>`,
            className: '',
            iconSize: [32, 32]
        });
        
        const highlight = L.marker([lat, lng], { icon: highlightIcon }).addTo(window.map);
        setTimeout(() => window.map.removeLayer(highlight), 3000);
    }
}

function focusOnStation(lat, lng, name) {
    if (typeof L !== 'undefined' && window.map) {
        window.map.setView([lat, lng], 15);
        
        // Show popup for station
        const station = waterStations.find(s => s.name === name);
        if (station) {
            const popup = L.popup()
                .setLatLng([lat, lng])
                .setContent(`
                    <div class="p-2">
                        <h4 class="font-bold">${station.name} Station</h4>
                        <p>Water Level: <span class="font-bold">${station.level}m</span></p>
                        <p>Status: <span class="font-bold capitalize">${station.status}</span></p>
                        <small class="text-gray-500">Last updated: Just now</small>
                    </div>
                `)
                .openOn(window.map);
        }
    }
}

function refreshAlerts() {
    const btn = event.target.closest('button');
    const icon = btn.querySelector('i');
    icon.classList.add('animate-spin');
    
    // Simulate new data
    setTimeout(() => {
        loadFloodAlerts();
        icon.classList.remove('animate-spin');
        showNotification('Alerts refreshed successfully', 'success');
    }, 1000);
}

function refreshStations() {
    const btn = event.target.closest('button');
    const icon = btn.querySelector('i');
    icon.classList.add('animate-spin');
    
    // Simulate data update with random fluctuations
    setTimeout(() => {
        waterStations = waterStations.map(station => ({
            ...station,
            level: Math.max(0.5, Math.min(3.5, station.level + (Math.random() - 0.5) * 0.3)),
            status: station.level > 2.2 ? 'danger' : station.level > 1.5 ? 'warning' : 'normal'
        }));
        renderStations();
        icon.classList.remove('animate-spin');
        showNotification('Station data refreshed', 'success');
    }, 800);
}

function triggerEmergencyMode() {
    const confirmed = confirm('Are you sure you want to activate emergency mode? This will notify all emergency services.');
    if (confirmed) {
        document.body.classList.add('emergency-mode');
        showNotification('Emergency mode activated! All services notified.', 'error');
        
        // Simulate emergency actions
        setTimeout(() => {
            showNotification('Pump stations activated at maximum capacity', 'info');
        }, 2000);
        setTimeout(() => {
            showNotification('Flood gates closing sequence initiated', 'info');
        }, 4000);
    }
}
function exportReport() {
    const safeWaterStations = typeof waterStations !== 'undefined' ? waterStations : [];
    const safeFloodAlerts = typeof floodAlerts !== 'undefined' ? floodAlerts : [];
    
    const reportData = {
        timestamp: new Date().toISOString(),
        alerts: safeFloodAlerts,
        stations: safeWaterStations,
        summary: {
            totalAlerts: safeFloodAlerts.length,
            criticalAlerts: safeFloodAlerts.filter(a => a.level === 'severe').length,
            averageWaterLevel: safeWaterStations.length > 0 ? (safeWaterStations.reduce((sum, s) => sum + s.level, 0) / safeWaterStations.length).toFixed(2) : '0.00',
            criticalStations: safeWaterStations.filter(s => s.status === 'danger').length
        }
    };
const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `flood-report-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification('Report exported successfully', 'success');
}
function showStatistics() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    // Safely calculate statistics
    const stationCount = typeof waterStations !== 'undefined' ? waterStations.length : 0;
    const criticalStations = typeof waterStations !== 'undefined' ? waterStations.filter(s => s.status === 'danger').length : 0;
    const avgLevel = stationCount > 0 ? (waterStations.reduce((sum, s) => sum + s.level, 0) / stationCount).toFixed(2) : '0.00';
    const maxLevel = stationCount > 0 ? Math.max(...waterStations.map(s => s.level)).toFixed(2) : '0.00';
    
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 class="text-xl font-bold mb-4">Flood Statistics</h3>
            <div class="space-y-3">
                <div class="flex justify-between">
                    <span class="text-gray-600">Active Alerts:</span>
                    <span class="font-bold">${typeof floodAlerts !== 'undefined' ? floodAlerts.length : 0}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Critical Alerts:</span>
                    <span class="font-bold text-red-500">${typeof floodAlerts !== 'undefined' ? floodAlerts.filter(a => a.level === 'severe').length : 0}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Total Stations:</span>
                    <span class="font-bold">${stationCount}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Critical Stations:</span>
                    <span class="font-bold text-red-500">${criticalStations}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Avg Water Level:</span>
                    <span class="font-bold">${avgLevel}m</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Max Water Level:</span>
                    <span class="font-bold text-red-500">${maxLevel}m</span>
                </div>
            </div>
            <button onclick="this.closest('.fixed').remove()" class="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
                Close
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : 
                   type === 'error' ? 'bg-red-500' : 
                   type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500';
    
    notification.className = `fixed top-20 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i data-feather="${type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info'}" class="w-5 h-5 mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    feather.replace();
    
    setTimeout(() => {
        notification.classList.add('animate-slide-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
// Real-time updates
function startRealTimeUpdates() {
    // Update station data every 30 seconds
    setInterval(() => {
        if (typeof waterStations !== 'undefined') {
            waterStations = waterStations.map(station => ({
                ...station,
                level: Math.max(0.5, Math.min(3.5, station.level + (Math.random() - 0.5) * 0.2)),
                status: station.level > 2.2 ? 'danger' : station.level > 1.5 ? 'warning' : 'normal'
            }));
            renderStations();
        }
    }, 30000);
// Update alerts every 2 minutes
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance of new alert
            const districts = ['District 1', 'District 3', 'District 5', 'District 10', 'Phu Nhuan'];
            const levels = ['minor', 'moderate', 'severe'];
            const newAlert = {
                id: Date.now(),
                district: districts[Math.floor(Math.random() * districts.length)],
                level: levels[Math.floor(Math.random() * levels.length)],
                message: `New flood alert detected in ${districts[Math.floor(Math.random() * districts.length)]}`,
                time: 'Just now',
                coordinates: [10.7 + Math.random() * 0.2, 106.6 + Math.random() * 0.2]
            };
            
            floodAlerts.unshift(newAlert);
            if (floodAlerts.length > 5) floodAlerts.pop(); // Keep only 5 recent alerts
            renderAlerts();
            
            if (newAlert.level === 'severe') {
                showNotification(`Severe flood alert: ${newAlert.district}`, 'error');
            }
        }
    }, 120000);
}

// Emergency contacts function
function showEmergencyContacts() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h3 class="text-xl font-bold mb-4">Emergency Contacts</h3>
            <div class="space-y-4">
                <div class="border-l-4 border-red-500 pl-4">
                    <h4 class="font-bold text-red-600">Emergency Services</h4>
                    <p class="text-sm">Police: 113</p>
                    <p class="text-sm">Fire: 114</p>
                    <p class="text-sm">Ambulance: 115</p>
                </div>
                <div class="border-l-4 border-blue-500 pl-4">
                    <h4 class="font-bold text-blue-600">Flood Control Center</h4>
                    <p class="text-sm">Hotline: 1900 1234</p>
                    <p class="text-sm">24/7 Available</p>
                </div>
                <div class="border-l-4 border-green-500 pl-4">
                    <h4 class="font-bold text-green-600">District Offices</h4>
                    <p class="text-sm">District 1: (028) 3821 1234</p>
                    <p class="text-sm">District 4: (028) 3822 5678</p>
                    <p class="text-sm">Binh Thanh: (028) 3823 9012</p>
                </div>
            </div>
            <button onclick="this.closest('.fixed').remove()" class="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
                Close
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}
// Simulated chart data
function renderChart() {
    const chartContainer = document.getElementById('chart-container');
    chartContainer.innerHTML = `
        <div class="flex items-end h-full space-x-1">
            <div class="flex-1 bg-blue-200 rounded-t" style="height: 30%"></div>
            <div class="flex-1 bg-blue-300 rounded-t" style="height: 45%"></div>
            <div class="flex-1 bg-blue-400 rounded-t" style="height: 60%"></div>
            <div class="flex-1 bg-blue-500 rounded-t" style="height: 80%"></div>
            <div class="flex-1 bg-blue-600 rounded-t" style="height: 95%"></div>
            <div class="flex-1 bg-blue-700 rounded-t" style="height: 100%"></div>
            <div class="flex-1 bg-blue-600 rounded-t" style="height: 85%"></div>
            <div class="flex-1 bg-blue-500 rounded-t" style="height: 70%"></div>
        </div>
        <div class="flex justify-between text-xs text-gray-500 mt-2">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', renderChart);