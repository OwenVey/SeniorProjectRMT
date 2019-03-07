import React, { Component } from 'react';
import moment from 'moment'
import { Icon, Modal, Input, Switch, Form, DatePicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const FormItem = Form.Item;

class EditProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectData: {},
      errorStatus: {}
    }
  }

  editProject = (projectInfo) => {
    let valid = true
    const url = `https://senior-design.timblin.org/api/project/${this.props.projectId}?accessToken=${this.props.accessToken}`
    axios.patch(url, {
      globalId: projectInfo.globalId,
      name: projectInfo.name,
      description: projectInfo.description,
      dueDate: projectInfo.dueDate,
      createDate: projectInfo.createDate,
      completeDate: projectInfo.completeDate,
      isActive: projectInfo.isActive
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

  setErrorStatus = (error) => {
    let errorStatus = {
      code: error.response.data.code,
      description: error.response.data.description
    }
    this.setState({ errorStatus })
  }

  handleOkEditProjectModal = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.editProject(values);
      }
    })
  }


  componentWillMount() {
    this.fetchProjects();
  }

  fetchProjects = async () => {
    console.log(this.props.accessToken);
    const url = `https://senior-design.timblin.org/api/project/${this.props.projectId}?accessToken=${this.props.accessToken}`;
    axios
      .get(url)
      .then(response => {
        this.setState({ projectData: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={<div><Icon style={{ color: '#1890FF' }}><FontAwesomeIcon icon='user' /></Icon> Edit Project</div>}
        onOk={this.handleOkEditProjectModal}
        visible={true}
        onCancel={this.props.handleCancelEditProjectModal}
        okText="Save Changes"
        maskClosable={false}
        bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
      >
        <div style={{ color: "red" }}>
          {this.state.errorStatus.description}
        </div>
        <Form onSubmit={this.handleOkEditProjectModal} layout={'vertical'}>
          <FormItem style={{ marginBottom: '0px' }} label="Global ID">
            {getFieldDecorator('globalId', {
              rules: [
                { required: true, message: 'Please input Global ID' },
                { max: 10, message: 'Global ID must be 10 characters or less' }
              ],
              initialValue: this.state.projectData.globalId
            })(
              <Input
                placeholder='Global ID'
              />
            )}
          </FormItem>
          <FormItem style={{ marginBottom: '0px' }} label="Name">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Please input Name' },
                { max: 255, message: 'Name must be 255 characters or less' }
              ],
              initialValue: this.state.projectData.name
            })(
              <Input placeholder='Name' />
            )}
          </FormItem>
          <FormItem style={{ marginBottom: '0px' }} label="Description">
            {getFieldDecorator('description', {
              rules: [
                { max: 255, message: 'Description must be 255 characters or less' }
              ],
              initialValue: this.state.projectData.description
            })(
              <Input.TextArea placeholder='Description' />
            )}
          </FormItem>
          <Form.Item style={{ float: 'left', marginBottom: '0px' }} label="Due Date">
            {getFieldDecorator('dueDate', {
              initialValue: moment.utc(this.state.projectData.dueDate)
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </Form.Item>

          <Form.Item style={{ float: 'right', marginBottom: '0px' }} label="Date Created">
            {getFieldDecorator('createDate', {
              rules: [
                { required: true, message: 'Please input Date Created' },
              ],
              initialValue: moment.utc(this.state.projectData.createDate)
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </Form.Item>

          <Form.Item style={{ float: 'left', marginBottom: '0px' }} label="Date Completed">
            {getFieldDecorator('completeDate', {
              initialValue: moment.utc(this.state.projectData.completeDate)
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </Form.Item>

          <Form.Item style={{ float: 'right', marginBottom: '0px', paddingRight: '143px' }} label="Is Active">
            {getFieldDecorator('isActive', {
              initialValue: this.state.projectData.isActive,
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

export default Form.create()(EditProjectModal);