<template>
  <div class="🖼">
    <h1>Rules</h1>
    <div class="scroll-view">
      <div class="rule">Score to reach :<input type="number" min="1" max="999" class="number-input" v-model="currentRules.goal">points</div>

      <div class="rule">
        <p class="rule-label">Win condition :</p>
        <div class="radio-wrapper">
          <input type="radio" name="score" value="higher" id="score-higher" v-model="currentRules.winCondition">
          <label for="score-higher">Score {{currentRules.goal}} points or more</label>
        </div>
        <div class="radio-wrapper">
          <input type="radio" checked="checked" name="score" id="score-exact" value="exact" v-model="currentRules.winCondition">
          <label for="score-exact">Score exactly {{currentRules.goal}} points</label>
        </div>
      </div>

      <div class="rule" :class="{ disabled: isDisabled }" >
        <p class="rule-label">Penalty for scoring too much :</p>
        <div class="radio-wrapper">
          <input type="radio" checked="checked" name="penalty" value="reset" id="penalty-reset" v-model="currentRules.penalty">
          <label for="penalty-reset">Score is set back to <input type="number" min="1" max="999" class="number-input" v-model="currentRules.penaltyResetAmmount"></label>
        </div>
        <div class="radio-wrapper">
          <input type="radio" name="penalty" value="excess" id="penalty-excess" v-model="currentRules.penalty">
          <label for="penalty-excess">Take away excess points (Eg. 56 -> 44)</label>
        </div>
        <div class="radio-wrapper">
          <input type="radio" name="penalty" value="substract"  id="penalty-substract" v-model="currentRules.penalty">
          <label for="penalty-substract">Substract <input type="number" min="1" max="999" class="number-input" v-model="currentRules.penaltySubstractAmmount"> points</label>
        </div>
      </div>
      <div class="rule">
        <p class="rule-label">In case of 3 consecutive misses :</p>
        <div class="radio-wrapper">
          <input type="radio" name="faults" value="eliminated" id="faults-eliminated" v-model="currentRules.sanction">
          <label for="faults-eliminated">The player is eliminated</label>
        </div>
        <div class="radio-wrapper">
          <input type="radio" name="faults" value="reset" id="faults-reset" v-model="currentRules.sanction">
          <label for="faults-reset">The player's score is reset to 0</label>
        </div>
        <div class="radio-wrapper">
          <input type="radio" name="faults" value="nothing" id="faults-nothing" v-model="currentRules.sanction">
          <label for="faults-nothing">Nothing happens</label>
        </div>
      </div>
      <div class="rule">
        <p class="rule-label">Zap! If player 1 matches player 2's score :</p>
        <div class="radio-wrapper">
          <input type="radio" checked="checked" name="zap" value="nothing" id="zap-nothing" v-model="currentRules.zap">
          <label for="zap-nothing">Nothing happens</label>
        </div>
        <div class="radio-wrapper">
          <input type="radio" name="zap" value="half" id="zap-half" v-model="currentRules.zap">
          <label for="zap-half">Player 2's score is halved</label>
        </div>
      </div>
    </div>
    <div class="row">
      <button @click="reset">Default</button>
      <button @click="validate" >Ok</button>
    </div>
  </div>
</template>


<script>
import defaultRules from "../util/defaultRules";

export default {
  props: {
    rules: {
      type: Object
    }
  },
  data: function() {
    return {
      currentRules: Object.assign({}, this.rules || defaultRules),
    };
  },
  methods: {
    reset() {
      this.currentRules = Object.assign({}, defaultRules);
    },
    validate() {
      this.currentRules.goal = Math.max(this.currentRules.goal, 1);
      if (this.currentRules.penaltyResetAmmount > this.currentRules.goal) {
        this.currentRules.penaltyResetAmmount = 0;
      }
      if (this.currentRules.penaltySubstractAmmount > this.currentRules.goal) {
        this.currentRules.penaltySubstractAmmount = 0;
      }
      this.$emit("applyRules", this.currentRules);
    }
  },
  computed: {
    isDisabled() {
      return this.currentRules.winCondition !== "exact";
    }
  }
};
</script>

<style lang="less">
@import "../style/variables";

.rule {
  text-align: left;
  align-self: stretch;

  .rule-label {
    font-size: 1rem;
  }
}

.radio-wrapper {
  margin: 0;
  display: block;
  position: relative;
  padding-left: 1rem;
  cursor: pointer;
  user-select: none;
  text-align: left;

  /* Hide the browser's default radio button */
  & input[type="radio"] {
    display: none;
  }

  & input:checked ~ label {
    &::before {
      box-shadow: inset 0 0 0px .6rem;
    }
  }

  & input:checked:hover ~ label {
    &::before {
      box-shadow: inset 0 0 0px .6rem;
    }
  }

  & input:hover ~ label {
    &::before {
      box-shadow: inset 0 0 0px 0.1rem;
    }
  }

  label {
    cursor: pointer;
    margin: 0;
    font-size: 0.9rem;

    &::before {
      content: '';
      display: inline-block;
      vertical-align: middle;
      height: .6rem;
      width: .6rem;
      border-radius: 50%;
      border: 2px solid @dark-blue;
      background: transparent;
      transition: box-shadow @animation-duration ease;
      outline: none;
      margin-right: 1rem;
      margin-bottom: 0.3rem;
      box-shadow: inset 0 0 0 0;

      &.disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    }
  }
}

.number-input {
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid @dark-blue;
  outline: none;
  margin: 0 0.2rem;
  text-align: center;
  padding: 0 .4rem;
  width: auto;
}
</style>
