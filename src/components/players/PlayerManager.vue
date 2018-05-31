<template>
  <div class="player-manager vertical-container">
    <PlayerAddForm />
    <div class="scroll-view">
      <PlayerList />
    </div>
    <div class="row center">
      <button type="button" class="btn-link shuffle" @click="shufflePlayers"><AppIcon icon="shuffle" />{{$t('players.shuffle')}}</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import AppIcon from '@/components/AppIcon';
import PlayerAddForm from '@/components/players/PlayerAddForm';
import PlayerList from '@/components/players/PlayerList';

export default {
  components: {
    AppIcon,
    PlayerAddForm,
    PlayerList,
  },
  methods: {
    ...mapActions('game', ['shufflePlayers']),
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/variables';

</style>
