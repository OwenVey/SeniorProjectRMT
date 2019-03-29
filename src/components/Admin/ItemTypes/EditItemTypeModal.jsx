import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Modal, Input, Select, Form } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { editItemType } from "../../../actions/itemTypes";
import axios from 'axios';
import { connect } from "react-redux";
import { clickCancelEditItemType, editItemType } from '../../../actions/itemTypes'

class EditItemTypeModal extends Component {

    editItemType = (itemType) => {
      let valid = true
      const url = `https://senior-design.timblin.org/api/objectType/${this.props.projectId}?accessToken=${this.props.accessToken}`
      axios.patch(url, {
        name: itemType.name,
        description: itemType.description,
        projectId: itemType.projectId,
        iconUrl: itemType.icon,
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
  
    handleOkEditItemTypeModal = (e) => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.editItemType(this.props.accessToken, { ...values, id: this.props.selectedProject.id });
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
                <FontAwesomeIcon icon='user' />
              </Icon>
              Edit Item Type
            </>
          }
          onOk={this.handleOkEditItemTypeModal}
          visible={true}
          onCancel={() => this.props.clickCancelEditItemType()}
          okText="Save Changes"
          okButtonProps={{ loading: this.props.loadingEdit }}
          maskClosable={false}
          bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
        >
          <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
          <Form onSubmit={this.handleOkEditItemTypeModal} layout={'vertical'}>
            <Form.Item style={{ marginBottom: '0px' }} label="Project ID">
              {getFieldDecorator('projectId', {
                rules: [
                  { required: true, message: 'Please input Project ID' },
                  { max: 10, message: 'Project ID must be 10 characters or less' }
                ],
                initialValue: this.props.selectedItemType.projectId
              })(
                <Input
                  placeholder='Project ID'
                />
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
      );
    }
  }
  
  const mapStateToProps = state => ({
    accessToken: state.authentication.accessToken,
    selectedItemType: state.projects.selectedItemType,
    loadingEdit: state.projects.loadingEdit,
    errorMessage: state.projects.editErrorMessage,
  });
  
  export default connect(mapStateToProps, { clickCancelEditItemType, editItemType })(Form.create()(EditItemTypeModal));