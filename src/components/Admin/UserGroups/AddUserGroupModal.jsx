import React, { Component } from 'react';
import { Icon, Modal, Input, Select, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from "react-redux";
import { getProjects } from '../../../actions/projects'
import { addUserGroup, clickCancelAddUserGroup } from '../../../actions/userGroups'

const FormItem = Form.Item;
const { Option } = Select;

class AddUserGroupModal extends Component {

  componentWillMount() {
    if (this.props.projects.length === 0)
      this.props.getProjects(this.props.accessToken)
  }

  handleOkAddUserGroupModal = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.addUserGroup(this.props.accessToken, values);
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={
          <>
            <Icon style={{ color: '#1890FF', marginRight: 10 }}>
              <FontAwesomeIcon icon='user' />
            </Icon>
            Add User Group
          </>
        }
        onOk={this.handleOkAddUserGroupModal}
        visible={true}
        onCancel={() => this.props.clickCancelAddUserGroup()}
        okText="Add"
        okButtonProps={{ loading: this.props.loadingAdd }}
        maskClosable={false}
        bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
      >
        <Form>
          <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
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
                {this.props.projects.sort((a, b) => a.name.localeCompare(b.name)).map(project => (
                  <Option key={project.id} value={project.id}>{project.name}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem style={{ marginBottom: '0px' }} label="Name">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Please input Name' },
                { max: 255, message: 'Name must be 255 characters or less' }
              ],
            })(
              <Input placeholder='Name' />
            )}
          </FormItem>
          <FormItem style={{ marginBottom: '0px' }} label="Description">
            {getFieldDecorator('description', {
              rules: [
                { max: 255, message: 'Description must be 255 characters or less' }
              ],
            })(
              <Input.TextArea placeholder='Description' />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  projects: state.projects.projects,
  loadingAdd: state.userGroups.loadingAdd,
  errorMessage: state.userGroups.errorMessage,
});

export default connect(mapStateToProps, { getProjects, addUserGroup, clickCancelAddUserGroup })(Form.create()(AddUserGroupModal));