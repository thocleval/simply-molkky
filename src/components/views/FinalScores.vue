<template>
  <div class="🖼 auto-height">
    <div v-for="(player, index) in ranking" :key="index">
      <p class="ranking" :class="{ first: index === 0, second: index === 1, third: index === 2 }">
        <span v-if="index > 2">{{ index + ". " }}</span>
        {{ player.name }}
        <span v-if="index > 0"> : {{$t('game.score', {score: player.score})}}</span>
      </p>
    </div>
    <button @click="goToMainMenu">{{$t('game.finish')}}</button>
    <button @click="restartGame">{{$t('game.restart')}}</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('game', ['ranking'])
  },
  methods: {
    ...mapActions('game', ['resetAllScores']),
    goToMainMenu() {
      this.$router.push({name: 'home'});
    },
    restartGame() {
      this.resetAllScores();
      this.$router.push({name: 'game'});
    }
  }
};
</script>

<style lang="less">
.ranking {
  background: none;
  width: auto;
  font-weight: 100;

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
</style>
