import Vue from 'vue';
import Router from 'vue-router';

import MainMenu from "../components/views/MainMenu.vue";
import Game from "../components/views/Game.vue";
import PlayerSelect from "../components/views/PlayerSelect.vue";
import FinalScores from "../components/views/FinalScores.vue";
import Rules from "../components/views/Rules.vue";

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
