import React, { Component } from 'react'
import { Menu, Container, Button, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ProjectList from '../ProjectList/ProjectList.jsx'

class Welcome extends Component {

  constructor() {
    super();

    this.state = {
      filter: null
    };
  }

  updateSearch = (event) => {
    this.setState({
      filter: event.target.value
    });
  }

  render() {
    return (
      <Container className='center' style={{ paddingTop: '8em' }}>

        <Menu pointing secondary>
          <Menu.Menu position='left'>
            <Menu.Item name='Projects' style={{ fontSize: '18px' }} active />
            <Menu.Item>
              <Input
                icon={{ name: 'search', link: true }}
                style={{ width: '300px' }}
                iconPosition='left'
                placeholder='Search projects...'
                onChange={this.updateSearch}
              />
            </Menu.Item>
          </Menu.Menu>

          <Menu.Menu position='right'>
            <Menu.Item>
              <Button as={Link} to='/createnewproject' color='teal'>New Project</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <ProjectList filter={this.state.filter} projects={this.props.projects}></ProjectList>
      </Container>
    )
  }
}
export default Welcome