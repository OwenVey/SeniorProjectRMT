import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Card, Alert, AutoComplete } from 'antd';

import './LoginPage.css';
import { connect } from 'react-redux';
import { login } from '../../actions'

const FormItem = Form.Item;

const LoginForm = (props) => {




  const { getFieldDecorator } = props.form;
  const { from } = props.location.state || { from: { pathname: '/home' } }


  console.log('REDIRECT TO REFFER:')
  console.log(props)

  if (props.redirectToReferrer === true) {
    return <Redirect to={from} />
  }

  return (
    <div className='centered'>
      <Card title='Login'>

        <Form onSubmit={(e) => {
          e.preventDefault();
          props.form.validateFields((err, values) => {
            if (!err) {
              props.login(values.email, values.password)
            }
          });
        }} className="login-form">

          {props.invalidLogin && <Alert className='error-alert' message="Invalid login" type="error" />}

          <div>Email</div>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email' }],
            })(
              <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type='email'
                placeholder="Email"
              />
            )}
          </FormItem>

          <div>Password</div>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>

          <FormItem style={{ marginBottom: 0 }}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="/">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={props.loading}>Log in</Button>
          </FormItem>

        </Form>
      </Card>
    </div>
  );
}


const LoginPage = Form.create()(LoginForm);

const mapStateToProps = (state) => ({
  redirectToReferrer: state.redirectToReferrer,
  loading: state.loading,
  invalidLogin: state.invalidLogin,
})

export default connect(mapStateToProps, { login })(LoginPage)