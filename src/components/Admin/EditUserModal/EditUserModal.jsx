import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Modal, Input, Select, Form } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cancelEditUserModal, editUser } from "../../../actions/users";

const Option = Select.Option;
const FormItem = Form.Item;

const userGroups = [
  <Option key="Developer">Developer</Option>,
  <Option key="Admin">Admin</Option>,
  <Option key="PO">Product Owner</Option>,
  <Option key="SM">Scrum Master</Option>,
  <Option key="Customer">Customer</Option>
];

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

  handleStatusChange = e => {
    this.setState({ newStatus: e.label });
  };

  handleLicenseTypeChange = e => {
    this.setState({ newLicenseType: e.label });
  };

  handleUserGroupChange = e => {
    this.setState({ newUserGroups: e.map(userGroup => userGroup.label) });
  };

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
            <React.Fragment>
              <Icon style={{ color: "#1890FF" }}>
                <FontAwesomeIcon icon="user" />
              </Icon>
              Edit User
            </React.Fragment>
          }
          onOk={this.handleOkUserModal}
          visible={true}
          onCancel={() => this.props.cancelEditUserModal()}
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
            <FormItem style={{ marginBottom: "0px" }} label="Username">
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    message: "Please input the user's Username"
                  },
                  { min: 4, message: "Username too short!" }
                ],
                initialValue: this.props.editableUser.userName
              })(<Input placeholder="Username" />)}
            </FormItem>
            {/* <FormItem style={{ marginBottom: "0px" }} label="Password">
              {getFieldDecorator("Password", {
                rules: [
                  {
                    required: true,
                    message: "Please input the user's Password"
                  },
                  { validator: this.validateToNextPassword },
                  { min: 12, message: "Password too short!" }
                ]
              })(<Input placeholder="Password" type="password" />)}
            </FormItem>
            <FormItem style={{ marginBottom: "0px" }} label="Confirm Password">
              {getFieldDecorator("Confirm", {
                rules: [
                  {
                    required: true,
                    message: "Please confirm the user's Password"
                  },
                  { validator: this.compareToFirstPassword }
                ]
              })(
                <Input
                  placeholder="Password"
                  type="password"
                  onBlur={this.handleConfirmBlur}
                />
              )}
            </FormItem> */}
            <FormItem
              style={{ marginBottom: "0px" }}
              label="License Type"
              hasFeedback
            >
              {getFieldDecorator("licenseType", {
                rules: [
                  { required: true, message: "Please select a License Type" }
                ],
                initialValue: "Developer"
              })(
                <Select
                  placeholder="Please select a License Type"
                  style={{ width: "100%" }}
                >
                  <Option value="Developer">Developer</Option>
                  <Option value="Admin">Admin</Option>
                  <Option value="ProductOwner">Product Owner</Option>
                  <Option value="ScrumMaster">Scrum Master</Option>
                  <Option value="Customer">Customer</Option>
                </Select>
              )}
            </FormItem>
            <FormItem style={{ marginBottom: "0px" }} label="Status">
              {getFieldDecorator("isActive", {
                initialValue: this.props.editableUser.isActive
              })(
                <Select
                  style={{ width: "100%" }}
                  onChange={this.handleStatusChange}
                >
                  <Option value={true}>Active</Option>
                  <Option value={false}>Inactive</Option>
                </Select>
              )}
            </FormItem>
            <FormItem style={{ marginBottom: "0px" }} label="User Groups">
              <Select
                labelInValue
                mode="multiple"
                placeholder="Please Select"
                style={{ width: "100%" }}
                onChange={this.handleUserGroupChange}
              >
                {userGroups}
              </Select>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  editableUser: state.users.editUser
});

export default Form.create()(
  connect(
    mapStateToProps,
    { cancelEditUserModal, editUser }
  )(EditUserModal)
);
