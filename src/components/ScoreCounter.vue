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

    <h2>{{$t('game.scores.title')}}</h2>
    <ScoresDisplay :players="sortedPlayers"/>
  </div>
</template>

<script>
import ScoreSelector from "./ScoreSelector.vue";
import ScoresDisplay from "./ScoresDisplay.vue";

export default {
  components: {
    ScoreSelector,
    ScoresDisplay
  },

  props: {
    players: {
      type: Array,
      required: true
    },
    rules: {
      type: Object
    }
  },

  data: function() {
    return {
      selected: [],
      totalScore: 0,
      playerIndex: 0
    };
  },
  computed: {
    currentPlayer: function() {
      return this.players[this.playerIndex];
    },
    sortedPlayers: function() {
      let playersCopy = this.players.slice();
      return playersCopy.sort(this.compare);
    },
    numberOfRemainingPlayers: function() {
      let number = this.players.length;
      this.players.forEach(player => {
        if (player.isEliminated) {
          number--;
        }
      });
      return number;
    }
  },
  methods: {
    addScore(newScore) {
      if (newScore === 0 && this.rules.sanction !== "nothing") {
        this.currentPlayer.fault += 1;
        if (this.currentPlayer.fault === 3) {
          if (this.rules.sanction === "eliminated") {
            this.currentPlayer.isEliminated = true;
            this.currentPlayer.score = 0;
          } else if (this.rules.sanction === "reset") {
            this.currentPlayer.score = 0;
            this.currentPlayer.fault = 0;
          }
          if (this.numberOfRemainingPlayers === 1) {
            this.$emit("finishGame", this.sortedPlayers);
          }
        }
      } else {
        this.currentPlayer.fault = 0;
        this.currentPlayer.score += newScore;
        if (this.currentPlayer.score === eval(this.rules.goal)) {
          this.$emit("finishGame", this.sortedPlayers);
        } else if (this.currentPlayer.score > this.rules.goal) {
          if (this.rules.penalty === "reset") {
            this.currentPlayer.score = this.rules.penaltyResetAmmount;
          } else if (this.rules.penalty === "substract") {
            this.currentPlayer.score =
              this.currentPlayer.score -
              newScore -
              this.rules.penaltySubstractAmmount;
          } else if (this.rules.penalty === "excess") {
            this.currentPlayer.score =
              this.rules.goal - (this.currentPlayer.score - this.rules.goal);
          }
        }

        if (this.rules.zap === "half") {
          this.players.forEach(player => {
            if (
              player.score === this.currentPlayer.score &&
              player !== this.currentPlayer
            ) {
              /* eslint-disable */
              player.score = Math.round(player.score / 2);
            }
          });
        }
      }
      if (this.currentPlayer.score < 0) {
        this.currentPlayer.score = 0;
      }
      this.nextPlayer();
    },
    nextPlayer() {
      this.playerIndex = (this.playerIndex + 1) % this.players.length;
      while (this.currentPlayer.isEliminated) {
        this.playerIndex = (this.playerIndex + 1) % this.players.length;
      }
    },
    compare(a, b) {
      if (a.score > b.score) return -1;
      if (a.score < b.score) return 1;
      return 0;
    }
  }
};
</script>

<style lang="less">
@import "../style/variables";

.turn {
  .player-name {
    font-weight: bold;
  }
}

.wrapper-title {
  display: flex;
  width: 100%;
  padding: 0 10px 10px 10px;
  border-bottom: 1px solid @dark-blue;
  margin-bottom: 15px;
  align-items: center;

  p {
    text-align: left;
    flex-grow: 1;
  }

  .points {
    width: 80px;
    text-align: right;
  }

  * + * {
    margin-top: 0;
  }
}

.faults-wrapper {
  display: flex;
  border-right: 1px solid @dark-blue;
  padding-right: 0.8rem;
  margin-right: 0.8rem;

  * + * {
    margin-top: 0;
  }
}

.faults {
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  margin: 0 0.1rem;
  border: 2px solid @dark-blue;
  background: transparent;
  transform: perspective(1px) translateZ(0);
  transition-property: color background border;
  transition-duration: 0.5s;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  outline: none;

  &.x {
    background: @dark-blue;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.4);
  }
}

h2 {
  font-size: 1.5rem;
  width: 100%;
  text-align: left;
}
</style>
