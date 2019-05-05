import { projectsReducer } from './projects';
import * as actions from '../actions/projects';
import { getProjectsMock, addProjectMock, editProjectMock, deleteProjectMock } from '../actions/mocks/projectMocks'

describe('Projects Reducer', () => {

  it('should return the initial state', () => {
    expect(projectsReducer(undefined, {})).toEqual(
      {
        loadingProjects: false,
        loadingBranches: true,
        projects: [],
        branches: [],
        selectedProject: {},
        selectedBranch: {},
        showEditProjectModal: false,
        showAddProjectModal: false,
        showAddBranchProjectModal: false,
        loadingEdit: false,
        getErrorMessage: '',
        editError: '',
        addError: '',
        editBranchError: '',
        addBranchError: '',
        loadingAdd: false,
        loadingAddBranch: false,
      }
    )
  })

  it('should handle GET_PROJECTS_REQUEST', () => {
    const action = {
      type: actions.getProjectsRequest.toString()
    };

    expect(projectsReducer({}, action)).toEqual({
      loadingProjects: true,
      getErrorMessage: '',
    });
  });

  it('should handle GET_PROJECTS_SUCCESS', () => {
    const action = {
      type: actions.getProjectsSuccess.toString(),
      payload: getProjectsMock.projects,
    };

    expect(projectsReducer({}, action)).toEqual({
      loadingProjects: false,
      projects: getProjectsMock.projects,
    });
  })

  it('should handle GET_PROJECTS_FAILURE', () => {
    const action = {
      type: actions.getProjectsFailure.toString(),
      payload: 'error',
    };

    expect(projectsReducer({}, action)).toEqual({
      loadingProjects: false,
      getErrorMessage: action.payload,
    });
  })

  it('should handle ADD_PROJECTS_REQUEST', () => {
    const action = {
      type: actions.addProjectRequest.toString()
    };

    expect(projectsReducer({}, action)).toEqual({
      loadingAdd: true,
      addError: '',
    });
  });

  it('should handle ADD_PROJECTS_SUCCESS', () => {
    const action = {
      type: actions.addProjectSuccess.toString(),
      payload: addProjectMock,
    };
    expect(projectsReducer({ projects: [] }, action)).toEqual({
      loadingAdd: false,
      projects: [action.payload],
      showAddProjectModal: false,
    });
  })

  it('should handle ADD_PROJECTS_FAILURE', () => {
    const action = {
      type: actions.addProjectFailure.toString(),
      payload: 'error',
    };

    expect(projectsReducer({}, action)).toEqual({
      loadingAdd: false,
      addError: action.payload,
    });
  })

  it('should handle CLICK_ADD_PROJECT', () => {
    const action = {
      type: actions.clickAddProject.toString(),
    };

    expect(projectsReducer({}, action)).toEqual({
        showAddProjectModal: true
    });
  })

  it('should handle CLICK_CANCEL_ADD_PROJECT', () => {
    const action = {
      type: actions.clickCancelAddProject.toString(),
    };

    expect(projectsReducer({}, action)).toEqual({
        showAddProjectModal: false
    });
  })

  it('should handle EDIT_PROJECT_REQUEST', () => {
    const action = {
      type: actions.editProjectRequest.toString()
    };

    expect(projectsReducer({}, action)).toEqual({
      loadingEdit: true,
      editError: ''
    });
  });

  it('should handle EDIT_PROJECT_SUCCESS', () => {
    const action = {
      type: actions.editProjectSuccess.toString(),
      payload: editProjectMock,
    };

    expect(projectsReducer({ projects: [editProjectMock] }, action)).toEqual({
      loadingEdit: false,
      projects: [action.payload],
      showEditProjectModal: false,
    });
  })

  it('should handle EDIT_PROJECT_FAILURE', () => {
    const action = {
      type: actions.editProjectFailure.toString(),
      payload: 'error',
    };

    expect(projectsReducer({}, action)).toEqual({
      loadingEdit: false,
      editError: action.payload
    });
  })


  it('should handle CLICK_EDIT_PROJECT', () => {
    const action = {
      type: actions.clickEditProject.toString(),
      payload: editProjectMock,
    };

    expect(projectsReducer({}, action)).toEqual({
      selectedProject: action.payload,
      showEditProjectModal: true,
    });
  })

  it('should handle CLICK_CANCEL_EDIT_PROJECT', () => {
    const action = {
      type: actions.clickCancelEditProject.toString(),
    };

    expect(projectsReducer({}, action)).toEqual({
      selectedProject: {},
      showEditProjectModal: false
    });
  })

  it('should handle DELETE_PROJECT_REQUEST', () => {
    const action = {
      type: actions.deleteProjectRequest.toString(),
    };

    expect(projectsReducer({}, action)).toEqual({
    });
  })

  it('should handle DELETE_PROJECT_SUCCESS', () => {
    const action = {
      type: actions.deleteProjectSuccess.toString(),
      payload: deleteProjectMock,
    };

    expect(projectsReducer({projects: [deleteProjectMock]}, action)).toEqual({
      projects: []
    });
  })

  it('should handle DELETE_PROJECT_FAILURE', () => {
    const action = {
      type: actions.deleteProjectFailure.toString(),
      payload: 'error'
    };

    expect(projectsReducer({}, action)).toEqual({
    });
  })
  
})
// [deleteProjectRequest]: (state, action) => {
// },

// [deleteProjectSuccess]: (state, action) => {
//   const index = state.projects.findIndex(project => project.id === action.payload);
//   state.projects.splice(index, 1);
// },

// [deleteProjectFailure]: (state, action) => {
// },