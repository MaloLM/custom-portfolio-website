import { createStore } from 'vuex'
// import 'firebase/compat/auth'


export default createStore({
  state: {
      loggedIn: false
  },
  getters: {
    user(state){
      return state.loggedIn
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.loggedIn = value;
    }
  }//,
  //actions: {
  // }
})
