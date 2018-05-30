import gameStore from '@/stores/game';
import defaultRules from '@/util/rules.default';
import {
  RESET_ALL_SCORES,
  SET_SCORE,
  ELIMINATE_PLAYER,
  SET_FAULT,
  RESET_PLAYER,
} from '@/stores/gameMutation.types';

const {
  mutations,
} = gameStore;

describe('Game mutations', () => {
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
      ],
      rules: defaultRules,
    };
  });

  it('should reset all scores, fault and elimination', () => {
    mutations[RESET_ALL_SCORES](state);

    expect(state.players.reduce((totalScore, player) => totalScore + player.score, 0)).toEqual(0);
    expect(state.players.reduce((totalFault, player) => totalFault + player.fault, 0)).toEqual(0);
    expect(state.players.reduce((totalEliminated, player) => totalEliminated || player.isEliminated, false)).toEqual(false);
  });

  it('should set a score', () => {
    const index = 0;
    mutations[SET_SCORE](state, { index, score: 45 });

    expect(state.players[index].score).toEqual(45);
  });

  it('should add only score over 0', () => {
    const index = 0;
    mutations[SET_SCORE](state, { index, score: -10 });

    expect(state.players[index].score).toEqual(0);
  });

  it('should set a fault', () => {
    const index = 0;
    mutations[SET_FAULT](state, { index, fault: 1 });

    expect(state.players[index].fault).toEqual(1);
  });

  it('should eliminate a player', () => {
    const index = 0;
    mutations[ELIMINATE_PLAYER](state, { index });

    expect(state.players[index].score).toEqual(0);
    expect(state.players[index].isEliminated).toEqual(true);
  });

  it('should reset a player', () => {
    const index = 0;
    mutations[RESET_PLAYER](state, { index });

    expect(state.players[index].score).toEqual(0);
    expect(state.players[index].fault).toEqual(0);
  });
});
