<template>
  <div class="🖼">
    <GameHeader :player="currentPlayer" />
    <ScoreSelector @validateScore="addScore" />
    <h2 class="medium-title">{{$t('game.scores.title')}}</h2>
    <GameRanking />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import ScoreSelector from '@/components/game/ScoreSelector';
import GameHeader from '@/components/game/GameHeader';
import GameRanking from '@/components/game/GameRanking';

export default {
  components: {
    ScoreSelector,
    GameRanking,
    GameHeader,
  },
  data() {
    return {
      playerIndex: 0,
    };
  },
  computed: {
    ...mapState('game', ['rules', 'players']),
    ...mapGetters('game', ['remainingPlayers', 'hasWinner']),
    currentPlayer() {
      return this.players[this.playerIndex];
    },
  },
  methods: {
    ...mapActions('game', ['addScoreToPlayer']),
    addScore(newScore) {
      this.addScoreToPlayer({
        index: this.playerIndex,
        score: newScore,
      });
      if (this.hasWinner) {
        this.$router.push({ name: 'final-scores' });
        return;
      }
      this.nextPlayer();
    },
    nextPlayer() {
      this.playerIndex = (this.playerIndex + 1) % this.players.length;
      while (this.currentPlayer.isEliminated) {
        this.playerIndex = (this.playerIndex + 1) % this.players.length;
      }
    },
  },
};
</script>

<style lang="less">
@import '~@/style/variables';
.turn {
  .player-name {
    font-weight: @bold-weight;
  }
}
</style>
<style lang="less" scoped>
@import '~@/style/variables';
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

  .faults-counter {
    &:not(.no-faults) {
      border-right: 1px solid @dark-blue;
      padding-right: 1rem;
      margin-right: 1rem;
    }
  }
}

</style>
