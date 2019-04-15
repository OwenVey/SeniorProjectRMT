import * as actions from '../actions/projects';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { getProjectsMock, addProjectMock, editProjectMock, deleteProjectMock } from './mocks/projectMocks'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Project async actions', () => {
    beforeEach(function () {
        moxios.install();
      });
    
      afterEach(function () {
        moxios.uninstall();
      });

      it('creates GET_PROJECTS_SUCCESS after successfuly fetching projects', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: getProjectsMock,
          });
        });
    
        const expectedActions = [
          { type: actions.getProjectsRequest.toString(), payload: undefined },
          { type: actions.getProjectsSuccess.toString(), payload: getProjectsMock.projects },
        ];
    
        const projectsStore = mockStore({ projects: { projects: [] } })
    
        return projectsStore.dispatch(actions.getProjects('3r285qk7-9538-6533-7e96-u549021crn76')).then(() => {
          expect(projectsStore.getActions()).toEqual(expectedActions);
        });
      });

      it('creates ADD_PROJECT_SUCCESS after successfuly adding a project', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: addProjectMock,
          });
        });
    
        const expectedActions = [
          { type: actions.addProjectRequest.toString(), payload: undefined },
          { type: actions.addProjectSuccess.toString(), payload: addProjectMock },
        ];
    
        const projectStore = mockStore({ projects: { projects: [] } })
    
    
        const project = {
            "ownerId": 1,
            "globalId": "test",
            "name": "test",
            "description": "Test",
        }
    
        return projectStore.dispatch(actions.addProject('3r285qk7-9538-6533-7e96-u549021crn76',project)).then(() => {
          expect(projectStore.getActions()).toEqual(expectedActions);
        });
      });

      it('creates EDIT_PROJECT_SUCCESS after successfuly editing a project', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: editProjectMock,
          });
        });
    
        const expectedActions = [
          { type: actions.editProjectRequest.toString(), payload: undefined },
          { type: actions.editProjectSuccess.toString(), payload: editProjectMock },
        ];
    
        const projectStore = mockStore({ projects: { projects: [] } })
    
    
        const project = {
          name: "projectTest",
        }
    
        return projectStore.dispatch(actions.editProject('3r285qk7-9538-6533-7e96-u549021crn76', project )).then(() => {
          expect(projectStore.getActions()).toEqual(expectedActions);
        });
    });

    it('creates DELETE_PROJECT_SUCCESS after successfuly deleting a project', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: undefined,
          });
        });
    
        const expectedActions = [
          { type: actions.deleteProjectRequest.toString(), payload: undefined },
          { type: actions.deleteProjectSuccess.toString(), payload: deleteProjectMock.id },
        ];
    
        const projectStore = mockStore({ projects: { projects: [] } })
    
    
        const projectToDelete = {
            id: 5
        }
    
        return projectStore.dispatch(actions.deleteProject('3r285qk7-9538-6533-7e96-u549021crn76', projectToDelete.id )).then(() => {
          expect(projectStore.getActions()).toEqual(expectedActions);
        });
    });
});

describe('Project Failure async actions', () => {
    beforeEach(function () {
        moxios.install();
      });
    
      afterEach(function () {
        moxios.uninstall();
      });

      it('creates GET_PROJECTS_FAILURE after simulating get projects', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 400,
            response: 'Error',
          });
        });
    
        const expectedActions = [
          { type: actions.getProjectsRequest.toString(), payload: undefined },
          { type: actions.getProjectsSuccess.toString(), payload: 'Request failed with status code 400', type: "GET_PROJECTS_FAILURE" },
        ];
    
        const projectsStore = mockStore({ projects: { projects: [] } })
    
        return projectsStore.dispatch(actions.getProjects('3r285qk7-9538-6533-7e96-u549021crn76')).then(() => {
          expect(projectsStore.getActions()).toEqual(expectedActions);
        });
      });

      it('creates ADD_PROJECT_FAILURE after simulating adding a project', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 400,
            response: 'Error',
          });
        });
    
        const expectedActions = [
          { type: actions.addProjectRequest.toString(), payload: undefined },
          { type: actions.addProjectSuccess.toString(), payload: "Request failed with status code 400", type: "ADD_PROJECT_FAILURE" },
        ];
    
        const projectStore = mockStore({ projects: { projects: [] } })
    
    
        const project = {
            "ownerId": 1,
            "globalId": "test",
            "name": "test",
            "description": "Test",
        }
    
        return projectStore.dispatch(actions.addProject('3r285qk7-9538-6533-7e96-u549021crn76', project)).then(() => {
          expect(projectStore.getActions()).toEqual(expectedActions);
        });
      });

      it('creates EDIT_PROJECT_FAILURE after simulating editing a project', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 400,
            response: 'Error',
          });
        });
    
        const expectedActions = [
          { type: actions.editProjectRequest.toString(), payload: undefined },
          { type: actions.editProjectSuccess.toString(), payload: "Request failed with status code 400", type: "EDIT_PROJECT_FAILURE" },
        ];
    
        const projectStore = mockStore({ projects: { projects: [] } })
    
    
        const project = {
          name: "projectTest",
        }
    
        return projectStore.dispatch(actions.editProject('3r285qk7-9538-6533-7e96-u549021crn76', project )).then(() => {
          expect(projectStore.getActions()).toEqual(expectedActions);
        });
    });

    it('creates DELETE_PROJECT_FAILURE after simulating deleting a project', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 400,
            response: 'Error',
          });
        });
    
        const expectedActions = [
          { type: actions.deleteProjectRequest.toString(), payload: undefined },
          { type: actions.deleteProjectSuccess.toString(), payload: "Request failed with status code 400", type: "DELETE_PROJECT_FAILURE" },
        ];
    
        const projectStore = mockStore({ projects: { projects: [] } })
    
    
        const projectToDelete = {
            id: 5
        }
    
        return projectStore.dispatch(actions.deleteProject('3r285qk7-9538-6533-7e96-u549021crn76', projectToDelete.id )).then(() => {
          expect(projectStore.getActions()).toEqual(expectedActions);
        });
    });
});



describe('Project actions', () => {
    it('should create an action to show add project modal', () => {
  
      const expectedAction = {
        type: actions.clickAddProject.toString(),
        payload: undefined,
      }
      expect(actions.clickAddProject()).toEqual(expectedAction)
    });
  
    it('should create an action to hide add project modal', () => {
  
      const expectedAction = {
        type: actions.clickCancelAddProject.toString(),
        payload: undefined,
      }
      expect(actions.clickCancelAddProject()).toEqual(expectedAction)
    });
  
    it('should create an action to show edit project modal', () => {
  
      const expectedAction = {
        type: actions.clickEditProject.toString(),
        payload: undefined,
      }
      expect(actions.clickEditProject()).toEqual(expectedAction)
    });
  
    it('should create an action to hide edit project modal', () => {
  
      const expectedAction = {
        type: actions.clickCancelEditProject.toString(),
        payload: undefined,
      }
      expect(actions.clickCancelEditProject()).toEqual(expectedAction)
    });
  });

