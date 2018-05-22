<template>
  <div class="🖼">
    <h1>{{$t('rules.title')}}</h1>
    <div class="scroll-view">
      <div class="rule">{{$t("rules.goal.label")}} <input type="number" min="1" max="999" class="number-input" v-model="currentRules.goal">{{$t("rules.goal.points")}}</div>

      <div class="rule">
        <p class="rule-label">{{$t("rules.score.label")}}</p>
        <div class="radio-wrapper">
          <input type="radio" name="score" id="score-exact" value="exact" v-model="currentRules.winCondition">
          <label for="score-exact">{{$t("rules.score.exact", {goal: currentRules.goal})}}</label>
        </div>
        <div class="radio-wrapper">
          <input type="radio" name="score" value="higher" id="score-higher" v-model="currentRules.winCondition">
          <label for="score-higher">{{$t("rules.score.higher", {goal: currentRules.goal})}}</label>
        </div>
      </div>

      <div class="rule" :class="{ disabled: isDisabled }" >
        <p class="rule-label">{{$t("rules.penalty.label")}}</p>
        <div class="radio-wrapper">
          <input type="radio" name="penalty" value="reset" id="penalty-reset" v-model="currentRules.penalty">
          <label for="penalty-reset">{{$t('rules.penalty.reset')}} <input type="number" min="1" max="999" class="number-input" v-model="currentRules.penaltyResetAmmount"></label>
        </div>
        <div class="radio-wrapper">
          <input type="radio" name="penalty" value="excess" id="penalty-excess" v-model="currentRules.penalty">
          <label for="penalty-excess">{{$t('rules.penalty.excess')}}</label>
        </div>
        <div class="radio-wrapper">
          <input type="radio" name="penalty" value="substract"  id="penalty-substract" v-model="currentRules.penalty">
          <label for="penalty-substract">{{$t('rules.penalty.substract')}} <input type="number" min="1" max="999" class="number-input" v-model="currentRules.penaltySubstractAmmount"></label>
        </div>
      </div>

      <div class="rule">
        <p class="rule-label">{{$t("rules.faults.label")}}</p>
        <div class="radio-wrapper">
          <input type="radio" name="faults" value="eliminated" id="faults-eliminated" v-model="currentRules.sanction">
          <label for="faults-eliminated">{{$t('rules.faults.eliminated')}}</label>
        </div>
        <div class="radio-wrapper">
          <input type="radio" name="faults" value="reset" id="faults-reset" v-model="currentRules.sanction">
          <label for="faults-reset">{{$t('rules.faults.reset')}}</label>
        </div>
        <div class="radio-wrapper">
          <input type="radio" name="faults" value="nothing" id="faults-nothing" v-model="currentRules.sanction">
          <label for="faults-nothing">{{$t('rules.faults.nothing')}}</label>
        </div>
      </div>

      <div class="rule">
        <p class="rule-label">{{$t("rules.zap.label")}}</p>
        <div class="radio-wrapper">
          <input type="radio" name="zap" value="nothing" id="zap-nothing" v-model="currentRules.zap">
          <label for="zap-nothing">{{$t("rules.zap.nothing")}}</label>
        </div>
        <div class="radio-wrapper">
          <input type="radio" name="zap" value="half" id="zap-half" v-model="currentRules.zap">
          <label for="zap-half">{{$t("rules.zap.half")}}</label>
        </div>
      </div>
    </div>
    <div class="row">
      <button @click="reset">{{$t('rules.reset')}}</button>
      <button @click="validate" >{{$t('rules.validate')}}</button>
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
  margin-top: 1rem;

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
