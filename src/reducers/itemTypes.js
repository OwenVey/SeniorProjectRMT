import { createReducer } from 'redux-starter-kit'
import {
  getItemTypesRequest,
  getItemTypesSuccess,
  getItemTypesFailure,
  clickEditItemType,
  clickCancelEditItemType,
  editItemTypeRequest,
  editItemTypeSuccess,
  editItemTypeFailure,
  deleteItemTypeRequest,
  deleteItemTypeSuccess,
  deleteItemTypeFailure,
  addItemTypeRequest,
  addItemTypeSuccess,
  addItemTypeFailure,
  clickAddItemType,
  clickCancelAddItemType,

} from '../actions/itemTypes'

const initialItemTypesState = {
  loadingItemTypes: true,
  itemTypes: [],
  selectedItemType: {},
  showEditItemTypeModal: false,
  showAddItemTypeModal: false,
  loadingEdit: false,
  editError: '',
  addError: '',
  loadingAdd: false,
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

  [clickEditItemType]: (state, action) => {
    state.selectedItemType = action.payload;
    state.showEditItemTypeModal = true;
  },

  [clickCancelEditItemType]: (state, action) => {
    state.selectedItemType = {};
    state.showEditItemTypeModal = false;
  },

  [editItemTypeRequest]: (state, action) => {
    state.loadingEdit = true;
  },

  [editItemTypeSuccess]: (state, action) => {
    state.loadingEdit = false;
    const index = state.itemTypes.findIndex(itemType => itemType.projectId === action.payload.projectId);
    state.projects[index] = action.payload;
    state.showEditItemTypeModal = false;
  },

  [editItemTypeFailure]: (state, action) => {
    state.loadingEdit = false;
    state.editError = action.payload;
  },

  [deleteItemTypeRequest]: (state, action) => {
  },

  [deleteItemTypeSuccess]: (state, action) => {
    const index = state.itemTypes.findIndex(itemType => itemType.projectId === action.payload);
    state.itemTypes.splice(index, 1);
  },

  [deleteItemTypeFailure]: (state, action) => {
  },

  [addItemTypeRequest]: (state, action) => {
    state.loadingAdd = true;
  },

  [addItemTypeSuccess]: (state, action) => {
    state.loadingAdd = false;
    state.itemTypes.push(action.payload);
    state.showAddItemTypeModal = false;
  },

  [addItemTypeFailure]: (state, action) => {
    state.loadingAdd = false;
    state.addError = action.payload;
  },

  [clickAddItemType]: (state, action) => {
    state.showAddItemTypeModal = true;
  },

  [clickCancelAddItemType]: (state, action) => {
    state.showAddItemTypeModal = false;
  },
})