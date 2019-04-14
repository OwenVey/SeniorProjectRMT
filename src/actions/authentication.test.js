import * as actions from '../actions/authentication';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { loginRequestMock, editFirstLastMock } from './mocks/authenticationMocks'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('User async actions', () => {

    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });

    // it('creates LOGIN_SUCCESS after successfully logging in', () => {
    //     moxios.wait(() => {
    //         const request = moxios.requests.mostRecent();
    //         request.respondWith({
    //             status: 200,
    //             response: loginRequestMock,
    //         });
    //     })

    //     const expectedActions = [
    //         { type: actions.loginRequest.toString(), payload: undefined },
    //         { type: actions.loginSuccess.toString(), payload: loginRequestMock },
    //     ]
    // });

    it('creates EDIT_PROFILE_SUCCESS after successfuly editing profile (first name and last name)', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: editFirstLastMock,
            });
        });

        const expectedActions = [
            { type: actions.editProfileRequest.toString(), payload: undefined },
            { type: actions.editProfileSuccess.toString(), payload: editFirstLastMock },
        ];

        const profileStore = mockStore({ users: { loginUser: {} } })

        const edits = {
            firstName: 'default',
            lastName: "a"
        }

        const currentUser = {
            "id": 1
        }

        return profileStore.dispatch(actions.editProfile('3r285qk7-9538-6533-7e96-u549021crn76', currentUser.id, edits)).then(() => {
            expect(profileStore.getActions()).toEqual(expectedActions);
        });


    });
});

describe('Edit Profile actions', () => {
    it('should create an action to show edit profile modal', () => {

        const expectedAction = {
            type: actions.showEditProfileModal.toString(),
            payload: undefined,
        }
        expect(actions.showEditProfileModal()).toEqual(expectedAction)
    });

    it('should create an action to hide edit profile modal', () => {

        const expectedAction = {
            type: actions.clickCancelEditProfile.toString(),
            payload: undefined,
        }
        expect(actions.clickCancelEditProfile()).toEqual(expectedAction)
    });

    //NOT YET IMPLEMENTED
    /*it('should create an action to show edit password modal', () => {

        const expectedAction = {
            type: actions.showEditUserModal.toString(),
            payload: undefined,
        }
        expect(actions.showEditUserModal()).toEqual(expectedAction)
    });

    it('should create an action to hide edit password modal', () => {

        const expectedAction = {
            type: actions.hideEditUserModal.toString(),
            payload: undefined,
        }
        expect(actions.hideEditUserModal()).toEqual(expectedAction)
    });*/
});