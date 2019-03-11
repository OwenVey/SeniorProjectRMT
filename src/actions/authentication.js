import { createAction } from 'redux-starter-kit'
import axios from 'axios'
import { TIMBLIN_URL, ABORTPLATTEVILLE_URL } from '../constants';

export const loginRequest = createAction('LOGIN_REQUEST');
export const loginSuccess = createAction('LOGIN_SUCCESS');
export const loginFailure = createAction('LOGIN_FAILURE');

export const logoutRequest = createAction('LOGOUT_REQUEST');
export const logoutSuccess = createAction('LOGOUT_SUCCESS');
export const logoutFailure = createAction('LOGOUT_FAILURE');

export const login = (email, password) => dispatch => {
  dispatch(loginRequest());
  axios.post(`${ABORTPLATTEVILLE_URL}/login`, {
    email,
    password
  })
    .then(response => {
      if (response.data.status !== 200)
        throw Error();
      dispatch(loginSuccess(response.data.token))
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