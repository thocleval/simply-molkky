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
import Vue from 'vue';

const localeStrings = {
  en: 'English',
  fr: 'Français',
};

export default {
  data() {
    return {
      languages: Vue.config.languages,
    };
  },
  computed: {
    activeLocale() {
      return this.$i18n.locale;
    },
  },
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
      this.$cookie.set('locale', locale);
    },
    getLanguageString(locale) {
      return localeStrings[locale];
    },
  },
};
</script>

<style lang="less" scoped>
@import '../style/variables';

.🌐 {
  display: flex;

  .🏳️‍🌈 {
    margin: 0 @spacing-small;

    &:not(.is-current) {
      cursor: pointer;
    }

    &.is-current {
      border-bottom: 1px solid;
    }
  }
}
</style>
