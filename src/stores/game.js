/* eslint-disable no-param-reassign */
import defaultRules from '../util/rules.default';
import {
  SET_RULES,
  ADD_PLAYER,
  REMOVE_PLAYER,
  REMOVE_ALL_PLAYERS,
  RESET_ALL_SCORES,
  ADD_SCORE_TO_PLAYER,
} from './gameMutation.types';
import rulesTypes from '../util/rules.types';

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
    [ADD_SCORE_TO_PLAYER](state, { index, score }) {
      const currentPlayer = state.players[index];

      if (score === 0) {
        currentPlayer.fault += 1;

        if (currentPlayer.fault === 3) {
          switch (state.rules.sanction) {
            case rulesTypes.SANCTION_ELIMINATED:
              currentPlayer.isEliminated = true;
              currentPlayer.score = 0;
              break;
            case rulesTypes.SANCTION_RESET:
              currentPlayer.score = 0;
              currentPlayer.fault = 0;
              break;
            default:
          }
        }
        return;
      }

      currentPlayer.fault = 0;
      currentPlayer.score += score;

      if (currentPlayer.score > state.rules.goal && state.rules.winCondition === rulesTypes.WIN_CONDITION_EXACT) {
        switch (state.rules.penalty) {
          case rulesTypes.PENALTY_RESET:
            currentPlayer.score = state.rules.penaltyResetAmount;
            break;
          case rulesTypes.PENALTY_SUBSTRACT:
            currentPlayer.score = currentPlayer.score - score - state.rules.penaltySubstractAmount;
            break;
          case rulesTypes.PENALTY_EXCESS:
            currentPlayer.score = state.rules.goal - (currentPlayer.score - state.rules.goal);
            break;
          default:
        }
      }

      if (currentPlayer.score < 0) {
        currentPlayer.score = 0;
      }

      switch (state.rules.zap) {
        case rulesTypes.ZAP_HALF:
          state.players.forEach((player) => {
            if (player.score === currentPlayer.score && player !== currentPlayer) {
              player.score = Math.round(player.score / 2);
            }
          });
          break;
        case rulesTypes.ZAP_RESET:
          // TODO handle this case
          break;
        default:
      }
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
        name: playerName,
        score: 0,
        fault: 0,
        isEliminated: false,
      });
    },
    removePlayer({ commit }, index) {
      commit(REMOVE_PLAYER, index);
    },
    addScoreToPlayer({ commit, state }, { index, score }) {
      if (index > state.players.length || index < 0) {
        return;
      }
      commit(ADD_SCORE_TO_PLAYER, {
        index,
        score,
      });
    },
    resetAllScores({ commit }) {
      commit(RESET_ALL_SCORES);
    },
  },
};
