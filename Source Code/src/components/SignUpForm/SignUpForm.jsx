import React from 'react'
import { Button, Form, Icon, Header, Message, FormGroup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignUpForm = () => (

  <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: 450 }}>

      <Header as='h2' color='teal' textAlign='center'>
        Sign Up
      </Header>

      <Formik
        initialValues={{ firstName: 'Owen', lastName: '', email: '', password: '', passwordConfirm: '' }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().min(2, 'Too short').max(30, 'Too long').required('Required'),
          lastName: Yup.string().min(2, 'Too short').max(30, 'Too long').required('Required'),
          email: Yup.string().email('Email must be a valid email').required('Required'),
          password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
          passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], "Passwords don't match").required('Required'),
        })}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
          } = props;
          return (
            <Form onSubmit={handleSubmit} className='attached segment'>
              <Form.Group widths='equal'>
                <Form.Field>
                  <Form.Input
                    id='firstName'
                    label='First Name'
                    placeholder='First Name'
                    type='text'
                    className='required'
                    value={values.firstName}
                    onChange={handleChange}
                    error={errors.firstName && touched.firstName}
                  />
                  {errors.firstName && touched.firstName && <div style={{ color: '#db2828' }}>{errors.firstName}</div>}
                </Form.Field>

                <Form.Field>
                  <Form.Input
                    id='lastName'
                    label='Last Name'
                    placeholder='Last Name'
                    type='text'
                    className='required'
                    value={values.lastName}
                    onChange={handleChange}
                    error={errors.lastName && touched.lastName}
                  />
                  {errors.lastName && touched.lastName && <div style={{ color: '#db2828' }}>{errors.lastName}</div>}
                </Form.Field>
              </Form.Group>

              <FormGroup widths='equal'>
                <Form.Field>
                  <Form.Input
                    id='email'
                    label='Email'
                    placeholder='Email'
                    type='email'
                    className='required'
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email && touched.email}
                  />
                  {errors.email && touched.email && <div style={{ color: '#db2828' }}>{errors.email}</div>}
                </Form.Field>
              </FormGroup>

              <FormGroup widths='equal'>
                <Form.Field>
                  <Form.Input
                    id='password'
                    label='Password'
                    placeholder='Password'
                    type='password'
                    className='required'
                    value={values.password}
                    onChange={handleChange}
                    error={errors.password && touched.password}
                  />
                  {errors.password && touched.password && <div style={{ color: '#db2828' }}>{errors.password}</div>}
                </Form.Field>
              </FormGroup>

              <FormGroup widths='equal'>
                <Form.Field>
                  <Form.Input
                    id='passwordConfirm'
                    label='Confirm Password'
                    placeholder='Confirm Password'
                    type='password'
                    className='required'
                    value={values.passwordConfirm}
                    onChange={handleChange}
                    error={errors.passwordConfirm && touched.passwordConfirm}
                  />
                  {errors.passwordConfirm && touched.passwordConfirm && <div style={{ color: '#db2828' }}>{errors.passwordConfirm}</div>}
                </Form.Field>
              </FormGroup>

              <Button type='submit' color='teal' fluid size='large'>Submit</Button>

            </Form>
          );
        }}
      </Formik>

      <Message attached='bottom'>
        <Icon name='help' />Already have an account? <a><Link to='/login'>Log In</Link></a>
      </Message>

    </div>
  </div>
)

export default SignUpForm