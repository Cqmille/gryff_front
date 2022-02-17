import { r as registerInstance, h } from './index-25b9a15f.js';
import { P as PATH } from './path-5d0f272b.js';

const publiqNavCss = "stencil-route-link a{color:rgba(255,255,255,0.55);text-decoration:none}stencil-route-link p{color:black;margin:0}.dropdown-item{color:black !important}";

let PubliqNav = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.test = 'testProps';
    this.connected = false;
  }
  async checkConnexion() {
    let response = await fetch(PATH.back + '/users/testAuth', {
      method: 'POST',
      headers: {
        authorization: localStorage.getItem('token'),
        userid: localStorage.getItem('userId')
      }
    });
    if (response.status == 201) {
      this.connected = true;
    }
  }
  async componentWillLoad() {
    this.checkConnexion();
  }
  async _getData(event) {
    this.history.push(`/tags-ressources/${event.target.value}`, {}); // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
  }
  render() {
    return (h("header", null, h("nav", { class: "navbar fixed-top navbar-expand-md navbar-dark bg-primary d-flex flex-row" }, h("div", { class: "container-fluid" }, h("stencil-route-link", { url: "/", class: "navbar-brand abs" }, "(Re)ssources Relationnelles"), h("button", { class: "navbar-toggler ms-auto", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#collapseNavbar" }, h("span", { class: "navbar-toggler-icon" })), h("div", { class: "navbar-collapse collapse", id: "collapseNavbar" }, h("ul", { class: "navbar-nav" }, h("li", { class: "nav-item active" }, h("stencil-route-link", { url: "/", class: "nav-link" }, "Accueil")), h("li", { class: "nav-item dropdown" }, h("a", { class: "nav-link dropdown-toggle", href: "#", id: "navbarScrollingDropdown", role: "button", "data-bs-toggle": "dropdown", "aria-expanded": "false" }, " Cat\u00E9gories "), h("ul", { class: "dropdown-menu dropdown-menu-right", "aria-labelledby": "navbarScrollingDropdown" }, h("li", null, h("stencil-route-link", { class: "dropdown-item", url: "/tags-ressources/sante" }, h("p", null, "Sant\u00E9"))), h("li", null, h("stencil-route-link", { class: "dropdown-item", url: "/tags-ressources/education" }, h("p", null, "\u00C9ducation"))), h("li", null, h("stencil-route-link", { class: "dropdown-item", url: "/tags-ressources/sport" }, h("p", null, "Sports"))), h("li", null, h("stencil-route-link", { class: "dropdown-item", url: "/tags-ressources/association" }, h("p", null, "Associations"))), h("li", null, h("stencil-route-link", { class: "dropdown-item", url: "/tags-ressources/emploi" }, h("p", null, "Emploi"))), h("li", null, h("stencil-route-link", { class: "dropdown-item", url: "/tags-ressources/senior" }, h("p", null, "S\u00E9nior"))), h("li", null, h("hr", { class: "dropdown-divider" })), h("li", null, h("a", { class: "dropdown-item" }, "Au hasard")))), h("li", { class: "nav-item active" }, h("a", { class: "nav-link", href: "#" }, "Rechercher"))), this.connected ?
      h("ul", { class: "navbar-nav ms-auto" }, h("li", { class: "nav-item dropdown" }, h("a", { class: "nav-link dropdown-toggle", href: "#", id: "navbarScrollingDropdown", role: "button", "data-bs-toggle": "dropdown", "aria-expanded": "false" }, " mon compte "), h("ul", { class: "dropdown-menu dropdown-menu-right", "aria-labelledby": "navbarScrollingDropdown" }, h("li", null, h("stencil-route-link", { url: "/monEspace", class: "nav-link" }, h("p", null, "Mes ressources"))), h("li", null, h("stencil-route-link", { url: "/newRessource", class: "nav-link" }, h("p", null, "Cr\u00E9er ressource"))))))
      : h("ul", { class: "navbar-nav ms-auto" }, h("li", { class: "nav-item" }, h("stencil-route-link", { url: "/connexion/''", class: "nav-link" }, "Connexion")), h("li", { class: "nav-item" }, h("stencil-route-link", { url: "/inscription", class: "nav-link" }, "Inscription"))))))));
  }
};
PubliqNav.style = publiqNavCss;

export { PubliqNav as publiq_nav };
