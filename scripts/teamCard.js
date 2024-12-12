class ServiceCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Inyectar contenido HTML y estilos en el elemento
    this.innerHTML = `
      ${this.templateCss()}
      ${this.templateHtml()}
    `;
  }

  templateHtml() {
    const icon = this.getAttribute("icon") || "fa-tasks";
    const title = this.getAttribute("title") || "Título del Servicio";
    const description =
      this.getAttribute("description") || "Descripción del servicio";

    return `
      <div class="service-card">
          <i class="fas ${icon} fa-3x mb-3"></i>
          <h3>${title}</h3>
          <p>${description}</p>
      </div>
    `;
  }

  templateCss() {
    return `
    <style>
      .service-card {
          text-align: center;
          background-color: var(--card-bg, #fff);
          color: var(--text-color, #333);
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease;
      }
      .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
      }
      .service-card i {
          color: var(--icon-color, #007bff);
      }
      .service-card h3 {
          font-size: 1.25rem;
          margin: 15px 0;
      }
      .service-card p {
          font-size: 1rem;
      }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    `;
  }
}

window.customElements.define("service-card", ServiceCard);
