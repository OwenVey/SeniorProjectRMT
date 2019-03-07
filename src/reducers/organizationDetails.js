import { createReducer } from "redux-starter-kit";
import {
    fetchOrganizationDetailsRequest,
    fetchOrganizationDetailsSuccess,
    fetchOrganizationDetailsFailure,
} from "../actions/organizationDetails";

const initialOrganizationDetailsState = {
    organizationDetailData: [],

    addOrganizationDetailModalVisibility: false,
    invalidAddOrganizationDetail: false,

    editOrganizationDetailModalVisibility: false,
    invalidEditOrganizationDetail: false,
};


export const organizationDetailsReducer = createReducer(initialOrganizationDetailsState, {
    //Fetching OrganizationDetails
    [fetchOrganizationDetailsRequest]: (state, action) => {
    },

    [fetchOrganizationDetailsSuccess]: (state, action) => {
    },

    [fetchOrganizationDetailsFailure]: (state, action) => {
    },
});
