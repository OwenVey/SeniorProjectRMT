import { permissionsReducer } from './permissions';
import * as actions from '../actions/permissions';
import { getProjectPermissionsMock, addUserProjectPermissionMock, editUserProjectPermissionMock, deletePermissionMock } from '../actions/mocks/permissionMocks'

describe('Permissions Reducer', () => {

    it('initial state run', () => {
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

    it('GET_PROJECT_PERMISSIONS_REQUEST test', () => {
        const getAct = {
            type: actions.getProjectPermissionsRequest.toString()
        };
        expect(permissionsReducer({}, getAct)).toequal({
            loadingPermissions : true,
            fetchErrorMessage: '',
        });
    });
    
    it('GET_PROJECT_PERMISSIONS_FAILURE test', () => {
        const getActf = {
          type: actions.getProjectPermissionsFailure.toString(),
          payload: 'error',
        };
    
        expect(permissionsReducer({}, getActf)).toEqual({
          loadingPermissions: false,
          fetchErrorMessage: getActf.payload,
        });
    });
    
    it('GET_PROJECT_PERMISSIONS_SUCCESS test', () => {
        const getActs = {
          type: actions.getProjectPermissionsSuccess.toString(),
          payload: {
            userProjectPermissions: getProjectPermissionsMock.userPermissions,
            groupProjectPermissions: getProjectPermissionsMock.groupPermissions,
          }
        };
    
        expect(permissionsReducer({}, getActs)).toEqual({
          loadingPermissions: false,
          userProjectPermissions: getProjectPermissionsMock.userPermissions,
          groupProjectPermissions: getProjectPermissionsMock.groupPermissions,
        });
    });

    it('ADD_USER_PROJECT_PERMISSION_REQUEST test', () => {
        const addAct = {
          type: actions.addUserProjectPermissionRequest.toString()
        };
    
        expect(permissionsReducer({}, addAct)).toEqual({
          loadingAdd: true,
          addError: '',
        });
    });
    
    it('ADD_USER_PROJECT_PERMISSION_FAILURE test', () => {
        const addActf = {
          type: actions.addUserProjectPermissionFailure.toString(),
          payload: 'error',
        };
    
        expect(permissionsReducer({}, addActf)).toEqual({
          loadingAdd: false,
          addError: addActf.payload,
        });
    });

    it('ADD_USER_PROJECT_PERMISSION_SUCCESS test', () => {
        const addActs = {
          type: actions.addUserProjectPermissionSuccess.toString(),
          payload: addUserProjectPermissionMock,
        };
    
        expect(permissionsReducer({ userProjectPermissions: [] }, addActs)).toEqual({
          loadingAdd: false,
          userProjectPermissions: [addActs.payload],
          addPermissionModalVisibility: false,
        });
    });
    
    it('SHOW_ADD_PERMISSION_MODAL test', () => {
        const addActs = {
          type: actions.showAddPermissionModal.toString(),
        };
    
        expect(permissionsReducer({}, addActs)).toEqual({
          addPermissionModalVisibility: true,
        });
    });
    
    it('CLICK_CANCEL_ADD_PERMISSION test', () => {
        const canAct = {
          type: actions.clickCancelAddPermission.toString(),
        };
    
        expect(permissionsReducer({}, canAct)).toEqual({
          addPermissionModalVisibility: false,
        });
    });
    
    it('EDIT_USER_PROJECT_PERMISSION_REQUEST test', () => {
        const editAct = {
          type: actions.editUserProjectPermissionRequest.toString()
        };
    
        expect(permissionsReducer({}, editAct)).toEqual({
          loadingEdit: true,
        });
    });
        
    it('EDIT_USER_PROJECT_PERMISSION_FAILURE test', () => {
        const editActf = {
          type: actions.editUserProjectPermissionFailure.toString(),
          payload: 'error',
        };
    
        expect(permissionsReducer({}, editActf)).toEqual({
          loadingEdit: false,
          editError: editActf.payload,
        });
    });
    
    it('EDIT_USER_PROJECT_PERMISSION_SUCCESS test', () => {
        const editActs = {
          type: actions.editUserProjectPermissionSuccess.toString(),
          payload: editUserProjectPermissionMock,
        };
    
        expect(permissionsReducer({ userProjectPermissions: [editUserProjectPermissionMock] }, editActs)).toEqual({
          loadingEdit: false,
          userProjectPermissions: [editActs.payload],
          editPermissionModalVisibility: false,
        });
    });

    it('SHOW_EDIT_PERMISSION_MODAL test', () => {
        const showAct = {
          type: actions.showEditPermissionModal.toString(),
          payload: editUserProjectPermissionMock,
        };
    
        expect(permissionsReducer({}, showAct)).toEqual({
          selectedPermission: showAct.payload,
          editPermissionModalVisibility: true,
        });
    });
    
    it('CLICK_CANCEL_EDIT_PERMISSION test', () => {
        const canAct = {
          type: actions.clickCancelEditPermission.toString(),
        };
    
        expect(permissionsReducer({}, canAct)).toEqual({
          editPermissionModalVisibility: false,
          selectedPermission: {}
        });
    });
    
    it('DELETE_PERMISSION_REQUEST test', () => {
        const delAct = {
          type: actions.deletePermissionRequest.toString()
        };
    
        expect(permissionsReducer({}, delAct)).toEqual({});
    });
    
    it('DELETE_PERMISSION_FAILURE test', () => {
        const delActf = {
          type: actions.deletePermissionFailure.toString(),
          payload: 'error',
        };
    
        expect(permissionsReducer({}, delActf)).toEqual({});
    });

    it('DELETE_PERMISSION_SUCCESS test', () => {
        const delActs = {
          type: actions.deletePermissionSuccess.toString(),
          payload: deletePermissionMock,
        };
    
        expect(permissionsReducer({
            userProjectPermissions: [deletePermissionMock] }, delActs)).toEqual({ userProjectPermissions: [] });
    });
})