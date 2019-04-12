import * as actions from '../actions/users';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { getUsersMock, addUserMock, editUserMock } from './mocks/userMocks'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('User async actions', () => {

  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it('creates GET_USERS_SUCCESS after successfuly fetching users', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: getUsersMock,
      });
    });

    const expectedActions = [
      { type: actions.fetchUsersRequest.toString(), payload: undefined },
      { type: actions.fetchUsersSuccess.toString(), payload: getUsersMock.users },
    ];

    const store = mockStore({ users: { users: [] } })

    return store.dispatch(actions.getUsers('2f5426d0-0912-4555-9b24-f637638aba70')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_USERS_FAILURE after failing to fetching users', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: getUsersMock,
      });
    });

    const expectedActions = [
      { type: actions.fetchUsersRequest.toString(), payload: undefined },
      { type: actions.fetchUsersFailure.toString(), payload: 'Request failed with status code 400' },
    ];

    const store = mockStore({ users: { users: [] } })

    return store.dispatch(actions.getUsers('2f5426d0-0912-4555-9b24-f637638aba70')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ADD_USER_SUCCESS after successfuly adding a user', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: addUserMock,
      });
    });

    const expectedActions = [
      { type: actions.addUserRequest.toString(), payload: undefined },
      { type: actions.addUserSuccess.toString(), payload: addUserMock },
    ];

    const store = mockStore({ users: { users: [] } })


    const user = {
      firstName: 'test',
      lastName: 'test',
      email: 'test5@test.com',
      password: 'test',
      isActive: 'Active'
    }

    return store.dispatch(actions.addUser(user)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ADD_USER_FAILURE after failing to add a user', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: addUserMock,
      });
    });

    const expectedActions = [
      { type: actions.addUserRequest.toString(), payload: undefined },
      { type: actions.addUserFailure.toString(), payload: 'Request failed with status code 400' },
    ];

    const store = mockStore({ users: { users: [] } })


    const user = {
      'firstName': 'test',
      'lastName': 'test',
      'email': 'test5@test.com',
      'password': 'test',
      'isActive': true
    }

    return store.dispatch(actions.addUser(user)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates EDIT_USER_SUCCESS after successfuly editing a user', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: editUserMock,
      });
    });

    const expectedActions = [
      { type: actions.editUserRequest.toString(), payload: undefined },
      { type: actions.editUserSuccess.toString(), payload: editUserMock },
    ];

    const store = mockStore({ users: { users: [] } })


    const user = {
      firstName: 'testttt',
      isActive: 'Active',
    }

    return store.dispatch(actions.editUser(5, user, '2f5426d0-0912-4555-9b24-f637638aba70')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  it('creates EDIT_USER_FAILURE after failing to edit a user', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: editUserMock,
      });
    });

    const expectedActions = [
      { type: actions.editUserRequest.toString(), payload: undefined },
      { type: actions.editUserFailure.toString(), payload: 'Request failed with status code 400' },
    ];

    const store = mockStore({ users: { users: [] } })


    const user = {
      firstName: 'testttt',
    }

    return store.dispatch(actions.editUser(5, user, '2f5426d0-0912-4555-9b24-f637638aba70')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});

describe('User actions', () => {
  it('should create an action to show add user modal', () => {

    const expectedAction = {
      type: actions.showAddUserModal.toString(),
      payload: undefined,
    }
    expect(actions.showAddUserModal()).toEqual(expectedAction)
  });

  it('should create an action to hide add user modal', () => {

    const expectedAction = {
      type: actions.hideAddUserModal.toString(),
      payload: undefined,
    }
    expect(actions.hideAddUserModal()).toEqual(expectedAction)
  });

  it('should create an action to show edit user modal', () => {

    const expectedAction = {
      type: actions.showEditUserModal.toString(),
      payload: undefined,
    }
    expect(actions.showEditUserModal()).toEqual(expectedAction)
  });

  it('should create an action to hide edit user modal', () => {

    const expectedAction = {
      type: actions.hideEditUserModal.toString(),
      payload: undefined,
    }
    expect(actions.hideEditUserModal()).toEqual(expectedAction)
  });
});