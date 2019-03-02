import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//import './ProfileSidebar.css'

class ProfileSidebar extends Component {

  handleItemClick = (item) => {
    this.props.handlePageChange(item.key);
  }

  render() {
    return (
      <Menu
        defaultSelectedKeys={['myDetails']}
        mode='vertical'
        onSelect={this.handleItemClick}
      >
        <Menu.Item key="myDetails">
          <Icon><FontAwesomeIcon icon='building' /></Icon>
          <span>My Details</span>
        </Menu.Item>

        <Menu.Item key="mySubscriptions">
          <Icon><FontAwesomeIcon icon='user' /></Icon>
          <span>My Subscriptions</span>
        </Menu.Item>

        <Menu.Item key="myLockedItems">
          <Icon>  <FontAwesomeIcon icon='users' /></Icon>
          <span>My Locked Items</span>
        </Menu.Item>

        <Menu.Item key="systemLockedItems">
          <Icon><FontAwesomeIcon icon='shield-alt' /></Icon>
          <span>System Locked Items</span>
        </Menu.Item>

        <Menu.Item key="reviewCenter">
          <Icon><FontAwesomeIcon icon='list' /></Icon>
          <span>Review Center</span>
        </Menu.Item>

      </Menu>
    );
  }
}

export default ProfileSidebar;