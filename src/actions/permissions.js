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

export const editUserProjectPermissionRequest = createAction('EDIT_USERPROJECTPERMISSION_REQUEST');
export const editUserProjectPermissionSuccess = createAction('EDIT_USERPROJECTPERMISSION_SUCCESS');
export const editUserProjectPermissionFailure = createAction('EDIT_USERPROJECTPERMISSION_FAILURE');

export const showEditPermissionModal = createAction('SHOW_EDIT_PERMISSION_MODAL');
export const clickCancelEditPermission = createAction('CLICK_CANCEL_EDIT_PERMISSION');

export const deletePermissionRequest = createAction('DELETE_PERMISSION_REQUEST');
export const deletePermissionSuccess = createAction('DELETE_PERMISSION_SUCCESS');
export const deletePermissionFailure = createAction('DELETE_PERMISSION_FAILURE');

export const getUserProjectPermissions = (accessToken) => dispatch => {
    dispatch(getUserProjectPermissionsRequest());
    //axios.get(`${TIMBLIN_URL}/projectpermission/3/user?accessToken=${accessToken}`)
    axios.get(`${TIMBLIN_URL}/projectpermission?accessToken=${accessToken}`) //loop through all projects
      .then(response => {
        dispatch(getUserProjectPermissionsSuccess(response.data.userPermissions))
      })
      .catch(error => {
        dispatch(getUserProjectPermissionsFailure(error.message))
      });
}

export const addUserProjectPermission = (accessToken, permission) => dispatch => {
  let permissionString = "";
  if(permission.permissions)
  {
    permissionString = permission.permissions.includes("Create") ? 'C' : ''
    permissionString += permission.permissions.includes("Read") ? 'R' : ''
    permissionString += permission.permissions.includes("Manage") ? 'M' : ''
    permissionString += permission.permissions.includes("Delete") ? 'D' : ''
    permissionString += permission.permissions.includes("Admin") ? 'A' : ''
  }

  let endDate;
  if(permission.endDate)
  {
    endDate = moment(permission.endDate).subtract(6, "hours")
  }

  dispatch(addUserProjectPermissionRequest());
  axios.post(`${TIMBLIN_URL}/projectpermission/${permission.projectId}/user/${permission.userId}?accessToken=${accessToken}`, {
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
  if(permission.permissions)
  {
    permissionString = permission.permissions.includes("Create") ? 'C' : ''
    permissionString += permission.permissions.includes("Read") ? 'R' : ''
    permissionString += permission.permissions.includes("Manage") ? 'M' : ''
    permissionString += permission.permissions.includes("Delete") ? 'D' : ''
    permissionString += permission.permissions.includes("Admin") ? 'A' : ''
  }

  let endDate;
  if(permission.endDate)
  {
    endDate = moment(permission.endDate).subtract(6, "hours")
  }

  dispatch(editUserProjectPermissionRequest());
   axios.patch(`${TIMBLIN_URL}/projectpermission/${userProjectPermission.projectId}/user/${userProjectPermission.userId}?accessToken=${accessToken}`, {
  //  axios.patch(`${TIMBLIN_URL}/projectpermission/3/user/${userProjectPermissionUserId}?accessToken=${accessToken}`, {
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
   axios.delete(`${TIMBLIN_URL}/projectpermission/${permission.projectId}/user/${permission.userId}?accessToken=${accessToken}`)
  //axios.delete(`${TIMBLIN_URL}/projectpermission/3/user/${permission.userId}?accessToken=${accessToken}`)
    .then(response => {
      dispatch(deletePermissionSuccess(permission))
    })
    .catch(error => {
      dispatch(deletePermissionFailure(error.message))
    });
}