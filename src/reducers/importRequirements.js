import { createReducer } from 'redux-starter-kit'

import {
    importRequest,
    importSuccess,
    importFailure,
    uploadRequest,
    uploadSuccess,
    uploadFailure,
    clickImport,
    clickCancelImport,
    showImportModal,
    hideImportModal,  
  } from '../actions/importRequirements'

  const initialImportRequirementsState = {
      name: '',
      action: '',
      headers: {},
  }

  export const importRequirementsReducer = createReducer(initialUsersState, {
    //Importing File
    [importRequest]: (state, action) => {
      state.loading = true;
      state.fetchErrorMessage = '';
    },
  
    [importSuccess]: (state, action) => {
      state.name = action.payload.name;
      state.action = action.payload.action;
      state.headers = action.payload.headers;
      state.loading = false;
    },
  
    [importFailure]: (state, action) => {
      state.loading = false;
      state.fetchErrorMessage = action.payload;
    },
    //-------------------------------------------------------------------
    // Uploading File
    //-------------------------------------------------------------------
    [uploadRequest]: (state, action) => {
      state.loading = true;
      state.postErrorMessage = '';
    },
    [uploadSuccess]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
      state.addUserModalVisibility = false;
    },
    [uploadFailure]: (state, action) => {
      state.loading = false;
      state.postErrorMessage = action.payload;
    },
    //Modal Switching
    [showAddUserModal]: (state, action) => {
      state.addUserModalVisibility = true;
      state.invalidAddUser = false;
    },
    [hideAddUserModal]: (state, action) => {
      state.addUserModalVisibility = false;
    },
    //-------------------------------------------------------------------
    // Existing User
    //-------------------------------------------------------------------
    [editUserRequest]: (state, action) => {
      state.loading = true;
      state.patchErrorMessage = '';
    },
    [editUserSuccess]: (state, action) => {
      state.loading = false;
      state.users = state.users.map(user =>
        user.id === action.payload.id ? Object.assign(action.payload) : user
      );
      state.editUserModalVisibility = false;
    },
    [editUserFailure]: (state, action) => {
      state.loading = false;
      state.patchErrorMessage = action.payload;
    },
    //Modal Switching
    [showEditUserModal]: (state, action) => {
      state.editUser = action.payload;
      state.editUserModalVisibility = true;
      state.invalidEditUser = false;
    },
    [hideEditUserModal]: (state, action) => {
      state.editUserModalVisibility = false;
    }
  });
  