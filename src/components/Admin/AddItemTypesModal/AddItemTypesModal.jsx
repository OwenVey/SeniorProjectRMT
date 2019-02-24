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
            itemTypes: [
                // {
                //   icon: <FontAwesomeIcon icon='archive' />,
                //   display: "Projects",
                //   //plural: "Projects",
                //   //key: "AITEM",
                //   description: "Used for projects",
                //   id: "80",
                //   system: "No"
                // },
                // {
                //   icon: <FontAwesomeIcon icon='paperclip' />,
                //   display: "Attachment",
                //   //plural: "Attachments",
                //   //key: "ATT",
                //   description: "Attachment Type",
                //   id: "22",
                //   system: "Yes"
                // },
                // {
                //   icon: <FontAwesomeIcon icon='file-alt' />,
                //   display: "Requirements",
                //   //plural: "Requirements",
                //   //key: "CAUS",
                //   description: "Used in the projects component",
                //   id: "129",
                //   system: "No"
                // },
                // {
                //   icon: <FontAwesomeIcon icon='file-signature' />,
                //   display: "Note",
                //   //plural: "Note",
                //   //key: "FM",
                //   description: "Used in Requirements",
                //   id: "128",
                //   system: "No"
                // }
            ],
            columns: [
                {
                    title: "Item",
                    dataIndex: "icon",
                    defaultSortOrder: "descend",
                    align: 'center',
                    render: index => <span>{index}</span>,
                },
                {
                    title: "Display",
                    dataIndex: "display",
                    sorter: (a, b) => a.display.localeCompare(b.display),
                    render: index => <span>{index}</span>,
                },
                // {
                //   title: "Plural",
                //   dataIndex: "plural",
                //   sorter: (a, b) => a.plural.localeCompare(b.plural),
                //   render: index => <span>{index}</span>,
                // },
                // {
                //   title: "Key",
                //   dataIndex: "key",
                //   sorter: (a, b) => a.key.localeCompare(b.key),
                //   render: index => <span>{index}</span>,
                // },
                {
                    title: "Description",
                    dataIndex: "description",
                    sorter: (a, b) => a.description.localeCompare(b.description),
                    render: index => <span>{index}</span>,
                },
                {
                    title: "ID",
                    dataIndex: "id",
                    sorter: (a, b) => a.id.localeCompare(b.id),
                    render: index => <span>{index}</span>,
                },
                {
                    title: "System",
                    dataIndex: "system",
                    sorter: (a, b) => a.system.localeCompare(b.system),
                    render: index => <span>{index}</span>,
                },
                {
                    title: "Action",
                    dataIndex: "action",
                    render: (index, itemType) => (
                        <span>
                            <a href='#none' >Edit</a>
                            <Divider type='vertical' />
                            <a href='#none'>Fields</a>
                            <Divider type='vertical' />
                            <a href='#none'>Views</a>
                            <Divider type='vertical' />
                            <Button onClick={() => this.handleDeleteItem(itemType)}>Delete</Button>
                            {/* <Modal
                      className="deleteModal"
                      title={<div><Icon type='bars' style={{ color: '#1890ff' }}></Icon> Delete Item Type?</div>}
                      visible={this.state.deleteModal}
                      onCancel={() => this.setState({ deleteModal: false })}
                      // onOk={() => this.handleDeleteItem(itemType.id)}
                      footer={
                        [
                          <Button key="back" onClick={() => this.setState({ deleteModal: false })}>Cancel</Button>,
                          <Button key="submit" type="primary" onClick={() => this.handleDeleteItem(itemType.id)}>Yes</Button>,
                        ]
                      } >Do you really want to delete the selected item type?</Modal > */}
                        </span >
                    )
                }
            ],
            visible: false,
            icon: <div></div>,
            display: "",
            description: "",
            id: "",
            system: "",
        };
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
        const { icon, display, description, id, system } = this.state;
        let newItemType = {
            icon,
            display,
            description,
            id,
            system,
        }
        this.setState({
            visible: false,
            itemTypes: [...this.state.itemTypes, newItemType],
        });
        console.log("ERROR!");
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
                    okText="Add Item Type"
                    footer={[
                        <Button key="cancel" onClick={this.handleCancel}>Cancel</Button>,
                        <Button key="submit" type="primary" onClick={this.handleAddItemType}>Add</Button>
                    ]}
                >
                    <Form onOk={this.handleAddItemType}>
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