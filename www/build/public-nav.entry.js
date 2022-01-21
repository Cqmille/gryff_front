import { r as registerInstance, h } from './index-0bdf7134.js';

let PublicNav = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", null, h("button", { type: "button", class: "btn btn-primary" }, "Primary"), h("button", { type: "button", class: "btn btn-primary" }, "Primary"), h("button", { type: "button", class: "btn btn-primary" }, "Primary")));
  }
};

export { PublicNav as public_nav };
