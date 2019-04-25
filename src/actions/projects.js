import { createAction } from "redux-starter-kit";
import axios from "axios";
import { TIMBLIN_URL } from "../constants";
import moment from 'moment';

export const getProjectsRequest = createAction('GET_PROJECTS_REQUEST');
export const getProjectsSuccess = createAction('GET_PROJECTS_SUCCESS');
export const getProjectsFailure = createAction('GET_PROJECTS_FAILURE');

export const editProjectRequest = createAction('EDIT_PROJECT_REQUEST');
export const editProjectSuccess = createAction('EDIT_PROJECT_SUCCESS');
export const editProjectFailure = createAction('EDIT_PROJECT_FAILURE');

export const deleteProjectRequest = createAction('DELETE_PROJECT_REQUEST');
export const deleteProjectSuccess = createAction('DELETE_PROJECT_SUCCESS');
export const deleteProjectFailure = createAction('DELETE_PROJECT_FAILURE');

export const addProjectRequest = createAction('ADD_PROJECT_REQUEST');
export const addProjectSuccess = createAction('ADD_PROJECT_SUCCESS');
export const addProjectFailure = createAction('ADD_PROJECT_FAILURE');

export const clickAddProject = createAction('CLICK_ADD_PROJECT');
export const clickCancelAddProject = createAction('CLICK_CANCEL_ADD_PROJECT');

export const clickEditProject = createAction('CLICK_EDIT_PROJECT');
export const clickCancelEditProject = createAction('CLICK_CANCEL_EDIT_PROJECT');

export const getBranchesRequest = createAction('GET_BRANCHES_REQUEST');
export const getBranchesSuccess = createAction('GET_BRANCHES_SUCCESS');
export const getBranchesFailure = createAction('GET_BRANCHES_FAILURE');

export const branchProjectRequest = createAction('BRANCH_PROJECT_REQUEST');
export const branchProjectSuccess = createAction('BRANCH_PROJECT_SUCCESS');
export const branchProjectFailure = createAction('BRANCH_PROJECT_FAILURE');

export const editBranchSuccess = createAction('EDIT_BRANCH_SUCCESS');
export const editBranchFailure = createAction('EDIT_BRANCH_FAILURE');
export const editBranchRequest = createAction('EDIT_BRANCH_REQUEST');

export const deleteBranchRequest = createAction('DELETE_BRANCH_REQUEST');
export const deleteBranchSuccess = createAction('DELETE_BRANCH_SUCCESS');
export const deleteBranchFailure = createAction('DELETE_BRANCH_FAILURE');

export const clickAddBranchProject = createAction('CLICK_ADD_BRANCH_PROJECT');
export const clickCancelAddBranchProject = createAction('CLICK_CANCEL_ADD_BRANCH_PROJECT');

export const clickEditBranch = createAction('CLICK_EDIT_BRANCH');
export const clickCancelEditBranch = createAction('CLICK_CANCEL_EDIT_BRANCH');

//#region ProjectActions
export const getProjects = accessToken => dispatch => {
  dispatch(getProjectsRequest());
  return axios.get(`${TIMBLIN_URL}/project?accessToken=${accessToken}`)
    .then(response => {
      dispatch(getProjectsSuccess(response.data.projects))
    })
    .catch(error => {
      dispatch(getProjectsFailure(error.message))
    });
}

export const addProject = (accessToken, project) => dispatch => {
  dispatch(addProjectRequest());
  return axios.post(`${TIMBLIN_URL}/project?accessToken=${accessToken}`, {
    globalId: project.globalId,
    name: project.name,
    description: project.description,
    dueDate: moment(project.dueDate).subtract(6, "hours"),
  })
    .then(response => {
      dispatch(addProjectSuccess(response.data))
    })
    .catch(error => {
      dispatch(addProjectFailure(error.message))
    });
}

export const editProject = (accessToken, project) => dispatch => {
  dispatch(editProjectRequest());
  return axios.patch(`${TIMBLIN_URL}/project/${project.id}?accessToken=${accessToken}`, {
    globalId: project.globalId,
    name: project.name,
    description: project.description,
    dueDate: project.dueDate,
    createDate: project.createDate,
    completeDate: project.completeDate,
    isActive: project.isActive
  })
    .then(response => {
      dispatch(editProjectSuccess(response.data))
    })
    .catch(error => {
      dispatch(editProjectFailure(error.message))
    });
}

export const deleteProject = (accessToken, id) => dispatch => {
  dispatch(deleteProjectRequest());
  return axios.delete(`${TIMBLIN_URL}/project/${id}?accessToken=${accessToken}`)
    .then(response => {
      dispatch(deleteProjectSuccess(id))
    })
    .catch(error => {
      dispatch(deleteProjectFailure(error.message))
    });
}
//#endregion

//#region BranchActions
export const getBranches = accessToken => dispatch => {
  dispatch(getBranchesRequest());
  return axios.get(`${TIMBLIN_URL}/branch?accessToken=${accessToken}`)
    .then(response => {
      dispatch(getBranchesSuccess(response.data.branches))
    })
    .catch(error => {
      dispatch(getBranchesFailure(error.message))
    });
}

export const branchProject = (accessToken, branchInfo, currentUserId, trunk) => dispatch => {
  dispatch(branchProjectRequest());
  return axios.post(`${TIMBLIN_URL}/branch?accessToken=${accessToken}`, {
    globalId: branchInfo.globalId ? branchInfo.globalId : null,
    name: branchInfo.name,
    ownerId: currentUserId,
    projectId: trunk.projectId,
    trunkId: trunk.id,
  })
    .then(response => {
      dispatch(branchProjectSuccess(response.data))
    })
    .catch(error => {
      dispatch(branchProjectFailure(error.message))
    });
}

export const editBranch = (accessToken, branch) => dispatch => {
  dispatch(editBranchRequest());
  return axios.patch(`${TIMBLIN_URL}/branch/${branch.id}?accessToken=${accessToken}`, {
    name: branch.name,
    ownerId: branch.ownerId,
    isLocked: branch.isLocked,
  })
    .then(response => {
      dispatch(editBranchSuccess(response.data))
    })
    .catch(error => {
      dispatch(editBranchFailure(error.message))
    });
}

export const deleteBranch = (accessToken, id) => dispatch => {
  dispatch(deleteBranchRequest());
  return axios.delete(`${TIMBLIN_URL}/branch/${id}?accessToken=${accessToken}`)
    .then(response => {
      dispatch(deleteBranchSuccess(id))
    })
    .catch(error => {
      dispatch(deleteBranchFailure(error.message))
    });
}
//#endregion