import { userGroupsReducer } from './userGroups';
import * as actions from '../actions/userGroups';
import { getUserGroupsMock, editUserGroupsMock, addUserGroupsMock } from '../actions/mocks/userGroupMocks';

describe('UserGroups Reducer Test', () => {

    //-----------------------------------------------------------------
    // Testing initialization of userGroups state.
    //-----------------------------------------------------------------
    it('return initial state of userGroups', () => {
        expect(userGroupsReducer(undefined, {})).toEqual(
            {
                loadingUserGroups: true,
                userGroups: [],
                selectedUserGroup: {},
                loadingAdd: false,
                loadingEdit: false,
                showAddUserGroupModal: false,
                showEditUserGroupModal: false,
                addError: '',
                editError: '',
            }
        )
    })

    //-----------------------------------------------------------------
    // Testing the components of the method to request user groups from
    // Back end
    //-----------------------------------------------------------------
    it('Testing action GET_USER_GROUPS_REQUEST', () => {
        const action = {
            type: actions.getUserGroupsRequest.toString()
        };

        expect(userGroupsReducer({}, action)).toEqual({
            loadingUserGroups: true,
        });
    });

    it('Testing action GET_USER_GROUPS_SUCCESS', () => {
        const action = {
            type: actions.getUserGroupsSuccess.toString(),
            payload: getUserGroupsMock.groups
        };

        expect(userGroupsReducer({ userGroups: [] }, action)).toEqual({
            loadingUserGroups: false,
            userGroups: getUserGroupsMock.groups,
        });
    })

    it('Testing action GET_USER_GROUPS_FAILURE', () => {
        const action = {
            type: actions.getUserGroupsFailure.toString(),
        };

        expect(userGroupsReducer({}, action)).toEqual({
            loadingUserGroups: false,
        });
    })

    it('Testing action CLICK_ADD_USER_GROUP', () => {
        const action = {
            type: actions.clickAddUserGroup.toString()
        };

        expect(userGroupsReducer({}, action)).toEqual({
            showAddUserGroupModal: true,
        });
    });

    it('Testing action CLICK_CANCEL_ADD_USER_GROUP', () => {
        const action = {
            type: actions.clickCancelAddUserGroup.toString()
        };

        expect(userGroupsReducer({}, action)).toEqual({
            showAddUserGroupModal: false,
        });
    });

    it('Testing action ADD_USER_GROUP_REQUEST', () => {
        const action = {
            type: actions.addUserGroupRequest.toString()
        };

        expect(userGroupsReducer({}, action)).toEqual({
            loadingAdd: true,
        });
    });

    it('Testing action ADD_USER_GROUP_SUCCESS', () => {
        const action = {
            type: actions.addUserGroupSuccess.toString(),
            payload: addUserGroupsMock
        };

        expect(userGroupsReducer({ userGroups: [] }, action)).toEqual({
            loadingAdd: false,
            userGroups: [addUserGroupsMock],
            showAddUserGroupModal: false,
        });
    });

    it('Testing action ADD_USER_GROUP_FAILURE', () => {
        const action = {
            type: actions.addUserGroupFailure.toString(),
            payload: 'error',
        };

        expect(userGroupsReducer({}, action)).toEqual({
            loadingAdd: false,
            addError: action.payload,
        });
    });

    it('Testing action CLICK_EDIT_USER_GROUP', () => {
        const action = {
            type: actions.clickEditUserGroup.toString(),
            payload: {
                id: 0,
                projectId: 0,
                name: "Big Banana",
                description: "Banana Club"
            },
        };

        expect(userGroupsReducer({}, action)).toEqual({
            showEditUserGroupModal: true,
            selectedUserGroup: action.payload,
        });
    });

    it('Testing action CLICK_CANCEL_EDIT_USER_GROUP', () => {
        const action = {
            type: actions.clickCancelEditAddUserGroup.toString(),
        };

        expect(userGroupsReducer({}, action)).toEqual({
            selectedUserGroup: {},
            showEditUserGroupModal: false
        });
    });

    it('Testing action EDIT_USER_GROUP_REQUEST', () => {
        const action = {
            type: actions.editUserGroupRequest.toString(),
        };

        expect(userGroupsReducer({}, action)).toEqual({
            loadingEdit: false,
        });
    });

    it('Testing action EDIT_USER_GROUP_SUCCESS', () => {
        const action = {
            type: actions.editUserGroupSuccess.toString(),
            payload: editUserGroupsMock,
        };

        expect(userGroupsReducer({ userGroups: [editUserGroupsMock] }, action)).toEqual({
            loadingEdit: false,
            userGroups: [action.payload],
            showEditUserGroupModal: false,
            selectedUserGroup: {},
        });
    });

    it('Testing action EDIT_USER_GROUP_FAILURE', () => {
        const action = {
            type: actions.editUserGroupFailure.toString(),
            payload: 'error',
        };

        expect(userGroupsReducer({}, action)).toEqual({
            loadingEdit: false,
            editError: action.payload,
        });
    });
})
