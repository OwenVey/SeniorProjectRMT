import { createReducer } from "redux-starter-kit";
import {
    getUserProjectPermissionsRequest,
    getUserProjectPermissionsSuccess,
    getUserProjectPermissionsFailure,
    addUserProjectPermissionRequest,
    addUserProjectPermissionSuccess,
    addUserProjectPermissionFailure,
    editUserProjectPermissionRequest,
    editUserProjectPermissionSuccess,
    editUserProjectPermissionFailure,
    deletePermissionRequest,
    deletePermissionSuccess,
    deletePermissionFailure,
    showAddPermissionModal,
    showEditPermissionModal,
    clickCancelAddPermission,
    clickCancelEditPermission,

} from "../actions/permissions";

const initialPermissionsState = {
    loadingPermissions: false,
    userProjectPermissions: [],
    groupProjectPermissions: [],
    userObjectPermissions: [],
    groupObjectPermissions: [],
    loadingAdd: false,
    loadingEdit: false,
    fetchErrorMessage: '',
    addPermissionModalVisibility: false,
    invalidAddPermission: false,
    addError: '',
    editError: '',
    editPermissionModalVisibility: false,
    invalidEditPermission: false,
    selectedPermission: {}
};

export const permissionsReducer = createReducer(initialPermissionsState, {
    //getting Permissions
    [getUserProjectPermissionsRequest]: (state, action) => {
        state.loadingPermissions = true;
        state.fetchErrorMessage = '';
    },

    [getUserProjectPermissionsSuccess]: (state, action) => {
        state.loadingPermissions = false;
        state.userProjectPermissions = action.payload;
    },

    [getUserProjectPermissionsFailure]: (state, action) => {
        state.loadingPermissions = false;
        state.fetchErrorMessage = action.payload;
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

    //-------------------------------------------------------------------
    // Edit A Permission
    //-------------------------------------------------------------------
    //Modal Switching
    [showEditPermissionModal]: (state, action) => {
        state.selectedPermission = action.payload;
        state.editPermissionModalVisibility = true;
    },

    [clickCancelEditPermission]: (state, action) => {
        state.selectedPermission = {};
        state.editPermissionModalVisibility = false;
    },

    [editUserProjectPermissionRequest]: (state, action) => {
        state.loadingEdit = true;
    },

    [editUserProjectPermissionSuccess]: (state, action) => {
        state.loadingEdit = false;
        const index = state.userProjectPermissions.findIndex(permission => permission.userId === action.payload.userId);
        state.userProjectPermissions[index] = action.payload;
        state.editPermissionModalVisibility = false;
    },

    [editUserProjectPermissionFailure]: (state, action) => {
        state.loadingEdit = false;
        state.editError = action.payload;
    },

    //-------------------------------------------------------------------
    // Delete A Permission
    //-------------------------------------------------------------------
    [deletePermissionRequest]: (state, action) => {
    },

    [deletePermissionSuccess]: (state, action) => {
        const index = state.userProjectPermissions.findIndex(permission => permission.userId === action.payload.userId);
        state.userProjectPermissions.splice(index, 1);
    },

    [deletePermissionFailure]: (state, action) => {
    },
});
