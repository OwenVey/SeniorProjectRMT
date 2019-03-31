import {
  createReducer
} from 'redux-starter-kit'
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  showEditProfileModal,
  clickCancelEditProfile,
  confirmEditProfile
} from '../actions/authentication'

const initialAuthenticationState = {
  accessToken: '',
  isAuthenticated: false,
  redirectToReferrer: false,
  loading: false,
  invalidLogin: false,
  loginUser: {},
  editProfileModalVisibility: false,
  clickCancelEditProfile: true,
}

export const authenticationReducer = createReducer(initialAuthenticationState, {

  [loginRequest]: (state, action) => {
    state.loading = true;
  },

  [loginSuccess]: (state, action) => {
    state.loading = false;
    state.accessToken = action.payload.accessToken;
    state.loginUser = action.payload.loginUser;
    state.isAuthenticated = true;
    state.redirectToReferrer = true;
  },

  [loginFailure]: (state, action) => {
    state.invalidLogin = true;
    state.loading = false;
  },

  [logoutRequest]: (state, action) => {

  },

  [logoutSuccess]: (state, action) => {
    state.accessToken = '';
    state.isAuthenticated = false;
    state.redirectToReferrer = false;
    state.invalidLogin = false;
  },

  [logoutFailure]: (state, action) => {},

  [showEditProfileModal]: (state, action) => {
    state.editProfileModalVisibility = true;
  },

  [clickCancelEditProfile]: (state, action) => {
    state.editProfileModalVisibility = false;
  },

  [confirmEditProfile]: (state, action) => {
    state.editProfileModalVisibility = false;
  }

});