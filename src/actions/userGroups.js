import { createAction } from "redux-starter-kit";
import axios from "axios";
import { TIMBLIN_URL } from "../constants";

export const getUserGroupsRequest = createAction('GET_USER_GROUPS_REQUEST');
export const getUserGroupsSuccess = createAction('GET_USER_GROUPS_SUCCESS');
export const getUserGroupsFailure = createAction('GET_USER_GROUPS_FAILURE');

export const clickAddUserGroup = createAction('CLICK_ADD_USER_GROUP');
export const clickCancelAddUserGroup = createAction('CLICK_CANCEL_ADD_USER_GROUP');

export const toggleAddUserGroupModal = createAction('TOGGLE_ADD_USER_GROUP_MODAL')
export const addUserGroupRequest = createAction('ADD_USER_GROUP_REQUEST')
export const addUserGroupSuccess = createAction('ADD_USER_GROUP_SUCCESS')
export const addUserGroupFailure = createAction('ADD_USER_GROUP_FAILURE')

export const getUserGroups = accessToken => dispatch => {
  dispatch(getUserGroupsRequest());
  axios.get(`${TIMBLIN_URL}/group?accessToken=${accessToken}`)
    .then(response => {
      dispatch(getUserGroupsSuccess(response.data.groups))
    })
    .catch(error => {
      dispatch(getUserGroupsFailure(error.message))
    });
}

export const addUserGroup = (accessToken, userGroup) => dispatch => {
  dispatch(addUserGroupRequest());
  axios.post(`${TIMBLIN_URL}/group?accessToken=${accessToken}`,
    {
      projectID: userGroup.projectId,
      name: userGroup.name,
      description: userGroup.description,
    })
    .then(response => {
      dispatch(addUserGroupSuccess(response.data))
    })
    .catch(error => {
      dispatch(addUserGroupFailure(error.message))
    });
}

