import { combineReducers } from "redux-starter-kit";
import { authenticationReducer } from "./authentication";
import { recentlyViewedItemsReducer } from "./recentlyViewedItems";
import { adminPageUsersReducer } from "./adminPageUsers";
import { userGroupsReducer } from './userGroups';

export default combineReducers({
  recentlyViewedItems: recentlyViewedItemsReducer,
  authentication: authenticationReducer,
  adminPageUsers: adminPageUsersReducer,
  userGroups: userGroupsReducer,
});
