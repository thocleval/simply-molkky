<template>
  <div class="🖼 vertical-container">
    <GameHeader :player="currentPlayer" />
    <ScoreSelector @validateScore="addScore" />
    <h2 class="medium-title">{{$t('game.scores.title')}}</h2>
    <GameRanking />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ScoreSelector from '@/components/game/ScoreSelector';
import GameHeader from '@/components/game/GameHeader';
import GameRanking from '@/components/game/GameRanking';

export default {
  components: {
    ScoreSelector,
    GameRanking,
    GameHeader,
  },
  computed: {
    ...mapGetters('game', ['hasWinner', 'currentPlayer']),
  },
  methods: {
    ...mapActions('game', ['addScoreToPlayer', 'turnToNextPlayer']),
    addScore(newScore) {
      this.addScoreToPlayer({
        id: this.currentPlayer.id,
        score: newScore,
      });
      if (this.hasWinner) {
        this.$router.push({ name: 'final-scores' });
        return;
      }
      this.nextPlayer();
    },
    nextPlayer() {
      this.turnToNextPlayer();
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
