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
  branchProjectRequest,
  branchProjectSuccess,
  branchProjectFailure,
  clickAddBranchProject,
  clickCancelAddBranchProject,
  getBranchesRequest,
  getBranchesSuccess,
  getBranchesFailure,

} from '../actions/projects'

const initialProjectsState = {
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

export const projectsReducer = createReducer(initialProjectsState, {

  [getProjectsRequest]: (state, action) => {
    state.loadingProjects = true;
    state.getErrorMessage = '';
  },

  [getProjectsSuccess]: (state, action) => {
    state.loadingProjects = false;
    state.projects = action.payload;
  },

  [getProjectsFailure]: (state, action) => {
    state.loadingProjects = false;
    state.getErrorMessage = action.payload;
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
    state.editError = '';
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
    state.addError = '';
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

  //--------Branch Stuff ------------------------

  // [getBranchesRequest]: (state, action) => {

  // },

  // [getBranchesSuccess]: (state, action) => {
  //   state.loadingBranches = false;
  //   state.branches = action.payload;
  // },

  // [getBranchesFailure]: (state, action) => {
  //   state.selectedProject = {};
  //   state.loadingBranches = false;
  // },

  // [branchProjectRequest]: (state, action) => {
  //   state.loadingAddBranch = true;
  // },

  // [branchProjectSuccess]: (state, action) => {
  //   state.loadingAddBranch = false;
  //   state.branches.push(action.payload);
  //   state.showAddBranchProjectModal = false;
  // },

  // [branchProjectFailure]: (state, action) => {
  //   state.loadingAddBranch = false;
  //   state.addBranchError = action.payload;
  // },

  // [clickAddBranchProject]: (state, action) => {
  //   state.selectedBranch = action.payload;
  //   state.showAddBranchProjectModal = true;
  // },

  // [clickCancelAddBranchProject]: (state, action) => {
  //   state.selectedBranch = {};
  //   state.showAddBranchProjectModal = false;
  // },
})