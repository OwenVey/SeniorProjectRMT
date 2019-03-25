import { createAction } from "redux-starter-kit";
import axios from "axios";
import { ABORTPLATTEVILLE_URL } from "../constants";

export const getTreeRequest = createAction('GET_TREE_REQUEST');
export const getTreeSuccess = createAction('GET_TREE_SUCCESS');
export const getTreeFailure = createAction('GET_TREE_FAILURE');

export const getTree = accessToken => dispatch => {
  dispatch(getTreeRequest());
  axios.get(`${ABORTPLATTEVILLE_URL}/project?accessToken=${accessToken}`)
    .then(response => {
      dispatch(getTreeSuccess(response.data))
    })
    .catch(error => {
      dispatch(getTreeFailure(error.message))
    });
}