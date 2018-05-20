<template>
    <div class="🖼">
        <h1>Rules</h1>
        <div class="scroll-view">
        <p class="rule">Score to reach :<input type="number" min="1" max="999" class="number-input" v-model="currentRules.goal">points</p>
        <p class="rule">Win condition :</p>
        <div class="row">
            <label class="radio-wrapper">Score {{currentRules.goal}} points or more
                <input type="radio" name="score" value="higher" v-model="currentRules.winCondition">
                <span class="checkmark"></span>
            </label>
        </div>
        <div class="row">
            <label class="radio-wrapper">Score exactly {{currentRules.goal}} points
                <input type="radio" checked="checked" name="score" value="exact" v-model="currentRules.winCondition">
                <span class="checkmark"></span>
            </label>
        </div>
        <p class="rule" :class="{ disabled: isDisabled }" >Penalty for scoring too much :</p>
        <div class="row" :class="{ disabled: isDisabled }" >
            <label class="radio-wrapper">Score is set back to
                <input type="radio" checked="checked" value="reset" v-model="currentRules.penalty" name="penalty">
                <span class="checkmark"></span>
            </label>
            <input type="number" min="1" max="999" class="number-input" v-model="currentRules.penaltyResetAmmount">
        </div>
        <div class="row" :class="{ disabled: isDisabled }" >
            <label class="radio-wrapper">Take away excess points (Eg. 56 -> 44)
                <input type="radio" name="penalty" value="excess" v-model="currentRules.penalty">
                <span class="checkmark"></span>
            </label>
        </div>
        <div class="row" :class="{ disabled: isDisabled }" >
            <label class="radio-wrapper">Substract
                <input type="radio" name="penalty" value="substract" v-model="currentRules.penalty">
                <span class="checkmark"></span>
            </label>
            <input type="number" min="1" max="999" class="number-input" v-model="currentRules.penaltySubstractAmmount"> points
        </div>
        <p class="rule">In case of 3 consecutive misses :</p>
        <div class="row">
            <label class="radio-wrapper">The player is eliminated
                <input type="radio" value="eliminated" v-model="currentRules.sanction" name="faults">
                <span class="checkmark"></span>
            </label>
        </div>
        <div class="row">
            <label class="radio-wrapper">The player's score is reset to 0
                <input type="radio" value="reset" v-model="currentRules.sanction" name="faults">
                <span class="checkmark"></span>
            </label>
        </div>
        <div class="row">
            <label class="radio-wrapper">Nothing happens
                <input type="radio" value="nothing" v-model="currentRules.sanction" name="faults">
                <span class="checkmark"></span>
            </label>
        </div>
        <p class="rule">Zap! If player 1 matches player 2's score :</p>
        <div class="row">
            <label class="radio-wrapper">Nothing happens
                <input type="radio" checked="checked" value="nothing" v-model="currentRules.zap" name="zap">
                <span class="checkmark"></span>
            </label>
        </div>
        <div class="row">
            <label class="radio-wrapper">player 2's score is halved
                <input type="radio" value="half" v-model="currentRules.zap"  name="zap">
                <span class="checkmark"></span>
            </label>
        </div>
    </div>
        <div class="row">
            <button @click="reset">Default</button>
            <button @click="validate" >Ok</button>
        </div>
    </div>
</template>


<script>
import defaultRules from '../util/defaultRules'

export default {
    props: {
        rules: {
                type: Object,
        },
    },

    data: function () {
        return {
          currentRules: this.rules || JSON.parse(JSON.stringify(defaultRules))
        }
    },

    methods: {
        reset () {
            this.currentRules = JSON.parse(JSON.stringify(defaultRules))
        },
        validate () {
            this.currentRules.goal = Math.max(this.currentRules.goal, 1)
            if (this.currentRules.penaltyResetAmmount > this.currentRules.goal){
                this.currentRules.penaltyResetAmmount = 0
            }
            if (this.currentRules.penaltySubstractAmmount > this.currentRules.goal){
                this.currentRules.penaltySubstractAmmount = 0
            }
            this.$emit('applyRules', this.currentRules)
        },
    },

    computed: {
        isDisabled: function () {
            return this.rules.winCondition !== "exact"
        }
    }
}
</script>

<style lang="less">

.radio-wrapper {
    margin: 0;
    display: block;
    position: relative;
    padding-left: 1.6rem;
    cursor: pointer;
    user-select: none;
    text-align: left;

    /* Hide the browser's default radio button */
    & input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    & input:checked ~ .checkmark {
        box-shadow: inset 0 0 0px 0.25rem;
    }

    & input:checked:hover ~ .checkmark {
        box-shadow: inset 0 0 0px 0.25rem;
    }

    & input:hover ~ .checkmark{
        box-shadow: inset 0 0 0px 0.1rem;
    }
}



/* Create a custom radio button */
.checkmark {
    position: absolute;
    top: -1rem;
    left: 0;
    height: 0.8rem;
    width: 0.8rem;
    background-color: #eee;
    border-radius: 50%;
    border: 2px solid #2c3e50;
    background: transparent;
    transform: perspective(1px) translateZ(0);
    transition-property: box-shadow;
    transition-duration: 0.2s;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    text-transform: uppercase;
    outline: none;
    &.disabled {
        opacity: 0.3;
        cursor: not-allowed;

        &:before{
            display: none;
        }
    }
}

.row{
    display: flex;
    align-self: flex-start;
    justify-content: flex-start;
    font-size: 0.8rem;
    align-items: center;
}

.rule{
    font-size: 1rem;
    text-align: left;
    align-self: flex-start;
    padding-left: 1rem;

}

.number-input{
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid #2c3e50;
    outline: none;
    margin: 0 0.2rem;
    text-align: right;
}

</style>
