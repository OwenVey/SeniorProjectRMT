import { createReducer } from 'redux-starter-kit'
import {
  getUserGroupsRequest,
  getUserGroupsSuccess,
  getUserGroupsFailure,
  toggleAddUserGroupModal,
  addUserGroupRequest,
  addUserGroupSuccess,
  addUserGroupFailure
} from '../actions/userGroups'

const initialUserGroupsState = {
  loadingUserGroups: true,
  userGroups: [],
  loadingAdd: false,
  showAddUserGroupModal: false,
  errorMessage: '',
}

export const userGroupsReducer = createReducer(initialUserGroupsState, {

  [getUserGroupsRequest]: (state, action) => {

  },

  [getUserGroupsSuccess]: (state, action) => {
    state.loadingUserGroups = false;
    state.userGroups = action.payload;
  },

  [getUserGroupsFailure]: (state, action) => {
    state.loadingUserGroups = false;
  },

  [toggleAddUserGroupModal]: (state, action) => {
    state.showAddUserGroupModal = action.payload;
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
    state.errorMessage = action.payload;
  },
})