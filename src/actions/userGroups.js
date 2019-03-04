import { createAction } from "redux-starter-kit";
import axios from "axios";
import { TIMBLIN_URL } from "../constants";

export const getUserGroupsRequest = createAction('GET_USER_GROUPS_REQUEST');
export const getUserGroupsSuccess = createAction('GET_USER_GROUPS_SUCCESS');
export const getUserGroupsFailure = createAction('GET_USER_GROUPS_FAILURE');

export const getUserGroups = accessToken => dispatch => {
  console.log('user groups')
  dispatch(getUserGroupsRequest());
  axios
    .get(`${TIMBLIN_URL}/group?accessToken=${accessToken}`)
    .then(response => {
      dispatch(getUserGroupsSuccess(response.data.groups))
    })
    .catch(error => {
      dispatch(getUserGroupsFailure(error))
    });
}

