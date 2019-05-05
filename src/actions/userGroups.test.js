import * as actions from '../actions/userGroups';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { getUserGroupsMock, addUserGroupsMock, editUserGroupsMock } from './mocks/userGroupMocks'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('User Group Success async actions', () => {

  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it('creates GET_USER_GROUPS_SUCCESS after simulated group fetch', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: getUserGroupsMock,
      });
    });

    const expectedActions = [
      { type: actions.getUserGroupsRequest.toString(), payload: undefined },
      { type: actions.getUserGroupsSuccess.toString(), payload: getUserGroupsMock.groups },
    ];

    const store = mockStore({ userGroups: { userGroups: [] } })

    return store.dispatch(actions.getUserGroups('93979b0e-515c-4fd3-a741-9196fadc3740')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ADD_USER_GROUP_SUCCESS after simulated group fetch', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: addUserGroupsMock,
      });
    });

    const expectedActions = [
      { type: actions.addUserGroupRequest.toString(), payload: undefined },
      { type: actions.addUserGroupSuccess.toString(), payload: addUserGroupsMock },
    ];

    const store = mockStore({ userGroups: { userGroups: [] } })


    const userGroup = {
      "id": 1,
      "projectId": 2,
      "name": "Test",
      "description": "Testing the Build"
    }

    return store.dispatch(actions.addUserGroup('93979b0e-515c-4fd3-a741-9196fadc3740', userGroup)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  it('creates EDIT_USER_GROUP_SUCCESS after simulated group fetch', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: editUserGroupsMock,
      });
    });

    const expectedActions = [
      { type: actions.editUserGroupRequest.toString(), payload: undefined },
      { type: actions.editUserGroupSuccess.toString(), payload: editUserGroupsMock },
    ];

    const store = mockStore({ userGroups: { userGroups: [] } })


    const testGroup = {
      projectId: 0,
      name: 'Test1',
      description: 'testing this applicaiton',
    }

    return store.dispatch(actions.editUserGroup('93979b0e-515c-4fd3-a741-9196fadc3740', 0, testGroup)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('User Group Failure async actions', () => {

  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it('creates GET_USER_GROUPS_FAILURE after simulated group fetch', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'Error',
      });
    });

    const expectedActions = [
      { type: actions.getUserGroupsRequest.toString(), payload: undefined },
      { type: actions.getUserGroupsFailure.toString(), payload: "Request failed with status code 400", type: "GET_USER_GROUPS_FAILURE" },
    ];

    const store = mockStore({ userGroups: { userGroups: [] } })

    return store.dispatch(actions.getUserGroups('93979b0e-515c-4fd3-a741-9196fadc3740')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ADD_USER_GROUP_FAILURE after simulated group fetch', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'Error',
      });
    });

    const expectedActions = [
      { type: actions.addUserGroupRequest.toString(), payload: undefined },
      { type: actions.addUserGroupFailure.toString(), payload: "Request failed with status code 400", type: "ADD_USER_GROUP_FAILURE" },
    ];

    const store = mockStore({ userGroups: { userGroups: [] } })


    const userGroup = {
      "id": 1,
      "projectId": 2,
      "name": "Test",
      "description": "Testing the Build"
    }

    return store.dispatch(actions.addUserGroup('93979b0e-515c-4fd3-a741-9196fadc3740', userGroup)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  it('creates EDIT_USER_GROUP_FAILURE after simulated group fetch', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'Error',
      });
    });

    const expectedActions = [
      { type: actions.editUserGroupRequest.toString(), payload: undefined },
      { type: actions.editUserGroupFailure.toString(), payload: "Request failed with status code 400", type: "EDIT_USER_GROUP_FAILURE" },
    ];

    const store = mockStore({ userGroups: { userGroups: [] } })


    const testGroup = {
      projectId: 0,
      name: 'Test1',
      description: 'testing this applicaiton',
    }

    return store.dispatch(actions.editUserGroup('93979b0e-515c-4fd3-a741-9196fadc3740', 0, testGroup)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});