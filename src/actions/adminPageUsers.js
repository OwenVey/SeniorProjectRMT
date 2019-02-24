import { createAction } from "redux-starter-kit";
import axios from "axios";
import { TIMBLIN_URL } from "../constants";

export const fetchUsersRequest = createAction("FETCH_USERS_REQUEST");
export const fetchUsersSuccess = createAction("FETCH_USERS_SUCCESS");
export const fetchUsersFailure = createAction("FETCH_USERS_FAILURE");

export const editUser = createAction("EDIT_USER");
export const showEditUserModal = createAction("SHOW_EDIT_USER_MODAL");
export const hideEditUserModal = createAction("HIDE_EDIT_USER_MODAL");
export const cancelEditUserModal = createAction("CANCEL_EDIT_USER_MODAL");

export const addUser = createAction("ADD_USER");
export const showAddUserModal = createAction("SHOW_ADD_USER_MODAL");
export const hideAddUserModal = createAction("HIDE_ADD_USER_MODAL");
export const cancelAddUserModal = createAction("CANCEL_ADD_USER_MODAL");

export const fetchUsers = accessToken => dispatch => {
  dispatch(fetchUsersRequest());
  axios
    .get(`${TIMBLIN_URL}/user?accessToken=${accessToken}`)
    .then(response => {
      //adds additional information to the user array.
      let users = response.data.users.map(user => {
        return {
          ...user,
          key: user.id,
          userGroups: ["Developer"],
          userName: `${user.firstName} ${user.lastName}`,
          userStatus: true
        };
      });
      if (response.status !== 200) throw Error();
      dispatch(fetchUsersSuccess(users));
    })
    .catch(error => {
      dispatch(fetchUsersFailure(error.message));
    });
};
