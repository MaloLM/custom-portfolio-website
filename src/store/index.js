import { createStore } from 'vuex'
// import 'firebase/compat/auth'


export default createStore({
  state: {
      theme: {
        isDark: false,
        darkInputColor: 'white',
        lightInputColor: 'grey',
      },
      
  },
  getters: {
    theme(state){
      return state.theme
    },

  },
  mutations: {
    SET_DARK_THEME(state, value) {
      state.theme.isDark = value;
    }
  }
})
