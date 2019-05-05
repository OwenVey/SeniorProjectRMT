import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown, Icon, Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.css';
import { connect } from 'react-redux';
import { logout } from '../../actions/authentication'
import renderEmpty from 'antd/lib/config-provider/renderEmpty';

// class ProfileDropdown extends Component {
//   render() {
//     return (
//       <>
//         const dropdownMenu = (
//           <Menu theme='dark' style={{ backgroundColor: '#1b1c1d' }} className="profile-dropdown-menu">
//           <Menu.Item key="user-info" className="dropdown-item" disabled>
//             <div className="user-full-name-info">
//               {this.props.loginUser.firstName}
//             </div>
//           </Menu.Item>
//           <Menu.Divider style={{ backgroundColor: '#3e3e3e' }} />

//           <Menu.Item key="profile" className="dropdown-item">
//             <NavLink to='/profile'>
//               <FontAwesomeIcon className='navbar-icon' icon='user' />
//               My Profile
//         </NavLink>
//           </Menu.Item>

//           <Menu.Item key="logout" className="dropdown-item" onClick={() => props.logout(props.accessToken)}>
//             <NavLink to='/login'>
//               <FontAwesomeIcon className='navbar-icon' icon='sign-out-alt' />
//               Logout
//         </NavLink>
//           </Menu.Item>
//         </Menu>
//         );
//     </>
//     )
//   }
// }
const dropdownMenu = (props) => {
  return (
    <>
      <Dropdown
        overlay={dropdownMenu}
        trigger={['click']}
        getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>

        <div className='menu-item'>
          <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>ME</Avatar>
          <span style={{ paddingLeft: '5px' }}>TEST</span>
          <Icon style={{ marginLeft: '5px' }} type="down" />
        </div>

      </Dropdown>
    </>
  );
}

const ProfileDropdownMenu = (props) => {
  const dropdownMenu = (
    <Menu theme='dark' style={{ backgroundColor: '#1b1c1d' }} className="profile-dropdown-menu">
      <Menu.Item key="user-info" className="dropdown-item" disabled>
        <div className="user-full-name-info">
          {props.loginUser.firstName}
        </div>
        <div className="username-info">
          @{props.loginUser.firstName}{props.loginUser.lastName}
        </div>
      </Menu.Item>

      <Menu.Divider style={{ backgroundColor: '#3e3e3e' }} />

      <Menu.Item key="profile" className="dropdown-item">
        <NavLink to='/profile'>
          <FontAwesomeIcon className='navbar-icon' icon='user' />
          My Profile
        </NavLink>
      </Menu.Item>

      <Menu.Item key="logout" className="dropdown-item" onClick={() => props.logout(props.accessToken)}>
        <NavLink to='/login'>
          <FontAwesomeIcon className='navbar-icon' icon='sign-out-alt' />
          Logout
        </NavLink>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown
        overlay={dropdownMenu}
        trigger={['click']}
        getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>

        <div className='menu-item'>
          <Icon><FontAwesomeIcon icon='user' /></Icon>
          {/* <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}></Avatar> */}
          <span style={{ paddingLeft: '5px' }}>{props.loginUser.firstName} {props.loginUser.lastName}</span>
          <Icon style={{ marginLeft: '5px' }} type="down" />
        </div>

      </Dropdown>
    </>
  );
}

const mapStateToProps = (state) => ({
  accessToken: state.authentication.accessToken,
  users: state.users.users,
  loginUser: state.authentication.loginUser,
});

export default connect(mapStateToProps, { logout })(ProfileDropdownMenu);