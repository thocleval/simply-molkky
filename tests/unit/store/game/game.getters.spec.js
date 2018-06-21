import gameStore from '@/stores/game';
import defaultRules from '@/util/rules.default';
import rulesTypes from '@/util/rules.types';

const {
  getters,
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
        {
          name: 'Jean',
          score: 13,
          fault: 0,
          isEliminated: false,
        },
      ],
      rules: Object.assign({}, defaultRules),
    };
  });

  it('should count the players', () => {
    const count = getters.playersCount(state);

    expect(count).toEqual(4);
  });

  it('should order correctly the ranking', () => {
    const ranking = getters.ranking(state);

    expect(ranking[0].score).toEqual(40);
    expect(ranking[1].score).toEqual(20);
    expect(ranking[2].score).toEqual(13);
    expect(ranking[3].score).toEqual(2);
  });

  it('should count remaining players', () => {
    state.players[2].isEliminated = true;
    const ranking = getters.ranking(state);
    const remainingPlayers = getters.remainingPlayers(state, { ranking });

    expect(remainingPlayers).toEqual(3);
  });

  it('shouldn\'t have a winner if no players', () => {
    state.players = [];

    const ranking = getters.ranking(state);
    const remainingPlayers = getters.remainingPlayers(state, { ranking });

    expect(getters.hasWinner(state, { ranking, remainingPlayers })).toEqual(false);
  });

  it('shouldn\'t have a winner when nobody reach goal', () => {
    const ranking = getters.ranking(state);
    const remainingPlayers = getters.remainingPlayers(state, { ranking });

    expect(getters.hasWinner(state, { ranking, remainingPlayers })).toEqual(false);
  });

  it('should have a winner when goal reach', () => {
    const winnerIndex = 1;
    state.players[winnerIndex].score = state.rules.goal;

    const ranking = getters.ranking(state);
    const remainingPlayers = getters.remainingPlayers(state, { ranking });

    expect(getters.hasWinner(state, { ranking, remainingPlayers })).toEqual(true);
    expect(ranking[0]).toEqual(state.players[winnerIndex]);
  });

  it('[Custom win condition] should have a winner when over goal', () => {
    const winnerIndex = 1;
    state.rules.winCondition = rulesTypes.WIN_CONDITION_HIGHER;
    state.players[winnerIndex].score = state.rules.goal + 10;

    const ranking = getters.ranking(state);
    const remainingPlayers = getters.remainingPlayers(state, { ranking });

    expect(getters.hasWinner(state, { ranking, remainingPlayers })).toEqual(true);
    expect(ranking[0]).toEqual(state.players[winnerIndex]);
  });

  it('[Custom goal] should have a winner when goal reach', () => {
    const winnerIndex = 1;
    state.rules.goal = 60;
    state.players[winnerIndex].score = 60;

    const ranking = getters.ranking(state);
    const remainingPlayers = getters.remainingPlayers(state, { ranking });

    expect(getters.hasWinner(state, { ranking, remainingPlayers })).toEqual(true);
    expect(ranking[0]).toEqual(state.players[winnerIndex]);
  });

  it('[Custom win condition] shouldn\'t have a winner when no winCondition', () => {
    const winnerIndex = 1;
    state.rules.winCondition = undefined;
    state.players[winnerIndex].score = state.rules.goal;

    const ranking = getters.ranking(state);
    const remainingPlayers = getters.remainingPlayers(state, { ranking });

    expect(getters.hasWinner(state, { ranking, remainingPlayers })).toEqual(false);
  });

  it('should have a winner when one remaining player', () => {
    const winnerIndex = 1;
    state.players[0].isEliminated = true;
    state.players[0].score = 0;
    state.players[2].isEliminated = true;
    state.players[2].score = 0;
    state.players[3].isEliminated = true;
    state.players[3].score = 0;

    const ranking = getters.ranking(state);
    const remainingPlayers = getters.remainingPlayers(state, { ranking });

    expect(getters.hasWinner(state, { ranking, remainingPlayers })).toEqual(true);
    expect(ranking[0]).toEqual(state.players[winnerIndex]);
  });
});
