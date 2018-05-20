<template>
    <div class="🖼">
        <div class="wrapper-title">
            <p>{{currentPlayer.name + "'s turn" }}</p>
            <div class="faults-wrapper">
                <div v-for="index in [1, 2 ,3]" class="faults" :class=" { x: currentPlayer.fault >= index} ">
                </div>
            </div>
            <span class="points" >{{currentPlayer.score}}/{{rules.goal}}</span>
        </div>
        <div class="pin-row">
            <Pin
                @pinClicked="onPinClick"
                :isSelected="selected.includes(7)"
                :number="7"/>
            <Pin
                @pinClicked="onPinClick"
                :isSelected="selected.includes(9)"
                :number="9"/>
            <Pin
                @pinClicked="onPinClick"
                :isSelected="selected.includes(8)"
                :number="8"/>
        </div>
        <div class="pin-row">
            <Pin
                @pinClicked="onPinClick"
                :isSelected="selected.includes(5)"
                :number="5"/>
            <Pin
                @pinClicked="onPinClick"
                :isSelected="selected.includes(11)"
                :number="11"/>
            <Pin
                @pinClicked="onPinClick"
                :isSelected="selected.includes(12)"
                :number="12"/>
            <Pin
                @pinClicked="onPinClick"
                :isSelected="selected.includes(6)"
                :number="6"/>
        </div>
        <div class="pin-row">
            <Pin
                @pinClicked="onPinClick"
                :isSelected="selected.includes(3)"
                :number="3"/>
            <Pin
                @pinClicked="onPinClick"
                :isSelected="selected.includes(10)"
                :number="10"/>
            <Pin
                @pinClicked="onPinClick"
                :isSelected="selected.includes(4)"
                :number="4"/>
        </div>
        <div class="pin-row">
            <Pin
                @pinClicked="onPinClick"
                :isSelected="selected.includes(1)"
                :number="1"/>
            <Pin
                @pinClicked="onPinClick"
                :isSelected="selected.includes(2)"
                :number="2"/>
        </div>
            <button @click="validateScore">{{okMessage}}</button>
        <h2>Scores</h2>
        <ScoresDisplay :players="sortedPlayers"/>
    </div>
</template>


<script>
import Pin from './Pin.vue'
import ScoresDisplay from './ScoresDisplay.vue'

export default {
    components: {
        Pin,
        ScoresDisplay,
    },

    props: {
        players: {
                type: Array,
                required: true
        },
        rules: {
                type: Object,
        },
    },

    data: function () {
        return {
          selected: [],
          totalScore: 0,
          playerIndex: 0,
        }
    },
    computed: {
        currentScore: function () {
            if (this.selected.length === 1){
                return this.selected[0];
            } else {
                return this.selected.length;
            }
        },
        currentPlayer: function () {
            return this.players[this.playerIndex]
        },
        sortedPlayers: function (){
            let playersCopy = this.players.slice()
            return playersCopy.sort(this.compare)
        },
        okMessage: function () {
            return this.currentScore > 0 ? ("Ok (+" + this.currentScore + ")") : "Missed shot"
        },
        numberOfRemainingPlayers: function () {
            let number = this.players.length
            this.players.forEach(player => {
                if (player.isEliminated){
                    number--
                }
            })
            return number
        }
    },
    methods: {
        onPinClick (number) {
            var index = this.selected.indexOf(number)
            if (index > -1) {
                this.selected.splice(index, 1)
            } else {
                this.selected.push(number)
            }
        },
        resetScore () {
            this.selected = []
        },
        validateScore () {
            if (this.currentScore === 0 && this.rules.sanction !== "nothing") {
                this.currentPlayer.fault += 1
                if (this.currentPlayer.fault === 3) {
                    if (this.rules.sanction === "eliminated") {
                        this.currentPlayer.isEliminated = true
                        this.currentPlayer.score = 0
                    }else if (this.rules.sanction === "reset") {
                        this.currentPlayer.score = 0
                        this.currentPlayer.fault = 0
                    }
                    if(this.numberOfRemainingPlayers === 1){
                        this.$emit('finishGame', this.sortedPlayers);
                    }
                }
            } else {
                this.currentPlayer.fault = 0
                this.currentPlayer.score += this.currentScore
                if (this.currentPlayer.score === eval(this.rules.goal)){
                    this.$emit('finishGame', this.sortedPlayers);
                } else if (this.currentPlayer.score > this.rules.goal) {
                    if (this.rules.penalty === "reset") {
                        this.currentPlayer.score = this.rules.penaltyResetAmmount
                    } else if (this.rules.penalty === "substract") {
                        this.currentPlayer.score = this.currentPlayer.score - this.currentScore - this.rules.penaltySubstractAmmount
                    } else if (this.rules.penalty === "excess"){
                        this.currentPlayer.score = this.rules.goal - (this.currentPlayer.score - this.rules.goal)
                    }
                }

                if(this.rules.zap === "half"){
                    this.players.forEach(player => {
                        if (player.score === this.currentPlayer.score && player !== this.currentPlayer){
                            player.score = Math.round(player.score / 2)
                        }
                    })
                }
            }
            if (this.currentPlayer.score < 0){
                this.currentPlayer.score = 0
            }
            this.nextPlayer()
            this.resetScore()
        },
        nextPlayer () {
            this.playerIndex = (this.playerIndex + 1) % this.players.length
            while (this.currentPlayer.isEliminated){
                this.playerIndex = (this.playerIndex + 1) % this.players.length
            }
        },
        compare(a,b) {
            if (a.score > b.score)
                return -1;
            if (a.score < b.score)
                return 1;
            return 0;
        },
    }
}
</script>

<style lang="less">

.pin-row{
    display: flex;
    margin: 0;
}

.wrapper-title {
    display: flex;
    width: 100%;
    padding: 0px 10px 10px 10px;
    border-bottom: 1px solid #2c3e50;
    margin-bottom: 15px;
    align-items: center;

    p {
        text-align: left;
        flex-grow: 1
    }

    .points {
        width: 80px;
        text-align: right;
    }

    * + *{
        margin-top: 0;
    }
}
.faults-wrapper {
    display: flex;
    border-right: 1px solid #2c3e50;
    padding-right: 0.8rem;
    margin-right: 0.8rem;

    * + *{
        margin-top: 0;
    }
}

.faults {
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    margin: 0 0.1rem;
    border: 2px solid #2c3e50;
    background: transparent;
    transform: perspective(1px) translateZ(0);
    transition-property: color background border;
    transition-duration: 0.5s;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    outline: none;

    &.x {
        background: #2c3e50;
        color: white;
        border: 2px solid rgba(255,255,255,0.4);
    }
}

h2{
    font-size: 1.5rem;
    width: 100%;
    text-align: left;
}
</style>
