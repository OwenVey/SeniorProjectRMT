import React, { Component } from 'react'
import { Button, Form, Header, FormGroup } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';

class LoginPage extends Component {

  state = {
    redirectToReferrer: false
  }

  login = () => {
    this.props.onLogin();
    this.setState({
      redirectToReferrer: true
    });
  }

  render() {

    const { from } = this.props.location.state || { from: { pathname: '/home' } }
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
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
              this.login();
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

                  <Button type='submit' color='teal' fluid size='large'>Login</Button>

                </Form>
              );
            }}
          </Formik>

        </div>
      </div>
    )
  }
}
export default LoginPage