import React, { Component } from "react";
import { Button, Form, Header, FormGroup } from 'semantic-ui-react'
import { Formik } from 'formik';
import { DateInput } from 'semantic-ui-calendar-react';
import * as Yup from 'yup';
import moment from 'moment';

class CreateNewProject extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: ''
    };
  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  render() {
    return (
      <div className='centered'>
        <div style={{ width: 700 }}>

          <Header as='h2' color='teal' textAlign='center'>
            Create New Project
            </Header>

          <Formik
            initialValues={{ projectName: '', projectDesc: '', projectDueDate: '' }}
            validationSchema={Yup.object().shape({
              projectName: Yup.string().min(10, 'Too short.').max(30, 'Too long.').required('Required'),
              projectDesc: Yup.string().min(20, 'Description must be at least 20 characters.').required('Required'),
              projectDueDate: Yup.string()
            })}
            onSubmit={(values) => {
              values.projectDueDate = this.state.date;
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
                        id='projectName'
                        label='Project Name'
                        placeholder='Project Name'
                        type='text'
                        className='required'
                        value={values.projectName}
                        onChange={handleChange}
                        error={errors.projectName && touched.projectName}
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
                        autoHeight
                        style={{
                          maxHeight: '300px'
                        }}
                      />
                      {errors.projectDesc && touched.projectDesc && <div style={{ color: '#db2828' }}>{errors.projectDesc}</div>}
                    </Form.Field>
                  </FormGroup>

                  <FormGroup widths='equal'>
                    <Form.Field>
                      <DateInput
                        id='projectDueDate'
                        label='Project Due Date'
                        name="date"
                        placeholder="Project Due Date"
                        value={this.state.date}
                        minDate={moment()}
                        iconPosition="left"
                        onChange={this.handleChange} />
                      {errors.projectDueDate && touched.projectDueDate && <div style={{ color: '#db2828' }}>{errors.projectDueDate}</div>}
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
