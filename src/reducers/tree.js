import { createReducer } from 'redux-starter-kit'
import { getTreeRequest, getTreeSuccess, getTreeFailure, getChildrenRequest, getChildrenSuccess, getChildrenFailure } from '../actions/tree'

const initialTreeState = {
  tree: [],
  test: false,

}

export const treeReducer = createReducer(initialTreeState, {
  [getTreeRequest]: (state, action) => {

  },

  [getTreeSuccess]: (state, action) => {
    console.log(action.payload)
    state.tree = action.payload;
  },

  [getTreeFailure]: (state, action) => {
    console.log(action.payload)
  },

  [getChildrenRequest]: (state, action) => {

  },

  [getChildrenSuccess]: (state, action) => {
    state.tree[0].children = action.payload.children;
  },

  [getChildrenFailure]: (state, action) => {

  },

});
