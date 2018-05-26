<template>
  <div id="app" :style="gradientBackground(theme)">
    <MainMenu
        v-if="state === appStates.MAIN_MENU"
        @goToPlayerSelect="changeState(appStates.PLAYER_SELECT)"
        @goToRules="changeState(appStates.RULES)"
    />
    <PlayerSelect
        v-if="state === appStates.PLAYER_SELECT"
        @startGame="startGame"
        @goBack="goToMainMenu"
    />
    <Rules
        v-if="state === appStates.RULES"
        @applyRules="goToMainMenu"
    />
    <ScoreCounter
        v-if="state === appStates.GAME_ONGOING"
        @finishGame="finishGame"
    />
    <FinalScores
        v-if="state === appStates.GAME_FINISHED"
        @finish="goToMainMenu"
        @restart="restartGame"
    />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import MainMenu from "./components/MainMenu.vue";
import ScoreCounter from "./components/ScoreCounter.vue";
import PlayerSelect from "./components/PlayerSelect.vue";
import FinalScores from "./components/FinalScores.vue";
import Rules from "./components/Rules.vue";

import AppStates from "./util/appState";
import gradientBackground from './util/gradientBackground';

export default {
  mixins: [ gradientBackground ],
  components: {
    ScoreCounter,
    MainMenu,
    PlayerSelect,
    FinalScores,
    Rules
  },
  data: function() {
    return {
      appStates: AppStates,
      state: AppStates.MAIN_MENU,
    };
  },
  computed: {
    ...mapState('settings', ['theme'])
  },
  methods: {
    ...mapActions('game', ['resetAllScores']),
    changeState(state) {
      this.state = state;
    },
    startGame() {
      this.resetAllScores();
      this.changeState(this.appStates.GAME_ONGOING);
    },
    goToMainMenu() {
      this.changeState(this.appStates.MAIN_MENU);
    },
    finishGame() {
      this.changeState(this.appStates.GAME_FINISHED);
    },
    restartGame() {
      this.resetAllScores();
      this.changeState(this.appStates.GAME_ONGOING);
    }
  }
};
</script>

<style lang="less">
@import "./style/variables";
@import "./style/mixins";
@import "./style/main";
@import "./style/icons";
</style>
