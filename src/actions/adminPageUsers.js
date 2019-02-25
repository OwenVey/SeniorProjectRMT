import { createAction } from "redux-starter-kit";
import axios from "axios";
import { TIMBLIN_URL } from "../constants";

export const fetchUsersRequest = createAction("FETCH_USERS_REQUEST");
export const fetchUsersSuccess = createAction("FETCH_USERS_SUCCESS");
export const fetchUsersFailure = createAction("FETCH_USERS_FAILURE");

export const editUserRequest = createAction("EDIT_USER_REQUEST");
export const editUserSuccess = createAction("EDIT_USER_SUCCESS");
export const editUserFailure = createAction("EDIT_USER_FAILURE");
export const showEditUserModal = createAction("SHOW_EDIT_USER_MODAL");
export const cancelEditUserModal = createAction("CANCEL_EDIT_USER_MODAL");

export const addUserRequest = createAction("ADD_USER_REQUEST");
export const addUserSuccess = createAction("ADD_USER_SUCCESS");
export const addUserFailure = createAction("ADD_USER_FAILURE");
export const showAddUserModal = createAction("SHOW_ADD_USER_MODAL");
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

export const editExistingUser = (id, editedUser, accessToken) => dispatch => {
  dispatch(editUserRequest());
  axios
    .patch(`${TIMBLIN_URL}/user/${id}?accessToken=${accessToken}`, {
      firstName: editedUser.firstName,
      lastName: editedUser.lastName,
      email: editedUser.email,
      //password: editedUser.Password,
      isAdmin: false, //editedUser.isAdmin,
      isActive: editedUser.isActive === "Active" ? true : false
    })
    .then(response => {
      if (response.status !== 200) throw Error();
      dispatch(editUserSuccess(editedUser));
    })
    .catch(error => {
      dispatch(editUserFailure(error.message));
    });
};

export const registerUser = (registeringNewUser, accessToken) => dispatch => {
  dispatch(addUserRequest());
  axios
    .post(`${TIMBLIN_URL}/register`, {
      firstName: registeringNewUser.firstName,
      lastName: registeringNewUser.lastName,
      email: registeringNewUser.email,
      password: registeringNewUser.password,
      //isAdmin: false,
      isActive: registeringNewUser.isActive === "Active" ? true : false
    })
    .then(response => {
      if (response.status !== 201) throw Error();
      dispatch(addUserSuccess());
    })
    .catch(error => {
      dispatch(addUserFailure(error.message));
    });
};
