import { combineReducers } from "redux-starter-kit";
import { authenticationReducer } from "./authentication";
import { recentlyViewedItemsReducer } from "./recentlyViewedItems";
import { usersReducer } from "./users";
import { userGroupsReducer } from './userGroups';
import { projectsReducer } from './projects';
import { permissionsReducer } from './permisions';
import { organizationDetailsReducer } from './organizationDetails';
import { itemTypesReducer } from './itemTypes';

export default combineReducers({
  recentlyViewedItems: recentlyViewedItemsReducer,
  authentication: authenticationReducer,
  users: usersReducer,
  userGroups: userGroupsReducer,
  projects: projectsReducer,
  permissions: permissionsReducer,
  OrganizationDetails: organizationDetailsReducer,
  itemTypes: itemTypesReducer,
});
