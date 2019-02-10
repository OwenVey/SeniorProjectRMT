import { createReducer, combineReducers } from 'redux-starter-kit'

import data from '../data.js';
import { bookmarkRecentlyViewedItem, selectRecentlyViewedItem } from '../actions'
import { loginSuccess, loginFail } from '../actions'


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
  [loginSuccess]: (state, action) => {
    console.log(action)
    state.accessToken = action.payload;
    state.isAuthenticated = true;
    state.redirectToReferrer = true;
  },

  [loginFail]: (state, action) => {
    console.log(action)
    state.invalidLogin = true;
    state.loading = false;
  },

});




export default combineReducers({
  recentlyViewedItems: recentlyViewedItemsReducer,
  authentication: authenticationReducer,
})