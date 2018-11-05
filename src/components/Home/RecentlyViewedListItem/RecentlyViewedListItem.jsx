import React, { Component } from 'react';
import { List, Popup } from 'semantic-ui-react';

import './RecentlyViewedListItem.css';

class RecentlyViewedListItem extends Component {

  state = { isBookmarked: false };

  handleClick = e => {
    alert('test');
  }

  handleBookmark = (e) => {
    e.stopPropagation();
    this.setState(prevState => ({
      isBookmarked: !prevState.isBookmarked,
    }));
  }

  render() {
    return (
      <List.Item className='recently-viewed-item' onClick={this.handleClick}>
        <List.Content floated='right'>
          <Popup
            trigger={<List.Icon onClick={this.handleBookmark} name={this.state.isBookmarked ? 'bookmark' : 'bookmark outline'} />}
            content='Add Bookmark'
            inverted
            position='top center'
            size='mini'
          />
        </List.Content>
        <List.Icon name='file' />
        <List.Content>
          <List.Item content={this.props.recentlyViewedItem.name}></List.Item>
        </List.Content>
      </List.Item>
    );
  }
}

export default RecentlyViewedListItem;
