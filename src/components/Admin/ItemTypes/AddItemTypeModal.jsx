import React, { Component } from 'react';
import { Icon, Modal, Input, Select, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from "react-redux";
import { hideAddItemTypeModal, addItemType } from '../../../actions/itemTypes';

const Option = Select.Option;
const FormItem = Form.Item;

class AddItemTypeModal extends Component {

  handleOk = e => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.addItemType(this.props.accessToken, values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        title={
          <>
            <Icon style={{ color: "#1890FF", marginRight: 10 }}>
              <FontAwesomeIcon icon="list" />
            </Icon>
            Add Item Type
        </>
        }
        onOk={this.handleOk}
        visible={true}
        onCancel={() => this.props.hideAddItemTypeModal()}
        okText="Add"
        maskClosable={false}
        bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
        okButtonProps={{ loading: this.props.loadingAdd }}
      >
        <Form >
          <FormItem style={{ marginBottom: '0px' }} label="Project" >
            {getFieldDecorator('projectId', {
              rules: [
                { required: true, message: 'Select project' }
              ],

            })(
              <Select
                placeholder='Please select a project'
                showSearch
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {this.props.projects.map(project => (
                  <Option key={project.id} value={project.id}>{`${project.name} (${project.globalId})`}</Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem style={{ marginBottom: '0px' }} label="Icon">
            {getFieldDecorator('icon', {
              rules: [
                { required: true, message: 'Please select an icon' }],
            })(<Select
              className="inputFields"
              style={{ width: 200 }}
              placeholder='Select icon'
            >
              <Option value='archive'><Icon><FontAwesomeIcon icon="archive" /></Icon></Option>
              <Option value="paperclip"><Icon><FontAwesomeIcon icon="paperclip" /></Icon></Option>
              <Option value="file-signature"><Icon><FontAwesomeIcon icon="file-signature" /></Icon></Option>
              <Option value="file-alt"><Icon><FontAwesomeIcon icon="file-alt" /></Icon></Option>
            </Select>)}
          </FormItem>
          <FormItem style={{ marginBottom: '0px' }} label="Name">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Please input item type\'s name' },
                { max: 255, message: 'Name must be 255 characters or less' }],
            })(
              <Input placeholder='Name' />
            )}
          </FormItem>
          <FormItem style={{ marginBottom: '0px' }} label="Description">
            {getFieldDecorator('description', {
              rules: [
                { required: true, message: 'Please input item type\'s description' },
                { max: 255, message: 'Name must be 255 characters or less' }],
            })(
              <Input.TextArea placeholder="Description" />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  projects: state.projects.projects,
  loadingAdd: state.itemTypes.loading,
});

export default connect(mapStateToProps, { hideAddItemTypeModal, addItemType })(Form.create()(AddItemTypeModal));


