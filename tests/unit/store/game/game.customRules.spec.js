import { ADD_SCORE_TO_PLAYER } from '@/stores/gameMutation.types';
import gameStore from '@/stores/game';
import defaultRules from '@/util/rules.default';
import rulesTypes from '@/util/rules.types';

const {
  getters,
  mutations,
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

  it('[rules.sanction = reset] should reset the score after 3 faults', () => {
    const playerIndex = 1;

    state.rules.sanction = rulesTypes.SANCTION_RESET;

    mutations[ADD_SCORE_TO_PLAYER](state, { index: playerIndex, score: 0 });
    mutations[ADD_SCORE_TO_PLAYER](state, { index: playerIndex, score: 0 });
    mutations[ADD_SCORE_TO_PLAYER](state, { index: playerIndex, score: 0 });

    expect(state.players[playerIndex].score).toEqual(0);
    expect(state.players[playerIndex].fault).toEqual(0);
    expect(state.players[playerIndex].isEliminated).toEqual(false);
    expect(getters.remainingPlayers(state)).toEqual(3);
  });

  it('[rules.sanction = nothing] should do nothing after 3 faults', () => {
    const playerIndex = 1;

    state.rules.sanction = rulesTypes.SANCTION_NOTHING;

    mutations[ADD_SCORE_TO_PLAYER](state, { index: playerIndex, score: 0 });
    mutations[ADD_SCORE_TO_PLAYER](state, { index: playerIndex, score: 0 });
    mutations[ADD_SCORE_TO_PLAYER](state, { index: playerIndex, score: 0 });

    expect(state.players[playerIndex].score).toEqual(40);
    expect(state.players[playerIndex].fault).toEqual(3);
    expect(state.players[playerIndex].isEliminated).toEqual(false);
    expect(getters.remainingPlayers(state)).toEqual(3);
  });

  it('[rules.penaltyResetAmount = N] should reset to N when over goal', () => {
    const playerIndex = 1;

    state.rules.penaltyResetAmount = 10;

    mutations[ADD_SCORE_TO_PLAYER](state, { index: playerIndex, score: 15 });

    expect(state.players[playerIndex].score).toEqual(10);
  });

  it('[rules.penalty = substract] should substract 5 points when over goal', () => {
    const playerIndex = 1;

    state.rules.penalty = rulesTypes.PENALTY_SUBSTRACT;

    mutations[ADD_SCORE_TO_PLAYER](state, { index: playerIndex, score: 15 });

    expect(state.players[playerIndex].score).toEqual(35);
  });

  it('[rules.penalty = substract, custom amount of penalty] should substract N points when over goal', () => {
    const playerIndex = 1;

    state.rules.penalty = rulesTypes.PENALTY_SUBSTRACT;
    state.rules.penaltySubstractAmount = 20;

    mutations[ADD_SCORE_TO_PLAYER](state, { index: playerIndex, score: 15 });

    expect(state.players[playerIndex].score).toEqual(20);
  });

  it('[rules.penalty = substract, large amount of penalty] should limit to 0 the loss of points', () => {
    const playerIndex = 1;

    state.rules.penalty = rulesTypes.PENALTY_SUBSTRACT;
    state.rules.penaltySubstractAmount = 200;

    mutations[ADD_SCORE_TO_PLAYER](state, { index: playerIndex, score: 15 });

    expect(state.players[playerIndex].score).toEqual(0);
  });

  it('[rules.penalty = excess] should substract excess points when over goal', () => {
    const playerIndex = 1;

    state.rules.penalty = rulesTypes.PENALTY_EXCESS;

    mutations[ADD_SCORE_TO_PLAYER](state, { index: playerIndex, score: 16 });

    expect(state.players[playerIndex].score).toEqual(44);
  });

  it('[rules.goal] should win the game when custom goal reach', () => {
    const playerIndex = 1;

    state.rules.goal = 60;

    mutations[ADD_SCORE_TO_PLAYER](state, { index: playerIndex, score: 20 });

    const ranking = getters.ranking(state);
    const remainingPlayers = getters.remainingPlayers(state);

    expect(getters.hasWinner(state, { ranking, remainingPlayers })).toEqual(true);
    expect(ranking[0]).toEqual(state.players[playerIndex]);
  });

  it('[rules.winCondition = higher] shouldn\'t go back to 25 when exceed 50', () => {
    const playerIndex = 1;

    state.rules.winCondition = rulesTypes.WIN_CONDITION_HIGHER;

    mutations[ADD_SCORE_TO_PLAYER](state, { index: playerIndex, score: 15 });

    expect(state.players[playerIndex].score).toEqual(55);
  });

  it('[rules.winCondition = higher] should win the game when over 50', () => {
    const playerIndex = 1;

    state.rules.winCondition = rulesTypes.WIN_CONDITION_HIGHER;

    mutations[ADD_SCORE_TO_PLAYER](state, { index: playerIndex, score: 20 });

    const ranking = getters.ranking(state);
    const remainingPlayers = getters.remainingPlayers(state);

    expect(getters.hasWinner(state, { ranking, remainingPlayers })).toEqual(true);
    expect(ranking[0]).toEqual(state.players[playerIndex]);
  });

  it('[rules.zap] should half the score of player B when player A matches his score', () => {
    const playerAIndex = 2;
    const playerBIndex = 0;

    state.rules.zap = rulesTypes.ZAP_HALF;

    mutations[ADD_SCORE_TO_PLAYER](state, { index: playerAIndex, score: 18 });

    expect(state.players[playerAIndex].score).toEqual(20);
    expect(state.players[playerBIndex].score).toEqual(10);
  });
});
