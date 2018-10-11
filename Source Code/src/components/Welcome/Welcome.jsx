import React from 'react'
import { Header, Menu, Container, Button } from 'semantic-ui-react'

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
      <Menu tabular>
          <Menu.Item name='bio' active/>
          <Menu.Menu position='right'>
            <Button color='teal'>Hello</Button>
            </Menu.Menu>
        </Menu>
        </Container>
  </div>
)

export default Welcome