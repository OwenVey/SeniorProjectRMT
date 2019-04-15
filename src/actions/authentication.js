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

export const checkPasswordRequest = createAction('CHECK_PROFILE_PASSWORD_REQUEST');
export const checkPasswordSuccess = createAction('CHECK_PASSWORD_SUCCESS');
export const checkPasswordFailure = createAction('CHECK_PASSWORD_FAILURE');

export const showEditProfileModal = createAction('SHOW_EDIT_PROFILE_MODAL');
export const clickCancelEditProfile = createAction('CANCEL_EDIT_PROFILE');

export const showEditPasswordModal = createAction('SHOW_EDIT_PASSWORD_MODAL');
export const clickCancelEditPassword = createAction('CANCEL_EDIT_PASSWORD');

export const login = (email, password) => dispatch => {
  dispatch(loginRequest());
  return axios.post(`${TIMBLIN_URL}/login`, {
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
  return axios.delete(`${TIMBLIN_URL}/logout?accessToken=${accessToken}`, {
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
  dispatch(editProfileRequest());

  axios.patch(`${TIMBLIN_URL}/user/${userId}?accessToken=${accessToken}`, {

      firstName: user.firstName,
      lastName: user.lastName
    })
    .then(response => {
      dispatch(editProfileSuccess(response.data))


    })
    .catch(error => {
      dispatch(editProfileFailure(error.message));
    });
}

export const editPassword = (accessToken, user, values) => dispatch => {
  let confirmPassword;
  if (user) {
    if (values.newPassword != values.currentPassword && values.newPassword == values.confirmPassword) {
      confirmPassword = values.confirmPassword
      console.log("confirmed!")
    } else {
      dispatch(editPasswordFailure)
    }
  }
  dispatch(editPasswordRequest());
  console.log(user);
  axios.patch(`${TIMBLIN_URL}/user/${user.id}?accessToken=${accessToken}`, {
      password: values.confirmPassword
    })
    .then(response => {
      dispatch(editPasswordSuccess(response.data))
    })
    .catch(error => {
      dispatch(editPasswordFailure(error.message))
    });
}

// export const checkPassword = (password) => dispatch => {
//   dispatch(checkPasswordRequest());
//   axios.post(`${TIMBLIN_URL}/login`, {
//       // email,
//       password
//     })
//     .then(response => {
//       dispatch(checkPasswordSuccess(response.data))
//     })
//     .catch(error => {
//       dispatch(checkPasswordFailure(error.message))
//     });
// }
