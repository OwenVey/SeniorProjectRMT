import { createAction } from "redux-starter-kit";
import axios from "axios";
import { TIMBLIN_URL } from "../constants";
import moment from 'moment';

export const getUserProjectPermissionsRequest = createAction("GET_PERMISSION_REQUEST");
export const getUserProjectPermissionsFailure = createAction("GET_PERMISSION_FAILURE");
export const getUserProjectPermissionsSuccess = createAction("GET_PERMISSION_SUCCESS");

export const showAddPermissionModal = createAction("SHOW_ADD_PERMISSION_MODAL");
export const hideAddPermissionModal = createAction("HIDE_ADD_PERMISSION_MODAL");
;
export const showEditPermissionModal = createAction("SHOW_EDIT_PERMISSION_MODAL");
export const hideEditPermissionModal = createAction("HIDE_EDIT_PERMISSION_MODAL");

export const getUserProjectPermissions = (accessToken, projectId) => dispatch => {
    dispatch(getUserProjectPermissionsRequest());
    axios.get(`${TIMBLIN_URL}/projectpermission/3/user?accessToken=${accessToken}`) //loop through all projects
    //axios.get(`${TIMBLIN_URL}/projectpermission/${projectId}/user?accessToken=${accessToken}`) //loop through all projects
      .then(response => {
        dispatch(getUserProjectPermissionsSuccess(response.data.permissions))
      })
      .catch(error => {
        dispatch(getUserProjectPermissionsFailure(error.message))
      });
  }