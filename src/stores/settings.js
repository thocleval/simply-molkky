/* eslint-disable no-param-reassign */
import gradientBackground from '@/util/gradientBackground';
import Themes from '@/util/themes';

export default {
  namespaced: true,
  state() {
    return {
      theme: Themes[0],
    };
  },
  getters: {
    themeCSS: ({ theme }) => gradientBackground.methods.gradientBackground(theme),
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme;
    },
  },
};
