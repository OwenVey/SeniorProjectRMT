import React, { Component } from "react";
import ReactDragListView from "react-drag-listview";
import { Divider, Table, Button, Modal, Input } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ItemTypes.css';

function onChange(pagination, sorter) {
  console.log("params", pagination, sorter);
}

class ItemTypes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemTypes: [
        {
          icon: <FontAwesomeIcon icon='archive' />,
          display: "Projects",
          plural: "Projects",
          key: "AITEM",
          description: "Used for projects",
          id: "80",
          system: "No"
        },
        {
          icon: <FontAwesomeIcon icon='paperclip' />,
          display: "Attachment",
          plural: "Attachments",
          key: "ATT",
          description: "Attachment Type",
          id: "22",
          system: "Yes"
        },
        {
          icon: <FontAwesomeIcon icon='file-alt' />,
          display: "Requirements",
          plural: "Requirements",
          key: "CAUS",
          description: "Used in the projects component",
          id: "129",
          system: "No"
        },
        {
          icon: <FontAwesomeIcon icon='file-signature' />,
          display: "Note",
          plural: "Note",
          key: "FM",
          description: "Used in Requirements",
          id: "128",
          system: "No"
        }
      ],
      columns: [
        {
          title: "Item",
          dataIndex: "icon",
          defaultSortOrder: "descend",

        },
        {
          title: "Display",
          dataIndex: "display",
          sorter: (a, b) => a.display.localeCompare(b.display)
        },
        {
          title: "Plural",
          dataIndex: "plural",
          sorter: (a, b) => a.plural.localeCompare(b.plural)
        },
        {
          title: "Key",
          dataIndex: "key",
          sorter: (a, b) => a.key.localeCompare(b.key)
        },
        {
          title: "Description",
          dataIndex: "description",
          sorter: (a, b) => a.description.localeCompare(b.description)
        },
        {
          title: "ID",
          dataIndex: "id",
          sorter: (a, b) => a.id.localeCompare(b.id)
        },
        {
          title: "System",
          dataIndex: "system",
          sorter: (a, b) => a.system.localeCompare(b.system)
        },
        {
          title: "Action",
          dataIndex: "action",
          render: () => (
            <span>
              <a href='' Popup>Edit</a>
              <Divider type='vertical' />
              <a href=''>Fields</a>
              <Divider type='vertical' />
              <a href=''>Views</a>
              <Divider type='vertical' />
              <a href=''>Delete</a>
            </span>)
        }
      ]
      ,
      visible: false,
      icon: "",
      display: "",
      plural: "",
      key: "",
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

  handleAddItemType = (e) => {
    const { icon, display, plural, key, description, id, system } = this.state;
    let newItemType = {
      icon: <FontAwesomeIcon icon='archive' />,
      display,
      plural,
      key,
      description,
      id,
      system,
    }
    this.setState({
      visible: false,
      itemTypes: [...this.state.itemTypes, newItemType],
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
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
        <Button class="button" type="primary" onClick={this.showModal}>
          Add item type
        </Button>
        <Modal title="Add item types"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="submit" type="primary" onClick={this.handleAddItemType}>
              Add
            </Button>,
          ]}>
          <Input placeholder='Display' value={this.state.display} onChange={(e) => this.setState({ display: e.target.value })} />
          <Input value={this.state.plural} onChange={(e) => this.setState({ plural: e.target.value })} placeholder="Plural" />
          <Input value={this.state.key} onChange={(e) => this.setState({ key: e.target.value })} placeholder="Key" />
          <Input.TextArea value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} placeholder="Description" />
          <Input value={this.state.id} onChange={(e) => this.setState({ id: e.target.value })} placeholder="id" />
          <Input value={this.state.system} onChange={(e) => this.setState({ system: e.target.value })} placeholder="system" />
        </Modal>
        <div style={{ margin: 20 }}>
          <h2>Item Types</h2>
          <ReactDragListView.DragColumn {...this.dragProps}>
            <Table
              columns={this.state.columns}
              pagination={false}
              dataSource={this.state.itemTypes}
              onChange={onChange}
              icon={<FontAwesomeIcon />}
              bordered
            />
          </ReactDragListView.DragColumn>
        </div>
      </div>
    );
  }
}

export default ItemTypes;