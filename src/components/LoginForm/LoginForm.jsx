import React from 'react'
import { Button, Form, Icon, Header, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const LoginForm = () => (

  <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: 450 }}>

      <Header as='h2' color='teal' textAlign='center'>
        Log In
      </Header>

      <Form className='attached fluid segment'>
        <Form.Input label='Email' placeholder='Email' type='text' />
        <Form.Input label='Password' placeholder='Password' type='password' />
        <Button color='teal' fluid size='large'>Login</Button>
      </Form>

      <Message attached='bottom'>
        <Icon name='help' />
        Don't have an account? <a><Link to='/signup'>Sign Up</Link></a>
      </Message>

    </div>
  </div>
)

export default LoginForm