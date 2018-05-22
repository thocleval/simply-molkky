<template>
  <div id="app">
    <MainMenu
        v-if="state === appStates.MAIN_MENU"
        @goToPlayerSelect="changeState(appStates.PLAYER_SELECT)"
        @goToRules="changeState(appStates.RULES)"
    />
    <PlayerSelect
        v-if="state === appStates.PLAYER_SELECT"
        @startGame="registerPlayers"
        @goBack="changeState(appStates.MAIN_MENU)"
    />
    <Rules
        v-if="state === appStates.RULES"
        :rules="rules"
        @applyRules="applyRules"
    />
    <ScoreCounter
        v-if="state === appStates.GAME_ONGOING"
        @finishGame="finishGame"
        :rules="rules"
        :players="players"
    />
    <FinalScores
        v-if="state === appStates.GAME_FINISHED"
        @finish="reset"
        :ranking="ranking"
    />
  </div>
</template>

<script>
import MainMenu from "./components/MainMenu.vue";
import ScoreCounter from "./components/ScoreCounter.vue";
import PlayerSelect from "./components/PlayerSelect.vue";
import FinalScores from "./components/FinalScores.vue";
import Rules from "./components/Rules.vue";

import AppStates from "./util/appState";
import defaultRules from "./util/defaultRules";

export default {
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
      players: [],
      ranking: [],
      state: AppStates.MAIN_MENU,
      rules: JSON.parse(JSON.stringify(defaultRules))
    };
  },

  methods: {
    changeState(state) {
      this.state = state;
    },
    registerPlayers(players) {
      if (players.length > 1) {
        players.forEach(player =>
          this.players.push({
            name: player,
            score: 0,
            fault: 0,
            isEliminated: false
          })
        );
        this.changeState(this.appStates.GAME_ONGOING);
      } else {
        alert("Not enough players");
      }
    },
    applyRules(rules) {
      this.rules = rules;
      this.changeState(this.appStates.MAIN_MENU);
    },
    finishGame(ranking) {
      this.ranking = ranking;
      this.changeState(this.appStates.GAME_FINISHED);
    },
    reset() {
      this.players = [];
      this.ranking = [];
      this.changeState(this.appStates.MAIN_MENU);
    }
  }
};
</script>

<style lang="less">
@import "./style/variables";
@import "./style/main";
</style>
