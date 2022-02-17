import { r as registerInstance, h } from './index-25b9a15f.js';

const appRootCss = "main{margin-top:70px}";

let AppRoot = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("body", null, h("header", null, h("publiq-nav", null)), h("main", null, h("stencil-router", null, h("stencil-route-switch", { scrollTopOffset: 0 }, h("stencil-route", { url: "/", component: "app-home", exact: true }), h("stencil-route", { url: "/profile/:name", component: "app-profile" }), h("stencil-route", { url: "/connexion/:message", component: "user-connexion" }), h("stencil-route", { url: "/monEspace", component: "user-monespace" }), h("stencil-route", { url: "/newRessource", component: "user-creationressource" }), h("stencil-route", { url: "/afficherressource", component: "publiq-affressource" }), h("stencil-route", { url: "/tags-ressources/:tags", component: "publiq-ressource-tags" }), h("stencil-route", { url: "/inscription", component: "user-inscription" }), h("stencil-route", { url: "/inscriptionValide", component: "user-inscription-valid" }), h("stencil-route", { url: "/monEspace2", component: "mod-monespace" }), h("stencil-route", { component: "public-not-found" }))))));
  }
};
AppRoot.style = appRootCss;

export { AppRoot as app_root };
