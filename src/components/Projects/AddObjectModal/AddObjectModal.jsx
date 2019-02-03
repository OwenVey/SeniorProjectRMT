import React, { Component } from 'react';
import { Icon, Modal, Input, Select, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const Option = Select.Option;
const FormItem = Form.Item;

const userGroups = [
  <Option key='Developer'>Developer</Option>,
  <Option key='Admin'>Admin</Option>,
  <Option key='PO'>Product Owner</Option>,
  <Option key='SM'>Scrum Master</Option>,
  <Option key='Customer'>Customer</Option>,
];

class AddObjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleOkAddObjectModal = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.hide()
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={<div><Icon style={{ color: '#1890FF' }}><FontAwesomeIcon icon='plus-circle' /></Icon> Add Object</div>}
        onOk={this.handleOkAddObjectModal}
        visible={true}
        onCancel={this.props.handleCancelAddObjectModal}
        okText="Add"
        maskClosable={false}
        bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
      >
        <Form onSubmit={this.handleOkAddObjectModal} hideRequiredMark={true}>
          <FormItem style={{ marginBottom: '0px' }} label="Name">
            {getFieldDecorator('Name', {
              rules: [{ required: true, message: 'Please input name' }],
            })(
              <Input placeholder='Name' />
            )}
          </FormItem>

          <FormItem style={{ marginBottom: '0px' }} label="Description">
            {getFieldDecorator('Description', {
              rules: [{ required: true, message: 'Please input description' }],
            })(
              <Input placeholder='Description' />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }

}

export default Form.create()(AddObjectModal);