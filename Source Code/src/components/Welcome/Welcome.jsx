import React from 'react'
import { Header, Menu, Container, Button, List } from 'semantic-ui-react'

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
        <Menu.Menu position='right'>
          <Button color='teal'>New Project</Button>
        </Menu.Menu>
      </Menu>

      <List selection animated divided relaxed size='large'>



        <List.Item onClick={function () { alert('hello') }}>
          <List.Content floated='right' verticalAlign='middle'>
            1.0
          </List.Content>
          <List.Content>
            <List.Header>Project 1</List.Header>
            This is the description for Project 1

          </List.Content>
        </List.Item>

        <List.Item onClick={function () { alert('hello') }}>
          <List.Content floated='right' verticalAlign='middle'>
            1.0
          </List.Content>
          <List.Content>
            <List.Header>Project 2</List.Header>
            This is the description for Project 2
          </List.Content>
        </List.Item>

        <List.Item onClick={function () { alert('hello') }}>
          <List.Content floated='right'>
            1.0
          </List.Content>
          <List.Content>
            <List.Header>Project 3</List.Header>
            This is the description for Project 3
          </List.Content>
        </List.Item>

      </List>

    </Container>
  </div >
)

export default Welcome