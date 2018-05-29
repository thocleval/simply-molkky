<template>
  <div id="app" :style="gradientBackground(theme)">
    <router-view></router-view>
    <modal-container></modal-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import gradientBackground from './util/gradientBackground';
import ModalContainer from './components/ModalContainer';

export default {
  components: {
    ModalContainer,
  },
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
@import url('https://fonts.googleapis.com/css?family=Work+Sans:300,400,700.css');

</style>
