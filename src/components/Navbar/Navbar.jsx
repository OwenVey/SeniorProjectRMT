import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.css';

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

        <Menu
          className='menu'
          theme='dark'
          mode='horizontal'
          selectedKeys={[href]}
          style={{ lineHeight: '50px' }}
        >

          <Menu.Item className='menu-item' key='/home'>
            <NavLink to='/home'>
              <FontAwesomeIcon className='navbar-icon' icon='home' />
              Home
          </NavLink>
          </Menu.Item>

          <Menu.Item className='menu-item' key='/project'>
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


          <Menu.Item className='menu-item' key='/logout' onClick={this.props.onLogout} style={{ float: 'right', marginRight: '75px' }}>
            <NavLink to='/login'>
              <FontAwesomeIcon className='navbar-icon' icon='sign-out-alt' />
              Log Out
          </NavLink>
          </Menu.Item>

          <Menu.Item className='menu-item' key='/user' style={{ float: 'right' }}>
            <NavLink to='/user'>
              <FontAwesomeIcon className='navbar-icon' icon='user' />
              Your Name
          </NavLink>
          </Menu.Item>

        </Menu>
      </Header>
    )
  }
}

export default Navbar;