<template>
  <div class="theme-switcher">
    <div class="theme"
      v-for="(theme, index) in themes"
      :key="index"
      @click="setTheme(theme)"
      :style="getThemeStyle(theme)">
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapMutations } from 'vuex';
import Themes from "../util/themes";

import gradientBackground from '../util/gradientBackground';

export default {
  mixins: [ gradientBackground ],
  data() {
    return {
      themes: Themes
    };
  },
  methods: {
    ...mapMutations('settings', ['setTheme']),
    getThemeStyle(theme) {
      return this.gradientBackground(theme);
    }
  }
};
</script>

<style lang="less" scoped>
.theme-switcher {
  display: flex;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;

  .theme {
    width: 4.5rem;
    height: 4.5rem;
    margin: .5rem;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>

