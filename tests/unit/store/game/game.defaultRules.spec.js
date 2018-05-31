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
          id: 'michel',
          name: 'Michel',
          score: 20,
          fault: 0,
          isEliminated: false,
        },
        {
          id: 'jacqueline',
          name: 'Jaqueline',
          score: 40,
          fault: 0,
          isEliminated: false,
        },
        {
          id: 'jose',
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
      { id: 'id-de-test', score: 10 },
      { players: [] },
      [],
      done,
    );
  });

  it('should add simple score', (done) => {
    const index = 1;
    const {
      id,
    } = state.players[index];

    testAction(
      actions.addScoreToPlayer,
      { id, score: 5 },
      state, [
        { type: SET_SCORE, payload: { id, score: 45 } },
      ],
      done,
    );
  });

  it('should add 1 fault when zero score', (done) => {
    const index = 1;
    const {
      id,
    } = state.players[index];

    testAction(
      actions.addScoreToPlayer,
      { id, score: 0 },
      state, [
        { type: SET_FAULT, payload: { id, fault: 1 } },
      ],
      done,
    );
  });

  it('should eliminate after 3 fault', (done) => {
    const index = 1;
    const {
      id,
    } = state.players[index];

    state.players[index].fault = 2;

    testAction(
      actions.addScoreToPlayer,
      { id, score: 0 },
      state, [
        { type: SET_FAULT, payload: { id, fault: 3 } },
        { type: ELIMINATE_PLAYER, payload: { id } },
      ],
      done,
    );
  });

  it('should go back to 25 when exceed 50', (done) => {
    const index = 1;
    const {
      id,
    } = state.players[index];

    testAction(
      actions.addScoreToPlayer,
      { id, score: 15 },
      state, [
        { type: SET_SCORE, payload: { id, score: 25 } },
      ],
      done,
    );
  });
});
