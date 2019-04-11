import { usersReducer } from './users';
import * as actions from '../actions/users';
import { getUsersMock, addUserMock, editUserMock } from '../actions/mocks/userMocks';

describe('Users Reducer', () => {

  it('should return the initial state', () => {
    expect(usersReducer(undefined, {})).toEqual(
      {
        loadingUsers: true,
        users: [],
        loading: false,
        fetchErrorMessage: '',
        postErrorMessage: '',
        patchErrorMessage: '',
        addUserModalVisibility: false,
        editUserModalVisibility: false,
        editUser: '',
      }
    )
  })

  it('should handle FETCH_USERS_REQUEST', () => {
    const action = {
      type: actions.fetchUsersRequest.toString()
    };

    expect(usersReducer({}, action)).toEqual({
      loading: true,
      fetchErrorMessage: '',
    });
  });

  it('should handle FETCH_USERS_SUCCESS', () => {
    const action = {
      type: actions.fetchUsersSuccess.toString(),
      payload: getUsersMock.users,
    };

    expect(usersReducer({}, action)).toEqual({
      loadingUsers: false,
      loading: false,
      users: getUsersMock.users,
    });
  })

  it('should handle FETCH_USERS_FAILURE', () => {
    const action = {
      type: actions.fetchUsersFailure.toString(),
      payload: 'error',
    };

    expect(usersReducer({}, action)).toEqual({
      loadingUsers: false,
      loading: false,
      fetchErrorMessage: action.payload,
    });
  })

  it('should handle ADD_USER_REQUEST', () => {
    const action = {
      type: actions.addUserRequest.toString()
    };

    expect(usersReducer({}, action)).toEqual({
      loading: true,
      postErrorMessage: '',
    });
  });

  it('should handle ADD_USER_SUCCESS', () => {
    const action = {
      type: actions.addUserSuccess.toString(),
      payload: addUserMock,
    };

    expect(usersReducer({ users: [] }, action)).toEqual({
      loading: false,
      users: [action.payload],
      addUserModalVisibility: false,
    });
  })

  it('should handle ADD_USER_FAILURE', () => {
    const action = {
      type: actions.addUserFailure.toString(),
      payload: 'error',
    };

    expect(usersReducer({}, action)).toEqual({
      loading: false,
      postErrorMessage: action.payload,
    });
  })

  it('should handle SHOW_ADD_USER_MODAL', () => {
    const action = {
      type: actions.showAddUserModal.toString(),
    };

    expect(usersReducer({}, action)).toEqual({
      addUserModalVisibility: true,
      invalidAddUser: false,
    });
  })

  it('should handle HIDE_ADD_USER_MODAL', () => {
    const action = {
      type: actions.hideAddUserModal.toString(),
    };

    expect(usersReducer({}, action)).toEqual({
      addUserModalVisibility: false,
    });
  })

  it('should handle EDIT_USER_REQUEST', () => {
    const action = {
      type: actions.editUserRequest.toString()
    };

    expect(usersReducer({}, action)).toEqual({
      loading: true,
      patchErrorMessage: '',
    });
  });

  it('should handle EDIT_USER_SUCCESS', () => {
    const action = {
      type: actions.editUserSuccess.toString(),
      payload: editUserMock,
    };

    expect(usersReducer({ users: [editUserMock] }, action)).toEqual({
      loading: false,
      users: [action.payload],
      editUserModalVisibility: false,
    });
  })

  it('should handle EDIT_USER_FAILURE', () => {
    const action = {
      type: actions.editUserFailure.toString(),
      payload: 'error',
    };

    expect(usersReducer({}, action)).toEqual({
      loading: false,
      patchErrorMessage: action.payload,
    });
  })

  it('should handle SHOW_EDIT_USER_MODAL', () => {
    const action = {
      type: actions.showEditUserModal.toString(),
      payload: editUserMock,
    };

    expect(usersReducer({}, action)).toEqual({
      editUser: action.payload,
      editUserModalVisibility: true,
      invalidEditUser: false,
    });
  })

  it('should handle HIDE_EDIT_USER_MODAL', () => {
    const action = {
      type: actions.hideEditUserModal.toString(),
    };

    expect(usersReducer({}, action)).toEqual({
      editUserModalVisibility: false,
    });
  })

})