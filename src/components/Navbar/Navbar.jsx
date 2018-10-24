import React, { Component } from 'react'
import { Container, Icon, Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const Nav = props => (
  <NavLink exact {...props} activeClassName='active' />
);

export default class Navbar extends Component {
  render() {

    return (
      <div>

        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item header><Icon name='pencil' size='large' />Requirements Tool</Menu.Item>
            <Menu.Item as={Nav} to='/' name='home' >Home</Menu.Item>

            <Menu.Menu position='right' >
              <Menu.Item as={Nav} to='/login' name='login'>Log In</Menu.Item>
              <Menu.Item as={Nav} to='/signup' name='signup'>Sign Up</Menu.Item>
              <Menu.Item as={Nav} to='/TreeView' name='TreeView'>Tree View Sample</Menu.Item>
            </Menu.Menu>

          </Container>
        </Menu >

      </div >
    )
  }


}

