import { createReducer } from 'redux-starter-kit'
import { getProjectsRequest, getProjectsSuccess, getProjectsFailure } from '../actions/projects'

const initialProjectsState = {
  projects: [],
}

export const projectsReducer = createReducer(initialProjectsState, {

  [getProjectsRequest]: (state, action) => {

  },

  [getProjectsSuccess]: (state, action) => {
    state.projects = action.payload;
  },

  [getProjectsFailure]: (state, action) => {

  },
})