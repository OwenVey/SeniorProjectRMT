import { createAction } from 'redux-starter-kit'
import axios from 'axios'

export const bookmarkRecentlyViewedItem = createAction('BOOKMARK_RECENTLY_VIEWED_ITEM');
export const selectRecentlyViewedItem = createAction('SELECT_RECENTLY_VIEWED_ITEM');

export const loginRequest = createAction('LOGIN_REQUEST');
export const loginSuccess = createAction('LOGIN_SUCCESS');
export const loginFailure = createAction('LOGIN_FAILURE');

export const login = (email, password) => dispatch => {
  dispatch(loginRequest());
  const url = 'https://abortplatteville.com/api/login';
  axios.post(url, {
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