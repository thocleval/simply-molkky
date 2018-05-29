import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import settings from './stores/settings';
import game from './stores/game';
import modal from './stores/modal';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    settings,
    game,
    modal,
  },
  strict: debug,
  plugins: [createPersistedState()],
});
