import { r as registerInstance, h } from './index-c37bab2d.js';

const appRootCss = "header{background:#5851ff;color:white;height:56px;display:flex;align-items:center;box-shadow:0 2px 5px 0 rgba(0, 0, 0, 0.26)}h1{font-size:1.4rem;font-weight:500;color:#fff;padding:0 12px}";

let AppRoot = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", null, h("publiq-nav", null), h("main", null, h("stencil-router", null, h("stencil-route-switch", { scrollTopOffset: 0 }, h("stencil-route", { url: "/", component: "app-home", exact: true }), h("stencil-route", { url: "/profile/:name", component: "app-profile" }), h("stencil-route", { url: "/connexion", component: "user-connexion" }), h("stencil-route", { url: "/monEspace", component: "user-monespace" }), h("stencil-route", { component: "public-not-found" })))), h("publiq-footer", null)));
  }
};
AppRoot.style = appRootCss;

export { AppRoot as app_root };
