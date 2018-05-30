/* eslint-disable no-param-reassign */
import defaultRules from '@/util/rules.default';
import rulesTypes from '@/util/rules.types';
import Utils from '@/util/utils';
import {
  SET_RULES,
  ADD_PLAYER,
  REORDER_PLAYERS,
  REMOVE_PLAYER,
  REMOVE_ALL_PLAYERS,
  RESET_ALL_SCORES,
  SET_SCORE,
  ELIMINATE,
  SET_FAULT,
} from './gameMutation.types';

export const PLAYERS_LIMIT = 16;

export default {
  namespaced: true,
  state() {
    return {
      players: [],
      rules: Object.assign({}, defaultRules),
    };
  },
  getters: {
    canAddPlayers: ({ players }) => players.length < PLAYERS_LIMIT,
    ranking: ({ players }) => players.concat().sort((a, b) => b.score - a.score),
    remainingPlayers({ players }) {
      return players.filter(player => !player.isEliminated).length;
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
    [ADD_PLAYER](state, player) {
      if (state.players.length >= PLAYERS_LIMIT) {
        return;
      }
      state.players.push(player);
    },
    [REORDER_PLAYERS](state, players) {
      state.players = players;
    },
    [REMOVE_PLAYER](state, index) {
      state.players.splice(index, 1);
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
    [SET_SCORE](state, { index, score }) {
      const currentPlayer = state.players[index];

      if (score < 0) {
        score = 0;
      }

      currentPlayer.score = score;
    },
    [SET_FAULT](state, { index, fault }) {
      const currentPlayer = state.players[index];
      currentPlayer.fault = fault;
    },
    [ELIMINATE](state, { index }) {
      const currentPlayer = state.players[index];
      currentPlayer.isEliminated = true;
      currentPlayer.score = 0;
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
      commit(ADD_PLAYER, {
        id: Utils.generateID(),
        name: playerName,
        score: 0,
        fault: 0,
        isEliminated: false,
      });
    },
    reOrderPlayers({ commit }, players) {
      commit(REORDER_PLAYERS, players);
    },
    removePlayer({ commit }, index) {
      commit(REMOVE_PLAYER, index);
    },
    addScoreToPlayer({ dispatch, commit, state }, { index, score }) {
      if (index > state.players.length || index < 0) {
        return;
      }

      const currentPlayer = state.players[index];

      if (score === 0) {
        commit(SET_FAULT, { index, fault: currentPlayer.fault + 1 });

        if (currentPlayer.fault === 3) {
          switch (state.rules.sanction) {
            case rulesTypes.SANCTION_ELIMINATED:
              commit(SET_SCORE, { index, score: 0 });
              commit(ELIMINATE, { index });
              dispatch('modal/showElimination', { name: currentPlayer.name }, { root: true });
              break;
            case rulesTypes.SANCTION_RESET:
              commit(SET_SCORE, { index, score: 0 });
              commit(SET_FAULT, { index, fault: 0 });
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

      commit(SET_FAULT, { index, fault: 0 });
      commit(SET_SCORE, { index, score: newScore });

      const zappedPlayers = [];
      const halfScore = Math.round(newScore / 2);
      switch (state.rules.zap) {
        case rulesTypes.ZAP_HALF:
          state.players.forEach((player, testIndex) => {
            if (player.score === newScore && player !== currentPlayer) {
              commit(SET_SCORE, { index: testIndex, score: halfScore });
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
        case rulesTypes.ZAP_RESET:
          // TODO handle this case
          break;
        default:
      }
    },
    resetAllScores({ commit }) {
      commit(RESET_ALL_SCORES);
    },
  },
};
