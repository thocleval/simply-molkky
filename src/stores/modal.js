/* eslint-disable no-param-reassign */
import i18n from '@/i18n';
import Utils from '@/util/utils';

import {
  SHOW,
  HIDE,
} from './modalMutation.types';

export default {
  namespaced: true,
  state() {
    return {
      isVisible: false,
      title: '',
      content: '',
    };
  },
  mutations: {
    [SHOW](state, { title, content }) {
      state.title = title;
      state.content = content;
      state.isVisible = true;
    },
    [HIDE](state) {
      state.isVisible = false;
    },
  },
  actions: {
    show({ commit }, modalData) {
      commit(SHOW, modalData);
    },
    hide({ commit }) {
      commit(HIDE);
    },
    showElimination({ commit }, { name }) {
      commit(SHOW, {
        title: i18n.t('modal.sanctions.eliminated.title'),
        content: i18n.t('modal.sanctions.eliminated.content', { name }),
      });
    },
    showZap({ commit }, { players, score }) {
      commit(SHOW, {
        title: i18n.t('modal.sanctions.zap.title'),
        content: i18n.tc('modal.sanctions.zap.content', players.length, {
          players: Utils.playerNamesToString(players),
          score,
        }),
      });
    },
  },
};
