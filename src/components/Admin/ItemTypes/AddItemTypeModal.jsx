import React, { Component } from 'react';
import { Icon, Modal, Input, Select, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from "react-redux";
import { clickCancelAddItemType, addItemType } from '../../../actions/itemTypes';

const Option = Select.Option;
const FormItem = Form.Item;

class AddItemTypeModal extends Component {

    handleOk = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.addItemType(this.props.accessToken, values);
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
                title={<div><Icon type='bars' style={{ color: '#1890ff' }}></Icon> Add Item Types</div>}
                onOk={this.handleOk}
                visible={true}
                onCancel={() => this.props.clickCancelAddItemType()}
                okText="Add"
                maskClosable={false}
                bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
            >
                <Form onSubmit={this.handleOk}>
                    <FormItem style={{ marginBottom: '0px' }} label="Icon">
                        {getFieldDecorator('icon', {
                            rules: [
                                { required: true, message: 'Please select an icon' }],
                        })
                            (<Select
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
                    <FormItem style={{ marginBottom: '0px' }} label="Display">
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: 'Please input item type\'s name' },
                                { max: 255, message: 'Name must be 255 characters or less' }],
                        })(
                            <Input placeholder='Display' />
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
                    <FormItem style={{ marginBottom: '0px' }} label="ProjectID - MUST BE 6, 7, or 8">
                        {getFieldDecorator('projectId', {
                            rules: [
                                { required: true, message: 'Please input item type\'s ProjectIDs' },
                                { max: 255, message: 'Name must be 255 characters or less' }],
                        })(
                            <Input placeholder="Project ID" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    accessToken: state.authentication.accessToken,
});

export default connect(mapStateToProps, { clickCancelAddItemType, addItemType })(Form.create()(AddItemTypeModal))


