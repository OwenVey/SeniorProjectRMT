import React, { Component } from 'react';
import { Icon, Modal, Input, Select, Form, DatePicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const FormItem = Form.Item;
const ServerTimeOffset = 6;
class AddUserGroupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorStatus: {}
    }
  }

  addUserGroup = (userGroupInfo) => {
    let valid = true
    const url = `https://senior-design.timblin.org/api/group?accessToken=${this.props.accessToken}`
    axios.post(url, {
      projectID: userGroupInfo.projectId,
      name: userGroupInfo.name,
      description: userGroupInfo.description,
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
    this.setState({ errorStatus })
  }

  handleOkAddUserGroupModal = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.addUserGroup(values);
      }
    })
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
        title={<div><Icon style={{ color: '#1890FF' }}><FontAwesomeIcon icon='user' /></Icon> Add User Group</div>}
        onOk={this.handleOkAddUserGroupModal}
        visible={true}
        onCancel={this.props.handleCancelAddUserGroupModal}
        okText="Add"
        maskClosable={false}
        bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
      >
        <div style={{ color: "red" }}>
          {this.state.errorStatus.description}
        </div>
        <Form onSubmit={this.handleOkAddUserGroupModal}>
          <FormItem style={{ marginBottom: '0px' }} label="Project" >
            {getFieldDecorator('projectId', {
              rules: [
                { required: true, message: 'Please select a Project' }
              ],
            })
              (
                <Input placeholder='Project' />
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
                <Input.TextArea placeholder='Description' />
              )}
          </FormItem>
        </Form>
      </Modal>
    );
  }

}

export default Form.create()(AddUserGroupModal);