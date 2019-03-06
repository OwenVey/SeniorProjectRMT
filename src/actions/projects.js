import { createAction } from "redux-starter-kit";
import axios from "axios";
import { TIMBLIN_URL } from "../constants";

export const getProjectsRequest = createAction('GET_PROJECTS_REQUEST');
export const getProjectsSuccess = createAction('GET_PROJECTS_SUCCESS');
export const getProjectsFailure = createAction('GET_PROJECTS_FAILURE');

export const getProjects = accessToken => dispatch => {
  dispatch(getProjectsRequest());
  axios.get(`${TIMBLIN_URL}/project?accessToken=${accessToken}`)
    .then(response => {
      dispatch(getProjectsSuccess(response.data.projects))
    })
    .catch(error => {
      dispatch(getProjectsFailure(error.message))
    });
}