import { ADD_PLAYER, REMOVE_PLAYER, REMOVE_ALL_PLAYERS } from '@/stores/gameMutation.types';
import gameStore from '@/stores/game';

const {
  mutations,
  getters,
} = gameStore;

describe('Game players gestion (mutations only)', () => {
  const state = {
    players: [],
  };

  it('should add a player', () => {
    mutations[ADD_PLAYER](state, { name: 'Michel' });

    expect(state.players.length).toEqual(1);
    expect(state.players[state.players.length - 1].name).toEqual('Michel');
  });

  it('should remove a player', () => {
    state.players = [
      { name: 'Michel' },
      { name: 'Jaqueline' },
      { name: 'José' },
    ];

    mutations[REMOVE_PLAYER](state, 1);

    expect(state.players.length).toEqual(2);
    expect(state.players[1].name).not.toEqual('Jaqueline');
  });

  it('should remove all players', () => {
    mutations[REMOVE_ALL_PLAYERS](state);

    expect(state.players.length).toEqual(0);
  });

  it('shouldn\'t add more than 16 players', () => {
    for (let index = 0; index <= 17; index += 1) {
      mutations[ADD_PLAYER](state, { name: `Michel ${index + 1}` });
    }

    expect(getters.canAddPlayers(state)).toEqual(false);
    expect(state.players.length).toEqual(16);
    expect(state.players[state.players.length - 1].name).toEqual('Michel 16');
  });
});
