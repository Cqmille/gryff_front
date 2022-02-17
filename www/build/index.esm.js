import { A as ActiveRouter } from './active-router-82dc0bc2.js';
import './match-path-760e1797.js';
import './index-25b9a15f.js';
import './location-utils-fea12957.js';

function injectHistory(Component) {
    ActiveRouter.injectProps(Component, ['history', 'location']);
}
