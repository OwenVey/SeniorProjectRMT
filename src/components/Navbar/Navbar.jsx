import React, { Component } from 'react'
import { Container, Icon, Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const Nav = props => (
  <NavLink exact {...props} activeClassName='active' />
);

export default class Navbar extends Component {
  render() {
    if (window.location.pathname === '/login') return null;
    return (
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item header><Icon name='pencil' size='large' />Requirements Tool</Menu.Item>

          <Menu.Item as={Nav} to='/home' name='home' >
            <Icon name='home' />
            Home
          </Menu.Item>

          <Menu.Item as={Nav} to='/project' name='projects' >
            <Icon name='box' />
            Projects
          </Menu.Item>

          <Menu.Item as={Nav} to='/admin' name='admin' >
            <Icon name='key' />
            Admin
          </Menu.Item>


          <Menu.Menu position='right' >
            <Menu.Item as={Nav} onClick={this.props.onLogout} to='/login' name='logout'>
              <Icon name='log out' />
              Log Out
              </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu >
    )
  }
}

