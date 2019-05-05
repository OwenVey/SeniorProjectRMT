import React, { Component } from 'react';
import { Icon, Modal, Form, Select, DatePicker, Checkbox, Row, Col, Radio } from 'antd';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from "react-redux";
import { clickCancelAddPermission, addProjectPermission } from '../../../actions/permissions'

const Option = Select.Option;
const FormItem = Form.Item;

class AddPermissionModal extends Component {
  state = {
    isUser: true,
  };

  selectType = (e) => {
    this.setState({
      isUser: e.target.value === "user",
    });
  }

  handleOkAddPermissionModal = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let permissionString = "";
        if (values.permission) {
          permissionString = values.permission.includes("Create") ? 'C' : ''
          permissionString += values.permission.includes("Read") ? 'R' : ''
          permissionString += values.permission.includes("Manage") ? 'M' : ''
          permissionString += values.permission.includes("Delete") ? 'D' : ''
          permissionString += values.permission.includes("Admin") ? 'A' : ''
        }
        values.permission = permissionString;
        this.props.addProjectPermission(this.props.accessToken, values);
      }
    })
  }

  validateEndDate = (rule, value, callback) => {
    if (value > moment() || value == null) {
      callback();
      return;
    }
    callback('End Date must be in the future!');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const FormItemLayout = {
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
        title={
          <>
            <Icon style={{ color: '#1890FF', marginRight: 10 }}>
              <FontAwesomeIcon icon='unlock-alt' />
            </Icon>
            Add Permission
          </>
        }
        onOk={this.handleOkAddPermissionModal}
        visible={true}
        onCancel={() => this.props.clickCancelAddPermission()}
        okText="Add"
        okButtonProps={{ loading: this.props.loadingAdd }}
        maskClosable={false}
        bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
      >
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        <Form onSubmit={this.handleOkAddPermissionModal}>
          <FormItem style={{ marginBottom: '0px' }} label="Project" >
            {getFieldDecorator('projectId', {
              rules: [
                { required: true, message: 'Please select a Project' }
              ],
            })(
              <Select
                placeholder='Please select a project'
                showSearch
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {/* {this.props.projects.sort((a, b) => a.name.localeCompare(b.name)).map(project => ( */}
                {this.props.projects.map(project => (
                  <Option key={project.id} value={project.id}>{`${project.name} (${project.globalId})`}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem style={{ marginBottom: '0px' }} label="Permission Type">
            {getFieldDecorator('userGroupSelect', {
              initialValue: "user"
            })(
              <Radio.Group onChange={this.selectType}>
                <Radio.Button value="user">User</Radio.Button>
                <Radio.Button value="group">Group</Radio.Button>
              </Radio.Group>
            )}
          </FormItem>
          {
            this.state.isUser &&
            <FormItem style={{ marginBottom: '0px' }} label="User">
              {getFieldDecorator('userId', {
                rules: [
                  { required: this.state.isUser, message: 'Please select a User' }
                ],
              })(
                <Select
                  placeholder='Please select a user'
                  showSearch
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {/* {this.props.users.sort((a, b) => a.firstName.localeCompare(b.firstName)).map(user => ( */}
                  {this.props.users.map(user => (
                    <Option key={user.id} value={user.id}>{`${user.firstName} ${user.lastName} (${user.id})`}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
          }
          {
            !this.state.isUser &&
            <FormItem style={{ marginBottom: '0px' }} label="Group" >
              {getFieldDecorator('groupId', {
                rules: [
                  { required: !this.state.isUser, message: 'Please select a Group' }
                ],
              })(
                <Select
                  placeholder='Please select a group'
                  showSearch
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {this.props.groups.map(group => (
                    <Option key={group.id} value={group.id}>{`${group.name} (${group.id})`}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
          }
          <Form.Item style={{ marginBottom: '0px' }} label="Permissions">
            {getFieldDecorator('permission', {
              rules: [
              ],
            })(
              <Checkbox.Group style={{ width: "100%" }}>
                <Row>
                  <Col span={8}><Checkbox value="Create">Create</Checkbox></Col>
                  <Col span={8}><Checkbox value="Read">Read</Checkbox></Col>
                  <Col span={8}><Checkbox value="Manage">Manage</Checkbox></Col>
                  <Col span={8}><Checkbox value="Delete">Delete</Checkbox></Col>
                  <Col span={8}><Checkbox value="Admin">Admin</Checkbox></Col>
                </Row>
              </Checkbox.Group>
            )}
          </Form.Item>
          <Form.Item style={{ float: 'left' }} {...FormItemLayout} label="End Date">
            {getFieldDecorator('endDate', {
              rules: [
                { validator: this.validateEndDate }
              ]
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }

}

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  loadingAdd: state.permissions.loadingAdd,
  errorMessage: state.permissions.addError,
  projects: state.projects.projects,
  users: state.users.users,
  groups: state.userGroups.userGroups,
});

export default connect(mapStateToProps, { clickCancelAddPermission, addProjectPermission })(Form.create()(AddPermissionModal));