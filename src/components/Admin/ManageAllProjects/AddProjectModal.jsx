import React, { Component } from 'react';
import { Icon, Modal, Input, Form, DatePicker } from 'antd';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from "react-redux";
import { clickCancelAddProject, addProject } from '../../../actions/projects'

class AddProjectModal extends Component {

  handleOkAddProjectModal = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.addProject(this.props.accessToken, values);
      }
    })
  }

  validateDueDate = (rule, value, callback) => {
    if (value > moment() || value == null) {
      callback();
      return;
    }
    callback('Due Date must be in the future!');
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
            Add Project
          </>
        }
        onOk={this.handleOkAddProjectModal}
        visible={true}
        onCancel={() => this.props.clickCancelAddProject()}
        okText="Add"
        okButtonProps={{ loading: this.props.loadingAdd }}
        maskClosable={false}
        bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
      >
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        <Form onSubmit={this.handleOkAddProjectModal}>
          <Form.Item style={{ marginBottom: '0px' }} label="Global ID" >
            {getFieldDecorator('globalId', {
              rules: [{ max: 10, message: 'Global ID must be 10 characters or less' }],
            })(
              <Input placeholder='Global ID' />
            )}
          </Form.Item>
          <Form.Item style={{ marginBottom: '0px' }} label="Name">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Please input Name' },
                { max: 255, message: 'Name must be 255 characters or less' }
              ],
            })(
              <Input placeholder='Name' />
            )}
          </Form.Item>
          <Form.Item style={{ marginBottom: '0px' }} label="Description">
            {getFieldDecorator('description', {
              rules: [
                { max: 255, message: 'Description must be 255 characters or less' }
              ],
            })(
              <Input.TextArea placeholder='Description' />
            )}
          </Form.Item>
          <Form.Item style={{ float: 'left' }} {...FormItemLayout} label="Due Date">
            {getFieldDecorator('dueDate', {
              rules: [
                { validator: this.validateDueDate }
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
  loadingAdd: state.projects.loadingAdd,
  errorMessage: state.projects.addError,
});

export default connect(mapStateToProps, { clickCancelAddProject, addProject })(Form.create()(AddProjectModal));