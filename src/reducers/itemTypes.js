import { createReducer } from 'redux-starter-kit'
import {
  getItemTypesRequest,
  getItemTypesSuccess,
  getItemTypesFailure,
  editItemTypeRequest,
  editItemTypeSuccess,
  editItemTypeFailure,
  deleteItemTypeRequest,
  deleteItemTypeSuccess,
  deleteItemTypeFailure,
  addItemTypeRequest,
  addItemTypeSuccess,
  addItemTypeFailure,
  showEditItemTypeModal,
  showAddItemTypeModal,
  hideEditItemTypeModal,
  hideAddItemTypeModal,

} from '../actions/itemTypes'

const initialItemTypesState = {
  loadingItemTypes: true,
  itemTypes: [],
  selectedItemType: {},

  editItemTypeModalVisibility: false,
  addItemTypeModalVisibility: false,
  loadingEdit: false,
  patchErrorMessage: '',
  postErrorMessage: '',
  loadingAdd: false,
  editItemType: '',
}

export const itemTypesReducer = createReducer(initialItemTypesState, {

  [getItemTypesRequest]: (state, action) => {
    state.loading = true;
    state.fetchErrorMessage = '';
  },
  [getItemTypesSuccess]: (state, action) => {
    state.loadingItemTypes = false;
    state.loading = false;
    state.itemTypes = action.payload;
  },
  [getItemTypesFailure]: (state, action) => {
    state.loadingItemTypes = false;
    state.loading = false;
    state.fetchErrorMessage = action.payload;
  },
  //-------------------------------------------------------------------
  // Adding An Item Type
  //-------------------------------------------------------------------
  [addItemTypeRequest]: (state, action) => {
    state.loading = true;
    state.postErrorMessage = '';
  },
  [addItemTypeSuccess]: (state, action) => {
    state.loading = false;
    state.itemTypes.push(action.payload);
    state.addItemTypeModalVisibility = false;
  },
  [addItemTypeFailure]: (state, action) => {
    state.loading = false;
    state.postErrorMessage = action.payload;
  },
  [showAddItemTypeModal]: (state, action) => {
    state.addItemTypeModalVisibility = true;
  },
  [hideAddItemTypeModal]: (state, action) => {
    state.addItemTypeModalVisibility = false;
  },
  //-------------------------------------------------------------------
  // Existing Item Type
  //-------------------------------------------------------------------
  [editItemTypeRequest]: (state, action) => {
    state.loading = true;
    state.patchErrorMessage = '';
  },
  [editItemTypeSuccess]: (state, action) => {
    state.loading = false;
    state.itemTypes = state.itemTypes.map(itemType =>
      itemType.id === action.payload.id ? Object.assign(action.payload) : itemType
    );
    state.editItemTypeModalVisibility = false;
  },
  [editItemTypeFailure]: (state, action) => {
    state.loading = false;
    state.patchErrorMessage = action.payload;
  },
  //Modal Switching
  [showEditItemTypeModal]: (state, action) => {
    state.editItemType = action.payload;
    state.editItemTypeModalVisibility = true;
    state.invalidEditItemType = false;
  },
  [hideEditItemTypeModal]: (state, action) => {
    state.editItemTypeModalVisibility = false;
  },
  //Deleting
  [deleteItemTypeRequest]: (state, action) => {
  },
  [deleteItemTypeSuccess]: (state, action) => {
    const index = state.itemTypes.findIndex(itemType => itemType.projectId === action.payload);
    state.itemTypes.splice(index, 1);
  },
  [deleteItemTypeFailure]: (state, action) => {
  },
})