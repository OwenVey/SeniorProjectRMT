import React, { Component } from 'react';
import { Icon, Modal, Input, Select, Form, DatePicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const FormItem = Form.Item;

class EditProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = { projectData:  { globalId: ' ' }}
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
		const url2 = `https://abortplatteville.com/api/project/${this.props.projectId}?accessToken=${this.props.accessToken}`;
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
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 40 },
        sm: { span: 40 },
      },
    };
    console.log(this.state);
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
        <Form onSubmit={this.handleOkEditProjectModal}>
          <FormItem style={{ marginBottom: '0px' }} label="Global ID">
            {getFieldDecorator('globalId', {
              rules: [{ max: 10, message: 'Global ID must be 10 characters or less' }],
            })
            (
              <Input 
               value={this.state.projectData.globalId}
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
            })
            (
              <Input placeholder='Name' />
            )}
          </FormItem>
          <FormItem style={{ marginBottom: '0px' }} label="Description">
            {getFieldDecorator('description', {
              rules: [
                { max: 255, message: 'Description must be 255 characters or less' }
              ],
            })
            (
              <Input placeholder='Description' />
            )}
          </FormItem>
          <Form.Item style={{float: 'left' }} {...formItemLayout} label="Due Date">
            {getFieldDecorator('dueDate')
            (
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }

}

export default Form.create()(EditProjectModal);