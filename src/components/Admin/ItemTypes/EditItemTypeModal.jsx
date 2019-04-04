import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Modal, Input, Select, Form } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hideEditItemTypeModal, editItemType } from '../../../actions/itemTypes';

class EditItemTypeModal extends Component {

    handleOkEditItemTypeModal = e => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.editItemType(
            this.props.selectedItemType.id, 
            { ...values, id: this.props.selectedItemType.id },
            this.props.accessToken,
          );
        }
      })
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: 15,
          justifyContent: "flex-end"
        }}
        >
          <Modal
            title={
              <>
                <Icon style={{ color: '#1890FF', marginRight: 10 }}>
                  <FontAwesomeIcon icon='list' />
                </Icon>
                Edit Item Type
              </>
            }
            onOk={this.handleOkEditItemTypeModal}
            visible={true}
            onCancel={() => this.props.hideEditItemTypeModal()}
            okText="Save Changes"
            maskClosable={false}
            bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
          >
            <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
            <Form onSubmit={this.handleOkEditItemTypeModal} layout={'vertical'}>
              <Form.Item style={{ marginBottom: '0px' }} label="Project" >
              {getFieldDecorator('projectId', {
                rules: [
                  { required: true, message: 'Select project' }
                ],
                initialValue: this.props.selectedItemType.projectId
              })(
                <Select
                  placeholder='Please select a project'
                  showSearch
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {this.props.projects.map(project => (
                    <Select.Option key={project.id} value={project.id}>{`${project.name} (${project.globalId})`}</Select.Option>
                  ))}
                </Select>
              )}
              </Form.Item>
              <Form.Item style={{ marginBottom: '0px' }} label="Name">
                {getFieldDecorator('name', {
                  rules: [
                    { required: true, message: 'Please input Name' },
                    { max: 255, message: 'Name must be 255 characters or less' }
                  ],
                  initialValue: this.props.selectedItemType.name
                })(
                  <Input placeholder='Name' />
                )}
              </Form.Item>
              <Form.Item style={{ marginBottom: '0px' }} label="Description">
                {getFieldDecorator('description', {
                  rules: [
                    { max: 255, message: 'Description must be 255 characters or less' }
                  ],
                  initialValue: this.props.selectedItemType.description
                })(
                  <Input.TextArea placeholder='Description' />
                )}
              </Form.Item>
              <Form.Item style={{ marginBottom: '0px' }} label="Icon Url">
                {getFieldDecorator('iconUrl', {
                  rules: [
                    { required: true, message: 'Please input Icon Url' },
                    { max: 255, message: 'Icon Url must be 255 characters or less' }
                  ],
                  initialValue: this.props.selectedItemType.iconUrl
                })(
                  <Input placeholder='Icon Url' />
                )}
              </Form.Item>
            </Form>
          </Modal>
        </div>
      );
    }
  }
  
  const mapStateToProps = state => ({
    accessToken: state.authentication.accessToken,
    selectedItemType: state.itemTypes.editItemType,
    loadingEdit: state.projects.loading,
    errorMessage: state.projects.editErrorMessage,
    projects: state.projects.projects,
  });
  
  export default Form.create()(
    connect(
      mapStateToProps, 
      { hideEditItemTypeModal, editItemType }
    )(EditItemTypeModal)
  );
  
  
  