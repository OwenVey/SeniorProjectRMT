import React, { Component } from 'react';
import moment from 'moment'
import { Icon, Modal, Input, Switch, Form, DatePicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from "react-redux";
import { clickCancelEditProject, editProject } from '../../../actions/projects'

class EditProjectModal extends Component {

  handleOkEditProjectModal = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.editProject(this.props.accessToken, { ...values, id: this.props.selectedProject.id });
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
            Edit Project
          </>
        }
        onOk={this.handleOkEditProjectModal}
        visible={true}
        onCancel={() => this.props.clickCancelEditProject()}
        okText="Save Changes"
        okButtonProps={{ loading: this.props.loadingEdit }}
        maskClosable={false}
        bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
      >
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        <Form onSubmit={this.handleOkEditProjectModal} layout={'vertical'}>
          <Form.Item style={{ marginBottom: '0px' }} label="Global ID">
            {getFieldDecorator('globalId', {
              rules: [
                { required: true, message: 'Please input Global ID' },
                { max: 10, message: 'Global ID must be 10 characters or less' }
              ],
              initialValue: this.props.selectedProject.globalId
            })(
              <Input
                placeholder='Global ID'
              />
            )}
          </Form.Item>
          <Form.Item style={{ marginBottom: '0px' }} label="Name">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Please input Name' },
                { max: 255, message: 'Name must be 255 characters or less' }
              ],
              initialValue: this.props.selectedProject.name
            })(
              <Input placeholder='Name' />
            )}
          </Form.Item>
          <Form.Item style={{ marginBottom: '0px' }} label="Description">
            {getFieldDecorator('description', {
              rules: [
                { max: 255, message: 'Description must be 255 characters or less' }
              ],
              initialValue: this.props.selectedProject.description
            })(
              <Input.TextArea placeholder='Description' />
            )}
          </Form.Item>
          <Form.Item style={{ float: 'left', marginBottom: '0px' }} label="Due Date">
            {getFieldDecorator('dueDate', {
              initialValue: moment.utc(this.props.selectedProject.dueDate)
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </Form.Item>

          <Form.Item style={{ float: 'right', marginBottom: '0px' }} label="Date Created">
            {getFieldDecorator('createDate', {
              rules: [
                { required: true, message: 'Please input Date Created' },
              ],
              initialValue: moment.utc(this.props.selectedProject.createDate)
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </Form.Item>

          <Form.Item style={{ float: 'left', marginBottom: '0px' }} label="Date Completed">
            {getFieldDecorator('completeDate', {
              initialValue: moment.utc(this.props.selectedProject.completeDate)
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </Form.Item>

          <Form.Item style={{ float: 'right', marginBottom: '0px', paddingRight: '143px' }} label="Is Active">
            {getFieldDecorator('isActive', {
              initialValue: this.props.selectedProject.isActive,
              valuePropName: 'checked'
            })(
              <Switch />
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

export default connect(mapStateToProps, { clickCancelEditProject, editProject })(Form.create()(EditProjectModal));