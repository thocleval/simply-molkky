import gameStore from '@/stores/game';
import defaultRules from '@/util/rules.default';
import {
  RESET_ALL_SCORES,
  SET_SCORE,
  ELIMINATE_PLAYER,
  SET_FAULT,
  SET_ELIMINATED,
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
          id: 'id-de-test',
          name: 'Michel',
          score: 20,
          fault: 2,
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
    const id = 'id-de-test';
    mutations[SET_SCORE](state, { id, score: 45 });

    const player = state.players.find(p => p.id === id);

    expect(player.score).toEqual(45);
    expect(player.fault).toEqual(0);
  });

  it('should set a score and keep faults', () => {
    const id = 'id-de-test';
    mutations[SET_SCORE](state, { id, score: 45, keepFault: true });

    const player = state.players.find(p => p.id === id);

    expect(player.score).toEqual(45);
    expect(player.fault).toEqual(2);
  });

  it('should add only score over 0', () => {
    const id = 'id-de-test';
    mutations[SET_SCORE](state, { id, score: -10 });

    const player = state.players.find(p => p.id === id);

    expect(player.score).toEqual(0);
  });

  it('should set a fault', () => {
    const id = 'id-de-test';
    mutations[SET_FAULT](state, { id, fault: 1 });

    const player = state.players.find(p => p.id === id);

    expect(player.fault).toEqual(1);
  });

  it('should add only fault over 0', () => {
    const id = 'id-de-test';
    mutations[SET_FAULT](state, { id, fault: -10 });

    const player = state.players.find(p => p.id === id);

    expect(player.fault).toEqual(0);
  });

  it('should set eliminated', () => {
    const id = 'id-de-test';
    mutations[SET_ELIMINATED](state, { id, isEliminated: true });

    const player = state.players.find(p => p.id === id);

    expect(player.isEliminated).toEqual(true);
  });

  it('should eliminate a player', () => {
    const id = 'id-de-test';
    mutations[ELIMINATE_PLAYER](state, { id });

    const player = state.players.find(p => p.id === id);

    expect(player.score).toEqual(0);
    expect(player.isEliminated).toEqual(true);
  });

  it('should reset a player', () => {
    const id = 'id-de-test';
    mutations[RESET_PLAYER](state, { id });

    const player = state.players.find(p => p.id === id);

    expect(player.score).toEqual(0);
    expect(player.fault).toEqual(0);
  });
});
