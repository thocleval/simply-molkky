import { SET_RULES } from '@/stores/gameMutation.types';
import gameStore from '@/stores/game';
import defaultRules from '@/util/rules.default';

const {
  mutations,
} = gameStore;


describe('Game rules gestion', () => {
  let state = {};

  beforeEach(() => {
    state = {
      rules: Object.assign({}, defaultRules),
    };
  });

  it('should init state with default rules', () => {
    const initialState = gameStore.state();

    expect(initialState.rules).toEqual(defaultRules);
  });

  it('should set custom rules', () => {
    const newRules = {
      goal: 10,
    };

    mutations[SET_RULES](state, newRules);

    expect(state.rules.goal).toEqual(10);
    expect(state.rules.winCondition).toEqual(defaultRules.winCondition);
  });

  it('should reset penaltyResetAmount if over goal', () => {
    const newRules = {
      goal: 20,
      penaltyResetAmount: 50,
    };

    mutations[SET_RULES](state, newRules);

    expect(state.rules.penaltyResetAmount).toEqual(0);
  });

  it('should reset penaltySubstractAmount if over goal', () => {
    const newRules = {
      goal: 20,
      penaltySubstractAmount: 50,
    };

    mutations[SET_RULES](state, newRules);

    expect(state.rules.penaltySubstractAmount).toEqual(0);
  });
});
