import { createAction } from "redux-starter-kit";
import axios from "axios";
import { TIMBLIN_URL } from "../constants";
import moment from 'moment';

export const getUserProjectPermissionsRequest = createAction("GET_PERMISSION_REQUEST");
export const getUserProjectPermissionsFailure = createAction("GET_PERMISSION_FAILURE");
export const getUserProjectPermissionsSuccess = createAction("GET_PERMISSION_SUCCESS");

export const addUserProjectPermissionRequest = createAction('ADD_USERPROJECTPERMISSION_REQUEST');
export const addUserProjectPermissionSuccess = createAction('ADD_USERPROJECTPERMISSION_SUCCESS');
export const addUserProjectPermissionFailure = createAction('ADD_USERPROJECTPERMISSION_FAILURE');

export const showAddPermissionModal = createAction('SHOW_ADD_PERMISSION_MODAL');
export const clickCancelAddPermission = createAction('CLICK_CANCEL_ADD_PERMISSION');

export const getUserProjectPermissions = (accessToken) => dispatch => {
    dispatch(getUserProjectPermissionsRequest());
    axios.get(`${TIMBLIN_URL}/projectpermission/3/user?accessToken=${accessToken}`)
    //axios.get(`${TIMBLIN_URL}/projectpermission/${projectId}/user?accessToken=${accessToken}`) //loop through all projects
      .then(response => {
        dispatch(getUserProjectPermissionsSuccess(response.data.permissions))
      })
      .catch(error => {
        dispatch(getUserProjectPermissionsFailure(error.message))
      });
}

export const addUserProjectPermission = (accessToken, permission) => dispatch => {
  dispatch(addUserProjectPermissionRequest());
  axios.post(`${TIMBLIN_URL}/projectpermission/${permission.projectId}/user/${permission.userId}?accessToken=${accessToken}`, {
    permission: permission.permission,
    endDate: moment(permission.dueDate).subtract(6, "hours"),
  })
    .then(response => {
      dispatch(addUserProjectPermissionSuccess(response.data))
    })
    .catch(error => {
      dispatch(addUserProjectPermissionFailure(error.message))
    });
}