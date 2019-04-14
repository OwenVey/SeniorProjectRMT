import { createAction } from "redux-starter-kit";
import axios from "axios";
import { ABORTPLATTEVILLE_URL } from "../constants";

export const getTreeRequest = createAction('GET_TREE_REQUEST');
export const getTreeSuccess = createAction('GET_TREE_SUCCESS');
export const getTreeFailure = createAction('GET_TREE_FAILURE');

export const getChildrenRequest = createAction('GET_CHILDREN_REQUEST');
export const getChildrenSuccess = createAction('GET_CHILDREN_SUCCESS');
export const getChildrenFailure = createAction('GET_CHILDREN_FAILURE');

export const getTree = (accessToken, projectId) => dispatch => {
  dispatch(getTreeRequest());
  axios.get(`${ABORTPLATTEVILLE_URL}/getChildren?accessToken=${accessToken}&projectId=${projectId}`)
    .then(response => {
      dispatch(getTreeSuccess(response.data))
    })
    .catch(error => {
      dispatch(getTreeFailure(error.message))
    });
}

export const getChildren = (accessToken, projectId, parentId) => dispatch => {
  dispatch(getChildrenRequest());
  axios.get(`${ABORTPLATTEVILLE_URL}/getChildren?accessToken=${accessToken}&projectId=${projectId}&parentId=${parentId}`)
    .then(response => {
      response.data.map(node => node.isLeaf = !node.hasChildren)
      dispatch(getChildrenSuccess({ parentId, children: response.data }))
    })
    .catch(error => {
      dispatch(getChildrenFailure(error.message))
    });
}