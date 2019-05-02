import { createReducer } from "redux-starter-kit";
import {
    getProjectPermissionsRequest,
    getProjectPermissionsSuccess,
    getProjectPermissionsFailure,
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
    loadingAdd: false,
    loadingEdit: false,
    fetchErrorMessage: '',
    addPermissionModalVisibility: false,
    addError: '',
    editError: '',
    editPermissionModalVisibility: false,
    selectedPermission: {}
};

export const permissionsReducer = createReducer(initialPermissionsState, {
    //getting Permissions
    [getProjectPermissionsRequest]: (state, action) => {
        state.loadingPermissions = true;
        state.fetchErrorMessage = '';
    },

    [getProjectPermissionsSuccess]: (state, action) => {
        state.loadingPermissions = false;
        state.userProjectPermissions = action.payload.userProjectPermissions;
        state.groupProjectPermissions = action.payload.groupProjectPermissions;
    },

    [getProjectPermissionsFailure]: (state, action) => {
        state.loadingPermissions = false;
        state.fetchErrorMessage = action.payload;
    },
    //-------------------------------------------------------------------
    // Adding A Permission
    //-------------------------------------------------------------------
    //Modal Switching
    [addUserProjectPermissionRequest]: (state, action) => {
        state.loadingAdd = true;
        state.addError = '';
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
