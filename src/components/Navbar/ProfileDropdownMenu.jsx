import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown, Icon, Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.css';
import { connect } from 'react-redux';
import { logout } from '../../actions'

const ProfileDropdownMenu = (props) => {
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

      <Menu.Item key="logout" className="dropdown-item" onClick={() => props.logout()}>
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

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, { logout })(ProfileDropdownMenu)