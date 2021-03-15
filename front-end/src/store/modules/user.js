import axios from "axios";

const state = {
  user: {}
};

const getters = {
  getUser: state => state.user
};

const actions = {
  async fetchUser({ commit }) {
    const response = await axios.get("http://localhost:8081/api/user/profile", {
      withCredentials: true
    });
    console.log(response.data);
    commit("setUser", response.data);
  }
};

const mutations = {
  setUser: (state, payload) => (state.user = payload)
};

export default {
  state,
  getters,
  actions,
  mutations
};
