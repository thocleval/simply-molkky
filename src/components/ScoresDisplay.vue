<template>
  <div class="scroll-view score-display">
    <div v-for="(player, index) in players" :key="index" class="wrapper" :class="{ eliminated: player.isEliminated }">
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
export default {
  props: {
    players: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="less">
@import "../style/variables";

.wrapper {
  display: flex;
  width: 100%;
  padding: 1rem 1rem;
  border-bottom: 1px solid @dark-blue;
  align-items: center;
  height: 50px;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  .rank {
    flex-grow: 0;
    border-right: 1px solid @dark-blue;
    padding-right: 10px;
    margin-right: 10px;
  }

  .name {
    text-align: left;
    flex-grow: 1;
  }

  .faults {
    height: 8px;
    width: 8px;
    margin: 0 2px;
  }

  .points {
    width: 1.1rem;
    font-size: 1.3rem;
    text-align: right;
  }

  &.eliminated {
    color: red;
  }

  * + * {
    margin-top: 0;
  }
}
</style>
