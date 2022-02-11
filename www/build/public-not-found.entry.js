import { r as registerInstance, h } from './index-c37bab2d.js';

let PublicNotFound = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", null, h("p", null, "404 not found")));
  }
};

export { PublicNotFound as public_not_found };
