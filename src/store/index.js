import { createStore } from 'vuex'
// import 'firebase/compat/auth'


export default createStore({
  state: {
      loggedIn: false,
      theme: {
        isDark: false,
        darkInputColor: 'white',
        lightInputColor: 'grey',
      },
      
  },
  getters: {
    status(state){
      return state.loggedIn
    },
    theme(state){
      return state.theme
    },

  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.loggedIn = value;
    },
    SET_DARK_THEME(state, value) {
      state.theme.isDark = value;
    }
  }//,
  //actions: {
  // }
})
