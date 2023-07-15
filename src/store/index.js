// Copyright (c) [2023] [Malo Le Mestre]
// This software is released under the MIT License
// https://opensource.org/licenses/MIT

import { createStore } from 'vuex'

export default createStore({
  state: {
      theme: {
        isDark: false,
      },
      showDialog: true,
      isUserLoggedIn: null,
  },
  getters: {
    theme(state){
      return state.theme
    },
    showDialog(state){
      return state.showDialog
    },
    isUserLoggedIn(state){
      return state.isUserLoggedIn
    }
  },
  mutations: {
    SET_DARK_THEME(state, value) {
      state.theme.isDark = value;
    },
    SET_SHOW_DIALOG(state, value) {
      state.showDialog = value;
    },
    SET_IS_USER_LOGGED_IN(state, value) {
      state.isUserLoggedIn = value;
    }
  }
})
