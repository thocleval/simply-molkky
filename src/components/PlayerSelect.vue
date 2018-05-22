<template>
  <div class="🖼">
    <h1>Add players</h1>
    <form class="row" @submit.prevent="addPlayer">
      <input class="📝" v-model="newPlayerName" placeholder="Player name">
      <button class="➕" type="submit"> + </button>
    </form>
    <div class="scroll-view">
      <div class="player" v-for="(player, index) in players" :key="index">
        <p class="name">{{ player }}</p>
        <span @click="removePlayer(index)" class="remove">X</span>
      </div>
    </div>
    <div class="row">
      <button @click="cancel">Cancel</button>
      <button @click="validate" :class="{ disabled: isDisabled }" >Start game</button>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      newPlayerName: "",
      players: []
    };
  },

  methods: {
    addPlayer() {
      if (this.newPlayerName !== "" && this.players.length < 16) {
        this.players.push(this.newPlayerName.toUpperCase());
        this.newPlayerName = "";
      }
    },
    removePlayer(index) {
      this.players.splice(index, 1);
    },
    cancel() {
      this.$emit("goBack");
    },
    validate() {
      this.$emit("startGame", this.players);
    }
  },

  computed: {
    isDisabled: function() {
      return this.players.length < 2;
    }
  }
};
</script>

<style lang="less">
@import "../style/variables";

.📝 {
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid @dark-blue;
  outline: none;
  flex-grow: 1;
}

.➕ {
  margin: 0;
  padding: 0;
  border-left: none;
  width: 3.8rem;
  font-size: 2.5rem;
  font-weight: 100;
  align-self: stretch;
}

.player {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  width: 100%;

  &:not(:last-child) {
    border-bottom: 1px solid @dark-blue;
  }

  .name {
    margin: 0;
    flex-grow: 1;
    text-align: left;
    padding: .8rem 0;
  }

  .remove {
    cursor: pointer;
    padding: .6rem 1rem;
    margin: 0;
  }
}
</style>
