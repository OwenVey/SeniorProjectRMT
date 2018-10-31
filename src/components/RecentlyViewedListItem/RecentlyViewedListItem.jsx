import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

class RecentlyViewedListItem extends Component {

  state = { isBookmarked: false };

  handleBookmark = () => {
    this.setState(prevState => ({
      isBookmarked: !prevState.isBookmarked,
    }));
  }

  render() {
    return (
      <List.Item className='recently-viewed-item' onClick={function () { alert('hello') }}>
        <List.Content floated='right'>
          <List.Icon onClick={this.handleBookmark} name={this.state.isBookmarked ? 'bookmark' : 'bookmark outline'} />
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
