import React, { Component } from 'react'
import { Menu, Container, Button, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ProjectList from '../ProjectList/ProjectList.jsx'

class Home extends Component {

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
            <Menu.Item name='Recently Viewed' style={{ fontSize: '18px' }} active />
            <Menu.Item>
              <Input
                icon={{ name: 'search', link: true }}
                style={{ width: '300px' }}
                iconPosition='left'
                placeholder='Search all items...'
                onChange={this.updateSearch}
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <ProjectList filter={this.state.filter} projects={this.props.projects}></ProjectList>
      </Container>
    )
  }
}
export default Home