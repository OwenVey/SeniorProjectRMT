import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './AdminSidebar.css'

class AdminSidebar extends Component {

  render() {
    return (
      <Menu
        defaultSelectedKeys={['1']}
        mode='vertical'
      >
        <Menu.Item key="1">
          <Icon><FontAwesomeIcon icon='building' /></Icon>
          <span>Organization Details</span>
        </Menu.Item>

        <Menu.Item key="2">
          <Icon><FontAwesomeIcon icon='user' /></Icon>
          <span>Users</span>
        </Menu.Item>

        <Menu.Item key="3">
          <Icon>  <FontAwesomeIcon icon='users' /></Icon>
          <span>User Groups</span>
        </Menu.Item>

        <Menu.Item key="4">
          <Icon><FontAwesomeIcon icon='shield-alt' /></Icon>
          <span>Permissions</span>
        </Menu.Item>

        <Menu.Item key="5">
          <Icon><FontAwesomeIcon icon='list' /></Icon>
          <span>Item Types</span>
        </Menu.Item>

        <Menu.Item key="6">
          <Icon><FontAwesomeIcon icon='cogs' /></Icon>
          <span>Manage All Projects</span>
        </Menu.Item>

      </Menu>

    );
  }
}


export default AdminSidebar;