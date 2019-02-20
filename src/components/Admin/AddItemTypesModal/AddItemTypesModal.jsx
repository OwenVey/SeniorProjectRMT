import React, { Component } from 'react';
import { Icon, Modal, Input, Select, Form, DatePicker, Button, Table } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const Option = Select.Option;
const FormItem = Form.Item;

class AddItemTypesModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleAddItemType = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { icon, display,/* plural, key,*/ description, id, system } = this.state;
                let newItemType = {
                    icon,
                    display,
                    //plural,
                    //key,
                    description,
                    id,
                    system,
                }
                this.setState({
                    visible: false,
                    itemTypes: [...this.state.itemTypes, newItemType],

                });
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
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
            <div>
                <div style={{ display: 'flex', flexDirection: 'row', margin: 20, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button id="button" onClick={this.showModal} style={{ marginRight: 0 }}>
                        <Icon type="plus-circle" theme='filled' style={{ color: "#1890ff" }}></Icon>Add Item Type
                    </Button>
                </div>
                <Modal
                    title={<div><Icon type='bars' style={{ color: '#1890ff' }}></Icon> Add Item Types</div>}
                    visible={this.state.visible}
                    onOk={this.handleAddItemType} //Needed so that hitting the Add button works
                    onCancel={this.handleCancel}
                    okText="Add Item Type"
                >
                    <Form onOk={this.handleAddItemType}>
                        <FormItem style={{ marginBottom: '0px' }} label="Icon">
                            {getFieldDecorator('iconName', {
                                rules: [
                                    { required: true, message: 'Please input icon name' },
                                    { max: 255, message: 'Name must be 255 characters or less' }],
                            })
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
                                (<Input required={true} className="inputFields" value={this.state.display} onChange={(e) => this.setState({ display: e.target.value })} placeholder='Display' />)}
                        </FormItem>

                        <FormItem style={{ marginBottom: '0px' }} label="Description">
                            {getFieldDecorator('description', {
                                rules: [
                                    { required: true, message: 'Please input item type\'s description' },
                                    { max: 255, message: 'Name must be 255 characters or less' }],
                            })
                                (<Input.TextArea className="inputFields" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} placeholder="Description" />)}
                        </FormItem>
                        <FormItem style={{ marginBottom: '0px' }} label="Id">
                            {getFieldDecorator('id', {
                                rules: [
                                    { required: true, message: 'Please input item type\'s id' },
                                    { max: 255, message: 'Name must be 255 characters or less' }],
                            })
                                (<Input className="inputFields" value={this.state.id} onChange={(e) => this.setState({ id: e.target.value })} placeholder="id" />)}
                        </FormItem>
                        <FormItem style={{ marginBottom: '0px' }} label="ProjectID">
                            {getFieldDecorator('ProjectId', {
                                rules: [
                                    { required: true, message: 'Please input item type\'s ProjectIDs' },
                                    { max: 255, message: 'Name must be 255 characters or less' }],
                            })
                                (<Input className="inputFields" value={this.state.id} onChange={(e) => this.setState({ projectId: e.target.value })} placeholder="id" />)}
                        </FormItem>
                    </Form>
                </Modal>
            </div >
        );
    }

}

export default Form.create()(AddItemTypesModal);