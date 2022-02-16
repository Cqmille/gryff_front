import { A as ActiveRouter } from './active-router-75cf6213.js';
import './match-path-760e1797.js';
import './index-c37bab2d.js';
import './location-utils-fea12957.js';

function injectHistory(Component) {
    ActiveRouter.injectProps(Component, ['history', 'location']);
}
