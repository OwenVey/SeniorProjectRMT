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
  editProfileSuccess,
  editProfileRequest,
  editProfileFailure,
  showEditPasswordModal,
  clickCancelEditPassword,
  editPasswordRequest,
  editPasswordSuccess,
  editPasswordFailure,
  checkPasswordRequest,
  checkPasswordSuccess,
  checkPasswordFailure,
} from '../actions/authentication'
import {
  bindActionCreators
} from 'redux';

const initialAuthenticationState = {
  accessToken: '',
  isAuthenticated: false,
  redirectToReferrer: false,
  loading: false,
  invalidLogin: false,
  loginUser: {},
  editProfileModalVisibility: false,
  editPasswordModalVisibility: false,
  clickCancelEditPassword: true,
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

  [logoutFailure]: (state, action) => {
    state.accessToken = '';
    state.isAuthenticated = false;
    state.redirectToReferrer = false;
    state.invalidLogin = false;
  },

  /*
  -----------------------------------------------
  Edit User Profile
  -----------------------------------------------
  */
  [editProfileSuccess]: (state, action) => {
    state.loading = false;
    if (state.users && state.users.users) {
      const index = state.users.users.findIndex(user => user.id === action.payload.id);
      state.users[index] = action.payload;
    }
    state.editProfileModalVisibility = false;
    state.loginUser = action.payload;
  },

  [editProfileRequest]: (state, action) => {

  },

  [editProfileFailure]: (state, action) => {

  },

  [showEditProfileModal]: (state, action) => {
    state.editProfileModalVisibility = true;
  },

  [clickCancelEditProfile]: (state, action) => {
    state.editProfileModalVisibility = false;
  },

  /*
  -----------------------------------------------
  Change user password
  -----------------------------------------------
  */
  [editPasswordSuccess]: (state, action) => {
    if (state.users && state.users.users) {
      const index = state.users.users.findIndex(user => user.id === action.payload.id);
      state.users[index] = action.payload;
    }
    state.editPasswordModalVisibility = false;
    state.loginUser = action.payload;
  },

  [showEditPasswordModal]: (state, action) => {
    state.editPasswordModalVisibility = true;
  },

  [clickCancelEditPassword]: (state, action) => {
    state.editPasswordModalVisibility = false;
  },

  [editPasswordRequest]: (state, action) => {

  },

  [editPasswordFailure]: (state, action) => {
    state.editPasswordModalVisibility = true;
    state.loginUser = action.payload;
  },

  /*
  -----------------------------------------------
  Check user password
  -----------------------------------------------
  */
  [checkPasswordRequest]: (state, action) => {
    if (state.users && state.users.users) {
      const index = state.users.users.findIndex(user => user.id === action.payload.id);
      state.users[index] = action.payload;
    }
    state.editPasswordModalVisibility = false;
    state.loginUser = action.payload;
  },

  [checkPasswordSuccess]: (state, action) => {

  },

  [checkPasswordFailure]: (state, action) => {

  }

});