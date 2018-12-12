import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Card, Alert } from 'antd';
import axios from 'axios';
import './LoginPage.css';

const FormItem = Form.Item;

class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      loading: false,
      invalidLogin: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({ loading: true });
        this.login(values);
      }
    });
  }

  login = (loginInfo) => {
    const url = 'https://senior-design.timblin.org/api/login';
    axios.post(url, {
      email: loginInfo.email,
      password: loginInfo.password,
    })
      .then(response => {
        console.log(response.data['accessToken']);
        this.props.setAccessToken(response.data['accessToken']);
        this.props.onLogin();
        this.setState({ redirectToReferrer: true });
      })
      .catch(error => {
        this.setState({
          invalidLogin: true,
          loading: false,
        });
        console.log(error);
      });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { from } = this.props.location.state || { from: { pathname: '/home' } }
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <div className='centered'>
        <Card title='Login'>

          <Form onSubmit={this.handleSubmit} className="login-form">

            {this.state.invalidLogin && <Alert className='error-alert' message="Invalid login" type="error" />}

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
              <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>Log in</Button>
            </FormItem>

          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(LoginPage);