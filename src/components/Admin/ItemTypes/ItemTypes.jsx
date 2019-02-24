import React, { Component } from "react";
import { Divider, Table, Button, Modal, Input, Icon, Form } from "antd";
import { Select } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ItemTypes.css';
import { ItemTypesBar } from '../AdminBars/AdminBars'
const { Option } = Select;
const FormItem = Form.Item;

class ItemTypes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemTypes: [
        {
          icon: <FontAwesomeIcon icon='archive' />,
          display: "Projects",
          //plural: "Projects",
          //key: "AITEM",
          description: "Used for projects",
          id: "80",
          system: "No"
        },
        {
          icon: <FontAwesomeIcon icon='paperclip' />,
          display: "Attachment",
          //plural: "Attachments",
          //key: "ATT",
          description: "Attachment Type",
          id: "22",
          system: "Yes"
        },
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
      //plural: "",
      //key: "",
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

  handleDeleteItem = (itemType) => {
    this.setState({
      handleCancelModal: true,
    })
    Modal.confirm({
      title: 'Delete Item Type',
      content: 'Are you sure you want to delete this item type?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        //this.deleteUserGroup()
        this.setState({ handleCancelModal: false })
        this.deleteItemType(itemType.id)
      },
      onCancel: () => {
        this.setState({ handleCancelModal: false })
      }
    });
  }

  deleteItemType = (id) => {
    console.log(id);
    this.setState({
      itemTypes: this.state.itemTypes.filter((itemType) => itemType.id !== id)
    })
  }

  handleDeleteCancel = () => {
    this.setState({
      deleteModal: false,
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


  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleChange = (value) => {
    this.setState({
      icon: value.label,
    });
  }

  render() {
    //This doesn't work.
    //const { getFieldDecorator } = this.props.form;
    this.dragProps = {
      onDragEnd(fromIndex, toIndex) {
        const columns = this.state.columns;
        const item = columns.splice(fromIndex, 1)[0];
        columns.splice(toIndex, 0, item);
        this.setState({
          columns
        });
      },
      nodeSelector: "th"
    };

    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', margin: 20, alignItems: 'center', justifyContent: 'space-between' }}>
          <ItemTypesBar />
        </div>
        <div style={{ margin: 20 }}>
          <Table
            columns={this.state.columns}
            pagination={false}
            dataSource={this.state.itemTypes}
            icon={<FontAwesomeIcon />}
            bordered
          />
        </div>
      </div >
    );
  }
}
export default ItemTypes;