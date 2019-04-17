import * as actions from '../actions/permissions';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { getProjectPermissionsMock, addUserProjectPermissionMock, editUserProjectPermissionMock, deletePermissionMock } from './mocks/permissionMocks'

const testStore = configureStore([thunk])

describe('Permission async actions', () => {

  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it('tests GET_PROJECT_PERMISSION_SUCCESS after a successful get request', () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: getProjectPermissionsMock,
      });
    });

    const expAct = [
      { type: actions.getProjectPermissionsRequest.toString(), payload: undefined },
      {
        type: actions.getProjectPermissionsSuccess.toString(),
        payload: {
          groupProjectPermissions: getProjectPermissionsMock.groupPermissions,
          userProjectPermissions: getProjectPermissionsMock.userPermissions
        }
      },
    ];

    const tStore = testStore({ permissions: { userProjectPermissions: [], groupProjectPermissions: [] } })

    return tStore.dispatch(actions.getProjectPermissions('2f5426d0-0912-4555-9b24-f637638aba70')).then(() => {
      expect(tStore.getActions()).toEqual(expAct);
    });
  });

  it('tests GET_PROJECT_PERMISSION_FAILURE after a failed get req', () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 500,
      });
    });

    const expAct = [
      { type: actions.getProjectPermissionsRequest.toString(), payload: undefined },
      {
        type: actions.getProjectPermissionsFailure.toString(),
        payload: 'Request failed with status code 500'
      },
    ];

    const tStore = testStore({ permissions: { userProjectPermissions: [], groupProjectPermissions: [] } })

    return tStore.dispatch(actions.getProjectPermissions('2f5426d0-0912-4555-9b24-f637638aba70')).then(() => {
      expect(tStore.getActions()).toEqual(expAct);
    });
  });

  it('tests ADD_USER_PROJECT_PERMISSION_FAILURE after a failed add', () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 500,
      });
    });

    const expAct = [
      { type: actions.addUserProjectPermissionRequest.toString(), payload: undefined },
      {
        type: actions.addUserProjectPermissionFailure.toString(),
        payload: 'Request failed with status code 500'
      },
    ];

    const tStore = testStore({ permissions: { userProjectPermissions: [], groupProjectPermissions: [] } })

    const userProjectPermission = {
      "userId": 1,
      "projectId": 1,
      "permission": "",
    }

    return tStore.dispatch(actions.addUserProjectPermission('2f5426d0-0912-4555-9b24-f637638aba70', userProjectPermission)).then(() => {
      expect(tStore.getActions()).toEqual(expAct);
    });
  });

  it('tests ADD_USER_PROJECT_PERMISSION_SUCCESS after a successful add', () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: addUserProjectPermissionMock,
      });
    });

    const expAct = [
      { type: actions.addUserProjectPermissionRequest.toString(), payload: undefined },
      { type: actions.addUserProjectPermissionSuccess.toString(), payload: addUserProjectPermissionMock },
    ];

    const tStore = testStore({ permissions: { userProjectPermissions: [] } })

    const userProjectPermission = {
      "userId": 2,
      "projectId": 2,
      "permission": "CR",
      "endDate": "2020-04-17T16:41:24"
    }

    return tStore.dispatch(actions.addUserProjectPermission('2f5426d0-0912-4555-9b24-f637638aba70', userProjectPermission)).then(() => {
      expect(tStore.getActions()).toEqual(expAct);
    });
  });

  it('tests EDIT_USER_PROJECT_PERMISSION_SUCCESS after a successful edit', () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: editUserProjectPermissionMock,
      });
    });

    const expAct = [
      { type: actions.editUserProjectPermissionRequest.toString(), payload: undefined },
      { type: actions.editUserProjectPermissionSuccess.toString(), payload: editUserProjectPermissionMock },
    ];

    const tStore = testStore({ permissions: { userProjectPermsissions: [] } })

    const userProjectPermission = {
      "permission": "CRMDA",
      "endDate": "2019-05-09T12:30:00"
    }

    const oldPermission = {
      "userId": 1,
      "projectId": 1,
      "permission": "CR",
      "endDate": "2019-05-09T12:30:00"
    }

    return tStore.dispatch(actions.editUserProjectPermission('2f5426d0-0912-4555-9b24-f637638aba70', oldPermission, userProjectPermission)).then(() => {
      expect(tStore.getActions()).toEqual(expAct);
    });
  });

  it('tests EDIT_USER_PROJECT_PERMISSION_FAILURE after a failed edit', () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 500,
      });
    });

    const expAct = [
      { type: actions.editUserProjectPermissionRequest.toString(), payload: undefined },
      {
        type: actions.editUserProjectPermissionFailure.toString(),
        payload: 'Request failed with status code 500'
      },
    ];

    const tStore = testStore({ permissions: { userProjectPermissions: [], groupProjectPermissions: [] } })

    const userProjectPermission = {
      "permission": "",
    }

    const oldPermission = {
      "userId": 1,
      "projectId": 1,
      "permission": "CR",
      "endDate": "2019-04-10T16:00:00"
    }

    return tStore.dispatch(actions.editUserProjectPermission('2f5426d0-0912-4555-9b24-f637638aba70', oldPermission, userProjectPermission)).then(() => {
      expect(tStore.getActions()).toEqual(expAct);
    });
  });

  it('tests DELETE_PERMISSION_SUCCESS after a successful delete', () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: undefined,
      });
    });

    const expAct = [
      { type: actions.deletePermissionRequest.toString(), payload: undefined },
      { type: actions.deletePermissionSuccess.toString(), payload: deletePermissionMock },
    ];

    const tStore = testStore({ permissions: { userProjectPermsissions: [] } })

    const permissionToDelete = {
      userId: 1,
      projectId: 1,
      permission: "CR",
      endDate: "2019-04-10T16:00:00"
    }

    return tStore.dispatch(actions.deletePermission('2f5426d0-0912-4555-9b24-f637638aba70', permissionToDelete)).then(() => {
      expect(tStore.getActions()).toEqual(expAct);
    });
  });

  it('tests DELETE_PERMISSION_FAILURE after a failed delete', () => {
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 500,
      });
    });

    const expAct = [
      { type: actions.deletePermissionRequest.toString(), payload: undefined },
      {
        type: actions.deletePermissionFailure.toString(),
        payload: 'Request failed with status code 500'
      },
    ];

    const tStore = testStore({ permissions: { userProjectPermissions: [], groupProjectPermissions: [] } })

    const permissionToDelete = {
      userId: 1,
      projectId: 1,
      permission: "CR",
      endDate: "2019-04-10T16:00:00"
    }

    return tStore.dispatch(actions.deletePermission('2f5426d0-0912-4555-9b24-f637638aba70', permissionToDelete)).then(() => {
      expect(tStore.getActions()).toEqual(expAct);
    });
  });
});

describe('User actions', () => {
  it('create action to show add project permission modal', () => {

    const expectedAction = {
      type: actions.showAddPermissionModal.toString(),
      payload: undefined,
    }
    expect(actions.showAddPermissionModal()).toEqual(expectedAction)
  });

  it('create action to hide add project permission modal', () => {

    const expectedAction = {
      type: actions.clickCancelAddPermission.toString(),
      payload: undefined,
    }
    expect(actions.clickCancelAddPermission()).toEqual(expectedAction)
  });

  it('create action to show edit project permission modal', () => {

    const expectedAction = {
      type: actions.showEditPermissionModal.toString(),
      payload: undefined,
    }
    expect(actions.showEditPermissionModal()).toEqual(expectedAction)
  });

  it('create action to hide edit project permission modal', () => {

    const expectedAction = {
      type: actions.clickCancelEditPermission.toString(),
      payload: undefined,
    }
    expect(actions.clickCancelEditPermission()).toEqual(expectedAction)
  });
});