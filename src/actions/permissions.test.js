import * as actions from '../actions/permissions';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { getProjectPermissionsMock, addUserProjectPermissionMock, editUserProjectPermissionMock, deletePermissionMock } from './mocks/permissionMocks'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Permission async actions', () => {

  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it('creates GET_PROJECT_PERMISSION_SUCCESS after successfuly fetching Project Permissions', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: getProjectPermissionsMock,
      });
    });

    const expectedActions = [
      { type: actions.getProjectPermissionsRequest.toString(), payload: undefined },
      {
        type: actions.getProjectPermissionsSuccess.toString(),
        payload: {
          groupProjectPermissions: getProjectPermissionsMock.groupPermissions,
          userProjectPermissions: getProjectPermissionsMock.userPermissions
        }
      },
    ];

    const store = mockStore({ permissions: { userProjectPermissions: [], groupProjectPermissions: [] } })

    return store.dispatch(actions.getProjectPermissions('2f5426d0-0912-4555-9b24-f637638aba70')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_PROJECT_PERMISSION_FAILURE after failing to fetch Project Permissions', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
      });
    });

    const expectedActions = [
      { type: actions.getProjectPermissionsRequest.toString(), payload: undefined },
      {
        type: actions.getProjectPermissionsFailure.toString(),
        payload: 'Request failed with status code 500'
      },
    ];

    const store = mockStore({ permissions: { userProjectPermissions: [], groupProjectPermissions: [] } })

    return store.dispatch(actions.getProjectPermissions('2f5426d0-0912-4555-9b24-f637638aba70')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ADD_USER_PROJECT_PERMISSION_SUCCESS after successfuly adding a user project permission', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: addUserProjectPermissionMock,
      });
    });

    const expectedActions = [
      { type: actions.addUserProjectPermissionRequest.toString(), payload: undefined },
      { type: actions.addUserProjectPermissionSuccess.toString(), payload: addUserProjectPermissionMock },
    ];

    const store = mockStore({ permissions: { userProjectPermissions: [] } })

    const userProjectPermission = {
      "userId": 7,
      "projectId": 2,
      "permission": "CRM",
      "endDate": "2020-04-17T16:41:24"
    }

    return store.dispatch(actions.addUserProjectPermission('2f5426d0-0912-4555-9b24-f637638aba70', userProjectPermission)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ADD_USER_PROJECT_PERMISSION_FAILURE after failing to add a User Project Permissions', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
      });
    });

    const expectedActions = [
      { type: actions.addUserProjectPermissionRequest.toString(), payload: undefined },
      {
        type: actions.addUserProjectPermissionFailure.toString(),
        payload: 'Request failed with status code 500'
      },
    ];

    const store = mockStore({ permissions: { userProjectPermissions: [], groupProjectPermissions: [] } })

    return store.dispatch(actions.addUserProjectPermission('2f5426d0-0912-4555-9b24-f637638aba70', addUserProjectPermissionMock)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates EDIT_USER_PROJECT_PERMISSION_SUCCESS after successfuly editing a user project permission', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: editUserProjectPermissionMock,
      });
    });

    const expectedActions = [
      { type: actions.editUserProjectPermissionRequest.toString(), payload: undefined },
      { type: actions.editUserProjectPermissionSuccess.toString(), payload: editUserProjectPermissionMock },
    ];

    const store = mockStore({ permissions: { userProjectPermsissions: [] } })

    const userProjectPermission = {
      "permission": "CRMD",
    }

    const oldPermission = {
      userId: 3,
      projectId: 2,
      permission: "CRD",
      endDate: "2019-04-12T16:41:24"
    }

    return store.dispatch(actions.editUserProjectPermission('2f5426d0-0912-4555-9b24-f637638aba70', oldPermission, userProjectPermission)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates EDIT_USER_PROJECT_PERMISSION_FAILURE after failing to edit a User Project Permissions', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
      });
    });

    const expectedActions = [
      { type: actions.editUserProjectPermissionRequest.toString(), payload: undefined },
      {
        type: actions.editUserProjectPermissionFailure.toString(),
        payload: 'Request failed with status code 500'
      },
    ];

    const store = mockStore({ permissions: { userProjectPermissions: [], groupProjectPermissions: [] } })

    const oldPermission = {
      userId: 3,
      projectId: 2,
      permission: "CRD",
      endDate: "2019-04-12T16:41:24"
    }

    return store.dispatch(actions.editUserProjectPermission('2f5426d0-0912-4555-9b24-f637638aba70', oldPermission, { permission: 'RMCDA' })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates DELETE_PERMISSION_SUCCESS after successfuly deleting a user project permission', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: undefined,
      });
    });

    const expectedActions = [
      { type: actions.deletePermissionRequest.toString(), payload: undefined },
      { type: actions.deletePermissionSuccess.toString(), payload: deletePermissionMock },
    ];

    const store = mockStore({ permissions: { userProjectPermsissions: [] } })

    const permissionToDelete = {
      userId: 3,
      projectId: 2,
      permission: "CRD",
      endDate: "2019-04-12T16:41:24"
    }

    return store.dispatch(actions.deletePermission('2f5426d0-0912-4555-9b24-f637638aba70', permissionToDelete)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates DELETE_PERMISSION_FAILURE after failing to delete a Permission', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
      });
    });

    const expectedActions = [
      { type: actions.deletePermissionRequest.toString(), payload: undefined },
      {
        type: actions.deletePermissionFailure.toString(),
        payload: 'Request failed with status code 500'
      },
    ];

    const store = mockStore({ permissions: { userProjectPermissions: [], groupProjectPermissions: [] } })

    const permissionToDelete = {
      userId: 3,
      projectId: 2,
      permission: "CRD",
      endDate: "2019-04-12T16:41:24"
    }

    return store.dispatch(actions.deletePermission('2f5426d0-0912-4555-9b24-f637638aba70', permissionToDelete)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('User actions', () => {
  it('should create an action to show add user project permission modal', () => {

    const expectedAction = {
      type: actions.showAddPermissionModal.toString(),
      payload: undefined,
    }
    expect(actions.showAddPermissionModal()).toEqual(expectedAction)
  });

  it('should create an action to hide add user project permission modal', () => {

    const expectedAction = {
      type: actions.clickCancelAddPermission.toString(),
      payload: undefined,
    }
    expect(actions.clickCancelAddPermission()).toEqual(expectedAction)
  });

  it('should create an action to show edit user project permission modal', () => {

    const expectedAction = {
      type: actions.showEditPermissionModal.toString(),
      payload: undefined,
    }
    expect(actions.showEditPermissionModal()).toEqual(expectedAction)
  });

  it('should create an action to hide edit user project permission modal', () => {

    const expectedAction = {
      type: actions.clickCancelEditPermission.toString(),
      payload: undefined,
    }
    expect(actions.clickCancelEditPermission()).toEqual(expectedAction)
  });
});