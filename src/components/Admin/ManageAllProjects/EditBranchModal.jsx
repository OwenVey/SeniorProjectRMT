import React, { Component } from 'react';
import { Icon, Modal, Input, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from "react-redux";
import { clickCancelEditBranch, editBranch } from '../../../actions/projects'

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
          <Form.Item style={{ marginBottom: '0px' }} label="Global ID">
            {getFieldDecorator('globalId', {
              rules: [
                { max: 20, message: 'Global ID must be 20 characters or less' }
              ],
              initialValue: this.props.selectedBranch.globalId
            })(
              <Input placeholder='Global ID' />
            )}
          </Form.Item>
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
});

export default connect(mapStateToProps, { clickCancelEditBranch, editBranch })(Form.create()(EditBranchModal));