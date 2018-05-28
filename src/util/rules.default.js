import rulesTypes from './rules.types';

export default Object.freeze({
  winCondition: rulesTypes.WIN_CONDITION_EXACT,
  goal: 50,
  penalty: rulesTypes.PENALTY_RESET,
  penaltyResetAmount: 25,
  penaltySubstractAmount: 5,
  sanction: rulesTypes.SANCTION_ELIMINATED,
  zap: rulesTypes.ZAP_NOTHING,
});
