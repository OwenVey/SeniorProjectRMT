import { createReducer } from "redux-starter-kit";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUserRequest,
  addUserSuccess,
  addUserFailure,
  addUserGroupLinkRequest,
  addUserGroupLinkSuccess,
  addUserGroupLinkFailure,
  showAddUserModal,
  hideAddUserModal,
  editUserRequest,
  editUserSuccess,
  editUserFailure,
  showEditUserModal,
  hideEditUserModal,
  fetchGroupLinksRequest,
  fetchGroupLinksSuccess,
  fetchGroupLinksFailure
} from "../actions/users";

const initialUsersState = {
  loadingUsers: true,
  users: [],
  loading: false,
  loadingGroups: false,
  fetchErrorMessage: '',
  fetchGroupLinksErrorMessage: '',
  postErrorMessage: '',
  postGroupErrorMessage: '',
  patchErrorMessage: '',
  addUserModalVisibility: false,
  editUserModalVisibility: false,
  editUser: '',
};

export const usersReducer = createReducer(initialUsersState, {
  //Fetching Users
  [fetchUsersRequest]: (state, action) => {
    state.loading = true;
    state.fetchErrorMessage = '';
  },

  [fetchUsersSuccess]: (state, action) => {
    state.loadingUsers = false;
    state.loading = false;
    state.users = action.payload;
  },

  [fetchUsersFailure]: (state, action) => {
    state.loadingUsers = false;
    state.loading = false;
    state.fetchErrorMessage = action.payload;
  },

  [fetchGroupLinksRequest]: (state, action) => {
    state.loading = true;
    state.fetchGroupLinksErrorMessage = '';
  },

  [fetchGroupLinksSuccess]: (state, action) => {
    state.loading = false;
    const userId = action.payload.userId;
    const groups = action.payload.groups;
    state.users.find(user => user.id === userId).userGroups = groups;
  },

  [fetchGroupLinksFailure]: (state, action) => {
    state.loading = false;
    state.fetchErrorMessage = action.payload;


  },
  //-------------------------------------------------------------------
  // Adding A User
  //-------------------------------------------------------------------
  [addUserRequest]: (state, action) => {
    state.loading = true;
    state.postErrorMessage = '';
  },
  [addUserSuccess]: (state, action) => {
    state.loading = false;
    state.users.push(action.payload);
    state.addUserModalVisibility = false;
  },
  [addUserFailure]: (state, action) => {
    state.loading = false;
    state.postErrorMessage = action.payload;
  },

  [addUserGroupLinkRequest]: (state, action) => {
    state.loadingGroups = true;
    state.postGroupErrorMessage = '';
  },
  [addUserGroupLinkSuccess]: (state, action) => {
    state.loadingGroups = false;
  },
  [addUserGroupLinkFailure]: (state, action) => {
    state.loadingGroups = false;
    state.postGroupErrorMessage = action.payload;
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
    state.loading = true;
    state.patchErrorMessage = '';
  },
  [editUserSuccess]: (state, action) => {
    state.loading = false;
    state.users = state.users.map(user =>
      user.id === action.payload.id ? Object.assign(action.payload) : user
    );
    state.editUserModalVisibility = false;
  },
  [editUserFailure]: (state, action) => {
    state.loading = false;
    state.patchErrorMessage = action.payload;
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
