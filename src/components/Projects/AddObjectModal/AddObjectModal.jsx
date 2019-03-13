import React, { Component } from 'react';
import { Icon, Modal, Input, InputNumber, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

class AddObjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  AddObject = (objectInfo) => {
    let valid = true
    const url = `https://senior-design.timblin.org/api/object?accessToken=${this.props.accessToken}`
    axios.post(url, {
      global_id: objectInfo.GlobalID,
      name: objectInfo.Name,
      text: objectInfo.Description,
      parent: null,
      project_id: 1,
      listing: objectInfo.listing,
    })
      .catch(error => {
        valid = false
        console.log(error.response)
      })
      .finally(() => {
        if (valid) {
          this.props.hide()
        }
      })
  }

  handleOkAddObjectModal = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.AddObject(values);
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
        <Form onSubmit={this.handleOkAddObjectModal}>
          <FormItem style={{ marginBottom: '0px' }} label="Global ID">
            {getFieldDecorator('GlobalID', {
              rules: [{ max: 10, message: 'ID must be 10 characters or less!' }],
            })(
              <Input placeholder='Global ID' />
            )}
          </FormItem>

          <FormItem style={{ marginBottom: '0px' }} label="Name">
            {getFieldDecorator('Name', {
              rules: [
                { required: true, message: 'Please input name' },
                { max: 255, message: 'Name must be 255 characters or less!' }
              ],
            })(
              <Input placeholder='Name' />
            )}
          </FormItem>

          <FormItem style={{ marginBottom: '0px' }} label="Description">
            {getFieldDecorator('Description', {
              rules: [
                { required: true, message: 'Please input description' },
                { max: 255, message: 'Description must be 255 characters or less!' }
              ],
            })(
              <Input placeholder='Description' />
            )}
          </FormItem>

          <Form.Item
            {...formItemLayout}
            label="Listing"
          >
            {getFieldDecorator('listing', { initialValue: 0 })(
              <InputNumber min={0} />
            )}
            <span className="ant-form-text"></span>
          </Form.Item>
        </Form>
      </Modal>
    );
  }

}

export default Form.create()(AddObjectModal);
