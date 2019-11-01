import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    is_login: false,
    mobHdMsg: '产线1',
    tabState: null

  },
  getters: {
    getIsLogin(state) {
      return state.is_login
    },
    getMobHdMsg(state) {
      return state.mobHdMsg
    },
    getTabState(state) {
      return state.tabState
    }
  },
  mutations: {
    setIsLogin(state, data) {
      state.is_login = data;
    },
    setTabState(state, data) {
      state.tabState = data;
    },
    setMobHdMsg(state, data) {
      state.mobHdMsg = data;
    }
  },
  actions: {
    setIsLogin({
      commit
    }, data) {
      commit('setIsLogin', data)
    },
    setMobHdMsg({
      commit
    }, data) {
      commit('setMobHdMsg', data)
    },
    setTabState({
      commit
    }, data) {
      commit('setTabState', data)
    },
  }
})