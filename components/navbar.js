class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .navbar {
          transition: all 0.3s ease;
        }
        .navbar-scrolled {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
      </style>
      <nav class="navbar bg-blue-600 text-white py-4 px-6 lg:px-12 w-full fixed top-0 z-50">
        <div class="container mx-auto flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <i data-feather="droplet" class="w-6 h-6"></i>
            <a href="/" class="text-xl font-bold">FloodSentry Saigon</a>
          </div>
          <div class="hidden md:flex items-center space-x-8">
            <a href="#map" class="hover:text-blue-200 font-medium">Live Map</a>
            <a href="#alerts-container" class="hover:text-blue-200">Alerts</a>
            <a href="#stations-container" class="hover:text-blue-200">Stations</a>
            <a href="#" onclick="showStatistics(); return false;" class="hover:text-blue-200">Forecast</a>
            <a href="#" onclick="showEmergencyContacts(); return false;" class="hover:text-blue-200">Resources</a>
          </div>
<div class="flex items-center space-x-4">
            <button class="md:hidden">
              <i data-feather="menu" class="w-6 h-6"></i>
            </button>
            <a href="#" class="hidden md:block bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg font-medium">
              Emergency Contacts
            </a>
          </div>
        </div>
      </nav>
      <div class="h-16"></div> <!-- Spacer for fixed navbar -->
    `;
  }
}

customElements.define('custom-navbar', CustomNavbar);