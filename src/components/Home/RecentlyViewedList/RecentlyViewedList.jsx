import React, { Component } from 'react';
import { List } from 'antd';
import RecentlyViewedListItem from '../RecentlyViewedListItem/RecentlyViewedListItem.jsx';

class RecentlyViewedList extends Component {

  filter(recentlyViewedItems) {
    if (!this.props.filter) {
      return recentlyViewedItems
    }
    return recentlyViewedItems.filter((recentlyViewedItem) => recentlyViewedItem.name.toLowerCase().indexOf(this.props.filter.toLowerCase()) >= 0)
  }

  render() {
    return (
      <List
        style={{ height: 'fit-content', width: '800px' }}
        itemLayout="horizontal"
        bordered
      >
        {this.filter(this.props.recentlyViewedItems)
          .map((recentlyViewedItem) => <RecentlyViewedListItem key={recentlyViewedItem.id} recentlyViewedItem={recentlyViewedItem} toggleBookmark={this.props.toggleBookmark}></RecentlyViewedListItem>)}
      </List>
    )
  }
};

export default RecentlyViewedList;