import { createStore } from 'vuex'

export default createStore({
  state: {
      theme: {
        isDark: false,
        darkInputColor: 'white',
        lightInputColor: 'info',
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
