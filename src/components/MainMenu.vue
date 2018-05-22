<template>
  <div class="🖼 main-menu">
    <h1>{{$t('main-menu.title')}}</h1>
    <button @click="goToPlayerSelect">{{$t('main-menu.start')}}</button>
    <button @click="goToRules">{{$t('main-menu.rules')}}</button>
    <LanguageSwitcher />
  </div>
</template>

<script>
import LanguageSwitcher from './LanguageSwitcher';
export default {
  components: {
    LanguageSwitcher
  },
  methods: {
    goToPlayerSelect() {
      this.$emit("goToPlayerSelect");
    },
    goToRules() {
      this.$emit("goToRules");
    }
  }
};
</script>

<style lang="less">
h1 {
  margin-bottom: 1rem;
  font-size: 3rem;
  font-weight: 100;
}

.🖼.main-menu {
  min-height: initial;
}
</style>
