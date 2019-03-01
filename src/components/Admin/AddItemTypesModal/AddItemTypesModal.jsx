import React, { Component } from 'react';
import { Icon, Modal, Input, Select, Form, DatePicker, Button, Table, Divider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const Option = Select.Option;
const FormItem = Form.Item;

class AddItemTypesModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objectTypes: []
        };
    }

    handleOk = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //object destructuring
                /*
                "objectTypes": [
                    {
                    "id": 0,
                    "name": "string",
                    "description": "string",
                    "iconUrl": "string",
                    "projectId": 0
                    }
                ]
                */
                const { name, description } = values;
                console.log('Received values of form: ', values);
                let newItemType = {
                    name,
                    description,
                }
                // Call add item when backend link ready
                // console.log(values.iconName);
                // console.log(values.iconName.key);
                // console.log(values.name);
                // console.log(values.description);
                // console.log(values.ProjectId);
                this.props.hide() //move this to call above
            }
        })
    }

    //icon:iconName

    // handleAddItemType = (e) => {
    //     const { icon, display, description, id, system } = this.state;
    //     let newItemType = {
    //         icon,
    //         display,
    //         description,
    //         id,
    //         system,
    //     }
    //     this.setState({
    //         visible: false,
    //         itemTypes: [...this.state.itemTypes, newItemType],
    //     });
    //     console.log("ERROR!");
    // }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title={<div><Icon type='bars' style={{ color: '#1890ff' }}></Icon> Add Item Types</div>}
                onOk={this.handleOk}
                visible={true}
                onCancel={this.props.handleCancelAddItemTypesModal}
                okText="Add"
                maskClosable={false}
                bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
            >
                <Form onSubmit={this.handleOK}>
                    <FormItem style={{ marginBottom: '0px' }} label="Icon">
                        {getFieldDecorator('iconName')
                            (<Select
                                className="inputFields"
                                labelInValue
                                style={{ width: 200 }}
                                onChange={this.handleChange}
                                placeholder='Select icon'
                            >
                                <Option value='projects'><Icon><FontAwesomeIcon icon="archive" /></Icon></Option>
                                <Option value="attachments"><Icon><FontAwesomeIcon icon="paperclip" /></Icon></Option>
                                <Option value="requirements"><Icon><FontAwesomeIcon icon="file-signature" /></Icon></Option>
                                <Option value="note"><Icon><FontAwesomeIcon icon="file-alt" /></Icon></Option>
                            </Select>)}
                    </FormItem>
                    <FormItem style={{ marginBottom: '0px' }} label="Display">
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: 'Please input item type\'s name' },
                                { max: 255, message: 'Name must be 255 characters or less' }],
                        })
                            (<Input placeholder='Display' />)}
                    </FormItem>
                    <FormItem style={{ marginBottom: '0px' }} label="Description">
                        {getFieldDecorator('description', {
                            rules: [
                                { required: true, message: 'Please input item type\'s description' },
                                { max: 255, message: 'Name must be 255 characters or less' }],
                        })
                            (<Input.TextArea placeholder="Description" />)}
                    </FormItem>
                    <FormItem style={{ marginBottom: '0px' }} label="ProjectID">
                        {getFieldDecorator('ProjectId', {
                            rules: [
                                { required: true, message: 'Please input item type\'s ProjectIDs' },
                                { max: 255, message: 'Name must be 255 characters or less' }],
                        })
                            (<Input placeholder="Project ID" />)}
                    </FormItem>
                </Form>
            </Modal>
        );
    }

}

export default Form.create()(AddItemTypesModal);
