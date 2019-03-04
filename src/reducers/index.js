import { combineReducers } from "redux-starter-kit";
import { authenticationReducer } from "./authentication";
import { recentlyViewedItemsReducer } from "./recentlyViewedItems";
import { usersReducer } from "./users";
import { userGroupsReducer } from './userGroups';

export default combineReducers({
  recentlyViewedItems: recentlyViewedItemsReducer,
  authentication: authenticationReducer,
  users: usersReducer,
  userGroups: userGroupsReducer,
});
