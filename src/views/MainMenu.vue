<template>
  <div class="🖼 auto-height">
    <h1 class="main-title">{{$t('main-menu.title')}}</h1>
    <router-link class="btn btn-icon" to="/player-select"><i class="icon icon-play"></i> {{$t('main-menu.start')}}</router-link>
    <router-link class="btn btn-icon" to="/rules"><i class="icon icon-rules"></i> {{$t('main-menu.rules')}}</router-link>
    <language-switcher />
    <theme-switcher />
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
