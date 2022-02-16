import { r as registerInstance, h } from './index-c37bab2d.js';

const appHomeCss = "";

let AppHome = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  async _getData(event) {
    this.history.push(`/tags-ressources/${event.target.value}`, {}); // Permet de charger une nouvelle page (ici c'est l'accueil car aucun)
  }
  render() {
    return (h("div", { class: "app-home" }, h("p", null, h("h1", null, "Accueil"), h("a", { href: "https://stenciljs.com" }, "stenciljs.com"), " to get started."), h("button", { value: 'sante', onClick: (event) => this._getData(event) }, "Sant\u00E9"), h("br", null), h("button", { value: 'education', onClick: (event) => this._getData(event) }, "Education"), h("br", null), h("button", { value: 'sport', onClick: (event) => this._getData(event) }, "Sports"), h("br", null), h("button", { value: 'association', onClick: (event) => this._getData(event) }, "Associations"), h("br", null), h("button", { value: 'emploi', onClick: (event) => this._getData(event) }, "Emploi"), h("br", null), h("button", { value: 'senior', onClick: (event) => this._getData(event) }, "S\u00E9nior"), h("br", null), h("stencil-route-link", { url: "/profile/stencil" }, h("button", null, "Profile page"))));
  }
};
AppHome.style = appHomeCss;

export { AppHome as app_home };
