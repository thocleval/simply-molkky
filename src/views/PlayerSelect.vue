<template>
  <div class="🖼 vertical-container">
    <h1 class="main-title">{{$t('players.title')}}</h1>
    <PlayerManager />
    <div class="row">
      <button class="btn" @click="cancel">{{$t('players.cancel')}}</button>
      <button class="btn" @click="startGame" :class="{ disabled: isValidateDisabled }" >{{$t('players.start')}}</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import PlayerManager from '@/components/players/PlayerManager';

export default {
  components: {
    PlayerManager,
  },
  computed: {
    ...mapGetters('game', ['playersCount']),
    isValidateDisabled() {
      return this.playersCount < 2;
    },
  },
  methods: {
    ...mapActions('game', ['resetAllScores']),
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
.player-manager {
  flex: 1;
  width: 100%;
}
</style>
