/* eslint-disable no-param-reassign */
import i18n from '@/i18n';
import Utils from '@/util/utils';

import {
  SHOW_SIMPLE,
  SHOW_WITH_COMPONENT,
  HIDE,
} from './modalMutation.types';

export default {
  namespaced: true,
  state() {
    return {
      isVisible: false,
      type: undefined,
      title: '',
      content: '',
      component: undefined,
      componentData: {},
    };
  },
  mutations: {
    [SHOW_SIMPLE](state, { title, content }) {
      state.title = title;
      state.content = content;
      state.type = 'simple';
      state.isVisible = true;
    },
    [SHOW_WITH_COMPONENT](state, { component, componentData }) {
      state.component = component;
      state.componentData = componentData;
      state.type = 'component';
      state.isVisible = true;
    },
    [HIDE](state) {
      state.isVisible = false;
    },
  },
  actions: {
    show({ commit }, modalData) {
      commit(SHOW_SIMPLE, modalData);
    },
    hide({ commit }) {
      commit(HIDE);
    },
    showElimination({ commit }, { name }) {
      commit(SHOW_SIMPLE, {
        title: i18n.t('modal.sanctions.eliminated.title'),
        content: i18n.t('modal.sanctions.eliminated.content', { name }),
      });
    },
    showZap({ commit }, { players, score }) {
      commit(SHOW_SIMPLE, {
        title: i18n.t('modal.sanctions.zap.title'),
        content: i18n.tc('modal.sanctions.zap.content', players.length, {
          players: Utils.playerNamesToString(players),
          score,
        }),
      });
    },
    showPlayerEditor({ commit }, playerId) {
      commit(SHOW_WITH_COMPONENT, {
        component: 'PlayerEdition',
        componentData: {
          id: playerId,
        },
      });
    },
  },
};
