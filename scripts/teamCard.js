class TeamCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    ${this.templateCss()}
    ${this.templateHtml()}
    `;
  }

  templateHtml() {
    const name = this.getAttribute("name") || "Anonymous";
    const role = this.getAttribute("role") || "Role not specified";
    const image =
      this.getAttribute("image") || "https://via.placeholder.com/150";
    const email = this.getAttribute("email") || "No email provided";

    return `
    <div class="team-card">
      <img src="${image}" alt="${name}'s photo" />
      <h2>${name}</h2>
      <p>${role}</p>
      <a href="mailto:${email}">${email}</a>
    </div>

    `;
  }

  templateCss() {
    return `
        <style>
          .team-card {
            display: block;
            margin: 15px;
            width: 300px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            background: var(--card-bg, #fff);
            color: var(--text-color, #333);
            font-family: Arial, sans-serif;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
        .team-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
          }
          .team-card {
            text-align: center;
            padding: 20px;
          }
          .team-card img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin-bottom: 15px;
          }
          .team-card h2 {
            font-size: 1.2rem;
            margin: 0;
            color: inherit;
          }
          .team-card p {
            font-size: 0.9rem;
            margin: 5px 0 10px;
          }
          .team-card a {
            font-size: 0.9rem;
            color: var(--link-color, #007BFF);
            text-decoration: none;
          }
          .team-card a:hover {
            text-decoration: underline;
          }
        </style>
      `;
  }
}

window.customElements.define("team-card", TeamCard);
