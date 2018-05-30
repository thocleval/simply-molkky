<template>
  <div class="modal-container" :class="{visible: isVisible}">
    <div class="backdrop" @click="hide"></div>
    <modal :title="title" :content="content" @validate="hide" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Modal from './Modal';

export default {
  components: {
    Modal,
  },
  computed: {
    ...mapState('modal', ['isVisible', 'title', 'content']),
  },
  methods: {
    ...mapActions('modal', ['hide']),
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/variables';

.modal-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  padding: @spacing;
  opacity: 0;
  align-items: center;
  justify-content: center;
  display: none;

  .backdrop {
    background-color: fade(@white, 50%);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    cursor: pointer;
  }

  &.visible {
    opacity: 1;
    display: flex;
  }
}

</style>
