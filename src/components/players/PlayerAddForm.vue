<template>
  <div class="player-add">
    <form @submit.prevent="onAddPlayer" v-if="canAddPlayers">
      <input class="📝" v-model="newPlayerName" :placeholder="$t('players.name-placeholder')">
      <button class="btn ➕" type="submit"> + </button>
    </form>
    <p class="max-players" v-if="!canAddPlayers">{{$t('players.max-players')}}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      newPlayerName: '',
    };
  },
  computed: {
    ...mapGetters('game', ['canAddPlayers']),
  },
  methods: {
    ...mapActions('game', ['addPlayer']),
    onAddPlayer() {
      if (!this.canAddPlayers) {
        return;
      }
      if (this.newPlayerName !== '') {
        this.addPlayer(this.newPlayerName);
        this.newPlayerName = '';
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/variables';

.player-add {
  width: 100%;
}

form {
  width: 100%;
  display: flex;
}

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

.max-players {
  width: 100%;
  padding: @spacing-small 0;
  text-align: center;
}
</style>
