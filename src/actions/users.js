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

export const addUserGroupLinkRequest = createAction("ADD_USER_GROUP_LINK_REQUEST");
export const addUserGroupLinkSuccess = createAction("ADD_USER_GROUP_LINK_SUCCESS");
export const addUserGroupLinkFailure = createAction("ADD_USER_GROUP_LINK_FAILURE");

export const showEditUserModal = createAction("SHOW_EDIT_USER_MODAL");
export const hideEditUserModal = createAction("HIDE_EDIT_USER_MODAL");
export const editUserRequest = createAction("EDIT_USER_REQUEST");
export const editUserSuccess = createAction("EDIT_USER_SUCCESS");
export const editUserFailure = createAction("EDIT_USER_FAILURE");

export const fetchGroupLinksRequest = createAction("FETCH_GROUP_LINKS_REQUEST");
export const fetchGroupLinksSuccess = createAction("FETCH_GROUP_LINKS_SUCCESS");
export const fetchGroupLinksFailure = createAction("FETCH_GROUP_LINKS_FAILURE");

export const getUsers = accessToken => dispatch => {
  dispatch(fetchUsersRequest());
  return axios
    .get(`${TIMBLIN_URL}/user?accessToken=${accessToken}`)
    .then(response => {
      //adds additional information to the user array.
      let users = response.data.users.map(user => {
        return {
          ...user,
          //userGroups: ["Developer"],
        };
      });
      dispatch(fetchUsersSuccess(response.data.users));
    })
    .catch(error => {
      dispatch(fetchUsersFailure(error.message));
    });
};

export const getGroupLinks = (userId, accessToken) => dispatch => {
  dispatch(fetchGroupLinksRequest());
  axios
    .get(`${TIMBLIN_URL}/usergrouplink${userId}?accessToken=${accessToken}`)
    .then(response => {
      //adds additional information to the user array.
      let groups = response.data.user.Usergroup.map(groups => {
        return {
          ...groups,
        };
      });
      if (response.status !== 200) throw Error();
      dispatch(fetchGroupLinksSuccess(groups));
    })
    .catch(error => {
      dispatch(fetchGroupLinksFailure(error.message));
    });
  }

export const addUser = (user, accessToken) => dispatch => {
  dispatch(addUserRequest());
  return axios.post(`${TIMBLIN_URL}/register`, {
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    isActive: user.isActive === 'Active' ? true : false,
  })
    .then(response => {
      dispatch(addUserSuccess(response.data));
      user.userGroup.map(userGroup => addGroups(user.id, userGroup, accessToken))
    })
    .catch(error => {
      dispatch(addUserFailure(error.message));
    });
};

export const addGroups = (userId, userGroup, accessToken) => dispatch => {
  dispatch(addUserGroupLinkRequest());
  axios.post(`${TIMBLIN_URL}/usergrouplink?accessToken=${"a38f19ec-7ad1-4296-a2bb-67e7a79a72f0"}`, {
    userId: 12,
    groupId: 1,
  })
    .then(response => {
      dispatch(addUserGroupLinkSuccess(response.data));
    })
    .catch(error => {
      dispatch(addUserGroupLinkFailure(error.message));
    });
};

export const editUser = (id, editedUser, accessToken) => dispatch => {
  dispatch(editUserRequest());
  return axios.patch(`${TIMBLIN_URL}/user/${id}?accessToken=${accessToken}`, {
    firstName: editedUser.firstName,
    lastName: editedUser.lastName,
    email: editedUser.email,
    isAdmin: false,
    isActive: editedUser.isActive === 'Active' ? true : false,
  })
    .then(response => {
      dispatch(editUserSuccess(response.data));
    })
    .catch(error => {
      dispatch(editUserFailure(error.message));
    });
};