import Vue from 'vue';
import Router from 'vue-router';

import MainMenu from './views/MainMenu';
import Game from './views/Game';
import PlayerSelect from './views/PlayerSelect';
import FinalScores from './views/FinalScores';
import Rules from './views/Rules';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { name: 'home', path: '/', component: MainMenu },
    { name: 'rules', path: '/rules', component: Rules },
    { name: 'game', path: '/game', component: Game },
    { name: 'player-select', path: '/player-select', component: PlayerSelect },
    { name: 'final-scores', path: '/final-scores', component: FinalScores },
  ],
});
