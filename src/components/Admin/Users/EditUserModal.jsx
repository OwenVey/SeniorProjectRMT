import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Modal, Input, Select, Form } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUserGroups } from '../../../actions/userGroups'
import { hideEditUserModal, editUser } from "../../../actions/users";

const Option = Select.Option;
const FormItem = Form.Item;

// const userGroups = [
//   <Option key="Developer">Developer</Option>,
//   <Option key="Admin">Admin</Option>,
//   <Option key="PO">Product Owner</Option>,
//   <Option key="SM">Scrum Master</Option>,
//   <Option key="Customer">Customer</Option>
// ];

class EditUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidUser: false,
      confirmDirty: false
    };
  }

  handleOkUserModal = e => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.editUser(
          this.props.editableUser.id,
          values,
          this.props.accessToken
        );
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

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleLicenseTypeChange = e => {
    this.setState({ newLicenseType: e.label });
  };

  handleUserGroupChange = e => {
    this.setState({ newUserGroups: e.map(userGroup => userGroup.label) });
  };

  componentWillMount() {
    if (this.props.userGroups.length === 0)
      this.props.getUserGroups(this.props.accessToken)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: 15,
          justifyContent: "flex-end"
        }}
      >
        <Modal
          title={
            <>
              <Icon style={{ color: "#1890FF", marginRight: 10 }}>
                <FontAwesomeIcon icon="user" />
              </Icon>
              Edit User
            </>
          }
          onOk={this.handleOkUserModal}
          visible={true}
          onCancel={() => this.props.hideEditUserModal()}
          okText="Edit"
          maskClosable={false}
          bodyStyle={{ maxHeight: "60vh", overflowY: "scroll", paddingTop: 5 }}
        >
          <Form onSubmit={this.handleOkUserModal}>
            <FormItem style={{ marginBottom: "0px" }} label="First Name">
              {getFieldDecorator("firstName", {
                rules: [
                  {
                    required: true,
                    message: "Please input the user's First Name"
                  }
                ],
                initialValue: this.props.editableUser.firstName
              })(<Input placeholder="First Name" />)}
            </FormItem>
            <FormItem style={{ marginBottom: "0px" }} label="Last Name">
              {getFieldDecorator("lastName", {
                rules: [
                  {
                    required: true,
                    message: "Please input the user's Last Name"
                  }
                ],
                initialValue: this.props.editableUser.lastName
              })(<Input placeholder="Last Name" />)}
            </FormItem>
            <FormItem style={{ marginBottom: "0px" }} label="Email">
              {getFieldDecorator("email", {
                rules: [
                  { required: true, message: "Please input the user's Email" },
                  { type: "email", message: "The input is not valid E-mail!" }
                ],
                initialValue: this.props.editableUser.email
              })(<Input placeholder="Email" />)}
            </FormItem>
            <FormItem style={{ marginBottom: "0px" }} label="Status">
              {getFieldDecorator("isActive", {
                initialValue: this.props.editableUser.isActive === true ? 'Active' : 'Inactive'
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  editableUser: state.users.editUser,
  userGroups: state.userGroups.userGroups,
});

export default Form.create()(
  connect(
    mapStateToProps,
    { getUserGroups, hideEditUserModal, editUser }
  )(EditUserModal)
);
