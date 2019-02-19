import { createReducer } from 'redux-starter-kit'
import data from '../data.js';
import { bookmarkRecentlyViewedItem, selectRecentlyViewedItem } from '../actions/recentlyViewedItems'

export const recentlyViewedItemsReducer = createReducer(data.recentlyViewedItems, {

  [bookmarkRecentlyViewedItem]: (state, action) => {
    action.payload.event.stopPropagation();
    let item = state.find(item => item.id === action.payload.id)
    item.bookmarked = !item.bookmarked;
  },

  [selectRecentlyViewedItem]: (state, action) => {
    let item = state.find(item => item.id === action.payload)
    alert(`${item.name} was clicked.`)
  }

});