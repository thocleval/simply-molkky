<template>
  <component class="ℹ️" :is="component" v-bind="data" @close="$emit('close')"></component>
</template>

<script>
import Vue from 'vue';
import PlayerEdition from '@/components/players/PlayerEdition';

export default {
  components: {
    PlayerEdition,
  },
  props: {
    component: {
      type: Vue.Component,
    },
    data: {
      type: Object,
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
