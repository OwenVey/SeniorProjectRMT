import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
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
            initialValues={{ name: '', description: '', dueDate: '' }}
            validationSchema={Yup.object().shape({
              name: Yup.string().min(10, 'Too short.').max(30, 'Too long.').required('Required'),
              description: Yup.string().min(20, 'Description must be at least 20 characters.').required('Required'),
              dueDate: Yup.string()
            })}
            onSubmit={(project, { setSubmitting }) => {
              setSubmitting(false);
              project.dueDate = this.state.date;
              this.props.onProjectAdded(project);
              this.props.history.push('/')
            }}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleSubmit,
                isSubmitting
              } = props;
              return (

                <Form onSubmit={handleSubmit} className='attached segment'>

                  <Form.Group widths='equal'>
                    <Form.Field>
                      <Form.Input
                        id='name'
                        label='Project Name'
                        placeholder='Project Name'
                        type='text'
                        className='required'
                        value={values.name}
                        onChange={handleChange}
                        error={errors.name && touched.name}
                      />
                      {errors.name && touched.name && <div style={{ color: '#db2828' }}>{errors.name}</div>}
                    </Form.Field>
                  </Form.Group>

                  <FormGroup widths='equal'>
                    <Form.Field>
                      <Form.TextArea
                        id='description'
                        label='Project Description'
                        placeholder='Project Description'
                        type='text'
                        className='required'
                        value={values.description}
                        onChange={handleChange}
                        error={errors.description && touched.description}
                        autoHeight
                        style={{
                          maxHeight: '300px'
                        }}
                      />
                      {errors.description && touched.description && <div style={{ color: '#db2828' }}>{errors.description}</div>}
                    </Form.Field>
                  </FormGroup>

                  <FormGroup widths='equal'>
                    <Form.Field>
                      <DateInput
                        id='dueDate'
                        label='Project Due Date'
                        name="date"
                        placeholder="Project Due Date"
                        value={this.state.date}
                        minDate={moment()}
                        iconPosition="left"
                        onChange={this.handleChange} />
                      {errors.dueDate && touched.dueDate && <div style={{ color: '#db2828' }}>{errors.dueDate}</div>}
                    </Form.Field>
                  </FormGroup>

                  <Button type='submit' loading={isSubmitting} disabled={isSubmitting} color='teal' fluid size='large'>Create</Button>

                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    )
  }
}
export default withRouter(CreateNewProject);
