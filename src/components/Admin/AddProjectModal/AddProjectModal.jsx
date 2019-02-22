import React, { Component } from 'react';
import { Icon, Modal, Input, Select, Form, DatePicker } from 'antd';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const Option = Select.Option;
const FormItem = Form.Item;
const ServerTimeOffset = 6;
class AddProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorStatus: {}
    }
  }

  addProject = (projectInfo) => {
    let valid = true
    const url = `https://senior-design.timblin.org/api/project?accessToken=${this.props.accessToken}`
    axios.post(url, {
      globalId: projectInfo.globalId,
      name: projectInfo.name,
      description: projectInfo.description,
      dueDate: moment(projectInfo.dueDate).subtract(ServerTimeOffset, "hours"),
    })
      .catch(error => {
        valid = false
        console.log(error.response)
        this.setErrorStatus(error)
      })
      .finally(() => {
        if (valid) {
          this.props.hide()
        }
      })
  }

  setErrorStatus = (error) => {
    let errorStatus = {
      code: error.response.data.code,
      description: error.response.data.description
     }
    this.setState({errorStatus})
  }

  handleOkAddProjectModal = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.addProject(values);
      }
    })
  }

  validateDueDate = (rule, value, callback) => {
    if (value > moment() || value == null) {
      callback();
      return;
    }
    callback('Due Date must be in the future!');
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 40 },
        sm: { span: 40 },
      },
    };
    return (
      <Modal
        title={<div><Icon style={{ color: '#1890FF' }}><FontAwesomeIcon icon='user' /></Icon> Add Project</div>}
        onOk={this.handleOkAddProjectModal}
        visible={true}
        onCancel={this.props.handleCancelAddProjectModal}
        okText="Add"
        maskClosable={false}
        bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
      >
        <div style ={{ color: "red" }}>
          {this.state.errorStatus.description}
        </div>
        <Form onSubmit={this.handleOkAddProjectModal}>
          <FormItem style={{ marginBottom: '0px' }} label= "Global ID" >
            {getFieldDecorator('globalId', {
              rules: [{ max: 10, message: 'Global ID must be 10 characters or less' }],
            })
            (
              <Input placeholder='Global ID' />
            )}
          </FormItem>
          <FormItem style={{ marginBottom: '0px' }} label="Name">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Please input Name' },
                { max: 255, message: 'Name must be 255 characters or less' }
              ],
            })
            (
              <Input placeholder='Name' />
            )}
          </FormItem>
          <FormItem style={{ marginBottom: '0px' }} label="Description">
            {getFieldDecorator('description', {
              rules: [
                { max: 255, message: 'Description must be 255 characters or less' }
              ],
            })
            (
              <Input placeholder='Description' />
            )}
          </FormItem>
          <Form.Item style={{float: 'left' }} {...formItemLayout} label="Due Date">
            {getFieldDecorator('dueDate', {
              rules: [
                { validator: this.validateDueDate}
              ]
            })
            (
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }

}

export default Form.create()(AddProjectModal);