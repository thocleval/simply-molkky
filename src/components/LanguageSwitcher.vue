<template>
  <div class="🌐">
    <div class="🏳️‍🌈"
      v-for="locale in languages"
      :key="locale.id"
      @click="setLocale(locale)"
      :class="{ 'is-current': locale === activeLocale }">
      {{ getLanguageString(locale) }}
    </div>
  </div>
</template>

<script>
import Vue from "vue";

const localeStrings = {
  en: "English",
  fr: "Français"
};

export default {
  data() {
    return {
      activeLocale: this.$i18n.locale,
      languages: Vue.config.languages
    };
  },
  methods: {
    setLocale(locale) {
      Vue.config.lang = locale;
      this.activeLocale = locale;
      this.$cookie.set("locale", locale);
      this.$i18n.locale = locale;
    },
    getLanguageString(locale) {
      return localeStrings[locale];
    }
  }
};
</script>

<style lang="less" scoped>
.🌐 {
  display: flex;
  margin-top: 1.5rem;

  .🏳️‍🌈 {
    margin: 0 1rem;

    &:not(.is-current) {
      cursor: pointer;
    }

    &.is-current {
      border-bottom: 1px solid;
    }
  }
}
</style>

