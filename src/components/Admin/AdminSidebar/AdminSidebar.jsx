import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import SplitPane from 'react-split-pane'

import './AdminSidebar.css'

class AdminSidebar extends Component {

  state = { activeItem: 'organizationDetails' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.handlePageChange(name);
  }

  render() {
    const { activeItem } = this.state

    return (



      <Menu vertical style={{ width: '100%', height: '100%' }}>
        <Menu.Item name='organizationDetails' active={activeItem === 'organizationDetails'} onClick={this.handleItemClick}>
          <Icon className='left' name='building' />
          Organization Details
          </Menu.Item>

        <Menu.Item name='users' active={activeItem === 'users'} onClick={this.handleItemClick}>
          <Icon className='left' name='user' />
          Users
          </Menu.Item>

        <Menu.Item name='userGroups' active={activeItem === 'userGroups'} onClick={this.handleItemClick}>
          <Icon className='left' name='users' />
          User Groups
          </Menu.Item>

        <Menu.Item name='permissions' active={activeItem === 'permissions'} onClick={this.handleItemClick}>
          <Icon className='left' name='shield' />
          Permissions
          </Menu.Item>

        <Menu.Item name='itemTypes' active={activeItem === 'itemTypes'} onClick={this.handleItemClick}>
          <Icon className='left' name='list' />
          Item Types
          </Menu.Item>

        <Menu.Item name='manageAllProjects' active={activeItem === 'manageAllProjects'} onClick={this.handleItemClick}>
          <Icon className='left' name='cogs' />
          Manage All Projects
          </Menu.Item>
      </Menu>



    )
  }
}

export default AdminSidebar