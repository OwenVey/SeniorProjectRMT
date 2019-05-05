import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Modal, Input, Select, Form } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUserGroups } from '../../../actions/userGroups'
import { addUser,addGroups, hideAddUserModal } from "../../../actions/users";
const Option = Select.Option;
const FormItem = Form.Item;

// const userGroups = [
//   <Option key="Developer">Developer</Option>,
//   <Option key="Admin">Admin</Option>,
//   <Option key="PO">Product Owner</Option>,
//   <Option key="SM">Scrum Master</Option>,
//   <Option key="Customer">Customer</Option>
// ];

class AddUserModal extends Component {
  componentWillMount() {
    if (this.props.userGroups.length === 0)
      this.props.getUserGroups(this.props.accessToken)
  }

  state = {
    confirmDirty: false
  };

  handleOkUserModal = e => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        this.props.addUser(values, this.props.accessToken);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("Password")) {
      callback("The two passwords that you entered are inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["Confirm"], { force: true });
    }
    callback();
  };

  handleUserGroupChange = e => {
    this.setState({ newUserGroups: e.map(userGroup => userGroup.label) });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={
          <>
            <Icon style={{ color: "#1890FF", marginRight: 10 }}>
              <FontAwesomeIcon icon="user" />
            </Icon>
            Add User
          </>
        }
        onOk={this.handleOkUserModal}
        visible={true}
        onCancel={() => this.props.hideAddUserModal()}
        okText="Add"
        maskClosable={false}
        bodyStyle={{ maxHeight: "60vh", overflowY: "scroll", paddingTop: 5 }}
        okButtonProps={{ loading: this.props.loadingAdd }}
      >
        <Form >
          <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
          <FormItem style={{ marginBottom: "0px" }} label="First Name">
            {getFieldDecorator("firstName", {
              rules: [
                {
                  required: true,
                  message: "Please input the user's First Name"
                }
              ]
            })(<Input placeholder="First Name" />)}
          </FormItem>
          <FormItem style={{ marginBottom: "0px" }} label="Last Name">
            {getFieldDecorator("lastName", {
              rules: [
                { required: true, message: "Please input the user's Last Name" }
              ]
            })(<Input placeholder="Last Name" />)}
          </FormItem>
          <FormItem style={{ marginBottom: "0px" }} label="Email">
            {getFieldDecorator("email", {
              rules: [
                { required: true, message: "Please input the user's Email" },
                { type: "email", message: "The input is not valid E-mail!" }
              ]
            })(<Input placeholder="Email" />)}
          </FormItem>
          <FormItem style={{ marginBottom: "0px" }} label="Password">
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input the user's Password" },
                { validator: this.validateToNextPassword },
                { min: 8, message: "Password too short!" }
              ]
            })(<Input placeholder="Password" type="password" />)}
          </FormItem>
          <FormItem style={{ marginBottom: "0px" }} label="Status">
            {getFieldDecorator("isActive", {
              initialValue: "Active"
            })(
              <Select
                style={{ width: "100%" }}
              >
                <Option value={'Active'}>Active</Option>
                <Option value={'Inactive'}>Inactive</Option>
              </Select>
            )}
          </FormItem>
          {/* <FormItem style={{ marginBottom: "0px" }} label="User Groups">
            <Select
              labelInValue
              mode="multiple"
              placeholder="Please Select"
              style={{ width: "100%" }}
              onChange={this.handleUserGroupChange}
            >
              {userGroups}
            </Select>
          </FormItem> */}
          <FormItem style={{ marginBottom: '0px' }} label="User Groups" >
            {getFieldDecorator('userGroup', {
              rules: [
                //{ required: true, message: 'Please select a User Group' }
              ],
            })(
              <Select
                mode='multiple'
                placeholder='Please select a user group'
                showSearch
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
             
              >
                {this.props.userGroups.map(userGroup => (
                  <Option key={userGroup.id} value={userGroup.id}>{`${userGroup.name}`}</Option>
                ))}
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  errorMessage: state.users.postErrorMessage,
  loadingAdd: state.users.loading,
  groups: state.users.groups,
  userGroups: state.userGroups.userGroups,
});

export default connect(mapStateToProps, { addGroups, getUserGroups, hideAddUserModal, addUser })(Form.create()(AddUserModal));