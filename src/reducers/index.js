import { createReducer, combineReducers } from 'redux-starter-kit'

import data from '../data.js';
import { bookmarkRecentlyViewedItem, selectRecentlyViewedItem } from '../actions'
import { loginRequest, loginSuccess, loginFailure, logout } from '../actions'

const recentlyViewedItemsReducer = createReducer(data.recentlyViewedItems, {

  [bookmarkRecentlyViewedItem]: (state, action) => {
    action.payload.event.stopPropagation();
    let item = state.find(item => item.id === action.payload.id)
    item.bookmarked = !item.bookmarked;
  },

  [selectRecentlyViewedItem]: (state, action) => {
    let item = state.find(item => item.id === action.payload)
    alert(`${item.name} was clicked.`)
  }

});

const initialAuthenticationState = {
  accessToken: '',
  isAuthenticated: false,
  redirectToReferrer: false,
  loading: false,
  invalidLogin: false,
}

const authenticationReducer = createReducer(initialAuthenticationState, {

  [loginRequest]: (state, action) => {
    state.loading = true;
  },

  [loginSuccess]: (state, action) => {
    state.loading = false;
    state.accessToken = action.payload;
    state.isAuthenticated = true;
    state.redirectToReferrer = true;
  },

  [loginFailure]: (state, action) => {
    console.log(action.payload)
    state.invalidLogin = true;
    state.loading = false;
  },

  [logout]: (state, action) => {
    state.accessToken = '';
    state.isAuthenticated = false;
    state.redirectToReferrer = false;
    state.loading = false;
    state.invalidLogin = false;
  },

});

export default combineReducers({
  recentlyViewedItems: recentlyViewedItemsReducer,
  authentication: authenticationReducer,
})