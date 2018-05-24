import Vue from 'vue';

import App from './App';
import store from './store';
import router from './router';
import i18n from './i18n';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>',
});


