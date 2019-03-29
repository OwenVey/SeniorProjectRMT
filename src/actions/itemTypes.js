import { createAction } from "redux-starter-kit";
import axios from "axios";
import { TIMBLIN_URL } from "../constants";

export const getItemTypesRequest = createAction('GET_ITEM_TYPES_REQUEST');
export const getItemTypesSuccess = createAction('GET_ITEM_TYPES_SUCCESS');
export const getItemTypesFailure = createAction('GET_ITEM_TYPES_FAILURE');

export const clickAddItemType = createAction('CLICK_ADD_ITEM_TYPE');
export const clickCancelAddItemType = createAction('CLICK_CANCEL_ADD_ITEM_TYPE');

export const clickEditItemType = createAction('CLICK_EDIT_ITEM_TYPE');
export const clickCancelEditItemType = createAction('CLICK_CANCEL_EDIT_ITEM_TYPE');

export const addItemTypeRequest = createAction('ADD_ITEM_TYPE_REQUEST');
export const addItemTypeSuccess = createAction('ADD_ITEM_TYPE_SUCCESS');
export const addItemTypeFailure = createAction('ADD_ITEM_TYPE_FAILURE');

export const editItemTypeRequest = createAction('EDIT_ITEM_TYPE_REQUEST');
export const editItemTypeSuccess = createAction('EDIT_ITEM_TYPE_SUCCESS');
export const editItemTypeFailure = createAction('EDIT_ITEM_TYPE_FAILURE');

export const deleteItemTypeRequest = createAction('DELETE_ITEM_TYPE_REQUEST');
export const deleteItemTypeSuccess = createAction('DELETE_ITEM_TYPE_SUCCESS');
export const deleteItemTypeFailure = createAction('DELETE_ITEM_TYPE_FAILURE');

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

export const editItemType = (projectId, editedItemType, accessToken) => dispatch => {
  dispatch(editItemTypeRequest());
  axios.patch(`${TIMBLIN_URL}/objectType/${projectId}?accessToken=${accessToken}`, {
    name: editedItemType.name,
    description: editedItemType.description,
    projectId: editedItemType.projectId,
    iconUrl: editedItemType.icon,
  })
    .then(response => {
      dispatch(editItemTypeSuccess(editedItemType));
    })
    .catch(error => {
      dispatch(editItemTypeFailure(error.message));
    });
};

export const deleteItemType = (accessToken, projectId) => dispatch => {
  dispatch(deleteItemTypeRequest());
  axios.delete(`${TIMBLIN_URL}/objectType/${projectId}?accessToken=${accessToken}`)
    .then(response => {
      dispatch(deleteItemTypeSuccess(projectId))
    })
    .catch(error => {
      dispatch(deleteItemTypeFailure(error.message))
    });
}