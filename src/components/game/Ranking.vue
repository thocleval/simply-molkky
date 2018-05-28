<template>
  <div class="scroll-view score-display">
    <div v-for="(player, index) in ranking" :key="index" class="wrapper" :class="{ eliminated: player.isEliminated }">
      <p class="rank">{{ index + 1 }}</p>
      <p class="name">{{ player.name }}</p>
      <FaultsCounter :faults="player.fault" small/>
      <p class="points">{{player.score}}</p>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import FaultsCounter from '../game/FaultsCounter';

export default {
  components: {
    FaultsCounter,
  },
  computed: {
    ...mapGetters('game', ['ranking']),
  },
};
</script>

<style lang="less">
@import '../../style/variables';

.wrapper {
  display: flex;
  width: 100%;
  padding: @spacing-small 0;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid @dark-blue;
  }

  .rank {
    flex-grow: 0;
    border-right: 1px solid @dark-blue;
    padding-right: @spacing-small;
    margin-right: @spacing-small;
  }

  .name {
    text-align: left;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .points {
    width: 2rem;
    font-size: 1.7rem;
    text-align: right;
  }

  &.eliminated {
    color: @error-color;
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
