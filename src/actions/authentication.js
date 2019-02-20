import { createAction } from 'redux-starter-kit'
import axios from 'axios'
import { TIMBLIN_URL } from '../constants';

export const loginRequest = createAction('LOGIN_REQUEST');
export const loginSuccess = createAction('LOGIN_SUCCESS');
export const loginFailure = createAction('LOGIN_FAILURE');
export const logout = createAction('LOGOUT');

export const login = (email, password) => dispatch => {
  dispatch(loginRequest());
  axios.post(`${TIMBLIN_URL}/login`, {
    email,
    password
  })
    .then(response => {
      if (response.status !== 200)
        throw Error();
      dispatch(loginSuccess(response.data.accessToken))
    })
    .catch(error => {
      dispatch(loginFailure(error.message))
    });
}