import { RESET_ALL_SCORES, SET_SCORE, SET_FAULT, ELIMINATE_PLAYER } from '@/stores/gameMutation.types';
import gameStore from '@/stores/game';
import defaultRules from '@/util/rules.default';
import TestUtils from '../store-test.utils';

const {
  testAction,
} = TestUtils;

const {
  actions,
} = gameStore;

describe('[Default rules] Game score gestion', () => {
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
      rules: defaultRules,
    };
  });

  it('should reset all scores', (done) => {
    testAction(
      actions.resetAllScores,
      state,
      state, [
        { type: RESET_ALL_SCORES },
      ],
      done,
    );
  });

  it('should do nothing if no players', (done) => {
    testAction(
      actions.addScoreToPlayer,
      { index: 1, score: 10 },
      { players: [] },
      [],
      done,
    );
  });

  it('should add simple score', (done) => {
    const index = 1;

    testAction(
      actions.addScoreToPlayer,
      { index, score: 5 },
      state, [
        { type: SET_SCORE, payload: { index, score: 45 } },
      ],
      done,
    );
  });

  it('should add 1 fault when zero score', (done) => {
    const index = 1;

    testAction(
      actions.addScoreToPlayer,
      { index, score: 0 },
      state, [
        { type: SET_FAULT, payload: { index, fault: 1 } },
      ],
      done,
    );
  });

  it('should eliminate after 3 fault', (done) => {
    const index = 1;

    state.players[index].fault = 2;

    testAction(
      actions.addScoreToPlayer,
      { index, score: 0 },
      state, [
        { type: SET_FAULT, payload: { index, fault: 3 } },
        { type: ELIMINATE_PLAYER, payload: { index } },
      ],
      done,
    );
  });

  it('should go back to 25 when exceed 50', (done) => {
    const index = 1;

    testAction(
      actions.addScoreToPlayer,
      { index, score: 15 },
      state, [
        { type: SET_SCORE, payload: { index, score: 25 } },
      ],
      done,
    );
  });
});
