import { permissionsReducer } from './permissions';
import * as actions from '../actions/permissions';
import { getProjectPermissionsMock, addUserProjectPermissionMock, editUserProjectPermissionMock, deletePermissionMock } from '../actions/mocks/permissionMocks'

describe('Permissions Reducer', () => {

  it('should return the initial state', () => {
    expect(permissionsReducer(undefined, {})).toEqual(
      {
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
      }
    )
  })

  it('should handle GET_PROJECT_PERMISSIONS_REQUEST', () => {
    const action = {
      type: actions.getProjectPermissionsRequest.toString()
    };

    expect(permissionsReducer({}, action)).toEqual({
      loadingPermissions: true,
      fetchErrorMessage: '',
    });
  });

  it('should handle GET_PROJECT_PERMISSIONS_SUCCESS', () => {
    const action = {
      type: actions.getProjectPermissionsSuccess.toString(),
      payload: {
        userProjectPermissions: getProjectPermissionsMock.userPermissions,
        groupProjectPermissions: getProjectPermissionsMock.groupPermissions,
      }
    };

    expect(permissionsReducer({}, action)).toEqual({
      loadingPermissions: false,
      userProjectPermissions: getProjectPermissionsMock.userPermissions,
      groupProjectPermissions: getProjectPermissionsMock.groupPermissions,
    });
  })

  it('should handle GET_PROJECT_PERMISSIONS_FAILURE', () => {
    const action = {
      type: actions.getProjectPermissionsFailure.toString(),
      payload: 'error',
    };

    expect(permissionsReducer({}, action)).toEqual({
      loadingPermissions: false,
      fetchErrorMessage: action.payload,
    });
  })

  it('should handle ADD_USER_PROJECT_PERMISSION_REQUEST', () => {
    const action = {
      type: actions.addUserProjectPermissionRequest.toString()
    };

    expect(permissionsReducer({}, action)).toEqual({
      loadingAdd: true,
      addError: '',
    });
  });

  it('should handle ADD_USER_PROJECT_PERMISSION_SUCCESS', () => {
    const action = {
      type: actions.addUserProjectPermissionSuccess.toString(),
      payload: addUserProjectPermissionMock,
    };

    expect(permissionsReducer({ userProjectPermissions: [] }, action)).toEqual({
      loadingAdd: false,
      userProjectPermissions: [action.payload],
      addPermissionModalVisibility: false,
    });
  })

  it('should handle ADD_USER_PROJECT_PERMISSION_FAILURE', () => {
    const action = {
      type: actions.addUserProjectPermissionFailure.toString(),
      payload: 'error',
    };

    expect(permissionsReducer({}, action)).toEqual({
      loadingAdd: false,
      addError: action.payload,
    });
  })

  it('should handle SHOW_ADD_PERMISSION_MODAL', () => {
    const action = {
      type: actions.showAddPermissionModal.toString(),
    };

    expect(permissionsReducer({}, action)).toEqual({
      addPermissionModalVisibility: true,
    });
  })

  it('should handle CLICK_CANCEL_ADD_PERMISSION', () => {
    const action = {
      type: actions.clickCancelAddPermission.toString(),
    };

    expect(permissionsReducer({}, action)).toEqual({
      addPermissionModalVisibility: false,
    });
  })

  it('should handle EDIT_USER_PROJECT_PERMISSION_REQUEST', () => {
    const action = {
      type: actions.editUserProjectPermissionRequest.toString()
    };

    expect(permissionsReducer({}, action)).toEqual({
      loadingEdit: true,
    });
  });

  it('should handle EDIT_USER_PROJECT_PERMISSION_SUCCESS', () => {
    const action = {
      type: actions.editUserProjectPermissionSuccess.toString(),
      payload: editUserProjectPermissionMock,
    };

    expect(permissionsReducer({ userProjectPermissions: [editUserProjectPermissionMock] }, action)).toEqual({
      loadingEdit: false,
      userProjectPermissions: [action.payload],
      editPermissionModalVisibility: false,
    });
  })

  it('should handle EDIT_USER_PROJECT_PERMISSION_FAILURE', () => {
    const action = {
      type: actions.editUserProjectPermissionFailure.toString(),
      payload: 'error',
    };

    expect(permissionsReducer({}, action)).toEqual({
      loadingEdit: false,
      editError: action.payload,
    });
  })

  it('should handle SHOW_EDIT_PERMISSION_MODAL', () => {
    const action = {
      type: actions.showEditPermissionModal.toString(),
      payload: editUserProjectPermissionMock,
    };

    expect(permissionsReducer({}, action)).toEqual({
      selectedPermission: action.payload,
      editPermissionModalVisibility: true,
    });
  })

  it('should handle CLICK_CANCEL_EDIT_PERMISSION', () => {
    const action = {
      type: actions.clickCancelEditPermission.toString(),
    };

    expect(permissionsReducer({}, action)).toEqual({
      editPermissionModalVisibility: false,
      selectedPermission: {}
    });
  })

  it('should handle DELETE_PERMISSION_REQUEST', () => {
    const action = {
      type: actions.deletePermissionRequest.toString()
    };

    expect(permissionsReducer({}, action)).toEqual({});
  });

  it('should handle DELETE_PERMISSION_SUCCESS', () => {
    const action = {
      type: actions.deletePermissionSuccess.toString(),
      payload: deletePermissionMock,
    };

    expect(permissionsReducer({ userProjectPermissions: [deletePermissionMock] }, action)).toEqual({ userProjectPermissions: [] });
  })

  it('should handle DELETE_PERMISSION_FAILURE', () => {
    const action = {
      type: actions.deletePermissionFailure.toString(),
      payload: 'error',
    };

    expect(permissionsReducer({}, action)).toEqual({});
  })
})