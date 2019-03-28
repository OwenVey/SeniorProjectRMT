import { createAction } from "redux-starter-kit";
import axios from "axios";
import { TIMBLIN_URL } from "../constants";

export const fetchUsersRequest = createAction("FETCH_USERS_REQUEST");
export const fetchUsersSuccess = createAction("FETCH_USERS_SUCCESS");
export const fetchUsersFailure = createAction("FETCH_USERS_FAILURE");

export const showAddUserModal = createAction("SHOW_ADD_USER_MODAL");
export const hideAddUserModal = createAction("HIDE_ADD_USER_MODAL");
export const addUserRequest = createAction("ADD_USER_REQUEST");
export const addUserSuccess = createAction("ADD_USER_SUCCESS");
export const addUserFailure = createAction("ADD_USER_FAILURE");

export const showEditUserModal = createAction("SHOW_EDIT_USER_MODAL");
export const hideEditUserModal = createAction("HIDE_EDIT_USER_MODAL");
export const editUserRequest = createAction("EDIT_USER_REQUEST");
export const editUserSuccess = createAction("EDIT_USER_SUCCESS");
export const editUserFailure = createAction("EDIT_USER_FAILURE");

export const editProfile = createAction("SHOW_EDIT_PROFILE");

export const getUsers = accessToken => dispatch => {
  dispatch(fetchUsersRequest());
  axios
    .get(`${TIMBLIN_URL}/user?accessToken=${accessToken}`)
    .then(response => {
      //adds additional information to the user array.
      let users = response.data.users.map(user => {
        return {
          ...user,
          userGroups: ["Developer"],
        };
      });
      if (response.status !== 200) throw Error();
      dispatch(fetchUsersSuccess(users));
    })
    .catch(error => {
      dispatch(fetchUsersFailure(error.message));
    });
};

export const addUser = user => dispatch => {
  dispatch(addUserRequest());
  axios.post(`${TIMBLIN_URL}/register`, {
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    isActive: user.isActive === 'Active' ? true : false,
  })
    .then(response => {
      dispatch(addUserSuccess(response.data));
    })
    .catch(error => {
      dispatch(addUserFailure(error.message));
    });
};

export const editUser = (id, editedUser, accessToken) => dispatch => {
  dispatch(editUserRequest());
  axios.patch(`${TIMBLIN_URL}/user/${id}?accessToken=${accessToken}`, {
    firstName: editedUser.firstName,
    lastName: editedUser.lastName,
    email: editedUser.email,
    isAdmin: false,
    isActive: editedUser.isActive === 'Active' ? true : false,
  })
    .then(response => {
      dispatch(editUserSuccess(editedUser));
    })
    .catch(error => {
      dispatch(editUserFailure(error.message));
    });
};