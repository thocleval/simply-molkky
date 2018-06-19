<template>
  <VueDraggable v-model="sortedPlayers" :options="{ draggable: '.player', forceFallback: true, handle: '.handle' }" class="draggable-container">
    <transition-group name="players">
      <div class="player" v-for="player in sortedPlayers" :key="player.id">
        <div class="handle"><AppIcon icon="handle" /></div>
        <p class="name">{{ player.name }}</p>
        <span @click="removePlayer(player.id)" class="remove"><AppIcon icon="cross" /></span>
      </div>
    </transition-group>
  </VueDraggable>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import VueDraggable from 'vuedraggable';

import AppIcon from '@/components/AppIcon';

export default {
  components: {
    VueDraggable,
    AppIcon,
  },
  computed: {
    ...mapState('game', ['players']),
    sortedPlayers: {
      get() {
        return this.players;
      },
      set(value) {
        this.reOrderPlayers(value);
      },
    },
  },
  methods: {
    ...mapActions('game', ['removePlayer', 'resetAllScores', 'reOrderPlayers']),
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/variables';

.players-move,
.players-enter-active, .players-leave-active {
  transition: all @transition-duration;
}

.players-enter, .players-leave-to {
  opacity: 0;
  transform: translateX(@spacing-small);
}

.draggable-container {
  width: 100%;
}

.player {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  width: 100%;
  flex-shrink: 0;
  border-bottom: 1px solid @dark-blue;
  position: relative;

  &.sortable-ghost {
    opacity: 0.2;
    border-bottom: 0;

    & ~ .player {
      border-top: 1px solid @dark-blue;
      border-bottom: 0;
    }
  }

  &.sortable-drag.sortable-fallback {
    border: 0 !important;
  }

  &:last-child {
    border-bottom: 0;
  }

  .handle {
    font-size: 2.5rem;
    margin-left: -1.5rem;
    padding: .5rem 1.5rem;
    cursor: pointer;
  }

  .name {
    margin: 0;
    flex-grow: 1;
    text-align: left;
    padding: @spacing-small 0;
  }

  .remove {
    cursor: pointer;
    padding: .6rem @spacing-small;
    margin: 0;
    margin-right: -@spacing-small;

    .icon {
      font-size: 2rem;
    }
  }
}
</style>
