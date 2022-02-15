import { r as registerInstance, h } from './index-15e5713e.js';

let PublicNotFound = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", null, h("p", null, "404 not found")));
  }
};

export { PublicNotFound as public_not_found };
