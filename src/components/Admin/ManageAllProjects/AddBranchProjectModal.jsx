import React, { Component } from 'react';
import { Icon, Modal, Input, Form, Select } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from "react-redux";
import { clickCancelAddBranchProject, branchProject } from '../../../actions/projects'

const { Option } = Select;

class AddBranchProjectModal extends Component {

  handleOkAddBranchProjectModal = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.branchProject(this.props.accessToken, values, this.props.currentUserId, this.props.selectedProject.id);
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
              <FontAwesomeIcon icon='project-diagram' />
            </Icon>
            Branch Project
          </>
        }
        onOk={this.handleOkAddBranchProjectModal}
        visible={true}
        onCancel={() => this.props.clickCancelAddBranchProject()}
        okText="Create Branch"
        okButtonProps={{ loading: this.props.loadingAddBranch }}
        maskClosable={false}
        bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
      >
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        <Form onSubmit={this.handleOkAddBranchProjectModal} layout={'vertical'}>
          <Form.Item style={{ marginBottom: '0px' }} label="Global ID">
            {getFieldDecorator('globalId', {
              rules: [
                { max: 20, message: 'Global ID must be 20 characters or less' }
              ],
            })(
              <Input placeholder='Global ID' />
            )}
          </Form.Item>
          <Form.Item style={{ marginBottom: '0px' }} label="Name">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Please input new branch name' },
                { max: 255, message: 'Name must be 255 characters or less' }
              ],
            })(
              <Input placeholder='Name' />
            )}
          </Form.Item>
          
          <Form.Item style={{ marginBottom: '0px' }} label="Trunk" >
            {getFieldDecorator('trunkId', {
              rules: [
                { required: true, message: 'Please select a Trunk' }
              ],
            })(
              <Select
                placeholder='Please select a trunk'
                showSearch
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {this.props.projectBranches.filter(projectBranch => projectBranch.projectId == this.props.selectedProject.id).map(projectBranch => (
                  <Option key={projectBranch.id} value={projectBranch.id}>{`${projectBranch.name} (${projectBranch.globalId})`}</Option>
                ))}
              </Select>
            )}
          </Form.Item> 
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  currentUserId: state.authentication.loginUser.id,
  projectBranches: state.projects.branches,
  selectedProject: state.projects.selectedProject,
  loadingAddBranch: state.projects.loadingAddBranch,
  errorMessage: state.projects.addBranchError,
});

export default connect(mapStateToProps, { clickCancelAddBranchProject, branchProject })(Form.create()(AddBranchProjectModal));