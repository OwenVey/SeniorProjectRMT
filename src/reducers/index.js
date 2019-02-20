import { combineReducers } from "redux-starter-kit";
import { authenticationReducer } from "./authentication";
import { recentlyViewedItemsReducer } from "./recentlyViewedItems";
import { adminPageUsersReducer } from "./adminPageUsers";

export default combineReducers({
  recentlyViewedItems: recentlyViewedItemsReducer,
  authentication: authenticationReducer,
  adminPageUsers: adminPageUsersReducer
});
