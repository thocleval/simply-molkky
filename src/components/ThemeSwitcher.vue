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

import gradientBackground from '../util/gradientBackground';

export default {
  mixins: [ gradientBackground ],
  data() {
    return {
      themes: [
        {
          start: '#fff886',
          stop: '#f072b6'
        },
        {
          start: '#667eea ',
          stop: '#764ba2'
        },
        {
          start: '#13547a',
          stop: '#80d0c7'
        },
        {
          start: '#96deda',
          stop: '#50c9c3'
        },
        {
          start: '#fdfcfb',
          stop: '#e2d1c3'
        },
        {
          start: '#555555',
          stop: '#aaaaaa'
        }
      ]
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

