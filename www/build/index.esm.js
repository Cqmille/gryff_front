import { A as ActiveRouter } from './active-router-5a14379d.js';
import './match-path-760e1797.js';
import './index-156de0d2.js';
import './location-utils-fea12957.js';

function injectHistory(Component) {
    ActiveRouter.injectProps(Component, ['history', 'location']);
}
