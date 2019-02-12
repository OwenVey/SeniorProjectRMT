import React from 'react';
import { connect } from 'react-redux';
import RecentlyViewedList from '../RecentlyViewedList/RecentlyViewedList.jsx';
import './HomePage.css';
import RecentlyViewedListItem from '../RecentlyViewedListItem/RecentlyViewedListItem.jsx';
import { bookmarkRecentlyViewedItem, selectRecentlyViewedItem } from '../../../actions'

const HomePage = ({ recentlyViewedItems, bookmarkRecentlyViewedItem, selectRecentlyViewedItem }) => (

  <div className='center-card'>
    <div>
      <div className='title-bar'>
        <h3 style={{ marginBottom: '0px' }}>Recently Viewed Items</h3>
      </div>
      <RecentlyViewedList>
        {recentlyViewedItems.map(item =>
          <RecentlyViewedListItem
            key={item.id}
            item={item}
            onBookmark={(e) => bookmarkRecentlyViewedItem({ event: e, id: item.id })}
            onSelect={() => selectRecentlyViewedItem(item.id)} />
        )}
      </RecentlyViewedList>
    </div>
  </div>
)

const mapStateToProps = (state) => ({
  recentlyViewedItems: state.recentlyViewedItems
})

export default connect(mapStateToProps, { bookmarkRecentlyViewedItem, selectRecentlyViewedItem })(HomePage)