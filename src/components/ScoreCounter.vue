<template>
  <div class="🖼">
    <div class="wrapper-title">
      <p class="turn" v-html="$t('game.turn', {name: currentPlayer.name})"></p>
      <div class="faults-wrapper">
        <div v-for="index in [1, 2 ,3]" :key="index" class="faults" :class=" { x: currentPlayer.fault >= index} ">
        </div>
      </div>
      <span class="points">{{currentPlayer.score}}/{{rules.goal}}</span>
    </div>

    <ScoreSelector @validateScore="addScore" />

    <h2 class="medium-title">{{$t('game.scores.title')}}</h2>
    <ScoresDisplay />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import ScoreSelector from "./ScoreSelector.vue";
import ScoresDisplay from "./ScoresDisplay.vue";

export default {
  components: {
    ScoreSelector,
    ScoresDisplay
  },
  data: function() {
    return {
      playerIndex: 0
    };
  },
  computed: {
    ...mapState('game', ['rules', 'players']),
    ...mapGetters('game', ['remainingPlayers', 'hasWinner']),
    currentPlayer: function() {
      return this.players[this.playerIndex];
    }
  },
  methods: {
    ...mapActions('game', ['addScoreToPlayer']),
    addScore(newScore) {
      this.addScoreToPlayer({
        index: this.playerIndex,
        score: newScore
      });
      if (this.hasWinner) {
        this.$emit('finishGame');
        return;
      }
      this.nextPlayer();
    },
    nextPlayer() {
      this.playerIndex = (this.playerIndex + 1) % this.players.length;
      while (this.currentPlayer.isEliminated) {
        this.playerIndex = (this.playerIndex + 1) % this.players.length;
      }
    }
  }
};
</script>

<style lang="less">
@import "../style/variables";

.turn {
  .player-name {
    font-weight: @bold-weight;
  }
}

.wrapper-title {
  display: flex;
  width: 100%;
  padding: 0 0 @spacing-small 0;
  border-bottom: 1px solid @dark-blue;
  margin-bottom: @spacing-small;
  align-items: center;

  p {
    text-align: left;
    flex-grow: 1;
  }

  .points {
    width: 6rem;
    text-align: right;
  }

  * + * {
    margin-top: 0;
  }
}

.faults-wrapper {
  display: flex;
  border-right: 1px solid @dark-blue;
  padding-right: 1rem;
  margin-right: 1rem;
}

.faults {
  @fault-size: 1.7rem;
  height: @fault-size;
  width: @fault-size;
  border-radius: 50%;
  margin: 0 0.2rem;
  border: 2px solid @dark-blue;
  background: transparent;
  transition: background-color @transition-duration ease;

  &.x {
    background-color: @dark-blue;
  }
}
</style>
