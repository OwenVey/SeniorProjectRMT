import React from 'react'
import { Header, Menu, Container, Button, List, Search} from 'semantic-ui-react'
import ProjectListItem from '../ProjectListItem/ProjectListItem.jsx'

const projects = [
  {
    name: 'Project 1',
    description: 'This is the description for Project 1'
  },
  {
    name: 'Project 2',
    description: 'This is the description for Project 2'
  },
  {
    name: 'Project 3',
    description: 'This is the description for Project 3'
  },
]

const Welcome = () => (

  <div>
    <div className='welcome'>
      <Header
        as='h1'
        content='Welcome!'
        style={{
          fontSize: '4em',
          fontWeight: 'normal',
        }}
      />
    </div>
    
    
    <Container>
      <Menu pointing secondary size='massive'>
        <Menu.Item active name='Projects' />
        <Search size='small' className='searchBar'
            //loading=
            //onResultSelect=
            //onSearchChange=
            //results=
            //value={value}
            //{...this.props}
          />
        <Menu.Menu position='right'>
          <Button color='teal' style={{
              width: '200px',
              height: '40px',
            }}>New Project</Button>
        </Menu.Menu>
      </Menu>

      <List selection divided relaxed size='large'>

        {projects.map((project) => <ProjectListItem name={project.name} description={project.description}></ProjectListItem>)}

      </List>

    </Container>
  </div >
)

export default Welcome