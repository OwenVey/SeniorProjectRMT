import React, { Component } from 'react';
import { Icon, Modal, Input, Select, Form, DatePicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const FormItem = Form.Item;

class EditProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
    }
  }

  handleOkEditProjectModal = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.editProject(values);
      }
    })
  }

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
        <Form onSubmit={this.handleOkEditProjectModal}>
        </Form>
      </Modal>
    );
  }

}

export default Form.create()(EditProjectModal);