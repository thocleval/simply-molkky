<template>
  <div class="🖼 auto-height">
    <h1 class="main-title">{{$t('main-menu.title')}}</h1>
    <button @click="goToPlayerSelect">{{$t('main-menu.start')}}</button>
    <button @click="goToRules">{{$t('main-menu.rules')}}</button>
    <LanguageSwitcher />
    <ThemeSwitcher />
  </div>
</template>

<script>
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

export default {
  components: {
    LanguageSwitcher,
    ThemeSwitcher
  },
  methods: {
    goToPlayerSelect() {
      this.$emit("goToPlayerSelect");
    },
    goToRules() {
      this.$emit("goToRules");
    },
    getThemeStyle(theme) {
      return `linear-gradient(135deg, ${theme.start} 10%, ${theme.stop} 100%)`;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../style/variables";

.🌐 {
  margin-top: @spacing;
}
</style>
