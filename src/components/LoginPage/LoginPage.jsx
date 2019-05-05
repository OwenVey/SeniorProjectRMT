import React from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { Alert, Button, Checkbox, Card } from 'antd';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './LoginPage.css';
import { connect } from 'react-redux';
import { login } from '../../actions/authentication'

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const LoginPage = (props) => {

  const { from } = props.location.state || { from: { pathname: '/home' } }

  if (props.redirectToReferrer === true) {
    return <Redirect to={from} />
  }

  return (
    <div className='centered'>

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={values => {
          props.login(values.email, values.password)
        }}
        render={({ errors, touched }) => (
          <Card title='Login'>
            <Form className="login-form">

              {props.invalidLogin && <Alert className='error-alert' message="Invalid login" type="error" />}

              <div>Email</div>
              <Field name="email" type="email" placeholder='Email' className='ant-input' />
              <div className='error'>{errors.email}</div>

              <div>Password</div>
              <Field name="password" type='password' placeholder='Password' className='ant-input' />
              <div className='error'>{errors.password}</div>

              <Checkbox>Remember me</Checkbox>
              <NavLink to='/recovery'>
                <a className="login-form-forgot">Forgot password</a>
              </NavLink>

              <Button type="primary" htmlType="submit" className="login-form-button" loading={props.loading}>Log in</Button>
            </Form>
          </Card>
        )}
      >
      </Formik>
    </div>
  );
}

const mapStateToProps = (state) => ({
  redirectToReferrer: state.authentication.redirectToReferrer,
  loading: state.authentication.loading,
  invalidLogin: state.authentication.invalidLogin,
})

export default connect(mapStateToProps, { login })(LoginPage)