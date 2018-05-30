<template>
  <div class="🖼">
    <h1 class="main-title">{{$t('rules.title')}}</h1>
    <div class="scroll-view">
      <div class="rule">
        <p class="rule-label">{{$t("rules.goal.label")}} <input type="number" min="1" max="999" class="number-input" v-model="tempRules.goal">{{$t("rules.goal.points")}}</p>
      </div>

      <div class="rule">
        <p class="rule-label">{{$t("rules.score.label")}}</p>
        <div class="radio-wrapper">
          <input type="radio" name="score" id="score-exact" :value="rulesTypes.WIN_CONDITION_EXACT" v-model="tempRules.winCondition">
          <label for="score-exact">{{$t("rules.score.exact", {goal: rules.goal})}}</label>
        </div>
        <div class="radio-wrapper">
          <input type="radio" name="score" :value="rulesTypes.WIN_CONDITION_HIGHER" id="score-higher" v-model="tempRules.winCondition">
          <label for="score-higher">{{$t("rules.score.higher", {goal: rules.goal})}}</label>
        </div>
      </div>

      <div class="rule" :class="{ disabled: isDisabled }" >
        <p class="rule-label">{{$t("rules.penalty.label")}}</p>
        <div class="radio-wrapper">
          <input type="radio" name="penalty" :value="rulesTypes.PENALTY_RESET" id="penalty-reset" v-model="tempRules.penalty">
          <label for="penalty-reset">{{$t('rules.penalty.reset')}} <input type="number" min="1" max="999" class="number-input" v-model="tempRules.penaltyResetAmount"></label>
        </div>
        <div class="radio-wrapper">
          <input type="radio" name="penalty" :value="rulesTypes.PENALTY_EXCESS" id="penalty-excess" v-model="tempRules.penalty">
          <label for="penalty-excess">{{$t('rules.penalty.excess')}}</label>
        </div>
        <div class="radio-wrapper">
          <input type="radio" name="penalty" :value="rulesTypes.PENALTY_SUBSTRACT"  id="penalty-substract" v-model="tempRules.penalty">
          <label for="penalty-substract">{{$t('rules.penalty.substract')}} <input type="number" min="1" max="999" class="number-input" v-model="tempRules.penaltySubstractAmount"></label>
        </div>
      </div>

      <div class="rule">
        <p class="rule-label">{{$t("rules.faults.label")}}</p>
        <div class="radio-wrapper">
          <input type="radio" name="faults" :value="rulesTypes.SANCTION_ELIMINATED" id="faults-eliminated" v-model="tempRules.sanction">
          <label for="faults-eliminated">{{$t('rules.faults.eliminated')}}</label>
        </div>
        <div class="radio-wrapper">
          <input type="radio" name="faults" :value="rulesTypes.SANCTION_RESET" id="faults-reset" v-model="tempRules.sanction">
          <label for="faults-reset">{{$t('rules.faults.reset')}}</label>
        </div>
        <div class="radio-wrapper">
          <input type="radio" name="faults" :value="rulesTypes.SANCTION_NOTHING" id="faults-nothing" v-model="tempRules.sanction">
          <label for="faults-nothing">{{$t('rules.faults.nothing')}}</label>
        </div>
      </div>

      <div class="rule">
        <p class="rule-label">{{$t("rules.zap.label")}}</p>
        <div class="radio-wrapper">
          <input type="radio" name="zap" :value="rulesTypes.ZAP_NOTHING" id="zap-nothing" v-model="tempRules.zap">
          <label for="zap-nothing">{{$t("rules.zap.nothing")}}</label>
        </div>
        <div class="radio-wrapper">
          <input type="radio" name="zap" :value="rulesTypes.ZAP_HALF" id="zap-half" v-model="tempRules.zap">
          <label for="zap-half">{{$t("rules.zap.half")}}</label>
        </div>
      </div>
    </div>
    <div class="row">
      <button class="btn" @click="reset"><AppIcon icon="undo" /> {{$t('rules.reset')}}</button>
      <button class="btn" @click="validate" >{{$t('rules.validate')}}</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import rulesTypes from '@/util/rules.types';
import AppIcon from '@/components/AppIcon';

export default {
  components: {
    AppIcon,
  },
  data() {
    return {
      tempRules: {},
      rulesTypes,
    };
  },
  computed: {
    ...mapState('game', ['rules']),
    isDisabled() {
      return this.tempRules.winCondition !== rulesTypes.WIN_CONDITION_EXACT;
    },
  },
  mounted() {
    this.tempRules = Object.assign({}, this.rules);
  },
  methods: {
    ...mapActions('game', ['setRules', 'resetRules']),
    reset() {
      this.resetRules();
      this.tempRules = Object.assign({}, this.rules);
    },
    validate() {
      this.setRules(this.tempRules);
      this.$router.push({ name: 'home' });
    },
  },
};
</script>


<style lang="less" scoped>
@import '~@/style/variables';

.rule {
  text-align: left;
  align-self: stretch;
  margin-top: @spacing-small;

  .rule-label {
    font-size: 1.5rem;
  }
}

.radio-wrapper {
  margin: 0;
  display: block;
  position: relative;
  cursor: pointer;
  user-select: none;
  text-align: left;
  margin-top: 0.3rem;

  /* Hide the browser's default radio button */
  & input[type="radio"] {
    display: none;
  }

  & input:checked ~ label {
    &::before {
      box-shadow: inset 0 0 0 .6rem;
    }
  }

  & input:checked:hover ~ label {
    &::before {
      box-shadow: inset 0 0 0 .6rem;
    }
  }

  & input:hover ~ label {
    &::before {
      box-shadow: inset 0 0 0 0.1rem;
    }
  }

  label {
    cursor: pointer;
    margin: 0;
    font-size: 1.4rem;
    padding-left: 2.5rem;
    position: relative;
    display: inline-block;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0rem;
      transform: translate(0, -50%);
      display: inline-block;
      vertical-align: middle;
      height: 1rem;
      width: 1rem;
      border-radius: 50%;
      border: 2px solid @dark-blue;
      background: transparent;
      transition: box-shadow @transition-duration ease;
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
  background: fade(@white, 50%);
  border: 2px solid @dark-blue;
  outline: none;
  margin: 0 .2rem;
  text-align: center;
  padding: .2rem .6rem;
  width: auto;
}
</style>
