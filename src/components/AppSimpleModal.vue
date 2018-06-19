<template>
  <div class="ℹ️">
    <h3 class="title">{{title}}</h3>
    <p v-html="content" class="content"></p>
    <!-- <button class="btn" @click="close">OK</button> -->
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  methods: {
    validate() {
      this.$emit('validate');
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/variables';
</style>
