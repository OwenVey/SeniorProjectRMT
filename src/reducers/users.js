import { createReducer } from "redux-starter-kit";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUserRequest,
  addUserSuccess,
  addUserFailure,
  showAddUserModal,
  cancelAddUserModal,
  editUserRequest,
  editUserSuccess,
  editUserFailure,
  showEditUserModal,
  cancelEditUserModal
} from "../actions/users";

const initialUsersState = {
  userData: [],
  loading: false,
  fetchError: false,
  postError: false,
  patchError: false,

  editUserModalVisibility: false,
  invalidEditUser: false,

  addUserModalVisibility: false,

  editUser: ""
};

export const usersReducer = createReducer(initialUsersState, {
  //Fetching Users
  [fetchUsersRequest]: (state, action) => {
    state.loading = true;
    state.fetchError = false;
  },

  [fetchUsersSuccess]: (state, action) => {
    state.loading = false;
    state.userData = action.payload;
  },

  [fetchUsersFailure]: (state, action) => {
    state.loading = false;
    state.fetchError = true;
  },
  //-------------------------------------------------------------------
  // Adding A User
  //-------------------------------------------------------------------
  [addUserRequest]: (state, action) => {
    state.postError = false;
  },
  [addUserSuccess]: (state, action) => {
    state.addUserModalVisibility = false;
  },
  [addUserFailure]: (state, action) => {
    state.postError = true;
  },
  //Modal Switching
  [showAddUserModal]: (state, action) => {
    console.log(action.payload);
    state.addUserModalVisibility = true;
    state.invalidAddUser = false;
  },
  [cancelAddUserModal]: (state, action) => {
    state.addUserModalVisibility = false;
  },
  //-------------------------------------------------------------------
  // Existing User
  //-------------------------------------------------------------------
  [editUserRequest]: (state, action) => {
    state.patchError = false;
  },
  [editUserSuccess]: (state, action) => {
    state.userData = state.userData.map(user =>
      user.id === action.payload.id ? Object.assign(action.payload) : user
    );
    state.editUserModalVisibility = false;
  },
  [editUserFailure]: (state, action) => {
    state.patchError = true;
  },
  //Modal Switching
  [showEditUserModal]: (state, action) => {
    state.editUser = action.payload;
    state.editUserModalVisibility = true;
  },
  [cancelEditUserModal]: (state, action) => {
    state.editUserModalVisibility = false;
  }
});
