import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Dropdown, Icon, Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.css';

const { Header } = Layout;

export default class Navbar extends Component {

  render() {
    let href = window.location.pathname;
    if (window.location.pathname === '/login') return null;
    return (
      <Header style={{ justifyContent: 'center' }} className='header'>

        <div className='logo-group'>
          <FontAwesomeIcon size='2x' color='#1890ff' icon='pencil-alt' />
          <span className='logo-text'>Requirements Tool</span>
        </div>


        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

          <div style={{ display: 'inline' }}>
            <Menu
              className='menu'
              theme='dark'
              mode='horizontal'
              selectedKeys={[href]}
              style={{ width: 'fit-content', height: '50px', display: 'inline-block', verticalAlign: 'top' }}
            >
              <Menu.Item className='menu-item' key='/home'>
                <NavLink to='/home'>
                  <FontAwesomeIcon className='navbar-icon' icon='home' />
                  Home
          </NavLink>
              </Menu.Item>

              <Menu.Item className='menu-item' key='/project' >
                <NavLink to='/project'>
                  <FontAwesomeIcon className='navbar-icon' icon='archive' />
                  Projects
          </NavLink>
              </Menu.Item>


              <Menu.Item className='menu-item' key='/admin'>
                <NavLink to='/admin'>
                  <FontAwesomeIcon className='navbar-icon' icon='lock' />
                  Admin
          </NavLink>
              </Menu.Item>
            </Menu>
          </div>

          <div style={{ display: 'inline' }}>
            <Menu
              className='menu'
              theme='dark'
              mode='horizontal'
              selectedKeys={[href]}
              style={{ width: 'fit-content', height: '50px', display: 'inline-block', verticalAlign: 'top' }}
            >
              <Menu.Item key="/profile" style={{ paddingLeft: 10, paddingRight: 0 }} className="profile-menu">
                <ProfileDropdownMenu currentUser={this.props.currentUser} />
              </Menu.Item>
            </Menu>
          </div>

        </div>
      </Header>
    )
  }
}

function ProfileDropdownMenu(props) {
  const dropdownMenu = (
    <Menu theme='dark' style={{ backgroundColor: '#1b1c1d' }} className="profile-dropdown-menu">

      <Menu.Item key="user-info" className="dropdown-item" disabled>
        <div className="user-full-name-info">
          User Name
        </div>
        <div className="username-info">
          @username
        </div>
      </Menu.Item>

      <Menu.Divider style={{ backgroundColor: '#3e3e3e' }} />

      <Menu.Item key="profile" className="dropdown-item">
        <NavLink to='/profile'>
          <FontAwesomeIcon className='navbar-icon' icon='user' />
          Profile
        </NavLink>
      </Menu.Item>

      <Menu.Item key="logout" className="dropdown-item">
        <NavLink to='/login'>
          <FontAwesomeIcon className='navbar-icon' icon='sign-out-alt' />
          Logout
        </NavLink>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={dropdownMenu}

      trigger={['click']}
      getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>

      <div className='menu-item'>
        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
        <span style={{ paddingLeft: '5px' }}>User Name</span>
        <Icon style={{ marginLeft: '5px' }} type="down" />
      </div>

    </Dropdown>
  );
}