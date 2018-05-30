<template>
  <div id="app" :style="gradientBackground(theme)">
    <router-view></router-view>
    <AppModalContainer />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import gradientBackground from './util/gradientBackground';
import AppModalContainer from './components/AppModalContainer';

export default {
  components: {
    AppModalContainer,
  },
  mixins: [gradientBackground],
  computed: {
    ...mapState('settings', ['theme']),
  },
};
</script>

<style lang="less">
@import '~@/style/variables';
@import '~@/style/mixins';
@import '~@/style/main';
@import url('https://fonts.googleapis.com/css?family=Work+Sans:300,400,700.css');

</style>
