import React, { Component } from 'react';
import { Icon, Modal, Input, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { connect } from "react-redux";
import { clickCancelAddBranchProject, branchProject } from '../../../actions/projects'

class AddBranchProjectModal extends Component {

  branchProject = (branchInfo) => {
    let valid = true
    const url = `https://senior-design.timblin.org/api/branch`
    axios.patch(url, {
      globalId: branchInfo.globalId,
      name: branchInfo.name,
      ownerId: branchInfo.ownerId,
      projectId: branchInfo.projectId,
      trunkId: branchInfo.trunkId,
    })
      .catch(error => {
        valid = false
        console.log(error.response)
        this.setErrorStatus(error)
      })
      .finally(() => {
        if (valid) {
          this.props.hide()
        }
      })
  }

  handleOkAddBranchProjectModal = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.branchProject(this.props.accessToken, { ...values});
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
        okButtonProps={{ loading: this.props.loadingEdit }}
        maskClosable={false}
        bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
      >
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        <Form onSubmit={this.handleOkAddBranchProjectModal} layout={'vertical'}>
          <Form.Item style={{ marginBottom: '0px' }} label="Name">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Please input new branch name' },
                { max: 255, message: 'Name must be 255 characters or less' }
              ],
              initialValue: this.props.selectedProject.name
            })(
              <Input placeholder='Name' />
            )}
          </Form.Item> 
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  selectedProject: state.projects.selectedProject,
  loadingEdit: state.projects.loadingEdit,
  errorMessage: state.projects.editErrorMessage,
});

export default connect(mapStateToProps, { clickCancelAddBranchProject, branchProject })(Form.create()(AddBranchProjectModal));