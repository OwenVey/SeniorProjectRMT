import React, { Component } from 'react';
import { Icon, Modal, Input, Form, Select, Switch } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from "react-redux";
import { clickCancelEditBranch, editBranch } from '../../../actions/projects'

const Option = Select.Option;

class EditBranchModal extends Component {

  handleOkEditBranchModal = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.editBranch(this.props.accessToken, { ...values, id: this.props.selectedBranch.id });
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
              <FontAwesomeIcon icon='code-branch' />
            </Icon>
            Edit Branch
          </>
        }
        onOk={this.handleOkEditBranchModal}
        visible={true}
        onCancel={() => this.props.clickCancelEditBranch()}
        okText="Save Changes"
        okButtonProps={{ loading: this.props.loadingEdit }}
        maskClosable={false}
        bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
      >
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        <Form onSubmit={this.handleOkEditBranchModal} layout={'vertical'}>
          <Form.Item style={{ marginBottom: '0px' }} label="Name">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Please input branch name' },
                { max: 255, message: 'Name must be 255 characters or less' }
              ],
              initialValue: this.props.selectedBranch.name
            })(
              <Input placeholder='Name' />
            )}
          </Form.Item>
          <Form.Item style={{ marginBottom: '0px' }} label="Owner" >
            {getFieldDecorator('ownerId', {
              rules: [
                { required: true, message: 'Please select an Owner' }
              ],
              initialValue: this.props.selectedBranch.ownerId
            })(
              <Select
                showSearch
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {this.props.users.map(user => (
                  <Option key={user.id} value={user.id}>{`${user.firstName} ${user.lastName} (${user.id})`}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item style={{ marginBottom: '0px' }} label="Locked">
            {getFieldDecorator('isLocked', {
            })(
              <Switch defaultChecked={this.props.selectedBranch.isLocked} />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  selectedBranch: state.projects.selectedBranch,
  loadingEdit: state.projects.loadingEdit,
  errorMessage: state.projects.editErrorMessage,
  users: state.users.users,
});

export default connect(mapStateToProps, { clickCancelEditBranch, editBranch })(Form.create()(EditBranchModal));