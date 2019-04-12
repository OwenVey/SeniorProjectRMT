import { createAction } from "redux-starter-kit";
import axios from "axios";
import { TIMBLIN_URL } from "../constants";
import moment from 'moment';

export const getProjectPermissionsRequest = createAction("GET_PROJECT_PERMISSIONS_REQUEST");
export const getProjectPermissionsFailure = createAction("GET_PROJECT_PERMISSIONS_FAILURE");
export const getProjectPermissionsSuccess = createAction("GET_PROJECT_PERMISSIONS_SUCCESS");

export const addUserProjectPermissionRequest = createAction('ADD_USER_PROJECT_PERMISSION_REQUEST');
export const addUserProjectPermissionSuccess = createAction('ADD_USER_PROJECT_PERMISSION_SUCCESS');
export const addUserProjectPermissionFailure = createAction('ADD_USER_PROJECT_PERMISSION_FAILURE');

export const showAddPermissionModal = createAction('SHOW_ADD_PERMISSION_MODAL');
export const clickCancelAddPermission = createAction('CLICK_CANCEL_ADD_PERMISSION');

export const editUserProjectPermissionRequest = createAction('EDIT_USER_PROJECT_PERMISSION_REQUEST');
export const editUserProjectPermissionSuccess = createAction('EDIT_USER_PROJECT_PERMISSION_SUCCESS');
export const editUserProjectPermissionFailure = createAction('EDIT_USER_PROJECT_PERMISSION_FAILURE');

export const showEditPermissionModal = createAction('SHOW_EDIT_PERMISSION_MODAL');
export const clickCancelEditPermission = createAction('CLICK_CANCEL_EDIT_PERMISSION');

export const deletePermissionRequest = createAction('DELETE_PERMISSION_REQUEST');
export const deletePermissionSuccess = createAction('DELETE_PERMISSION_SUCCESS');
export const deletePermissionFailure = createAction('DELETE_PERMISSION_FAILURE');

export const getProjectPermissions = (accessToken) => dispatch => {
  dispatch(getProjectPermissionsRequest());
  return axios.get(`${TIMBLIN_URL}/projectpermission?accessToken=${accessToken}`)
    .then(response => {
      dispatch(getProjectPermissionsSuccess({ groupProjectPermissions: response.data.groupPermissions, userProjectPermissions: response.data.userPermissions }))
    })
    .catch(error => {
      dispatch(getProjectPermissionsFailure(error.message))
    });
}

export const addUserProjectPermission = (accessToken, permission) => dispatch => {
  let permissionString = "";
  if (permission.permission) {
    permissionString = permission.permission.includes("Create") ? 'C' : ''
    permissionString += permission.permission.includes("Read") ? 'R' : ''
    permissionString += permission.permission.includes("Manage") ? 'M' : ''
    permissionString += permission.permission.includes("Delete") ? 'D' : ''
    permissionString += permission.permission.includes("Admin") ? 'A' : ''
  }

  let endDate;
  if (permission.endDate) {
    endDate = moment(permission.endDate).subtract(6, "hours")
  }

  dispatch(addUserProjectPermissionRequest());
  return axios.post(`${TIMBLIN_URL}/projectpermission/${permission.projectId}/user/${permission.userId}?accessToken=${accessToken}`, {
    permission: permissionString,
    endDate: endDate,
  })
    .then(response => {
      dispatch(addUserProjectPermissionSuccess(response.data))
    })
    .catch(error => {
      dispatch(addUserProjectPermissionFailure(error.message))
    });
}

export const editUserProjectPermission = (accessToken, userProjectPermission, permission) => dispatch => {
  let permissionString = "";
  if (permission.permission) {
    permissionString = permission.permission.includes("Create") ? 'C' : ''
    permissionString += permission.permission.includes("Read") ? 'R' : ''
    permissionString += permission.permission.includes("Manage") ? 'M' : ''
    permissionString += permission.permission.includes("Delete") ? 'D' : ''
    permissionString += permission.permission.includes("Admin") ? 'A' : ''
  }

  let endDate;
  if (permission.endDate) {
    endDate = moment(permission.endDate).subtract(6, "hours")
  }

  dispatch(editUserProjectPermissionRequest());
  return axios.patch(`${TIMBLIN_URL}/projectpermission/${userProjectPermission.projectId}/user/${userProjectPermission.userId}?accessToken=${accessToken}`, {
    permission: permissionString,
    endDate: endDate,
  })
    .then(response => {
      dispatch(editUserProjectPermissionSuccess(response.data))
    })
    .catch(error => {
      dispatch(editUserProjectPermissionFailure(error.message))
    });
}

export const deletePermission = (accessToken, permission) => dispatch => {
  dispatch(deletePermissionRequest());
  return axios.delete(`${TIMBLIN_URL}/projectpermission/${permission.projectId}/user/${permission.userId}?accessToken=${accessToken}`)
    .then(response => {
      dispatch(deletePermissionSuccess(permission))
    })
    .catch(error => {
      dispatch(deletePermissionFailure(error.message))
    });
}