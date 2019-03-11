import { createReducer } from 'redux-starter-kit'
import {
  getProjectsRequest,
  getProjectsSuccess,
  getProjectsFailure,
  clickEditProject,
  clickCancelEditProject,
  editProjectRequest,
  editProjectSuccess,
  editProjectFailure,
  deleteProjectRequest,
  deleteProjectSuccess,
  deleteProjectFailure,
  addProjectRequest,
  addProjectSuccess,
  addProjectFailure,
  clickAddProject,
  clickCancelAddProject,

} from '../actions/projects'

const initialProjectsState = {
  loadingProjects: true,
  projects: [],
  selectedProject: {},
  showEditProjectModal: false,
  showAddProjectModal: false,
  loadingEdit: false,
  editError: '',
  addError: '',
  loadingAdd: false,
}

export const projectsReducer = createReducer(initialProjectsState, {

  [getProjectsRequest]: (state, action) => {

  },

  [getProjectsSuccess]: (state, action) => {
    state.loadingProjects = false;
    state.projects = action.payload;
  },

  [getProjectsFailure]: (state, action) => {
    state.loadingProjects = false;
  },

  [clickEditProject]: (state, action) => {
    state.selectedProject = action.payload;
    state.showEditProjectModal = true;
  },

  [clickCancelEditProject]: (state, action) => {
    state.selectedProject = {};
    state.showEditProjectModal = false;
  },

  [editProjectRequest]: (state, action) => {
    state.loadingEdit = true;
  },

  [editProjectSuccess]: (state, action) => {
    state.loadingEdit = false;
    const index = state.projects.findIndex(project => project.id === action.payload.id);
    state.projects[index] = action.payload;
    state.showEditProjectModal = false;
  },

  [editProjectFailure]: (state, action) => {
    state.loadingEdit = false;
    state.editError = action.payload;
  },

  [deleteProjectRequest]: (state, action) => {
  },

  [deleteProjectSuccess]: (state, action) => {
    const index = state.projects.findIndex(project => project.id === action.payload);
    state.projects.splice(index, 1);
  },

  [deleteProjectFailure]: (state, action) => {
  },

  [addProjectRequest]: (state, action) => {
    state.loadingAdd = true;
  },

  [addProjectSuccess]: (state, action) => {
    state.loadingAdd = false;
    state.projects.push(action.payload);
    state.showAddProjectModal = false;
  },

  [addProjectFailure]: (state, action) => {
    state.loadingAdd = false;
    state.addError = action.payload;
  },

  [clickAddProject]: (state, action) => {
    state.showAddProjectModal = true;
  },

  [clickCancelAddProject]: (state, action) => {
    state.showAddProjectModal = false;
  },
})