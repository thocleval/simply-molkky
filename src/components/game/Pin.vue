<template>
    <button type="button" class="btn 🎳" :class="{ selected: isSelected }" @click="onClick">
      <p class="number">{{ number }}</p>
    </button>
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onClick() {
      this.$emit('pinClicked', this.number);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/variables";

.🎳 {
  border-radius: 50%;
  position: relative;
  transition-property: color background-color border-color;
  transition-duration: @transition-duration * 2;
  transition-timing-function: ease;
  font-size: 2rem;
  font-weight: @light-weight;
  padding: 0;

  // Square block parent
  &::after {
    content: "";
    padding-top: 100%;
    display: block;
  }

  .number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }

  &::before {
    border-radius: 50%;
  }

  &.selected {
    background-color: @dark-blue;
    color: white;
    border-color: fade(@white, 40%);

    &::before {
      display: none;
    }
  }
}
</style>
