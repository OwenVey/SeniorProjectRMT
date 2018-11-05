import React, { Component } from 'react'
import { Button, Form, Header, FormGroup, Message, Input } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      loading: false,
      invalidLogin: false,
    }
  }

  focusField = React.createRef();

  focusInput = props =>
    <Input ref={this.focusField} {...props} />

  login = (loginInfo) => {
    const url = 'https://senior-design.timblin.org/api/login'
    axios.post(url, {
      email: loginInfo.email,
      password: loginInfo.password
    })
      .then(response => {
        console.log(response.data['accessToken']);
        this.props.onLogin();
        this.setState({ redirectToReferrer: true });
      })
      .catch(error => {
        this.setState({
          invalidLogin: true,
          loading: false,
        });
        this.focusField.current.focus();
        console.log(error);
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

          <Message negative hidden={!this.state.invalidLogin}>Invalid login</Message>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Email must be a valid email').required('Required'),
              password: Yup.string().required('Required'),
            })}
            onSubmit={(loginInfo) => {
              this.setState({ loading: true });
              this.login(loginInfo);
            }}
          >
            {props => {
              const { values, touched, errors, handleChange, handleSubmit } = props;
              return (
                <Form onSubmit={handleSubmit} className='attached segment'>

                  <FormGroup widths='equal'>
                    <Form.Field>
                      <Form.Input
                        id='email'
                        label='Email'
                        placeholder='Email'
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
                        control={this.focusInput}
                      />
                      {errors.password && touched.password && <div style={{ color: '#db2828' }}>{errors.password}</div>}
                    </Form.Field>
                  </FormGroup>

                  <Button type='submit' color='teal' fluid size='large' loading={this.state.loading} >Login</Button>

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