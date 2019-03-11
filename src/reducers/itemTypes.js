import { createReducer } from 'redux-starter-kit'
import {
  getItemTypesRequest,
  getItemTypesSuccess,
  getItemTypesFailure,
  clickAddItemType,
  clickCancelAddItemType,
  addItemTypeRequest,
  addItemTypeSuccess,
  addItemTypeFailure,
  deleteItemType,
} from '../actions/itemTypes'

const initialItemTypesState = {
  loadingItemTypes: true,
  itemTypes: [],
  loadingAdd: false,
  showAddItemTypeModal: false,
  errorMessage: '',
}

export const itemTypesReducer = createReducer(initialItemTypesState, {

  [getItemTypesRequest]: (state, action) => {

  },

  [getItemTypesSuccess]: (state, action) => {
    state.loadingItemTypes = false;
    state.itemTypes = action.payload;
  },

  [getItemTypesFailure]: (state, action) => {
    state.loadingItemTypes = false;
  },

  [clickAddItemType]: (state, action) => {
    state.showAddItemTypeModal = true;
  },

  [clickCancelAddItemType]: (state, action) => {
    state.showAddItemTypeModal = false;
  },

  [addItemTypeRequest]: (state, action) => {
    state.loadingAdd = true;
  },

  [addItemTypeSuccess]: (state, action) => {
    state.loadingAdd = false;
    //state.itemTypes.push(action.payload);
    state.showAddItemTypeModal = false;
  },

  [addItemTypeFailure]: (state, action) => {
    state.errorMessage = action.payload;
  },

  [deleteItemType]: (state, action) => {
    const index = state.itemTypes.findIndex(itemType => itemType.id === action.payload);
    state.itemTypes.splice(index, 1);
  },
})