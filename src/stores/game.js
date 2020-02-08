/* eslint-disable no-param-reassign */
import defaultRules from '@/util/rules.default';
import rulesTypes from '@/util/rules.types';
import utils from '@/util/utils';
import {
  SET_RULES,
  ADD_PLAYER,
  SET_PLAYERS,
  REMOVE_PLAYER,
  REMOVE_ALL_PLAYERS,
  RESET_ALL_SCORES,
  SET_SCORE,
  ELIMINATE_PLAYER,
  SET_FAULT,
  RESET_PLAYER,
  SET_ELIMINATED,
  SET_CURRENT_PLAYER,
} from './gameMutation.types';

export const PLAYERS_LIMIT = 16;

export default {
  namespaced: true,
  state() {
    return {
      players: [],
      rules: Object.assign({}, defaultRules),
      currentPlayerIndex: 0,
    };
  },
  getters: {
    playersCount: ({ players }) => players.length,
    canAddPlayers: ({ players }) => players.length < PLAYERS_LIMIT,
    ranking: ({ players }) => players.concat()
      .filter(player => player.isEliminated === false)
      .sort((a, b) => b.score - a.score),
    eliminateds: ({ players }) => players.concat().filter(player => player.isEliminated === true),
    remainingPlayers(state, { ranking }) {
      return ranking.length;
    },
    hasWinner({ rules, players }, { remainingPlayers, ranking }) {
      if (players.length <= 0) {
        return false;
      }

      if (remainingPlayers === 1) {
        return true;
      }

      const possibleWinner = ranking[0];

      switch (rules.winCondition) {
        case rulesTypes.WIN_CONDITION_EXACT:
          return possibleWinner.score === rules.goal;
        case rulesTypes.WIN_CONDITION_HIGHER:
          return possibleWinner.score >= rules.goal;
        default:
          return false;
      }
    },
    currentPlayer: ({ players, currentPlayerIndex }) => players[currentPlayerIndex],
  },
  mutations: {
    [SET_RULES](state, rules) {
      const newRules = Object.assign({}, state.rules, rules);
      newRules.goal = Math.max(newRules.goal, 1);
      if (newRules.penaltyResetAmount > newRules.goal) {
        newRules.penaltyResetAmount = 0;
      }
      if (newRules.penaltySubstractAmount > newRules.goal) {
        newRules.penaltySubstractAmount = 0;
      }
      state.rules = newRules;
    },
    [ADD_PLAYER](state, name) {
      if (state.players.length >= PLAYERS_LIMIT) {
        return;
      }
      const player = {
        id: utils.generateID(),
        name,
        score: 0,
        fault: 0,
        isEliminated: false,
      };
      state.players.push(player);
    },
    [SET_PLAYERS](state, players) {
      state.players = players;
    },
    [REMOVE_PLAYER](state, id) {
      const indexToRemove = state.players.findIndex(player => player.id === id);
      state.players.splice(indexToRemove, 1);
    },
    [REMOVE_ALL_PLAYERS](state) {
      state.players = [];
    },
    [RESET_ALL_SCORES](state) {
      state.players.forEach((player) => {
        player.score = 0;
        player.fault = 0;
        player.isEliminated = false;
      });
    },
    [SET_SCORE](state, { id, score, keepFault = false }) {
      const currentPlayer = state.players.find(player => player.id === id);

      if (score < 0) {
        score = 0;
      }

      if (!keepFault) {
        currentPlayer.fault = 0;
      }

      currentPlayer.score = score;
    },
    [SET_FAULT](state, { id, fault }) {
      const currentPlayer = state.players.find(player => player.id === id);

      if (fault < 0) {
        fault = 0;
      }

      currentPlayer.fault = fault;
    },
    [SET_ELIMINATED](state, { id, isEliminated }) {
      const currentPlayer = state.players.find(player => player.id === id);
      currentPlayer.isEliminated = isEliminated;
    },
    [ELIMINATE_PLAYER](state, { id }) {
      const currentPlayer = state.players.find(player => player.id === id);
      currentPlayer.score = 0;
      currentPlayer.isEliminated = true;
    },
    [RESET_PLAYER](state, { id }) {
      const currentPlayer = state.players.find(player => player.id === id);
      currentPlayer.score = 0;
      currentPlayer.fault = 0;
    },
    [SET_CURRENT_PLAYER](state, index) {
      state.currentPlayerIndex = index;
    },
  },
  actions: {
    setRules({ commit }, rules) {
      commit(SET_RULES, rules);
    },
    resetRules({ commit }) {
      commit(SET_RULES, Object.assign({}, defaultRules));
    },
    addPlayer({ commit }, playerName) {
      commit(ADD_PLAYER, playerName);
    },
    removePlayer({ commit }, id) {
      commit(REMOVE_PLAYER, id);
    },
    reOrderPlayers({ commit }, players) {
      commit(SET_PLAYERS, players);
    },
    shufflePlayers({ commit, state }) {
      const players = utils.shuffle(state.players);
      commit(SET_PLAYERS, players);
    },
    resetAllScores({ commit }) {
      commit(RESET_ALL_SCORES);
      commit(SET_CURRENT_PLAYER, 0);
    },
    addScoreToPlayer({ dispatch, commit, state }, { id, score }) {
      const currentPlayer = state.players.find(player => player.id === id);
      if (!currentPlayer) {
        return;
      }

      if (score === 0) {
        const faults = currentPlayer.fault + 1;
        commit(SET_FAULT, { id, fault: faults });

        if (faults >= 3) {
          switch (state.rules.sanction) {
            case rulesTypes.SANCTION_ELIMINATED:
              commit(ELIMINATE_PLAYER, { id });
              dispatch('modal/showElimination', { name: currentPlayer.name }, { root: true });
              break;
            case rulesTypes.SANCTION_RESET:
              commit(RESET_PLAYER, { id });
              break;
            default:
          }
        }
        return;
      }

      let newScore = currentPlayer.score + score;

      if (newScore > state.rules.goal && state.rules.winCondition === rulesTypes.WIN_CONDITION_EXACT) {
        switch (state.rules.penalty) {
          case rulesTypes.PENALTY_RESET:
            newScore = state.rules.penaltyResetAmount;
            break;
          case rulesTypes.PENALTY_SUBSTRACT:
            newScore = newScore - score - state.rules.penaltySubstractAmount;
            break;
          case rulesTypes.PENALTY_EXCESS:
            newScore = state.rules.goal - (newScore - state.rules.goal);
            break;
          default:
        }
      }

      commit(SET_SCORE, { id, score: newScore });

      const zappedPlayers = [];
      const halfScore = Math.round(newScore / 2);
      switch (state.rules.zap) {
        case rulesTypes.ZAP_HALF:
          state.players.forEach((player) => {
            if (player.score === newScore && player !== currentPlayer) {
              commit(SET_SCORE, { id: player.id, score: halfScore, keepFault: true });
              zappedPlayers.push(player);
            }
          });
          if (zappedPlayers.length > 0) {
            dispatch('modal/showZap', {
              players: zappedPlayers,
              score: halfScore,
            }, { root: true });
          }
          break;
        default:
      }
    },
    turnToNextPlayer({ commit, state }) {
      let nextPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;

      while (state.players[nextPlayerIndex].isEliminated) {
        nextPlayerIndex = (nextPlayerIndex + 1) % state.players.length;
      }

      commit(SET_CURRENT_PLAYER, nextPlayerIndex);
    },
  },
};
