import {
  createAction
} from 'redux-starter-kit'
import axios from 'axios'
import {
  TIMBLIN_URL
} from '../constants';

export const loginRequest = createAction('LOGIN_REQUEST');
export const loginSuccess = createAction('LOGIN_SUCCESS');
export const loginFailure = createAction('LOGIN_FAILURE');

export const logoutRequest = createAction('LOGOUT_REQUEST');
export const logoutSuccess = createAction('LOGOUT_SUCCESS');
export const logoutFailure = createAction('LOGOUT_FAILURE');

export const editProfileRequest = createAction('EDIT_PROFILE_REQUEST');
export const editProfileFailure = createAction('EDIT_PROFILE_FAILURE');
export const editProfileSuccess = createAction('EDIT_PROFILE_SUCCESS');

export const editPasswordRequest = createAction('EDIT_PROFILE_PASSWORD_REQUEST');
export const editPasswordSuccess = createAction('EDIT_PASSWORD_SUCCESS');
export const editPasswordFailure = createAction('EDIT_PASSWORD_FAILURE');

export const showEditProfileModal = createAction('SHOW_EDIT_PROFILE_MODAL');
export const clickCancelEditProfile = createAction('CANCEL_EDIT_PROFILE');

export const showEditPasswordModal = createAction('SHOW_EDIT_PASSWORD_MODAL');
export const clickCancelEditPassword = createAction('CANCEL_EDIT_PASSWORD');

export const login = (email, password) => dispatch => {
  dispatch(loginRequest());
  axios.post(`${TIMBLIN_URL}/login`, {
    email,
    password
  })
    .then(response => {
      dispatch(loginSuccess(response.data))
    })
    .catch(error => {
      dispatch(loginFailure(error.message))
    });
}

export const logout = (accessToken) => dispatch => {
  dispatch(logoutRequest());
  axios.delete(`${TIMBLIN_URL}/logout?accessToken=${accessToken}`, {
    accessToken
  })
    .then(response => {
      if (response.status !== 200)
        throw Error();
      dispatch(logoutSuccess())
    })
    .catch(error => {
      dispatch(logoutFailure(error.message))
    });
}

export const editProfile = (accessToken, userId, user) => dispatch => {
  let newPassword;
  // if (user.password) {
  //   newPassword = user.password
  // }
  dispatch(editProfileRequest());
  console.log(user);
  axios.patch(`${TIMBLIN_URL}/user/${userId}?accessToken=${accessToken}`, {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: newPassword
  })
    .then(response => {
      dispatch(editProfileSuccess(response.data))
    })
    .catch(error => {
      dispatch(editProfileFailure(error.message))
    });
}

export const editPassword = (accessToken, userId, user) => dispatch => {
  let confirmPassword;
  if (user.password) {
    if (user.newPassword != user.currentPassword && user.newPassword == user.confirmPassword) {
      confirmPassword = user.confirmPassword
    } else {
      dispatch(editPasswordFailure)
    }
  }
  dispatch(editPasswordRequest());
  console.log(user);
  axios.patch(`${TIMBLIN_URL}/user/${userId}?accessToken=${accessToken}`, {
    password: confirmPassword
  })
    .then(response => {
      dispatch(editPasswordSuccess(response.data))
    })
    .catch(error => {
      dispatch(editPasswordFailure(error.message))
    });
}