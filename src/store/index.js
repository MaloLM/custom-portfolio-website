import { createStore } from 'vuex'

export default createStore({
  state: {
      theme: {
        isDark: false,
      },
      showDialog: true,
  },
  getters: {
    theme(state){
      return state.theme
    },
    showDialog(state){
      return state.showDialog
    }
  },
  mutations: {
    SET_DARK_THEME(state, value) {
      state.theme.isDark = value;
    },
    SET_SHOW_DIALOG(state, value) {
      state.showDialog = value;
    }
  }
})
