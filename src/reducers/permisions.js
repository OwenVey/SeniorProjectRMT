import { createReducer } from "redux-starter-kit";
import {
    getUserProjectPermissionsRequest,
    getUserProjectPermissionsSuccess,
    getUserProjectPermissionsFailure,
    showAddPermissionModal,
    hideAddPermissionModal,
    showEditPermissionModal,
    hideEditPermissionModal
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
    [showAddPermissionModal]: (state, action) => {
        state.addPermissionModalVisibility = true;
        state.invalidAddPermission = false;
    },
    [hideAddPermissionModal]: (state, action) => {
        state.addPermissionModalVisibility = false;
    },
    //-------------------------------------------------------------------
    // Existing Permission
    //-------------------------------------------------------------------
    //Modal Switching
    [showEditPermissionModal]: (state, action) => {
        state.editPermission = action.payload;
        state.editPermissionModalVisibility = true;
        state.invalidEditPermission = false;
    },
    [hideEditPermissionModal]: (state, action) => {
        state.editPermissionModalVisibility = false;
    }
});
