import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    packages: [],
    foundPackage: ''
  },
  mutations: {
    setPackages(state, payload) {
      state.packages = payload;
    },
    setFoundPackage(state, payload) {
      state.foundPackage = payload;
    }
  },
  actions: {
    getPackagesFromAPI({ commit }) {
      axios.get('https://data.jsdelivr.com/v1/stats/packages').then(({ data }) => {
        commit('setPackages', data);
      });
    },
    findPackageByName({ commit }, name) {
      axios.get(`https://data.jsdelivr.com/v1/package/npm/${name}/stats`).then(({ data }) => {
        commit('setFoundPackage', data);
      });
    }
  },
  getters: {
    getPackages: (state) => {
      return state.packages;
    },
    getFoundPackage: (state) => {
      return state.foundPackage;
    }
  },
  modules: {}
});
