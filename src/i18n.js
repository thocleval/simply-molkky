import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueCookie from 'vue-cookie';

import en from './i18n/en.json';
import fr from './i18n/fr.json';

Vue.use(VueI18n);
Vue.use(VueCookie);

const messages = {
  en,
  fr,
};

Vue.config.languages = ['fr', 'en'];
const currentLocale = VueCookie.get('locale') || 'fr';

const i18n = new VueI18n({
  locale: currentLocale,
  messages,
});

export default i18n;
