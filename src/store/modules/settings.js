import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueCookie from 'vue-cookie';

export default {
  namespaced: true,
  state() {
    return {
      theme: {}
    }
  },
  getters: {
    themeCSS: ({ theme }) => {
      return `background-image: linear-gradient(135deg, ${theme.start} 10%, ${theme.stop} 100%);`;
    }
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme;
    }
  }
}
