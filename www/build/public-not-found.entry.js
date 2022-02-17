import { r as registerInstance, h } from './index-156de0d2.js';

const publicNotFoundCss = ".erreur{margin-top:80px}";

let PublicNotFound = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", { class: "erreur text-center" }, h("p", null, "Erreur 404"), h("p", null, "Ressource non trouv\u00E9e")));
  }
};
PublicNotFound.style = publicNotFoundCss;

export { PublicNotFound as public_not_found };
