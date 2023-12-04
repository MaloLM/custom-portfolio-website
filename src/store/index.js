// Copyright (c) [2023] [Malo Le Mestre]
// This software is released under the Apache 2.0 License
// https://www.apache.org/licenses/LICENSE-2.0.html

import { createStore } from 'vuex';

// Create and export the Vuex store instance
export default createStore({
  state: {
    theme: {
      isDark: false, // Initial state for the theme (default is not dark)
    },
    showDialog: true, // Initial state for the showDialog property (default is true)
    isUserLoggedIn: null, // Initial state for user login status (null as it's not determined yet)
  },
  getters: {
    theme(state) {
      return state.theme; // Getter for accessing the theme state
    },
    showDialog(state) {
      return state.showDialog; // Getter for accessing the showDialog state
    },
    isUserLoggedIn(state) {
      return state.isUserLoggedIn; // Getter for accessing the isUserLoggedIn state
    },
  },
  mutations: {
    SET_DARK_THEME(state, value) {
      // Mutation to set the theme to dark or not dark
      state.theme.isDark = value;
    },
    SET_SHOW_DIALOG(state, value) {
      // Mutation to set the showDialog property
      state.showDialog = value;
    },
    SET_IS_USER_LOGGED_IN(state, value) {
      // Mutation to set the user login status
      state.isUserLoggedIn = value;
    },
  },
});
