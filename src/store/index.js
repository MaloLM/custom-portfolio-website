import { createStore } from 'vuex'
// import 'firebase/compat/auth'


export default createStore({
  state: {
      loggedIn: false,
      darkTheme: false,
  },
  getters: {
    status(state){
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
