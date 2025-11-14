// components/flood-legend.js
class FloodLegend extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .legend-item { display: flex; align-items: center; margin-right: 16px; }
        .legend-icon { width: 24px; height: 24px; margin-right: 8px; }
      </style>
      <div class="flex flex-wrap items-center">
        <h4 class="mr-4 font-medium text-gray-700">Flood Controls:</h4>
        <div class="legend-item">
          <svg class="legend-icon" viewBox="0 0 24 24" fill="#3b82f6">
            <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z"/>
          </svg>
          <span>Operational</span>
        </div>
        <div class="legend-item">
          <svg class="legend-icon" viewBox="0 0 24 24" fill="#f59e0b">
            <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z"/>
          </svg>
          <span>Maintenance</span>
        </div>
      </div>
    `;
  }
}
customElements.define('custom-flood-legend', FloodLegend);