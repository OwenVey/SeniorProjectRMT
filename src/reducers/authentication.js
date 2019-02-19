import { createReducer } from 'redux-starter-kit'
import { loginRequest, loginSuccess, loginFailure, logout } from '../actions/authentication'

const initialAuthenticationState = {
  accessToken: '',
  isAuthenticated: false,
  redirectToReferrer: false,
  loading: false,
  invalidLogin: false,
}

export const authenticationReducer = createReducer(initialAuthenticationState, {

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