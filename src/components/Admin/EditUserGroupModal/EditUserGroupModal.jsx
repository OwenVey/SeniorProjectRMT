import React, { Component } from 'react';
import { Icon, Modal, Input, Select, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { clickCancelEditAddUserGroup, editUserGroup } from '../../../actions/userGroups';

const FormItem = Form.Item;
const { Option } = Select;

class EditUserGroupModal extends Component {

  handleOkEditUserGroupModal = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.editUserGroup(this.props.accessToken, this.props.selectedUserGroup.id, values);
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={<div><Icon style={{ color: '#1890FF' }}><FontAwesomeIcon icon='user' /></Icon> Edit User Group</div>}
        onOk={this.handleOkEditUserGroupModal}
        visible={true}
        onCancel={() => this.props.clickCancelEditAddUserGroup()}
        okText="Save Changes"
        maskClosable={false}
        bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
      >
        <div style={{ color: 'red' }}>{this.props.editError}</div>
        <Form onSubmit={this.handleOkEditUserGroupModal} layout={'vertical'}>
          <FormItem style={{ marginBottom: '0px' }} label="Project" >
            {getFieldDecorator('projectId', {
              rules: [
                { required: true, message: 'Please select a Project' }
              ],
              initialValue: this.props.selectedUserGroup.projectId
            })(
              <Select
                placeholder='Please select a project'
                showSearch
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {this.props.projects.sort((a, b) => a.name.localeCompare(b.name)).map(project => (
                  <Option key={project.id} value={project.id}>{`${project.name} (${project.globalId})`}</Option>
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
              initialValue: this.props.selectedUserGroup.name
            })(
              <Input placeholder='Name' />
            )}
          </FormItem>
          <FormItem style={{ marginBottom: '0px' }} label="Description">
            {getFieldDecorator('description', {
              rules: [
                { max: 255, message: 'Description must be 255 characters or less' }
              ],
              initialValue: this.props.selectedUserGroup.description
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
  selectedUserGroup: state.userGroups.selectedUserGroup,
  editError: state.userGroups.editError,
});

export default connect(mapStateToProps, { clickCancelEditAddUserGroup, editUserGroup })(Form.create()(EditUserGroupModal));