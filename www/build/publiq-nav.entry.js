import { r as registerInstance, h } from './index-15e5713e.js';

let PubliqNav = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", null, h("stencil-route-link", { url: "/" }, h("button", { type: "button", class: "btn btn-primary" }, "accueil")), h("stencil-route-link", { url: "/connexion" }, h("button", { type: "button", class: "btn btn-primary" }, "connexion"))));
  }
};

export { PubliqNav as publiq_nav };
