import React from 'react'
import { Menu, Icon } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProfileSidebar = (props) => {

  return (
    <Menu
      defaultSelectedKeys={['myDetails']}
      mode='vertical'
      onSelect={(item) => props.handlePageChange(item.key)}
    >
      <Menu.Item key="myDetails">
        <Icon><FontAwesomeIcon icon='user' /></Icon>
        <span>My Details</span>
      </Menu.Item>

      <Menu.Item key="mySubscriptions">
        <Icon><FontAwesomeIcon icon='list' /></Icon>
        <span>My Subscriptions</span>
      </Menu.Item>

      <Menu.Item key="myLockedItems">
        <Icon>  <FontAwesomeIcon icon='user-lock' /></Icon>
        <span>My Locked Items</span>
      </Menu.Item>

      <Menu.Item key="systemLockedItems">
        <Icon><FontAwesomeIcon icon='shield-alt' /></Icon>
        <span>System Locked Items</span>
      </Menu.Item>

      <Menu.Item key="reviewCenter">
        <Icon><FontAwesomeIcon icon='book' /></Icon>
        <span>Review Center</span>
      </Menu.Item>

    </Menu>
  );
}

export default ProfileSidebar;