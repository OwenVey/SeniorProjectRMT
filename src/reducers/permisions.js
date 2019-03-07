import { createReducer } from "redux-starter-kit";
import {
    fetchPermissionsRequest,
    fetchPermissionsSuccess,
    fetchPermissionsFailure,
    showAddPermissionModal,
    hideAddPermissionModal,
    showEditPermissionModal,
    hideEditPermissionModal
} from "../actions/permissions";

const initialPermissionsState = {
    permissionData: [],

    addPermissionModalVisibility: false,
    invalidAddPermission: false,

    editPermissionModalVisibility: false,
    invalidEditPermission: false,
};

export const permissionsReducer = createReducer(initialPermissionsState, {
    //Fetching Permissions
    [fetchPermissionsRequest]: (state, action) => {
    },

    [fetchPermissionsSuccess]: (state, action) => {
    },

    [fetchPermissionsFailure]: (state, action) => {
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
