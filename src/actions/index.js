import { createAction } from 'redux-starter-kit'
import axios from 'axios'

export const bookmarkRecentlyViewedItem = createAction('BOOKMARK_RECENTLY_VIEWED_ITEM');
export const selectRecentlyViewedItem = createAction('SELECT_RECENTLY_VIEWED_ITEM');
export const loginSuccess = createAction('LOGIN_SUCCESS');
export const loginFail = createAction('LOGIN_FAIL');


export const login = (email, password) => dispatch => {
  const url2 = 'https://abortplatteville.com/api/login';
  axios.post(url2, {
    email,
    password
  })
    .then(response => {
      if (response.data.status !== 200)
        throw Error();

      dispatch(loginSuccess(response.data.token))
    })
    .catch(error => {
      console.log(error)
      dispatch(loginFail(error.message))
    });
}