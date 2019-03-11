import React from 'react'
import { Menu, Icon } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AdminSidebar.css'

const AdminSidebar = (props) => {

  return (
    <Menu
      defaultSelectedKeys={['organizationDetails']}
      mode='vertical'
      onSelect={(item) => props.handlePageChange(item.key)}
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

export default AdminSidebar;