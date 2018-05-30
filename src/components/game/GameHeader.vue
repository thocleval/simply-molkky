<template>
  <div class="wrapper-title">
    <p class="turn" v-html="$t('game.turn', {name: player.name})"></p>
    <FaultsCounter :faults="player.fault" />
    <span class="points">{{player.score}}/{{rules.goal}}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FaultsCounter from './FaultsCounter';

export default {
  components: {
    FaultsCounter,
  },
  props: {
    player: {
      type: Object,
      requried: true,
    },
  },
  computed: {
    ...mapState('game', ['rules']),
  },
};
</script>

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
