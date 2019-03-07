import { createReducer } from "redux-starter-kit";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUserRequest,
  addUserSuccess,
  addUserFailure,
  showAddUserModal,
  hideAddUserModal,
  editUserRequest,
  editUserSuccess,
  editUserFailure,
  showEditUserModal,
  hideEditUserModal
} from "../actions/users";

const initialUsersState = {
  userData: [],
  loading: false,
  fetchError: false,
  postError: false,
  patchError: false,


  addUserModalVisibility: false,
  invalidAddUser: false,

  editUserModalVisibility: false,
  invalidEditUser: false,


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
    state.addUserModalVisibility = true;
    state.invalidAddUser = false;
  },
  [hideAddUserModal]: (state, action) => {
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
    state.invalidEditUser = false;
  },
  [hideEditUserModal]: (state, action) => {
    state.editUserModalVisibility = false;
  }
});
