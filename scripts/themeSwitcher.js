class ThemeSwitcher extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }); // Usar Shadow DOM para encapsular el estilo
      this.isDarkMode = false; // Estado inicial (claro)
    }
  
    connectedCallback() {
      // Crear el botón para cambiar de tema
      const button = document.createElement('button');
      button.textContent = '🌙'; // Usamos un ícono de luna para el tema oscuro
  
      // Estilo del botón
      const style = document.createElement('style');
      style.textContent = `
        button {
          background-color: transparent;
          color: #6366f1; /* Color del botón en estado claro */
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 50%;
          padding: 8px;
          margin-left: 10px; /* Espacio entre los elementos del navbar */
        }
  
        button:hover {
          background-color: #6366f1; /* Fondo cuando el botón es hover */
          color: white;
        }
  
        button:focus {
          outline: none;
        }
  
        /* Cuando el modo oscuro está activado */
        body.dark-mode button {
          color: #fff; /* Cambiar color a blanco en modo oscuro */
        }
      `;
  
      // Añadir estilo al Shadow DOM
      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(button);
  
      // Evento para cambiar el tema
      button.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
  
    toggleTheme() {
      // Cambiar el estado de tema (de claro a oscuro o viceversa)
      this.isDarkMode = !this.isDarkMode;
  
      // Cambiar el tema en el documento principal
      if (this.isDarkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        this.shadowRoot.querySelector('button').textContent = '🌞'; // Cambiar el ícono a sol
      } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        this.shadowRoot.querySelector('button').textContent = '🌙'; // Cambiar el ícono a luna
      }
    }
  }
  
  // Registrar el Web Component
window.customElements.define('theme-switcher', ThemeSwitcher);
  