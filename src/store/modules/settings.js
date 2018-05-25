import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueCookie from 'vue-cookie';

import gradientBackground from '../../util/gradientBackground';
import Themes from "../../util/themes";

export default {
  namespaced: true,
  state() {
    return {
      theme: Themes[0]
    }
  },
  getters: {
    themeCSS: ({ theme }) => {
      return gradientBackground.methods.gradientBackground(theme);
    }
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme;
    }
  }
}
