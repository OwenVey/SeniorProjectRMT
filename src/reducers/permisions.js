import { createReducer } from "redux-starter-kit";
import {
    getUserProjectPermissionsRequest,
    getUserProjectPermissionsSuccess,
    getUserProjectPermissionsFailure,
    addUserProjectPermissionRequest,
    addUserProjectPermissionSuccess,
    addUserProjectPermissionFailure,
    showAddPermissionModal,
    clickCancelAddPermission,

} from "../actions/permissions";

const initialPermissionsState = {
    loadingPermissions: true,
    userProjectPermissions: [],
    groupProjectPermissions: [],
    userObjectPermissions: [],
    groupObjectPermissions: [],
    loadingAdd: false,
    loadingEdit: false,
    loading: false,
    fetchErrorMessage: '',
    addPermissionModalVisibility: false,
    invalidAddPermission: false,
    addError: '',
    editError: '',
    editPermissionModalVisibility: false,
    invalidEditPermission: false,
};

export const permissionsReducer = createReducer(initialPermissionsState, {
    //getting Permissions
    [getUserProjectPermissionsRequest]: (state, action) => {
        state.loading = true;
        state.fetchErrorMessage = '';
    },

    [getUserProjectPermissionsSuccess]: (state, action) => {
        state.loadingPermissions = false;
        state.userProjectPermissions = action.payload;
    },

    [getUserProjectPermissionsFailure]: (state, action) => {
        state.loadingPermissions = false;
    },
    //-------------------------------------------------------------------
    // Adding A Permission
    //-------------------------------------------------------------------
    //Modal Switching
    [addUserProjectPermissionRequest]: (state, action) => {
        state.loadingAdd = true;
    },

    [addUserProjectPermissionSuccess]: (state, action) => {
        state.loadingAdd = false;
        state.userProjectPermissions.push(action.payload);
        state.addPermissionModalVisibility = false;
    },

    [addUserProjectPermissionFailure]: (state, action) => {
        state.loadingAdd = false;
        state.addError = action.payload;
    },

    [showAddPermissionModal]: (state, action) => {
        state.addPermissionModalVisibility = true;
    },

    [clickCancelAddPermission]: (state, action) => {
        state.addPermissionModalVisibility = false;
    },
});
