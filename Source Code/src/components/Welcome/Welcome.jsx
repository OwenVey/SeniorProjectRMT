import React, { Component } from 'react'
import { Menu, Container, Button, Input } from 'semantic-ui-react'
import ProjectList from '../ProjectList/ProjectList.jsx'
import data from './data.js'

class Welcome extends Component {

  constructor() {
    super();
    const PROJECTS = data.projects;

    this.state = {
      projects: PROJECTS,
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
      <Container className='center' style={{ paddingTop: '4em' }}>

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
              <Button color='teal'>New Project</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <ProjectList filter={this.state.filter} projects={this.state.projects}></ProjectList>
      </Container>
    )
  }
}
export default Welcome