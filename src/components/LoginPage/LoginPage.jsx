import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Icon, Input, Button, Checkbox, Card, Alert, AutoComplete } from 'antd';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


import './LoginPage.css';
import { connect } from 'react-redux';
import { compose } from "redux";
import { login } from '../../actions'

const FormItem = Form.Item;

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const LoginPage = (props, { redirectToReferrer, loading, invalidLogin }) => {

  const { from } = props.location.state || { from: { pathname: '/home' } }


  console.log('REDIRECT TO REFFER:')
  console.log(redirectToReferrer)

  if (redirectToReferrer === true) {
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
      >
        {({ errors, touched }) => (
          <Card title='Login'>
            <Form className="login-form">

              <div>Email</div>
              <Field name="email" type="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}

              <div>Password</div>
              <Field name="password" type='password' />
              {errors.password && touched.password ? <div>{errors.password}</div> : null}

              <Checkbox>Remember me</Checkbox>
              <a className="login-form-forgot" href="/">Forgot password</a>

              <Button type="primary" htmlType="submit" className="login-form-button" >Log in</Button>
            </Form>
          </Card>
        )}
      </Formik>
    </div>
  );
}





// const LoginPage = (props) => {
//   const { getFieldDecorator } = props.form;
//   const { from } = props.location.state || { from: { pathname: '/home' } }


//   console.log('REDIRECT TO REFFER:')
//   console.log(props)

//   if (props.redirectToReferrer === true) {
//     return <Redirect to={from} />
//   }

//   return (
//     <div className='centered'>
//       <Card title='Login'>

//         <Form onSubmit={(e) => {
//           e.preventDefault();
//           props.form.validateFields((err, values) => {
//             if (!err) {
//               props.login(values.email, values.password)
//             }
//           });
//         }} className="login-form">

//           {props.invalidLogin && <Alert className='error-alert' message="Invalid login" type="error" />}

//           <div>Email</div>
//           <FormItem>
//             {getFieldDecorator('email', {
//               rules: [{ required: true, message: 'Please input your email' }],
//             })(
//               <Input
//                 prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                 type='email'
//                 placeholder="Email"
//               />
//             )}
//           </FormItem>

//           <div>Password</div>
//           <FormItem>
//             {getFieldDecorator('password', {
//               rules: [{ required: true, message: 'Please input your password' }],
//             })(
//               <Input
//                 prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                 type="password"
//                 placeholder="Password"
//               />
//             )}
//           </FormItem>

//           <FormItem style={{ marginBottom: 0 }}>
//             {getFieldDecorator('remember', {
//               valuePropName: 'checked',
//               initialValue: true,
//             })(
//               <Checkbox>Remember me</Checkbox>
//             )}
//             <a className="login-form-forgot" href="/">Forgot password</a>
//             <Button type="primary" htmlType="submit" className="login-form-button" loading={props.loading}>Log in</Button>
//           </FormItem>

//         </Form>
//       </Card>
//     </div>
//   );
// }




const mapStateToProps = (state) => ({
  redirectToReferrer: state.redirectToReferrer,
  loading: state.loading,
  invalidLogin: state.invalidLogin,
})


export default connect(mapStateToProps, { login })(LoginPage)