import React, { Component } from 'react';
import { Icon, Modal, Input, Select, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const FormItem = Form.Item;
const { Option } = Select;

class EditUserGroupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserGroupData: {},
      projectData: [],
      errorStatus: {}
    }
  }

  editUserGroup = (UserGroupInfo) => {
    let valid = true
    const url = `https://senior-design.timblin.org/api/UserGroup/${this.props.UserGroupId}?accessToken=${this.props.accessToken}`
    axios.patch(url, {
      name: UserGroupInfo.name,
      description: UserGroupInfo.description,
      projectId: UserGroupInfo.projectId
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

  handleOkEditUserGroupModal = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.editUserGroup(values);
      }
    })
  }


  componentWillMount() {
    this.fetchUserGroup();
    this.fetchProjects();
  }

  fetchProjects = async () => {
		console.log(this.props.accessToken);
		const url = `https://senior-design.timblin.org/api/project?accessToken=${this.props.accessToken}`;
		const url2 = `https://abortplatteville.com/api/project?accessToken=${this.props.accessToken}`;
		axios
			.get(url)
			.then(response => {
        let projects = response.data.projects
				this.setState({ projectData: projects });
			})
			.catch(error => {
				console.log(error);
			});
	};

  fetchUserGroup = async () => {
    console.log(this.props.accessToken);
    const url = `https://senior-design.timblin.org/api/UserGroup/${this.props.UserGroupId}?accessToken=${this.props.accessToken}`;
    const url2 = `https://abortplatteville.com/api/UserGroup/${this.props.UserGroupId}?accessToken=${this.props.accessToken}`;
    axios
      .get(url)
      .then(response => {
        this.setState({ UserGroupData: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    console.log(this.state);
    return (
      <Modal
        title={<div><Icon style={{ color: '#1890FF' }}><FontAwesomeIcon icon='user' /></Icon> Edit User Group</div>}
        onOk={this.handleOkEditUserGroupModal}
        visible={true}
        onCancel={this.props.handleCancelEditUserGroupModal}
        okText="Save Changes"
        maskClosable={false}
        bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
      >
        <div style={{ color: "red" }}>
          {this.state.errorStatus.description}
        </div>
        <Form onSubmit={this.handleOkEditUserGroupModal} layout={'vertical'}>
          <FormItem style={{ marginBottom: '0px' }} label="Project" >
            {getFieldDecorator('projectId', {
              rules: [
                { required: true, message: 'Please select a Project' }
              ],
            })
              (
                <Select 
                  placeholder='Please select a project'
                  showSearch
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                  {this.state.projectData.sort((a, b) => a.name.localeCompare(b.name)).map(project => (
                    <Option value={project.id}>{project.name}</Option>
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
              initialValue: this.state.UserGroupData.name
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
              initialValue: this.state.UserGroupData.description
            })
              (
                <Input.TextArea placeholder='Description' />
              )}
          </FormItem>   
        </Form>
      </Modal>
    );
  }

}

export default Form.create()(EditUserGroupModal);