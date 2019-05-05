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
  importToProjectRequest,
  importToProjectSuccess,
  importToProjectFailure,
  clickImportToProject,
  clickCancelImportToProject,
  editBranchSuccess,
  editBranchFailure,
  editBranchRequest,
  deleteBranchRequest,
  deleteBranchSuccess,
  deleteBranchFailure,
  clickEditBranch,
  clickCancelEditBranch
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
  getBranchErrorMessage: '',
  editError: '',
  addError: '',
  importError: '',
  editBranchError: '',
  addBranchError: '',
  deleteError: '',
  loadingAdd: false,
  loadingAddBranch: false,
  loadingImport: false,
  importFile: [],
  selectedFile: {},
  showImportToProjectModal: false,
}

export const projectsReducer = createReducer(initialProjectsState, {

  //#region Project
  //#region Fetch
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
  //#endregion

  //#region Edit
  [editProjectRequest]: (state, action) => {
    state.editError = '';
    state.loadingEdit = true;
  },

  [importToProjectRequest]: (state, action) => {
    state.loadingImport = true;
  },

  [importToProjectSuccess]: (state, action) => {
    state.loadingImport = false;
    state.fileObj = action.payload;
    state.showImportToProjectModal = false;
  },

  [importToProjectFailure]: (state, action) => {
    state.loadingImport = false;
  },

  [clickImportToProject]: (state, action) => {
    state.showImportToProjectModal = true;
  },

  [clickCancelImportToProject]: (state, action) => {
    state.showImportToProjectModal = false;
  },

  [clickEditProject]: (state, action) => {
    state.selectedProject = action.payload;
    state.showEditProjectModal = true;
  },

  [clickCancelEditProject]: (state, action) => {
    state.selectedProject = {};
    state.showEditProjectModal = false;
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
  //#endregion

  //#region Delete
  [deleteProjectRequest]: (state, action) => {
  },

  [deleteProjectSuccess]: (state, action) => {
    const index = state.projects.findIndex(project => project.id === action.payload);
    state.projects.splice(index, 1);
  },

  [deleteProjectFailure]: (state, action) => {
  },
  //#endregion

  //#region Add
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
  //#endregion
  //#endregion

  //#region Branch
  //#region Fetch
  [getBranchesRequest]: (state, action) => {
    state.loadingBranches = true;
    state.getBranchErrorMessage = '';
  },

  [getBranchesSuccess]: (state, action) => {
    state.loadingBranches = false;
    state.branches = action.payload;
  },

  [getBranchesFailure]: (state, action) => {
    state.loadingBranches = false;
    state.getErrorMessage = action.payload;
  },
  //#endregion

  //#region Add
  [branchProjectRequest]: (state, action) => {
    state.loadingAddBranch = true;
  },

  [branchProjectSuccess]: (state, action) => {
    state.loadingAddBranch = false;
    state.branches.push(action.payload);
    state.showAddBranchProjectModal = false;
  },

  [branchProjectFailure]: (state, action) => {
    state.loadingAddBranch = false;
    state.addError = action.payload;
  },

  [clickAddBranchProject]: (state, action) => {
    state.selectedBranch = action.payload;
    state.showAddBranchProjectModal = true;
    state.addError = '';
  },

  [clickCancelAddBranchProject]: (state, action) => {
    state.selectedBranch = {};
    state.showAddBranchProjectModal = false;
  },
  //#endregion

  //#region Edit
  [editBranchRequest]: (state, action) => {
    state.editError = '';
    state.loadingEdit = true;
  },

  [clickEditBranch]: (state, action) => {
    state.selectedBranch = action.payload;
    state.showEditBranchModal = true;
  },

  [clickCancelEditBranch]: (state, action) => {
    state.selectedBranch = {};
    state.showEditBranchModal = false;
  },

  [editBranchSuccess]: (state, action) => {
    state.loadingEdit = false;
    const index = state.branches.findIndex(branch => branch.id === action.payload.id);
    state.branches[index] = action.payload;
    state.showEditBranchModal = false;
  },

  [editBranchFailure]: (state, action) => {
    state.loadingEdit = false;
    state.editError = action.payload;
  },
  //#endregion

  //#region Delete
  [deleteBranchRequest]: (state, action) => {
    state.deleteError = '';
  },

  [deleteBranchSuccess]: (state, action) => {
    const index = state.branches.findIndex(branch => branch.id === action.payload);
    state.branches.splice(index, 1);
  },

  [deleteBranchFailure]: (state, action) => {
    state.deleteError = action.payload;
  },
  //#endregion
  //#endregion
})