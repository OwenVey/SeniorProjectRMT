import React, { Component } from 'react';
import { List } from 'antd';
import RecentlyViewedListItem from '../RecentlyViewedListItem/RecentlyViewedListItem.jsx';

const RecentlyViewedList = ({ children }) => (

  <List
    style={{ height: 'fit-content', width: '800px' }}
    itemLayout="horizontal"
    bordered
  >
    {children}
  </List>
)


export default RecentlyViewedList;