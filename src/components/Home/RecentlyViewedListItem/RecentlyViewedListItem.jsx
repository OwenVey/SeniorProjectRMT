import React, { Component } from 'react';
import { List, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './RecentlyViewedListItem.css';

const RecentlyViewedListItem = ({ item, onBookmark, onSelect }) => (

  <List.Item className='list-item' onClick={onSelect} >
    <div className='list-content grow'>
      <div style={{ marginRight: '10px' }}><FontAwesomeIcon icon={item.icon} /></div>
      <div>{item.name}</div>
      <div>
        <Tooltip placement='top' title='Add Bookmark' >
          <FontAwesomeIcon onClick={onBookmark} icon={item.bookmarked ? ["fas", "bookmark"] : ["far", "bookmark"]} />
        </Tooltip>
      </div>
    </div>
  </List.Item>
)

export default RecentlyViewedListItem;
