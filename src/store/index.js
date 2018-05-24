import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import settings from './modules/settings';
import game from './modules/game';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    settings,
    game
  },
  strict: debug,
  plugins: [createPersistedState()]
})
