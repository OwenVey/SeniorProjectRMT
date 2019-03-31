import React, { Component } from 'react';
import { Icon, Modal, Form, Select, DatePicker, Checkbox, Row, Col } from 'antd';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from "react-redux";
import { clickCancelAddPermission, addUserProjectPermission } from '../../../actions/permissions'

const Option = Select.Option;
const FormItem = Form.Item;

class AddPermissionModal extends Component {

  handleOkAddPermissionModal = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.addUserProjectPermission(this.props.accessToken, values);
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
              <FontAwesomeIcon icon='user' />
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
          <FormItem style={{ marginBottom: '0px' }} label="User" >
            {getFieldDecorator('userId', {
              rules: [
                { required: true, message: 'Please select a User' }
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
          <Form.Item style={{ marginBottom: '0px' }} label="Permissions">
            {getFieldDecorator('permissions', {
              rules: [
              ],
            })(
              <Checkbox.Group style={{ width: "100%"}}>
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
});

export default connect(mapStateToProps, { clickCancelAddPermission, addUserProjectPermission })(Form.create()(AddPermissionModal));