<template>
  <div class="🖼 vertical-container auto-height">
    <div class="rankings">
      <p
        v-for="(player, index) in ranking"
        :key="index"
        class="ranking"
        :class="{
          first: index === 0,
          second: index === 1,
          third: index === 2,
        }"
      >
        <span v-if="index > 2">{{ (index + 1) + ". " }}</span>
        {{ player.name }}
        <span v-if="index > 0"> : {{$t('game.score', {score: player.score})}}</span>
      </p>
    </div>

    <h4 class="eliminated-title" v-if="eliminateds.length > 0">{{$t('game.scores.eliminated')}}</h4>
    <div class="eliminateds">
      <div v-for="(player) in eliminateds" :key="player.id" class="eliminated">{{ player.name }}</div>
    </div>

    <button class="btn" @click="goToMainMenu">{{$t('game.finish')}}</button>
    <button class="btn" @click="restartGame">{{$t('game.restart')}}</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('game', ['ranking', 'eliminateds']),
  },
  methods: {
    ...mapActions('game', ['resetAllScores']),
    goToMainMenu() {
      this.$router.push({ name: 'home' });
    },
    restartGame() {
      this.resetAllScores();
      this.$router.push({ name: 'game' });
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/variables';

.rankings {
  margin-bottom: @spacing;
}

.ranking {
  background: none;
  width: auto;
  font-weight: 100;

  &:not(:last-child) {
    margin-bottom: @spacing-small;
  }

  &.first {
    font-size: 35px;

    &:before {
      content: "🏆";
    }
  }

  &.second {
    font-size: 30px;

    &:before {
      content: "🥈";
    }
  }

  &.third {
    font-size: 25px;

    &:before {
      content: "🥉";
    }
  }
}

.eliminated-title {
  margin-top: @spacing-small;
  font-weight: @bold-weight;
}

.eliminateds {
  display: flex;
  margin-top: 0;
  margin-bottom: @spacing;

  .eliminated {
    margin: @spacing-xsmall;
  }
}
</style>
