import {
  ADD_PLAYER,
  REMOVE_PLAYER,
  REMOVE_ALL_PLAYERS,
  SET_PLAYERS,
} from '@/stores/gameMutation.types';
import gameStore from '@/stores/game';

import TestUtils from '../store-test.utils';

const {
  testAction,
} = TestUtils;

const {
  mutations,
  getters,
  actions,
} = gameStore;

describe('Game players gestion', () => {
  const state = {
    players: [],
  };

  it('should add a player', () => {
    state.players = [];
    mutations[ADD_PLAYER](state, 'Michel');

    expect(state.players.length).toEqual(1);
    expect(state.players[state.players.length - 1].name).toEqual('Michel');
  });

  it('should add multiple players', () => {
    state.players = [
      { name: 'Julio' },
    ];

    const players = [
      { name: 'Michel' },
      { name: 'Jaqueline' },
      { name: 'José' },
    ];
    mutations[SET_PLAYERS](state, players);

    expect(state.players.length).toEqual(3);
    expect(state.players[0].name).toEqual('Michel');
    expect(state.players[1].name).toEqual('Jaqueline');
    expect(state.players[2].name).toEqual('José');
  });

  it('should remove a player', () => {
    state.players = [
      { id: 'id-1', name: 'Michel' },
      { id: 'id-2', name: 'Jaqueline' },
      { id: 'id-3', name: 'José' },
    ];

    mutations[REMOVE_PLAYER](state, 'id-2');

    expect(state.players.length).toEqual(2);
    expect(state.players[1].name).not.toEqual('Jaqueline');
  });

  it('should remove all players', () => {
    mutations[REMOVE_ALL_PLAYERS](state);

    expect(state.players.length).toEqual(0);
  });

  it('shouldn\'t add more than 16 players', () => {
    for (let index = 0; index <= 17; index += 1) {
      mutations[ADD_PLAYER](state, `Michel ${index + 1}`);
    }

    expect(getters.canAddPlayers(state)).toEqual(false);
    expect(state.players.length).toEqual(16);
    expect(state.players[state.players.length - 1].name).toEqual('Michel 16');
  });

  it('add player should throw mutation', (done) => {
    testAction(
      actions.addPlayer,
      'toto',
      {},
      [
        { type: ADD_PLAYER, payload: 'toto' },
      ],
      done,
    );
  });

  it('remove player should throw mutation', (done) => {
    testAction(
      actions.removePlayer,
      1,
      {},
      [
        { type: REMOVE_PLAYER, payload: 1 },
      ],
      done,
    );
  });

  it('reorder players should throw mutation', (done) => {
    const players = [
      { name: 'Michel' },
      { name: 'Jaqueline' },
      { name: 'José' },
    ];

    testAction(
      actions.reOrderPlayers,
      players,
      {},
      [
        { type: SET_PLAYERS, payload: players },
      ],
      done,
    );
  });

  it('shuffle players should throw mutation', (done) => {
    state.players = [
      { id: 'id-1', name: 'Michel' },
      { id: 'id-2', name: 'Jaqueline' },
      { id: 'id-3', name: 'José' },
    ];

    testAction(
      actions.shufflePlayers,
      {},
      state,
      [
        { type: SET_PLAYERS },
      ],
      done,
    );
  });
});
