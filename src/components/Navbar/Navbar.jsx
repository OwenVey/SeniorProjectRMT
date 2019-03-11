import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.css';
import ProfileDropdownMenu from './ProfileDropdownMenu';

const { Header } = Layout;

class Navbar extends Component {

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
              style={{ width: 'fit-content', height: '50px', display: 'inline-block', verticalAlign: 'top' }}>

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
                <ProfileDropdownMenu />
              </Menu.Item>
            </Menu>
          </div>

        </div>
      </Header>
    )
  }
}

export default Navbar;