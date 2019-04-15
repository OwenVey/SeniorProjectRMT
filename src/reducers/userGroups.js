import { createReducer } from 'redux-starter-kit'
import {
  getUserGroupsRequest,
  getUserGroupsSuccess,
  getUserGroupsFailure,
  clickAddUserGroup,
  clickCancelAddUserGroup,
  addUserGroupRequest,
  addUserGroupSuccess,
  addUserGroupFailure,
  clickEditUserGroup,
  clickCancelEditAddUserGroup,
  editUserGroupRequest,
  editUserGroupSuccess,
  editUserGroupFailure,
} from '../actions/userGroups'

const initialUserGroupsState = {
  loadingUserGroups: true,
  userGroups: [],
  selectedUserGroup: {},
  loadingAdd: false,
  loadingEdit: false,
  showAddUserGroupModal: false,
  showEditUserGroupModal: false,
  addError: '',
  editError: '',
}

export const userGroupsReducer = createReducer(initialUserGroupsState, {

  // GET users
  [getUserGroupsRequest]: (state, action) => {
    state.loadingUserGroups = true;
  },

  [getUserGroupsSuccess]: (state, action) => {
    state.loadingUserGroups = false;
    state.userGroups = action.payload;
  },

  [getUserGroupsFailure]: (state, action) => {
    state.loadingUserGroups = false;
  },

  // ADDING a user
  [clickAddUserGroup]: (state, action) => {
    state.showAddUserGroupModal = true;
  },

  [clickCancelAddUserGroup]: (state, action) => {
    state.showAddUserGroupModal = false;
  },

  [addUserGroupRequest]: (state, action) => {
    state.loadingAdd = true;
  },

  [addUserGroupSuccess]: (state, action) => {
    state.loadingAdd = false;
    state.userGroups.push(action.payload);
    state.showAddUserGroupModal = false;
  },

  [addUserGroupFailure]: (state, action) => {
    state.loadingAdd = false;
    state.addError = action.payload;
  },

  //EDITING a user
  [clickEditUserGroup]: (state, action) => {
    state.showEditUserGroupModal = true;
    state.selectedUserGroup = action.payload;
  },

  [clickCancelEditAddUserGroup]: (state, action) => {
    state.selectedUserGroup = {};
    state.showEditUserGroupModal = false;
  },

  [editUserGroupRequest]: (state, action) => {
    state.loadingEdit = false;
  },

  [editUserGroupSuccess]: (state, action) => {
    state.loadingEdit = false;
    const index = state.userGroups.findIndex(userGroup => userGroup.id === action.payload.id);
    state.userGroups[index] = action.payload;
    state.showEditUserGroupModal = false;
    state.selectedUserGroup = {};
  },

  [editUserGroupFailure]: (state, action) => {
    state.loadingEdit = false;
    state.editError = action.payload;
  },

})