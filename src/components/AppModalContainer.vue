<template>
  <div class="modal-container" :class="{visible: isVisible}">
    <div class="backdrop" @click="hide"></div>
    <AppSimpleModal
      :title="title"
      :content="content"
      @validate="hide"
      v-if="isVisible && type === 'simple'"
    />
    <AppComponentModal
      :component="component"
      :data="componentData"
      @close="hide"
      v-if="isVisible && type === 'component'"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppSimpleModal from './AppSimpleModal';
import AppComponentModal from './AppComponentModal';

export default {
  components: {
    AppSimpleModal,
    AppComponentModal,
  },
  computed: {
    ...mapState('modal', ['isVisible', 'title', 'content', 'type', 'component', 'componentData']),
  },
  methods: {
    ...mapActions('modal', ['hide']),
  },
};
</script>

<style lang="less">
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

.ℹ️ {
  padding: @spacing;
  width: 42rem;
  max-width: 100%;
  margin: auto;
  border-radius: @box-radius;

  box-shadow: 0px 0px 75px -17px fade(@white, 25%);
  background-color: fade(@black, 95%);
  color: @white;

  .title {
    font-size: 2rem;

    strong {
      font-weight: @bold-weight;
    }
  }

  .btn {
    border-color: @white;
    color: @white;

    &::before {
      background-color: fade(@white, 10%);
    }
  }

  > * + * {
    margin-top: @spacing-small;
  }

  .content {
    strong {
      font-weight: @bold-weight;
    }
  }
}

</style>
