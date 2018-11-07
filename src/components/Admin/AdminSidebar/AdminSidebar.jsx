import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './AdminSidebar.css'

class AdminSidebar extends Component {

  handleItemClick = (item) => {
    this.props.handlePageChange(item.key);
  }

  render() {
    return (
      <Menu
        defaultSelectedKeys={['organizationDetails']}
        mode='vertical'
        onSelect={this.handleItemClick}
      >
        <Menu.Item key="organizationDetails">
          <Icon><FontAwesomeIcon icon='building' /></Icon>
          <span>Organization Details</span>
        </Menu.Item>

        <Menu.Item key="users">
          <Icon><FontAwesomeIcon icon='user' /></Icon>
          <span>Users</span>
        </Menu.Item>

        <Menu.Item key="userGroups">
          <Icon>  <FontAwesomeIcon icon='users' /></Icon>
          <span>User Groups</span>
        </Menu.Item>

        <Menu.Item key="permissions">
          <Icon><FontAwesomeIcon icon='shield-alt' /></Icon>
          <span>Permissions</span>
        </Menu.Item>

        <Menu.Item key="itemTypes">
          <Icon><FontAwesomeIcon icon='list' /></Icon>
          <span>Item Types</span>
        </Menu.Item>

        <Menu.Item key="manageAllProjects">
          <Icon><FontAwesomeIcon icon='cogs' /></Icon>
          <span>Manage All Projects</span>
        </Menu.Item>

      </Menu>
    );
  }
}


export default AdminSidebar;