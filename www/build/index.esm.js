import { A as ActiveRouter } from './active-router-33b7574e.js';
import './match-path-760e1797.js';
import './index-15e5713e.js';
import './location-utils-fea12957.js';

function injectHistory(Component) {
    ActiveRouter.injectProps(Component, ['history', 'location']);
}
