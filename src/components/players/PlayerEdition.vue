<template>
  <form class="player-add reverse" @submit.prevent="close">
    <h3 class="title" v-html="$t('player-edition.title', { name: player.name })"></h3>
    <div class="inputs">
      <div class="input-wrapper">
        <label for="score">{{$t('player-edition.fields.score')}}</label>
        <input type="number" id="score" name="score" v-model.lazy.number="score" min="0">
      </div>
      <div class="input-wrapper">
        <label for="fault">{{$t('player-edition.fields.fault')}}</label>
        <input type="number" id="fault" name="fault" v-model.lazy.number="fault" min="0">
      </div>
      <div class="checkbox-wrapper eliminated">
        <input type="checkbox" id="eliminated" name="eliminated" v-model.lazy="eliminated">
        <label for="eliminated">{{$t('player-edition.fields.eliminate')}}</label>
      </div>
    </div>
    <button class="btn btn-small" type="submit" @click="close">{{$t('modal.validate')}}</button>
  </form>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import {
  SET_SCORE,
  SET_FAULT,
  SET_ELIMINATED,
} from '@/stores/gameMutation.types';

export default {
  props: {
    id: {
      type: String,
    },
  },
  computed: {
    ...mapState('game', ['players']),
    score: {
      get() {
        return this.player.score;
      },
      set(value) {
        this[SET_SCORE]({ id: this.id, score: value, keepFault: true });
      },
    },
    fault: {
      get() {
        return this.player.fault;
      },
      set(value) {
        this[SET_FAULT]({ id: this.id, fault: value });
      },
    },
    eliminated: {
      get() {
        return this.player.isEliminated;
      },
      set(value) {
        this[SET_ELIMINATED]({ id: this.id, isEliminated: value });
      },
    },
    player() {
      return this.players.find(player => player.id === this.id);
    },
  },
  methods: {
    ...mapMutations('game', [SET_SCORE, SET_FAULT, SET_ELIMINATED]),
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/style/variables';

.inputs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: @spacing;
  width: 100%;
  margin-bottom: @spacing-small;

  .input-wrapper,
  .checkbox-wrapper {
    align-self: center;
    justify-self: center;

    input[type=text],
    input[type=number], {
      width: 100%;
    }
  }

  .eliminated {
    grid-column: span 2;
  }
}
</style>
