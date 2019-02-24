import { createReducer } from "redux-starter-kit";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUser,
  showAddUserModal,
  hideAddUserModal,
  cancelAddUserModal,
  editUser,
  showEditUserModal,
  hideEditUserModal,
  cancelEditUserModal
} from "../actions/adminPageUsers";

const initialUsersState = {
  userData: [],
  loading: false,
  error: false,

  showEditUserModal: false,
  invalidEditUser: false,

  showAddUserModal: false,
  invalidAddUser: false,

  editUser: {
    key: "",
    firstName: "Alex",
    lastName: "Tilot",
    userName: "nezzely",
    email: "alextilot@gmail.com",
    userGroups: "",
    licenseType: "",
    userStatus: ""
  }
};

export const adminPageUsersReducer = createReducer(initialUsersState, {
  [fetchUsersRequest]: (state, action) => {
    state.loading = true;
  },

  [fetchUsersSuccess]: (state, action) => {
    state.loading = false;
    state.userData = action.payload;
  },

  [fetchUsersFailure]: (state, action) => {
    console.log(action.payload);
    state.loading = false;
    state.error = true;
  },

  //add user modal
  [addUser]: (state, action) => {
    console.log(action.payload);
    state.userData = state.userData.push(action.payload);
  },

  [showAddUserModal]: (state, action) => {
    state.showAddUserModal = true;
    state.invalidAddUser = false;
  },

  [hideAddUserModal]: (state, action) => {
    state.showAddUserModal = false;
    state.invalidAddUser = false;
  },

  [cancelAddUserModal]: (state, action) => {
    state.showAddUserModal = false;
  },

  //Edit user modal
  [editUser]: (state, action) => {
    state.userData = state.userData.map(user =>
      user.id === action.payload.id ? Object.assign(action.payload) : user
    );
  },

  [showEditUserModal]: (state, action) => {
    state.editUser = action.payload;
    state.showEditUserModal = true;
    state.invalidEditUser = false;
  },

  [hideEditUserModal]: (state, action) => {
    state.editUser = {
      key: "",
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      userGroups: "",
      licenseType: "",
      userStatus: ""
    };
    state.showEditUserModal = false;
    state.invalidEditUser = false;
  },

  [cancelEditUserModal]: (state, action) => {
    state.editUser = {
      key: "",
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      userGroups: "",
      licenseType: "",
      userStatus: ""
    };
    state.showEditUserModal = false;
  }
});
