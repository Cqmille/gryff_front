import { r as registerInstance, h } from './index-156de0d2.js';
import { P as PATH } from './path-5d0f272b.js';

const publiqNavCss = "a{text-decoration:none}";

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
    return (h("header", null, h("nav", { class: "navbar fixed-top navbar-expand-md navbar-dark bg-primary d-flex flex-row" }, h("div", { class: "container-fluid" }, h("stencil-route-link", { url: "/" }, h("a", { class: "navbar-brand abs", href: "#" }, "(Re)ssources Relationnelles")), h("button", { class: "navbar-toggler ms-auto", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#collapseNavbar" }, h("span", { class: "navbar-toggler-icon" })), h("div", { class: "navbar-collapse collapse", id: "collapseNavbar" }, h("ul", { class: "navbar-nav" }, h("li", { class: "nav-item active" }, h("stencil-route-link", { url: "/" }, h("a", { class: "nav-link", href: "#" }, "Accueil"))), h("li", { class: "nav-item dropdown" }, h("a", { class: "nav-link dropdown-toggle", href: "#", id: "navbarScrollingDropdown", role: "button", "data-bs-toggle": "dropdown", "aria-expanded": "false" }, " Cat\u00E9gories "), h("ul", { class: "dropdown-menu dropdown-menu-right", "aria-labelledby": "navbarScrollingDropdown" }, h("li", null, h("stencil-route-link", { url: "/tags-ressources/sante" }, h("a", { class: "dropdown-item" }, "Sant\u00E9"))), h("li", null, h("stencil-route-link", { url: "/tags-ressources/education" }, h("a", { class: "dropdown-item" }, "\u00C9ducation"))), h("li", null, h("stencil-route-link", { url: "/tags-ressources/sport" }, h("a", { class: "dropdown-item" }, "Sports"))), h("li", null, h("stencil-route-link", { url: "/tags-ressources/association" }, h("a", { class: "dropdown-item" }, "Associations"))), h("li", null, h("stencil-route-link", { url: "/tags-ressources/emploi" }, h("a", { class: "dropdown-item" }, "Emploi"))), h("li", null, h("stencil-route-link", { url: "/tags-ressources/senior" }, h("a", { class: "dropdown-item" }, "S\u00E9nior"))), h("li", null, h("hr", { class: "dropdown-divider" })), h("li", null, h("a", { class: "dropdown-item", href: "#" }, "Au hasard")))), h("li", { class: "nav-item active" }, h("a", { class: "nav-link", href: "#" }, "Rechercher"))), this.connected ?
      h("ul", { class: "navbar-nav ms-auto" }, h("li", { class: "nav-item dropdown" }, h("a", { class: "nav-link dropdown-toggle", href: "#", id: "navbarScrollingDropdown", role: "button", "data-bs-toggle": "dropdown", "aria-expanded": "false" }, " mon compte "), h("ul", { class: "dropdown-menu dropdown-menu-right", "aria-labelledby": "navbarScrollingDropdown" }, h("li", null, h("stencil-route-link", { url: "/monEspace" }, h("a", { class: "dropdown-item" }, "mes ressources"))), h("li", null, h("stencil-route-link", { url: "/newRessource" }, h("a", { class: "dropdown-item" }, "cr\u00E9er ressource"))))))
      : h("ul", { class: "navbar-nav ms-auto" }, h("stencil-route-link", { url: "/connexion" }, h("li", { class: "nav-item" }, h("a", { class: "nav-link", "data-bs-target": "#myModal", "data-bs-toggle": "modal" }, "Connexion"))), h("stencil-route-link", { url: "/inscription" }, h("li", { class: "nav-item" }, h("a", { class: "nav-link", "data-bs-target": "#myModal", "data-bs-toggle": "modal" }, "Inscription")))))))));
  }
};
PubliqNav.style = publiqNavCss;

export { PubliqNav as publiq_nav };
