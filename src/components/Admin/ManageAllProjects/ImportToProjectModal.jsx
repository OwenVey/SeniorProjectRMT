import React, { Component } from 'react';
import { Icon, Modal, Input, Button, Upload, message, Form, Divider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from "react-redux";
import { clickCancelImportToProject, importToProject } from '../../../actions/projects'
import ExportButtonExcel from '../../Projects/Export/ExportExcel';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';

const uploadProps = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

class ImportToProjectModal extends Component {

  handleOkImportToProjectModal = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.importToProject(this.props.accessToken, { ...values, fileObj: this.props.fileObj.id });
      }
    })
  }

  fileHandler = (event) => {
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if(err){
        console.log(err);            
      }
      else{
        this.setState({
          cols: resp.cols,
          rows: resp.rows
        });
      }
    });               

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
        title={
          <>
            <Icon style={{ color: '#1890FF', marginRight: 10 }}>
              <FontAwesomeIcon icon='project-diagram' />
            </Icon>
            Import To Project / Export To Excel
          </>
        }
        onOk={this.handleOkImportToProjectModal}
        visible={true}
        onCancel={() => this.props.clickCancelImportToProject()}
        okText="Confirm"
        okButtonProps={{ loading: this.props.loadingImport }}
        maskClosable={false}
        bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
      >
        <div style={{ color: 'red' }}>{this.props.errorMessage}</div>
        <Form onSubmit={this.handleOkImportToProjectModal}>
            <div>
                <div style={{"padding-bottom":"15px"}}>
                    <h2>Export</h2>
                    <ExportButtonExcel />
                </div>
                <Divider />
                <div>
                    <h2>Import</h2>
                    <div>
                        <input type="file" onChange={this.fileHandler.bind(this)} style="60" />
                    </div>
                </div>
            </div>
        </Form>
      </Modal>
    );
  }

}

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  loadingImport: state.projects.loadingImport,
  errorMessage: state.projects.importError,
});

export default connect(mapStateToProps, { clickCancelImportToProject, importToProject })(Form.create()(ImportToProjectModal));