import React from 'react'
import { Button, Form, Icon, Header, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const SignUpForm = () => (

  <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: 450 }}>

      <Header as='h2' color='teal' textAlign='center'>
        Sign Up
      </Header>

      <Form className='attached fluid segment'>
        <Form.Group widths='equal'>
          <Form.Input fluid label='First Name' placeholder='First Name' type='text' required />
          <Form.Input fluid label='Last Name' placeholder='Last Name' type='text' required />
        </Form.Group>
        <Form.Input label='Email' placeholder='Email' type='text' required />
        <Form.Input label='Password' placeholder='Password' type='password' required />
        <Form.Input label='Retype Password' placeholder='Retype Password' type='password' required />
        <Button color='teal' fluid size='large'>Submit</Button>
      </Form>

      <Message attached='bottom'>
        <Icon name='help' />
        Already have an account? <a><Link to='/login'>Log In</Link></a>
      </Message>

    </div>
  </div>
)

export default SignUpForm