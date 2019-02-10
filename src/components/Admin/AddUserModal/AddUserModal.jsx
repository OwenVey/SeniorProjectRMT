import React, { Component } from 'react';
import { Icon, Modal, Input, Select, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const Option = Select.Option;
const FormItem = Form.Item;

const userGroups = [
  <Option key='Developer'>Developer</Option>,
  <Option key='Admin'>Admin</Option>,
  <Option key='PO'>Product Owner</Option>,
  <Option key='SM'>Scrum Master</Option>,
  <Option key='Customer'>Customer</Option>,
];

class AddUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidUser: false,
      confirmDirty: false,
    }
  }

  registerUser = (registerInfo) => {
    let valid = true
    const url = 'https://senior-design.timblin.org/api/register'
    axios.post(url, {
      email: registerInfo.Email,
      password: registerInfo.Password,
      firstname: registerInfo.FirstName,
      lastname: registerInfo.LastName,
      isAdmin: registerInfo.LicenseType === 'Admin'
    })
      .catch(error => {
        valid = false
        console.log(error.response)
      })
      .finally(() => {
        if (valid) {
          this.props.hide()
        }
      })
  }

  handleOkUserModal = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.registerUser(values);
      }
    })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('Password')) {
      callback('The two passwords that you entered are inconsistent!');
    }
    else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['Confirm'], { force: true });
    }
    callback();
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  handleStatusChange = (e) => {
    this.setState({ newStatus: e.label })
  }

  handleLicenseTypeChange = (e) => {
    this.setState({ newLicenseType: e.label })
  }

  handleUserGroupChange = (e) => {
    this.setState({ newUserGroups: e.map((userGroup) => userGroup.label) })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={<div><Icon style={{ color: '#1890FF' }}><FontAwesomeIcon icon='user' /></Icon> Add User</div>}
        onOk={this.handleOkUserModal}
        visible={true}
        onCancel={this.props.handleCancelUserModal}
        okText="Add"
        maskClosable={false}
        bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
      >
        <Form onSubmit={this.handleOkUserModal} hideRequiredMark={true}>
          <FormItem style={{ marginBottom: '0px' }} label="First Name">
            {getFieldDecorator('FirstName', {
              rules: [{ required: true, message: 'Please input the user\'s First Name' }],
            })(
              <Input placeholder='First Name' />
            )}
          </FormItem>
          <FormItem style={{ marginBottom: '0px' }} label="Last Name">
            {getFieldDecorator('LastName', {
              rules: [{ required: true, message: 'Please input the user\'s Last Name' }],
            })(
              <Input placeholder='Last Name' />
            )}
          </FormItem>
          <FormItem style={{ marginBottom: '0px' }} label="Email">
            {getFieldDecorator('Email', {
              rules: [
                { required: true, message: 'Please input the user\'s Email' },
                { type: 'email', message: 'The input is not valid E-mail!' }],
            })(
              <Input placeholder='Email' />
            )}
          </FormItem>
          <FormItem style={{ marginBottom: '0px' }} label="Username">
            {getFieldDecorator('Username', {
              rules: [
                { required: true, message: 'Please input the user\'s Username' },
                { min: 4, message: 'Username too short!' }
              ],
            })(
              <Input placeholder='Username' />
            )}
          </FormItem>
          <FormItem style={{ marginBottom: '0px' }} label="Password">
            {getFieldDecorator('Password', {
              rules: [
                { required: true, message: 'Please input the user\'s Password' },
                { validator: this.validateToNextPassword },
                { min: 12, message: 'Password too short!' }
              ],
            })(
              <Input placeholder='Password' type='password' />
            )}
          </FormItem>
          <FormItem style={{ marginBottom: '0px' }} label="Confirm Password">
            {getFieldDecorator('Confirm', {
              rules: [
                { required: true, message: 'Please confirm the user\'s Password' },
                { validator: this.compareToFirstPassword }],
            })(
              <Input placeholder='Password' type='password' onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>
          <FormItem
            style={{ marginBottom: '0px' }}
            label="License Type"
            hasFeedback
          >
            {getFieldDecorator('LicenseType', {
              rules: [
                { required: true, message: 'Please select a License Type' }
              ],
            })(
              <Select placeholder="Please select a License Type" style={{ width: '100%' }}>
                <Option value="Developer">Developer</Option>
                <Option value="Admin">Admin</Option>
                <Option value="ProductOwner">Product Owner</Option>
                <Option value="ScrumMaster">Scrum Master</Option>
                <Option value="Customer">Customer</Option>
              </Select>
            )}
          </FormItem>
          <FormItem style={{ marginBottom: '0px' }} label="Status">
            <Select labelInValue defaultValue={{ key: "Active" }} style={{ width: '100%' }} onChange={this.handleStatusChange}>
              <Option value="Active">ACTIVE</Option>
              <Option value="Inactive">INACTIVE</Option>
            </Select>
          </FormItem>
          <FormItem style={{ marginBottom: '0px' }} label="User Groups">
            <Select labelInValue mode="multiple" placeholder="Please Select" style={{ width: '100%' }} onChange={this.handleUserGroupChange}>
              {userGroups}
            </Select>
          </FormItem>
        </Form>
      </Modal>
    );
  }

}

export default Form.create()(AddUserModal);