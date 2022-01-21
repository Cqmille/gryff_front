import { A as ActiveRouter } from './active-router-5c90c41e.js';
import './match-path-760e1797.js';
import './index-0bdf7134.js';
import './location-utils-fea12957.js';

function injectHistory(Component) {
    ActiveRouter.injectProps(Component, ['history', 'location']);
}
