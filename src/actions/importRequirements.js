import { createAction } from "redux-starter-kit";
import axios from "axios";
import { TIMBLIN_URL } from "../constants";

export const importRequest = createAction('IMPORT_REQUEST');
export const importSuccess = createAction('IMPORT_SUCCESS');
export const importFailure = createAction('IMPORT_FAILURE');

export const uploadRequest = createAction('IMPORT_REQUEST');
export const uploadSuccess = createAction('IMPORT_SUCCESS');
export const uploadFailure = createAction('IMPORT_FAILURE');

export const clickImport = createAction('CLICK_IMPORT');
export const clickCancelImport = createAction('CLICK_CANCEL_IMPORT');

export const showImportModal = createAction("SHOW_IMPORT_MODAL");
export const hideImportModal = createAction("HIDE_IMPORT_MODAL");

export const uploadRequirements = (accessToken, projectId) => dispatch => {
  }