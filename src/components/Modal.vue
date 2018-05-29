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
    data: {
      type: Object,
    },
    content: {
      type: String,
    },
  },
  computed: {

  },
  methods: {
    close() {
      this.$emit('validate');
    },
  },
};
</script>

<style lang="less">
@import '../style/variables';
.ℹ️ {
  padding: @spacing;
  width: 42rem;
  max-width: 100%;
  margin: auto;
  border-radius: @box-radius;

  box-shadow: 0px 0px 75px -17px fade(@white, 25%);
  background-color: fade(@black, 90%);
  color: @white;

  .title {
    font-size: 2rem;
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
