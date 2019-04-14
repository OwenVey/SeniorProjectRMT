import React, { Component } from 'react';
import { Icon, Modal, Form, Row, Col, Checkbox, DatePicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { clickCancelEditPermission, editUserProjectPermission } from '../../../actions/permissions';
import moment from 'moment';

const FormItem = Form.Item;

class EditPermissionModal extends Component {

  validateEndDate = (rule, value, callback) => {
    if (value > moment() || value == null) {
      callback();
      return;
    }
    callback('End Date must be in the future!');
  }

  handleOkEditPermissionModal = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let permissionString = "";
        if (values.permission) {
          permissionString = values.permission.includes("Create") ? 'C' : ''
          permissionString += values.permission.includes("Read") ? 'R' : ''
          permissionString += values.permission.includes("Manage") ? 'M' : ''
          permissionString += values.permission.includes("Delete") ? 'D' : ''
          permissionString += values.permission.includes("Admin") ? 'A' : ''
        }
        values.permission = permissionString;
        this.props.editUserProjectPermission(this.props.accessToken, this.props.selectedPermission, values);
      }
    })
  }

  getPermissionCheckboxes = (permissionString) => {
    let checkboxes = [];
    checkboxes.push(permissionString.includes('C') ? 'Create' : null)
    checkboxes.push(permissionString.includes('R') ? 'Read' : null)
    checkboxes.push(permissionString.includes('M') ? 'Manage' : null)
    checkboxes.push(permissionString.includes('D') ? 'Delete' : null)
    checkboxes.push(permissionString.includes('A') ? 'Admin' : null)
    return checkboxes;
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
        title={<div><Icon style={{ color: '#1890FF' }}><FontAwesomeIcon icon='unlock-alt' /></Icon> Edit Permission</div>}
        onOk={this.handleOkEditPermissionModal}
        visible={true}
        onCancel={() => this.props.clickCancelEditPermission()}
        okText="Save Changes"
        maskClosable={false}
        bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
      >
        <div style={{ color: 'red' }}>{this.props.editError}</div>
        <Form onSubmit={this.handleOkEditPermissionModal} layout={'vertical'}>
          <FormItem style={{ marginBottom: '0px' }} label="Permissions">
            {getFieldDecorator('permission', {
              rules: [
              ],
              initialValue: this.getPermissionCheckboxes(this.props.selectedPermission.permission)
            })(
              <Checkbox.Group style={{ width: "100%" }}>
                <Row>
                  <Col span={8}><Checkbox value="Create">Create</Checkbox></Col>
                  <Col span={8}><Checkbox value="Read">Read</Checkbox></Col>
                  <Col span={8}><Checkbox value="Manage">Manage</Checkbox></Col>
                  <Col span={8}><Checkbox value="Delete">Delete</Checkbox></Col>
                  <Col span={8}><Checkbox value="Admin">Admin</Checkbox></Col>
                </Row>
              </Checkbox.Group>
            )}
          </FormItem>
          <FormItem style={{ float: 'left' }} {...FormItemLayout} label="End Date">
            {getFieldDecorator('endDate', {
              rules: [
                { validator: this.validateEndDate }
              ],
              initialValue: moment.utc(this.props.selectedPermission.endDate)
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }

}

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  selectedPermission: state.permissions.selectedPermission,
  editError: state.permissions.editError,
});

export default connect(mapStateToProps, { clickCancelEditPermission, editUserProjectPermission })(Form.create()(EditPermissionModal));
