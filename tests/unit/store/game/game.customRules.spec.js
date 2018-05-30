import { SET_FAULT, RESET_PLAYER, SET_SCORE } from '@/stores/gameMutation.types';
import gameStore from '@/stores/game';
import defaultRules from '@/util/rules.default';
import rulesTypes from '@/util/rules.types';
import TestUtils from '../store-test.utils';

const {
  testAction,
} = TestUtils;

const {
  actions,
} = gameStore;


describe('[Custom rules] Game score gestion', () => {
  let state = {};

  beforeEach(() => {
    state = {
      players: [
        {
          name: 'Michel',
          score: 20,
          fault: 0,
          isEliminated: false,
        },
        {
          name: 'Jaqueline',
          score: 40,
          fault: 0,
          isEliminated: false,
        },
        {
          name: 'José',
          score: 2,
          fault: 0,
          isEliminated: false,
        },
      ],
      rules: Object.assign({}, defaultRules),
    };
  });

  it('[rules.sanction = reset] should reset the score after 3 faults', (done) => {
    const index = 1;

    state.rules.sanction = rulesTypes.SANCTION_RESET;
    state.players[index].fault = 2;

    testAction(
      actions.addScoreToPlayer,
      { index, score: 0 },
      state, [
        { type: SET_FAULT, payload: { index, fault: 3 } },
        { type: RESET_PLAYER, payload: { index } },
      ],
      done,
    );
  });

  it('[rules.sanction = nothing] should do nothing after 3 faults', (done) => {
    const index = 1;

    state.rules.sanction = rulesTypes.SANCTION_NOTHING;
    state.players[index].fault = 2;

    testAction(
      actions.addScoreToPlayer,
      { index, score: 0 },
      state, [
        { type: SET_FAULT, payload: { index, fault: 3 } },
      ],
      done,
    );
  });

  it('[rules.penaltyResetAmount = N] should reset to N when over goal', (done) => {
    const index = 1;

    state.rules.penaltyResetAmount = 10;

    testAction(
      actions.addScoreToPlayer,
      { index, score: 15 },
      state, [
        { type: SET_SCORE, payload: { index, score: 10 } },
      ],
      done,
    );
  });

  it('[rules.penalty = substract] should substract 5 points when over goal', (done) => {
    const index = 1;

    state.rules.penalty = rulesTypes.PENALTY_SUBSTRACT;

    testAction(
      actions.addScoreToPlayer,
      { index, score: 15 },
      state, [
        { type: SET_SCORE, payload: { index, score: 35 } },
      ],
      done,
    );
  });

  it('[rules.penalty = substract, custom amount of penalty] should substract N points when over goal', (done) => {
    const index = 1;

    state.rules.penalty = rulesTypes.PENALTY_SUBSTRACT;
    state.rules.penaltySubstractAmount = 20;

    testAction(
      actions.addScoreToPlayer,
      { index, score: 15 },
      state, [
        { type: SET_SCORE, payload: { index, score: 20 } },
      ],
      done,
    );
  });

  it('[rules.penalty = excess] should substract excess points when over goal', (done) => {
    const index = 1;

    state.rules.penalty = rulesTypes.PENALTY_EXCESS;

    testAction(
      actions.addScoreToPlayer,
      { index, score: 16 },
      state, [
        { type: SET_SCORE, payload: { index, score: 44 } },
      ],
      done,
    );
  });

  it('[rules.winCondition = higher] shouldn\'t go back to 25 when exceed 50', (done) => {
    const index = 1;

    state.rules.winCondition = rulesTypes.WIN_CONDITION_HIGHER;

    testAction(
      actions.addScoreToPlayer,
      { index, score: 15 },
      state, [
        { type: SET_SCORE, payload: { index, score: 55 } },
      ],
      done,
    );
  });

  it('[rules.zap] should half the score of player B when player A matches his score', (done) => {
    const playerAIndex = 2;
    const playerBIndex = 0;

    state.rules.zap = rulesTypes.ZAP_HALF;

    testAction(
      actions.addScoreToPlayer,
      { index: playerAIndex, score: 18 },
      state, [
        { type: SET_SCORE, payload: { index: playerAIndex, score: 20 } },
        { type: SET_SCORE, payload: { index: playerBIndex, score: 10, keepFault: true } },
      ],
      done,
    );
  });
});
