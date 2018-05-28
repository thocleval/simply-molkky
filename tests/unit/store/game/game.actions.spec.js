import { SET_RULES, ADD_PLAYER, REMOVE_PLAYER, RESET_ALL_SCORES, ADD_SCORE_TO_PLAYER } from '@/stores/game-mutation-types';

import gameStore from '@/stores/game';
import defaultRules from '@/util/defaultRules';

import TestUtils from '../store-test.utils';

const {
  testAction,
} = TestUtils;

const {
  actions,
} = gameStore;


describe('Game actions propagation to mutations', () => {
  it('set rules action should throw mutation', (done) => {
    testAction(actions.setRules, { goal: 40 }, {}, [{ type: SET_RULES, payload: { goal: 40 } }], done);
  });

  it('reset rules action should throw mutation', (done) => {
    testAction(actions.resetRules, null, {}, [{ type: SET_RULES, payload: defaultRules }], done);
  });

  it('add player should throw mutation', (done) => {
    testAction(actions.addPlayer, 'toto', {}, [
      {
        type: ADD_PLAYER,
        payload: {
          name: 'toto',
          score: 0,
          fault: 0,
          isEliminated: false,
        },
      },
    ], done);
  });

  it('remove player should throw mutation', (done) => {
    testAction(actions.removePlayer, 1, {}, [{ type: REMOVE_PLAYER, payload: 1 }], done);
  });

  it('add score to player without players shouldn\'t throw mutation', (done) => {
    testAction(actions.addScoreToPlayer, {
      index: 1,
      score: 10,
    }, { players: [] }, [], done);
  });

  it('add score to player should throw mutation', (done) => {
    testAction(actions.addScoreToPlayer, { index: 0, score: 10 }, {
      players: [{ name: 'toto' }],
    }, [{ type: ADD_SCORE_TO_PLAYER, payload: { index: 0, score: 10 } }], done);
  });

  it('reset all scores should throw mutation', (done) => {
    testAction(actions.resetAllScores, null, {}, [{ type: RESET_ALL_SCORES }], done);
  });
});
