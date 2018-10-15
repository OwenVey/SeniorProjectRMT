import React, { Component } from "react";
import { Button, Form, Header, FormGroup } from 'semantic-ui-react'
import { Formik } from 'formik';
import * as Yup from 'yup';

class CreateNewProject extends Component {
  render() {
    //return <div />;
    return(
        //const SignUpForm = () => (

        <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 450 }}>
      
            <Header as='h2' color='teal' textAlign='center'>
              Create New Project
            </Header>
      
            <Formik
              initialValues={{ projectID: '', firstName: '', lastName: '', email: '', password: '', passwordConfirm: '' }}
              validationSchema={Yup.object().shape({
                projectID: Yup.string().min(8, 'Project ID must be valid.').required('Required'),
                projectName: Yup.string().min(10, 'Too short.').max(30, 'Too long.').required('Required'),
                projectDesc: Yup.string().min(20, 'Description must be at least one sentence.').required('Required'),
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
                    <FormGroup widths='equal'>
                      <Form.Field>
                        <Form.Input
                          id='projectID'
                          label='Project ID'
                          placeholder='Project ID'
                          type='number'
                          className='required'
                          value={values.projectID}
                          onChange={handleChange}
                          error={errors.projectID && touched.projectID}
                        />
                        {errors.projectID && touched.projectID && <div style={{ color: '#db2828' }}>{errors.projectID}</div>}
                      </Form.Field>
                    </FormGroup>
                    <Form.Group widths='equal'>
                      <Form.Field>
                        <Form.Input
                          id='projectName'
                          label='Project Name'
                          placeholder='Project Name'
                          type='text'
                          className='required'
                          value={values.projectName}
                          onChange={handleChange}
                          error={errors.projectName}
                        />
                        {errors.projectName && touched.projectName && <div style={{ color: '#db2828' }}>{errors.projectName}</div>}
                      </Form.Field>
                    </Form.Group>
      
                    <FormGroup widths='equal'>
                      <Form.Field>
                        <Form.TextArea
                          id='projectDesc'
                          label='Project Description'
                          placeholder='Project Description'
                          type='text'
                          className='required'
                          value={values.projectDesc}
                          onChange={handleChange}
                          error={errors.projectDesc && touched.projectDesc}
                          autoHeight='true'
                          style={{
                            maxHeight: '300px'
                          }}
                        />
                        {errors.projectDesc && touched.projectDesc && <div style={{ color: '#db2828' }}>{errors.projectDesc}</div>}
                      </Form.Field>
                    </FormGroup>
                    <FormGroup widths='equal'>
                      <Form.Field>
                        <Form.Input
                          id='projDueDate'
                          label='Project Due Date'
                          placeholder='Project Due Date'
                          type='text'
                          className='required'
                          value={values.projDueDate}
                          onChange={handleChange}
                          error={errors.projDueDate && touched.projDueDate}
                        />
                        {errors.projDueDate && touched.projDueDate && <div style={{ color: '#db2828' }}>{errors.projDueDate}</div>}
                      </Form.Field>
                    </FormGroup>
                    <Button type='submit' color='teal' fluid size='large'>Create</Button>
      
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      )
  }
}
export default CreateNewProject;
