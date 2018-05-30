<template>
  <div class="🖼">
    <h1 class="main-title">{{$t('players.title')}}</h1>
    <form class="row" @submit.prevent="onAddPlayer" v-if="canAddPlayers">
      <input class="📝" v-model="newPlayerName" :placeholder="$t('players.name-placeholder')">
      <button class="btn ➕" type="submit"> + </button>
    </form>
    <p class="max-players" v-if="!canAddPlayers">{{$t('players.max-players')}}</p>
    <div class="scroll-view">
      <VueDraggable v-model="sortedPlayers" :options="{ draggable: '.player', forceFallback: true, handle: '.handle' }" class="draggable-container">
        <div class="player" v-for="(player, index) in sortedPlayers" :key="index">
          <div class="handle"><AppIcon icon="handle" /></div>
          <p class="name">{{ player.name }}</p>
          <span @click="removePlayer(index)" class="remove"><AppIcon icon="cross" /></span>
        </div>
      </VueDraggable>
    </div>
    <div class="row center">
      <button type="button" class="btn-link shuffle" @click="shufflePlayers"><AppIcon icon="shuffle" />{{$t('players.shuffle')}}</button>
    </div>
    <div class="row">
      <button class="btn" @click="cancel">{{$t('players.cancel')}}</button>
      <button class="btn" @click="startGame" :class="{ disabled: isValidateDisabled }" >{{$t('players.start')}}</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import VueDraggable from 'vuedraggable';

import utils from '@/util/utils';
import AppIcon from '@/components/AppIcon';

export default {
  components: {
    VueDraggable,
    AppIcon,
  },
  data() {
    return {
      newPlayerName: '',
    };
  },
  computed: {
    ...mapState('game', ['players']),
    ...mapGetters('game', ['canAddPlayers']),
    sortedPlayers: {
      get() {
        return this.players;
      },
      set(value) {
        this.reOrderPlayers(value);
      },
    },
    isValidateDisabled() {
      return this.players.length < 2;
    },
  },
  methods: {
    ...mapActions('game', ['addPlayer', 'removePlayer', 'resetAllScores', 'reOrderPlayers']),
    onAddPlayer() {
      if (!this.canAddPlayers) {
        return;
      }
      if (this.newPlayerName !== '') {
        this.addPlayer(this.newPlayerName);
        this.newPlayerName = '';
      }
    },
    shufflePlayers() {
      this.sortedPlayers = utils.shuffle(this.sortedPlayers);
    },
    cancel() {
      this.$router.push({ name: 'home' });
    },
    startGame() {
      this.resetAllScores();
      this.$router.push({ name: 'game' });
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/variables';

.📝 {
  padding: @spacing-small;
  background: fade(@white, 50%);
  border: 2px solid @dark-blue;
  outline: none;
  flex-grow: 1;
}

.➕.➕ {
  align-self: stretch;
  width: 5rem;
  margin: 0;
  padding: 0;
  border-left: none;
  font-size: 4rem;
  font-weight: @light-weight;
}

.draggable-container {
  width: 100%;
}

.max-players {
  padding: @spacing-small 0;
  text-align: center;
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
    opacity: 0;

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
