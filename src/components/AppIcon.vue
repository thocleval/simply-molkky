<template>
  <i class="icon" :class="`icon-${icon}`"></i>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/variables';

.icon {
  display: inline-block;
  vertical-align: baseline;
}
</style>
