import { A as ActiveRouter } from './active-router-62b522e9.js';
import './match-path-760e1797.js';
import './index-f1e2a249.js';
import './location-utils-fea12957.js';

function injectHistory(Component) {
    ActiveRouter.injectProps(Component, ['history', 'location']);
}
