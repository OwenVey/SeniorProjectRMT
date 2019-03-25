import { createReducer } from 'redux-starter-kit'
import { getTreeRequest, getTreeSuccess, getTreeFailure } from '../actions/tree'

const initialTreeState = {
  tree: {},

}

export const treeReducer = createReducer(initialTreeState, {
  [getTreeRequest]: (state, action) => {

  },

  [getTreeSuccess]: (state, action) => {
    state.tree = action.payload;
  },

  [getTreeFailure]: (state, action) => {

  },

});