import React, { Component } from 'react'
import { List } from 'semantic-ui-react'
import RecentlyViewedListItem from '../RecentlyViewedListItem/RecentlyViewedListItem.jsx'

class RecentlyViewedList extends Component {

  filter(recentlyViewedItems) {
    if (!this.props.filter) {
      return recentlyViewedItems
    }
    return recentlyViewedItems.filter((recentlyViewedItem) => recentlyViewedItem.name.toLowerCase().indexOf(this.props.filter.toLowerCase()) >= 0)
  }

  render() {
    return (
      <List divided relaxed size='large' verticalAlign='middle'>
        {this
          .filter(this.props.recentlyViewedItems)
          .map((recentlyViewedItem) => <RecentlyViewedListItem key={recentlyViewedItem.id} recentlyViewedItem={recentlyViewedItem}></RecentlyViewedListItem>)}
      </List>
    )
  }
};

export default RecentlyViewedList;