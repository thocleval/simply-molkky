import { RESET_ALL_SCORES, ADD_SCORE_TO_PLAYER } from '@/stores/game-mutation-types';
import gameStore from '@/stores/game';
import defaultRules from '@/util/defaultRules';

const {
  mutations,
  getters,
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

  it('should reset all scores, fault and elimination', () => {
    mutations[RESET_ALL_SCORES](state);

    expect(state.players.reduce((totalScore, player) => totalScore + player.score, 0)).toEqual(0);
    expect(state.players.reduce((totalFault, player) => totalFault + player.fault, 0)).toEqual(0);
    expect(state.players.reduce((totalEliminated, player) => totalEliminated || player.isEliminated, false)).toEqual(false);
  });

  it('should add simple score', () => {
    const playerIndex = 1;
    mutations[ADD_SCORE_TO_PLAYER](state, { index: playerIndex, score: 5 });

    expect(state.players[playerIndex].score).toEqual(45);
  });

  it('should add 1 fault when zero score', () => {
    const playerIndex = 1;
    mutations[ADD_SCORE_TO_PLAYER](state, { index: playerIndex, score: 0 });

    expect(state.players[playerIndex].score).toEqual(40);
    expect(state.players[playerIndex].fault).toEqual(1);
  });

  it('should eliminate after 3 fault', () => {
    const playerIndex = 1;

    mutations[ADD_SCORE_TO_PLAYER](state, { index: playerIndex, score: 0 });
    mutations[ADD_SCORE_TO_PLAYER](state, { index: playerIndex, score: 0 });
    mutations[ADD_SCORE_TO_PLAYER](state, { index: playerIndex, score: 0 });

    expect(state.players[playerIndex].score).toEqual(0);
    expect(state.players[playerIndex].fault).toEqual(3);
    expect(state.players[playerIndex].isEliminated).toEqual(true);
    expect(getters.remainingPlayers(state)).toEqual(2);
  });

  it('should go back to 25 when exceed 50', () => {
    const playerIndex = 1;

    mutations[ADD_SCORE_TO_PLAYER](state, { index: playerIndex, score: 15 });

    expect(state.players[playerIndex].score).toEqual(25);
  });

  it('shouldn\'t have a winner if no players', () => {
    state.players = [];

    const ranking = getters.ranking(state);
    const remainingPlayers = getters.remainingPlayers(state);

    expect(getters.hasWinner(state, { ranking, remainingPlayers })).toEqual(false);
  });

  it('should win the game when 50', () => {
    const winnerIndex = 1;

    mutations[ADD_SCORE_TO_PLAYER](state, { index: winnerIndex, score: 10 });

    const ranking = getters.ranking(state);
    const remainingPlayers = getters.remainingPlayers(state);

    expect(getters.hasWinner(state, { ranking, remainingPlayers })).toEqual(true);
    expect(ranking[0]).toEqual(state.players[winnerIndex]);
  });

  it('should win the game if all opponents eliminated', () => {
    const winnerIndex = 1;
    const eliminatedIndexA = 0;
    const eliminatedIndexB = 2;

    mutations[ADD_SCORE_TO_PLAYER](state, { index: eliminatedIndexA, score: 0 });
    mutations[ADD_SCORE_TO_PLAYER](state, { index: eliminatedIndexA, score: 0 });
    mutations[ADD_SCORE_TO_PLAYER](state, { index: eliminatedIndexA, score: 0 });

    mutations[ADD_SCORE_TO_PLAYER](state, { index: eliminatedIndexB, score: 0 });
    mutations[ADD_SCORE_TO_PLAYER](state, { index: eliminatedIndexB, score: 0 });
    mutations[ADD_SCORE_TO_PLAYER](state, { index: eliminatedIndexB, score: 0 });

    const ranking = getters.ranking(state);
    const remainingPlayers = getters.remainingPlayers(state);

    expect(getters.hasWinner(state, { ranking, remainingPlayers })).toEqual(true);
    expect(ranking[0]).toEqual(state.players[winnerIndex]);
  });
});
