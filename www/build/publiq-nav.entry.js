import { r as registerInstance, h } from './index-25b9a15f.js';
import { P as PATH } from './path-5d0f272b.js';

const publiqNavCss = "#logo{max-height:40px}@media (max-width: 380px){#logo{max-height:26px}.menu-left{text-align:start}}stencil-route-link a{color:rgb(255, 255, 255);text-decoration:none}stencil-route-link p{color:black;margin:0}.dropdown-item{color:black !important}.navbar{box-shadow:rgba(100, 100, 111, 0.2) 0px 7px 29px 0px}.navbar :hover{color:rgb(9, 90, 100) !important}li>a>p{color:black;margin:0;align-items:center}";

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
  deconnexion() {
    window.document.querySelector('publiq-nav').setAttribute('connected', 'false');
    localStorage.setItem("userId", null);
    localStorage.setItem("token", null);
    localStorage.setItem('habilitation', null);
  }
  async componentWillLoad() {
    this.checkConnexion();
  }
  async _getData(event) {
    this.history.push(`/tags-ressources/${event.target.value}`, {}); // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
  }
  render() {
    return (h("header", null, h("nav", { class: "navbar fixed-top navbar-expand-md navbar-dark bg-primary d-flex flex-row text-light" }, h("div", { class: "container-fluid" }, h("stencil-route-link", { url: "/", class: "navbar-brand abs" }, h("img", { src: "/svg/ressources_logo.png", id: "logo", class: "ms-1" })), h("button", { class: "navbar-toggler ms-auto", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#collapseNavbar" }, h("span", { class: "navbar-toggler-icon" })), h("div", { class: "navbar-collapse collapse", id: "collapseNavbar" }, h("ul", { class: "navbar-nav" }, h("li", { class: "nav-item active" }, h("stencil-route-link", { url: "/", class: "nav-link text-light" }, "Accueil")), h("li", { class: "nav-item dropdown" }, h("a", { class: "nav-link dropdown-toggle text-light", href: "#", id: "navbarScrollingDropdown", role: "button", "data-bs-toggle": "dropdown", "aria-expanded": "false" }, " Cat\u00E9gories "), h("ul", { class: "dropdown-menu dropdown-menu-right", "aria-labelledby": "navbarScrollingDropdown" }, h("li", null, h("a", { class: "dropdown-item", href: "/tags-ressources/sante" }, h("p", null, "Sant\u00E9"))), h("li", null, h("a", { class: "dropdown-item", href: "/tags-ressources/education" }, h("p", null, "\u00C9ducation"))), h("li", null, h("a", { class: "dropdown-item", href: "/tags-ressources/sport" }, h("p", null, "Sports"))), h("li", null, h("a", { class: "dropdown-item", href: "/tags-ressources/association" }, h("p", null, "Associations"))), h("li", null, h("a", { class: "dropdown-item", href: "/tags-ressources/emploi" }, h("p", null, "Emploi"))), h("li", null, h("a", { class: "dropdown-item", href: "/tags-ressources/senior" }, h("p", null, "S\u00E9nior"))), h("li", null, h("hr", { class: "dropdown-divider" })), h("li", null, h("a", { class: "dropdown-item" }, "Au hasard")))), h("li", { class: "nav-item active" }, h("a", { class: "nav-link text-light", href: "#" }, "Rechercher"))), this.connected ?
      h("connexion-nav", { class: "navbar-nav ms-auto", habilitation: localStorage.getItem('habilitation') })
      : h("ul", { class: "navbar-nav ms-auto" }, h("li", { class: "nav-item" }, h("stencil-route-link", { url: "/connexion/''", class: "nav-link" }, "Connexion")), h("li", { class: "nav-item" }, h("stencil-route-link", { url: "/inscription", class: "nav-link" }, "Inscription"))))))));
  }
};
PubliqNav.style = publiqNavCss;

export { PubliqNav as publiq_nav };
