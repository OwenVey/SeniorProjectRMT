import React from 'react';
import { List } from 'antd';

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