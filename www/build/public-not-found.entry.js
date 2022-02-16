import { r as registerInstance, h } from './index-f1e2a249.js';

let PublicNotFound = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", null, h("p", null, "404 not found")));
  }
};

export { PublicNotFound as public_not_found };
