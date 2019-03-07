import { createAction } from "redux-starter-kit";
export const fetchOrganizationDetailsRequest = createAction("FETCH_ORGANIZATION_DETAILS_REQUEST");
export const fetchOrganizationDetailsSuccess = createAction("FETCH_ORGANIZATION_DETAILS_SUCCESS");
export const fetchOrganizationDetailsFailure = createAction("FETCH_ORGANIZATION_DETAILS_FAILURE");