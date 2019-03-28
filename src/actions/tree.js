import { createAction } from "redux-starter-kit";
import axios from "axios";
import { ABORTPLATTEVILLE_URL } from "../constants";

export const getTreeRequest = createAction('GET_TREE_REQUEST');
export const getTreeSuccess = createAction('GET_TREE_SUCCESS');
export const getTreeFailure = createAction('GET_TREE_FAILURE');

export const addTreeNode = createAction('ADD_TREE_NODE');

export const getTree = (accessToken, projectId) => dispatch => {
  dispatch(getTreeRequest());
  axios.get(`${ABORTPLATTEVILLE_URL}/getChildren?accessToken=${accessToken}&projectId=${projectId}`)
    .then(response => {
      // const data = response.data;
      // data[0].children = [
      //   {
      //     "fileName": "note",
      //     "globalId": "1",
      //     "id": 5,
      //     "listing": 0,
      //     "name": "test2",
      //     "parentId": 4,
      //     "projectId": 2,
      //     "text": "test2",
      //     "typeId": 1,
      //     isLeaf: true,
      //   }
      // ];
      response.data[0].isLeaf = true;
      dispatch(getTreeSuccess(response.data))
    })
    .catch(error => {
      dispatch(getTreeFailure(error.message))
    });
}