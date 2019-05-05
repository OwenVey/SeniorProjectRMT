import React from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { Alert, Button, Card } from 'antd';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './RecoveryPage.css';

const PasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});

const PasswordRecovery = (props) => {
    return (
        <div className='centered'>

            <Formik
                initialValues={{
                    email: '',
                }}
                validationSchema={PasswordSchema}
                onSubmit={values => {
                    props.login(values.email)
                }}
                render={({ errors, touched }) => (
                    <Card title='Forgot Password?'>
                        <Form className="recovery-form">

                            {props.invalidLogin && <Alert className='error-alert' message="Invalid login" type="error" />}

                            <div>Email</div>
                            <Field name="email" type="email" placeholder='Email' className='ant-input' />
                            <div className='error'>{errors.email}</div>


                            <Button type="primary" htmlType="submit" className="recovery-form-button">Reset Password</Button>

                            <NavLink to='/login'>
                                <Button type="primary" className="back-form-button">Back</Button>
                            </NavLink>
                        </Form>
                    </Card>
                )}
            >
            </Formik>
        </div>
    );
}
export default PasswordRecovery;