<template>
  <div class="🖼">
    <h1 class="main-title">{{$t('players.title')}}</h1>
    <form class="row" @submit.prevent="onAddPlayer" v-if="canAddPlayers">
      <input class="📝" v-model="newPlayerName" :placeholder="$t('players.name-placeholder')">
      <button class="➕" type="submit"> + </button>
    </form>
    <p class="max-players" v-if="!canAddPlayers">{{$t('players.max-players')}}</p>
    <div class="scroll-view">
      <div class="player" v-for="(player, index) in players" :key="index">
        <p class="name">{{ player.name }}</p>
        <span @click="removePlayer(index)" class="remove"><i class="icon-cross"></i></span>
      </div>
    </div>
    <div class="row">
      <button @click="cancel">{{$t('players.cancel')}}</button>
      <button @click="startGame" :class="{ disabled: isValidateDisabled }" >{{$t('players.start')}}</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  data: function() {
    return {
      newPlayerName: ''
    };
  },
  computed: {
    ...mapState('game', ['players']),
    ...mapGetters('game', ['canAddPlayers']),
    isValidateDisabled: function() {
      return this.players.length < 2;
    }
  },
  methods: {
    ...mapActions('game', ['addPlayer', 'removePlayer', 'resetAllScores']),
    onAddPlayer() {
      if (!this.canAddPlayers) {
        return;
      }
      if (this.newPlayerName !== '') {
        this.addPlayer(this.newPlayerName);
        this.newPlayerName = '';
      }
    },
    cancel() {
      this.$router.push({name: 'home'});
    },
    startGame() {
      this.resetAllScores();
      this.$router.push({name: 'game'});
    }
  }
};
</script>

<style lang="less">
@import "../../style/variables";

.📝 {
  padding: @spacing-small;
  background: fade(@white, 50%);
  border: 2px solid @dark-blue;
  outline: none;
  flex-grow: 1;
}

.➕ {
  align-self: stretch;
  width: 5rem;
  margin: 0;
  padding: 0;
  border-left: none;
  font-size: 4rem;
  font-weight: @light-weight;
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

  &:not(:last-child) {
    border-bottom: 1px solid @dark-blue;
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
  }
}
</style>
