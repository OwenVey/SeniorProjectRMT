import { createReducer } from 'redux-starter-kit'
import { getUserGroupsRequest, getUserGroupsSuccess, getUserGroupsFailure } from '../actions/userGroups'

const initialUserGroupsState = {
  userGroups: [],
}

export const userGroupsReducer = createReducer(initialUserGroupsState, {

  [getUserGroupsRequest]: (state, action) => {

  },

  [getUserGroupsSuccess]: (state, action) => {
    state.userGroups = action.payload;
  },

  [getUserGroupsFailure]: (state, action) => {

  },
})