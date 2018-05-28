<template>
  <div id="app" :style="gradientBackground(theme)">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import MainMenu from "./components/views/MainMenu.vue";
import Game from "./components/views/Game.vue";
import PlayerSelect from "./components/views/PlayerSelect.vue";
import FinalScores from "./components/views/FinalScores.vue";
import Rules from "./components/views/Rules.vue";

import AppStates from "./util/appState";
import gradientBackground from './util/gradientBackground';

export default {
  mixins: [ gradientBackground ],
  computed: {
    ...mapState('settings', ['theme'])
  }
};
</script>

<style lang="less">
@import "./style/variables";
@import "./style/mixins";
@import "./style/main";
@import "./style/icons";
</style>
