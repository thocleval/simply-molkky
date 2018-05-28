<template>
  <div class="🖼 auto-height">
    <h1 class="main-title">{{$t('main-menu.title')}}</h1>
    <router-link class="button" to="/player-select">{{$t('main-menu.start')}}</router-link>
    <router-link class="button" to="/rules">{{$t('main-menu.rules')}}</router-link>
    <LanguageSwitcher />
    <ThemeSwitcher />
  </div>
</template>

<script>
import LanguageSwitcher from '../components/LanguageSwitcher';
import ThemeSwitcher from '../components/ThemeSwitcher';

export default {
  components: {
    LanguageSwitcher,
    ThemeSwitcher,
  },
  methods: {
    getThemeStyle(theme) {
      return `linear-gradient(135deg, ${theme.start} 10%, ${theme.stop} 100%)`;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../style/variables";

.🌐 {
  margin-top: @spacing;
}
</style>
