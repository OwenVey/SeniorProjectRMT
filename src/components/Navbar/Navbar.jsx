import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.css';
import ProfileDropdownMenu from './ProfileDropdownMenu';
import { connect } from "react-redux";
const { Header } = Layout;

class Navbar extends Component {

  render() {
    let href = window.location.pathname;
    return (
      this.props.navBarVisibility &&
      <Header style={{ justifyContent: 'center', display: 'inline' }} className='header'>

        <div className='logo-group'>
          <FontAwesomeIcon size='2x' color='#1890ff' icon='pencil-alt' />
          <span className='logo-text'>Requirements Tool</span>
        </div>

        <Menu
          theme='dark'
          mode='horizontal'
          selectedKeys={[href]}
          styles={{ verticalAlign: 'top' }}>

          <Menu.Item className='menu-item' key='/home' >
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
          {this.props.adminAccess &&
            <Menu.Item className='menu-item' key='/admin'>
              <NavLink to='/admin'>
                <FontAwesomeIcon className='navbar-icon' icon='lock' />
                Admin
                </NavLink>
            </Menu.Item>}

          <Menu.Item key="/profile" style={{ float: 'right' }} className="profile-menu">
            <ProfileDropdownMenu />
          </Menu.Item>
        </Menu>
      </Header>
    )
  }
}

const mapStateToProps = (state) => ({
  adminAccess: state.authentication.loginUser.isAdmin,
  navBarVisibility: state.authentication.isAuthenticated,
})

export default connect(mapStateToProps)(Navbar)
