<template>
  <div class="scroll-view score-display">
    <transition-group name="ranking" tag="div" class="ranking">
      <div v-for="(player, index) in ranking" :key="player.id" class="ranking-item" v-long-press="700" @long-press="openEditionModal(player.id)">
        <p class="rank">{{ index + 1 }}</p>
        <p class="name">{{ player.name }}</p>
        <FaultsCounter
          :faults="player.fault"
          small
        />
        <p class="points">{{player.score}}</p>
      </div>
    </transition-group>
    <h4 class="eliminated-title" v-if="eliminateds.length > 0">{{$t('game.scores.eliminated')}}</h4>
    <div class="eliminateds">
      <div v-for="(player) in eliminateds" :key="player.id" class="eliminated" v-long-press="700" @long-press="openEditionModal(player.id)">{{ player.name }}</div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import FaultsCounter from './FaultsCounter';

export default {
  components: {
    FaultsCounter,
  },
  computed: {
    ...mapGetters('game', ['ranking', 'eliminateds']),
  },
  methods: {
    ...mapActions('modal', ['showPlayerEditor']),
    openEditionModal(id) {
      this.showPlayerEditor(id);
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/variables';

.ranking-move {
  transition-duration: @transition-duration;
  transition-timing-function: ease;
  transition-property: transform;
}

.eliminated-title {
  margin-top: @spacing-small;
  font-weight: @bold-weight;
}

.eliminateds {
  display: flex;

  .eliminated {
    margin: @spacing-xsmall;
  }
}

.ranking {
  width: 100%;

  .ranking-item {
    display: flex;
    width: 100%;
    padding: @spacing-small 0;
    align-items: center;
    border-bottom: 1px solid @dark-blue;

    &:last-child {
      border-bottom: 1px solid transparent;
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

    .faults-counter {
      &:not(.no-faults) {
        border-right: 1px solid @dark-blue;
        padding-right: 1rem;
        margin-right: 1rem;
      }
    }
  }
}

</style>
