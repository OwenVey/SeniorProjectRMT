import React, { Component } from 'react';
import { Button, Icon, Modal, Input, Select, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  handleOkUserModal = (e) => {

    // e.preventDefault();
    // this.props.form.validateFieldsAndScroll((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
      //  this.setState({ addUserModalVisible: false, });
        // this.props.addUser(user)
      // }
      // else{
        // alert('Form is invalid!');
    //   }
    // });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('Password')) {
      callback('Two passwords that you enter is inconsistent!');
    } 
    else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
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

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <Modal
        title={<div><Icon style={{ color: '#1890FF' }}><FontAwesomeIcon icon='user' /></Icon> Add User</div>}
        visible={this.props.showModal}
        onOk={this.handleOkUserModal}
        onCancel={this.props.handleCancelUserModal}
        okText="Add"
        maskClosable={false}
        bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
      >
        <Form onSubmit={this.handleOkUserModal()}>
          <FormItem label="First Name"> 
            {getFieldDecorator('First Name', {
              rules: [{required: true, message: 'Please input the user\'s First Name' }],
            })(
              <Input placeholder='First Name'/>
            )}
          </FormItem>
          <FormItem label="Last Name"> 
            {getFieldDecorator('Last Name', {
              rules: [{required: true, message: 'Please input the user\'s Last Name' }],
            })(
              <Input placeholder='Last Name' />
            )}
          </FormItem>
          <FormItem label="Email"> 
            {getFieldDecorator('Email', {
              rules: [
                {required: true, message: 'Please input the user\'s Email' },
                {type: 'email', message: 'The input is not valid E-mail!'}],
            })(
              <Input placeholder='Email' />
            )}
          </FormItem>
          <FormItem label="Username"> 
            {getFieldDecorator('Username', {
              rules: [{required: true, message: 'Please input the user\'s Username' }],
            })(
              <Input placeholder='Username' />
            )}
          </FormItem>
          <FormItem label="Password"> 
            {getFieldDecorator('Password', {
              rules: [
                {required: true, message: 'Please input the user\'s Password' },
                {validator: this.validateToNextPassword}],
            })(
              <Input placeholder='Password' type='password'/>
            )}
          </FormItem>
          <FormItem label="Confirm Password"> 
            {getFieldDecorator('Confirm', {
              rules: [
                {required: true, message: 'Please confirm the user\'s Password' },
                {validator: this.compareToFirstPassword}],
            })(
              <Input placeholder='Password' type='password' onBlur={this.handleConfirmBlur}/>
            )}
          </FormItem>
          <FormItem label="License Type"> 
            <Select labelInValue defaultValue={{ key: "Developer" }} style={{ width: '100%' }} onChange={this.handleLicenseTypeChange}>
              <Option value="Developer">Developer</Option>
              <Option value="Admin">Admin</Option>
              <Option value="ProductOwner">Product Owner</Option>
              <Option value="ScrumMaster">Scrum Master</Option>
              <Option value="Customer">Customer</Option>
            </Select>
          </FormItem>
          <FormItem label="Status">
            <Select labelInValue defaultValue={{ key: "Active" }} style={{ width: '100%' }} onChange={this.handleStatusChange}>
              <Option value="Active">ACTIVE</Option>
              <Option value="Inactive">INACTIVE</Option>
            </Select>        
          </FormItem>
          <FormItem label="User Groups">
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