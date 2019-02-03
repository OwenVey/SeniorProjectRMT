import React, { Component } from 'react';
import { List, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './RecentlyViewedListItem.css';

class RecentlyViewedListItem extends Component {

  handleClick = e => {
    alert('test');
  }

  handleBookmark = (e) => {
    e.stopPropagation();
    this.props.toggleBookmark(this.props.recentlyViewedItem);
  }

  render() {
    return (
      <List.Item className='list-item' onClick={this.handleClick}>
        <div className='list-content grow'>
          <div style={{ marginRight: '10px' }}><FontAwesomeIcon icon={this.props.recentlyViewedItem.icon} /></div>
          <div>{this.props.recentlyViewedItem.name}</div>
          <div>
            <Tooltip placement='top' title='Add Bookmark' >
              <FontAwesomeIcon onClick={this.handleBookmark} icon={this.props.recentlyViewedItem.bookmarked ? ["fas", "bookmark"] : ["far", "bookmark"]} />
            </Tooltip>
          </div>
        </div>
      </List.Item>
    );
  }
}

export default RecentlyViewedListItem;
