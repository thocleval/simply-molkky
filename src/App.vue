<template>
  <div id="app" :style="gradientBackground(theme)">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import gradientBackground from './util/gradientBackground';

export default {
  mixins: [gradientBackground],
  computed: {
    ...mapState('settings', ['theme']),
  },
};
</script>

<style lang="less">
@import './style/variables';
@import './style/mixins';
@import './style/main';
@import './style/icons';
</style>
