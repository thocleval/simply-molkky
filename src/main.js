import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import i18n from './i18n';
import './assets/fonts/font-icons/font-icons.font';
import './registerServiceWorker';

import './util/longPressDirective';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
