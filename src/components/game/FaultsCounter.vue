<template>
  <div class="faults-counter" :class="{ small }">
    <template v-if="faultToDisplay < 6">
      <div v-for="index in faultToDisplay" :key="index" class="fault" :class="{ x: faults >= index}"></div>
    </template>
    <template v-else>
      <div class="faults-number">{{faults}}</div>
      <div class="fault x"></div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    faults: {
      type: Number,
      requried: true,
    },
    small: {
      type: Boolean,
    },
  },
  computed: {
    faultToDisplay() {
      return Math.max(3, this.faults);
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/variables';
.faults-counter {
  display: flex;
  align-items: center;

  .faults-number {
    margin-right: .5rem;
    font-size: 1.5rem;
  }

  .fault {
    @fault-size: 1.7rem;

    height: @fault-size;
    width: @fault-size;
    border-radius: 50%;
    margin: 0 0.2rem;
    border: 2px solid @dark-blue;
    background: transparent;
    transition: background-color @transition-duration ease;

    &.x {
      background-color: @dark-blue;
    }
  }

  &.small {
    .fault {
      @fault-size: .8rem;
      height: @fault-size;
      width: @fault-size;
      margin: 0 .2rem;
      border-width: 1px;
    }
  }
}

</style>
