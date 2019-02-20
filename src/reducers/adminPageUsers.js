import { createReducer } from "redux-starter-kit";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure
} from "../actions/adminPageUsers";

const initialUsersState = {
  userData: [],
  loading: false,
  error: false
};

const adminPageUsersReducer = createReducer(initialUsersState, {
  [fetchUsersRequest]: (state, action) => {
    state.loading = true;
  },

  [fetchUsersSuccess]: (state, action) => {
    state.loading = false;
    state.userData = action.payload;
  },

  [fetchUsersFailure]: (state, action) => {
    console.log(action.payload);
    state.loading = false;
    state.error = true;
  },

  [addUser]: (state, action) => {
    console.log(action.payload);
    state.userData = state.userData.push(action.payload);
  },

  [editUser]: (state, action) => {
    state.userData = state.userData.map(user =>
      user.id === action.payload.id ? Object.assign(action.payload) : user
    );
  }
});
