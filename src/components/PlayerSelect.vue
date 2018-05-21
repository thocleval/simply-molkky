<template>
    <div class="🖼">
        <h1>Add players</h1>
        <div class="row">
            <input class="📝" @keydown.enter="addPlayer" v-model="newPlayerName" placeholder="Player name">
            <button class="➕" @click="addPlayer"> + </button>
        </div>
        <div class="scroll-view">
            <div class="player" v-for="(player, index) in players" :key="index">
                <p>{{ player }}</p>
                <span @click="removePlayer(index)">X</span>
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
    data: function () {
        return {
          newPlayerName: '',
          players: [],
        }
    },

    methods: {
        addPlayer () {
            if (this.newPlayerName !== '' && this.players.length < 16){
                this.players.push(this.newPlayerName.toUpperCase());
                this.newPlayerName = '';
            }
        },
        removePlayer (index) {
            this.players.splice(index, 1);
        },
        cancel () {
            this.$emit('goBack');
        },
        validate () {
            this.$emit('startGame', this.players);
        },
    },

    computed: {
        isDisabled: function () {
            return this.players.length < 2;
        }
    }
}
</script>

<style lang="less">

.📝{
    padding: 1rem;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid #2c3e50;
    outline: none;
    flex-grow: 1;
}

.➕{
    margin: 0;
    padding: 0;
    border-left: none;
    width: 3.8rem;
    font-size: 2.5rem;
    font-weight: 100;
    align-self: stretch;
}

.player {
    justify-content: space-around;
    margin: 0.5rem 0 0;
    text-align: left;
    flex-shrink: 0;
    width: 100%;
    display: flex;
    align-items: center;

    display: flex;
    width: 80%;
    padding: 8px 10px;
    text-align: left;

    &:not(:last-child){
        border-bottom: 1px solid #2c3e50;
    }

    p {
        margin: 0;
        flex-grow: 1;
    }

    span {
        margin: 0;
        cursor: pointer;
    }

}
</style>
