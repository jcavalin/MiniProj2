import sponsorService from "@/api/sponsor.service";
import {
  // Actions
  FETCH_SPONSORS,
  // Mutations
  SET_SPONSORS,
  SET_MESSAGE
} from "./sponsor.constants";

const state = {
  sponsors: [],
  message: ""
};

const getters = {
  getSponsors: state => state.sponsors,
  getSponsorsById: state => id => state.sponsors.find(sponsor => sponsor._id === id),
  getMessage: state => state.message
};

const actions = {
  [FETCH_SPONSORS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      sponsorService.getSponsors(rootState.auth.token)
        .then(
          res => {
            commit(SET_SPONSORS, res.body);
            resolve(res)
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          });
    })
  }
};

export const mutations = {
  [SET_SPONSORS]: (state, sponsors) => {
    state.sponsors = sponsors;
  },
  [SET_MESSAGE]: (state, message) => {
    state.message = message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
