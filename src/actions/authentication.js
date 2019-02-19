import { createAction } from 'redux-starter-kit'
import axios from 'axios'

export const loginRequest = createAction('LOGIN_REQUEST');
export const loginSuccess = createAction('LOGIN_SUCCESS');
export const loginFailure = createAction('LOGIN_FAILURE');
export const logout = createAction('LOGOUT');

export const login = (email, password) => dispatch => {
  dispatch(loginRequest());
  const url = 'https://api.abortplatteville.com/api/login';
  const url2 = 'https://senior-design.timblin.org/api/login'
  axios.post(url2, {
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