import { createAction } from "redux-starter-kit";

export const fetchPermissionRequest = createAction("FETCH_PERMISSION_REQUEST");
export const fetchPermissionsSuccess = createAction("FETCH_PERMISSION_SUCCESS");
export const fetchPermissionsFailure = createAction("FETCH_PERMISSION_FAILURE");

export const showAddPermissionModal = createAction("SHOW_ADD_PERMISSION_MODAL");
export const hideAddPermissionModal = createAction("HIDE_ADD_PERMISSION_MODAL");
;
export const showEditPermissionModal = createAction("SHOW_EDIT_PERMISSION_MODAL");
export const hideEditPermissionModal = createAction("HIDE_EDIT_PERMISSION_MODAL");