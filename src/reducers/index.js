import { createReducer, combineReducers } from 'redux-starter-kit'
import data from '../data.js';

import { bookmarkRecentlyViewedItem, selectRecentlyViewedItem } from '../actions'

const recentlyViewedItemsReducer = createReducer(data.recentlyViewedItems, {

  [bookmarkRecentlyViewedItem]: (state, action) => {
    let item = state.find(item => item.id === action.payload)
    item.bookmarked = !item.bookmarked;
  },

  [selectRecentlyViewedItem]: (state, action) => {
    let item = state.find(item => item.id === action.payload)
    alert(`${item.name} was clicked.`)
  }

});


export default combineReducers({
  recentlyViewedItems: recentlyViewedItemsReducer,
})