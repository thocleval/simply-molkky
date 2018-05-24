<template>
  <div class="scroll-view score-display">
    <div v-for="(player, index) in ranking" :key="index" class="wrapper" :class="{ eliminated: player.isEliminated }">
      <p class="rank"> {{ index + 1 }} </p>
      <p class="name">{{ player.name }}</p>
      <div class="faults-wrapper">
        <div v-for="indox in [1, 2 ,3]" :key="indox" class="faults" :class=" { x: player.fault >= indox} "></div>
      </div>
      <span class="points" >{{player.score}}</span>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('game', ['ranking']),
  }
};
</script>

<style lang="less">
@import "../style/variables";

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

  .faults-wrapper {

  }

  .faults {
    height: .8rem;
    width: .8rem;
    margin: 0 2px;
    border-width: 1px;
  }

  .points {
    width: 1.5rem;
    font-size: 1.7rem;
    text-align: right;
  }

  &.eliminated {
    color: @error-color;
  }

  * + * {
    margin-top: 0;
  }
}
</style>
