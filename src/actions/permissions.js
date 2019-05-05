import { createAction } from "redux-starter-kit";
import axios from "axios";
import { TIMBLIN_URL } from "../constants";
import moment from 'moment';

export const getProjectPermissionsRequest = createAction("GET_PROJECT_PERMISSIONS_REQUEST");
export const getProjectPermissionsFailure = createAction("GET_PROJECT_PERMISSIONS_FAILURE");
export const getProjectPermissionsSuccess = createAction("GET_PROJECT_PERMISSIONS_SUCCESS");

export const addProjectPermissionRequest = createAction('ADD_PROJECT_PERMISSION_REQUEST');
export const addProjectPermissionSuccess = createAction('ADD_PROJECT_PERMISSION_SUCCESS');
export const addProjectPermissionFailure = createAction('ADD_PROJECT_PERMISSION_FAILURE');

export const showAddPermissionModal = createAction('SHOW_ADD_PERMISSION_MODAL');
export const clickCancelAddPermission = createAction('CLICK_CANCEL_ADD_PERMISSION');

export const editProjectPermissionRequest = createAction('EDIT_PROJECT_PERMISSION_REQUEST');
export const editProjectPermissionSuccess = createAction('EDIT_PROJECT_PERMISSION_SUCCESS');
export const editProjectPermissionFailure = createAction('EDIT_PROJECT_PERMISSION_FAILURE');

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

export const addProjectPermission = (accessToken, permission) => dispatch => {

  let endDate;
  if (permission.endDate) {
    endDate = moment(permission.endDate).subtract(6, "hours")
  }

  var permissionType = '';
  if (permission.userId) {
    permissionType = `user/${permission.userId}`
  }
  if (permission.groupId) {
    permissionType = `group/${permission.groupId}`
  }

  dispatch(addProjectPermissionRequest());
  return axios.post(`${TIMBLIN_URL}/projectpermission/${permission.projectId}/${permissionType}?accessToken=${accessToken}`, {
    permission: permission.permission,
    endDate: endDate,
  })
    .then(response => {
      dispatch(addProjectPermissionSuccess(response.data))
    })
    .catch(error => {
      dispatch(addProjectPermissionFailure(error.message))
    });
}

export const editProjectPermission = (accessToken, existingPermission, newPermission) => dispatch => {
  let endDate;
  if (newPermission.endDate) {
    endDate = moment(newPermission.endDate).subtract(6, "hours")
  }

  var permissionType = '';
  if (existingPermission.userId) {
    permissionType = `user/${existingPermission.userId}`
  }
  if (existingPermission.groupId) {
    permissionType = `group/${existingPermission.groupId}`
  }

  dispatch(editProjectPermissionRequest());
  return axios.patch(`${TIMBLIN_URL}/projectpermission/${existingPermission.projectId}/${permissionType}?accessToken=${accessToken}`, {
    permission: newPermission.permission,
    endDate: endDate,
  })
    .then(response => {
      dispatch(editProjectPermissionSuccess(response.data))
    })
    .catch(error => {
      dispatch(editProjectPermissionFailure(error.message))
    });
}

export const deletePermission = (accessToken, permission) => dispatch => {
  var permissionType = '';
  if (permission.userId) {
    permissionType = `user/${permission.userId}`
  }
  if (permission.groupId) {
    permissionType = `group/${permission.groupId}`
  }
  dispatch(deletePermissionRequest());
  return axios.delete(`${TIMBLIN_URL}/projectpermission/${permission.projectId}/${permissionType}?accessToken=${accessToken}`)
    .then(response => {
      dispatch(deletePermissionSuccess(permission))
    })
    .catch(error => {
      dispatch(deletePermissionFailure(error.message))
    });
}