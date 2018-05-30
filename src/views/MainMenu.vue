<template>
  <div class="🖼 auto-height">
    <h1 class="main-title">{{$t('main-menu.title')}}</h1>
    <router-link class="btn btn-icon" to="/player-select"><AppIcon icon="play" /> {{$t('main-menu.start')}}</router-link>
    <router-link class="btn btn-icon" to="/rules"><AppIcon icon="rules" /> {{$t('main-menu.rules')}}</router-link>
    <language-switcher />
    <theme-switcher />
  </div>
</template>

<script>
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import AppIcon from '@/components/AppIcon';

export default {
  components: {
    LanguageSwitcher,
    ThemeSwitcher,
    AppIcon,
  },
  methods: {
    getThemeStyle(theme) {
      return `linear-gradient(135deg, ${theme.start} 10%, ${theme.stop} 100%)`;
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/variables';

.🌐 {
  margin-top: @spacing;
}
</style>
