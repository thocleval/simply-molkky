import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueCookie from 'vue-cookie';

import en from './en.json';
import fr from './fr.json';

Vue.use(VueI18n);
Vue.use(VueCookie);

const messages = {
  en: en,
  fr: fr,
};

Vue.config.languages = ['en', 'fr'];
const currentLocale = VueCookie.get('locale') || 'en';

const i18n = new VueI18n({
  locale: currentLocale,
  messages
});

export default i18n;
