<template>
  <div id="app" :style="gradientBackground(theme)">
    <a href="https://github.com/thocleval/simply-molkky" target="_blank" class="github-link"><AppIcon icon="github" /></a>
    <router-view></router-view>
    <AppModalContainer />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import gradientBackground from './util/gradientBackground';
import AppModalContainer from './components/AppModalContainer';
import AppIcon from './components/AppIcon';

export default {
  components: {
    AppModalContainer,
    AppIcon,
  },
  mixins: [gradientBackground],
  computed: {
    ...mapState('settings', ['theme']),
  },
};
</script>

<style lang="less">
@import "~@/style/variables";
@import "~@/style/mixins";
@import "~@/style/main";
@import "~@/style/forms";
@import url("https://fonts.googleapis.com/css?family=Work+Sans:300,400,700.css");

.github-link {
  @position: 3rem;
  position: absolute;
  top: @position;
  left: @position;
  transform: translate(-50%, -50%) rotate(-45deg);
  color: @black;
  box-shadow: 0 0 7.5rem -1.5rem fade(@black, 25%);
  background-color: fade(@white, 30%);
  width: 30rem;
  transition: box-shadow @transition-duration ease;

  .responsive(@small-breakpoint, {
    top: 2rem;
    left: 2rem;
  });

  &:hover {
    box-shadow: 0 0 7.5rem 1rem fade(@black, 25%);

    .icon {
      animation: github 1s ease-in-out 1;
    }
  }

  .icon {
    font-size: 3rem;
    padding: @spacing-xsmall;
    position: relative;

    .responsive(@small-breakpoint, {
      font-size: 2rem;
      padding: @spacing-xsmall;
    });
  }

  @keyframes github {
    from {
      transform: translate(0) rotate(0deg);
    }
    to {
      transform: translate(0) rotate(360deg);
    }
  }
}
</style>
