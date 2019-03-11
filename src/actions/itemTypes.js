import { createAction } from "redux-starter-kit";
import axios from "axios";
import { TIMBLIN_URL } from "../constants";

export const getItemTypesRequest = createAction('GET_ITEM_TYPES_REQUEST');
export const getItemTypesSuccess = createAction('GET_ITEM_TYPES_SUCCESS');
export const getItemTypesFailure = createAction('GET_ITEM_TYPES_FAILURE');

export const clickAddItemType = createAction('CLICK_ADD_ITEM_TYPE');
export const clickCancelAddItemType = createAction('CLICK_CANCEL_ADD_ITEM_TYPE');

export const addItemTypeRequest = createAction('ADD_ITEM_TYPE_REQUEST');
export const addItemTypeSuccess = createAction('ADD_ITEM_TYPE_SUCCESS');
export const addItemTypeFailure = createAction('ADD_ITEM_TYPE_FAILURE');

export const deleteItemType = createAction('DELETE_ITEM_TYPE');

export const getItemTypes = accessToken => dispatch => {
  dispatch(getItemTypesRequest());
  axios.get(`${TIMBLIN_URL}/objecttype?accessToken=${accessToken}`)
    .then(response => {
      dispatch(getItemTypesSuccess(response.data.objectTypes))
    })
    .catch(error => {
      dispatch(getItemTypesFailure(error.message))
    });
}

export const addItemType = (accessToken, itemType) => dispatch => {
  dispatch(addItemTypeRequest());
  axios.post(`${TIMBLIN_URL}/objecttype?accessToken=${accessToken}`,
    {
      name: itemType.name,
      description: itemType.description,
      projectId: itemType.projectId,
      iconUrl: itemType.icon,
    })
    .then(response => {
      dispatch(addItemTypeSuccess(response.data))
    })
    .catch(error => {
      dispatch(addItemTypeFailure(error.message))
    });
}