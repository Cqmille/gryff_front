import { r as registerInstance, h } from './index-15e5713e.js';

const publiqNavCss = ".nav{background-color:black}.nolink{text-decoration:none !important}";

let PubliqNav = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("header", null, h("nav", { class: "navbar fixed-top navbar-expand-md navbar-dark bg-primary d-flex flex-row" }, h("div", { class: "container-fluid" }, h("a", { class: "navbar-brand abs", href: "#" }, "(Re)ssources Relationnelles"), h("button", { class: "navbar-toggler ms-auto", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#collapseNavbar" }, h("span", { class: "navbar-toggler-icon" })), h("div", { class: "navbar-collapse collapse", id: "collapseNavbar" }, h("ul", { class: "navbar-nav" }, h("li", { class: "nav-item active" }, h("a", { class: "nav-link", href: "#" }, "Accueil")), h("li", { class: "nav-item dropdown" }, h("a", { class: "nav-link dropdown-toggle", href: "#", id: "navbarScrollingDropdown", role: "button", "data-bs-toggle": "dropdown", "aria-expanded": "false" }, " Cat\u00E9gories "), h("ul", { class: "dropdown-menu dropdown-menu-right", "aria-labelledby": "navbarScrollingDropdown" }, h("li", null, h("a", { class: "dropdown-item", href: "#" }, "Sant\u00E9")), h("li", null, h("a", { class: "dropdown-item", href: "#" }, "\u00C9ducation")), h("li", null, h("a", { class: "dropdown-item", href: "#" }, "Sports")), h("li", null, h("a", { class: "dropdown-item", href: "#" }, "Associations")), h("li", null, h("a", { class: "dropdown-item", href: "#" }, "Emploi")), h("li", null, h("a", { class: "dropdown-item", href: "#" }, "Senior")), h("li", null, h("hr", { class: "dropdown-divider" })), h("li", null, h("a", { class: "dropdown-item", href: "#" }, "Au hasard")))), h("li", { class: "nav-item active" }, h("a", { class: "nav-link", href: "#" }, "Rechercher"))), h("ul", { class: "navbar-nav ms-auto" }, h("stencil-route-link", { url: "/" }, h("li", { class: "nav-item" }, h("a", { class: "nav-link nolink", href: "", "data-bs-target": "#myModal", "data-bs-toggle": "modal" }, "Connexion"))), h("stencil-route-link", { url: "/connexion" }, h("li", { class: "nav-item" }, h("a", { class: "nav-link", href: "", "data-bs-target": "#myModal", "data-bs-toggle": "modal" }, "Inscription")))))))));
  }
};
PubliqNav.style = publiqNavCss;

export { PubliqNav as publiq_nav };
