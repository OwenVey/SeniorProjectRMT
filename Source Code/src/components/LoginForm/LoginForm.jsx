import React from 'react'
import { Button, Form, Icon, Header, Message, FormGroup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginForm = () => (

  <div className='centered'>
    <div style={{ width: 450 }}>

      <Header as='h2' color='teal' textAlign='center'>
        Log In
      </Header>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Email must be a valid email').required('Required'),
          password: Yup.string().required('Required'),
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

              <Button color='teal' fluid size='large'>Login</Button>

            </Form>
          );
        }}
      </Formik>

      <Message attached='bottom'>
        <Icon name='help' />
        Don't have an account? <Link to='/signup'>Sign Up</Link>
      </Message>

    </div>
  </div>
)

export default LoginForm