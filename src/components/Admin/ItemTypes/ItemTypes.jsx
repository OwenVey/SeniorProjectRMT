import React, { Component } from "react";
import ReactDragListView from "react-drag-listview";
import { Table } from "antd";

function onChange(pagination, sorter) {
  console.log("params", pagination, sorter);
}

class ItemTypes extends Component {
  constructor(props) {
    super(props);

  this.state = {
    data: [
      {
        icon: "",
        display: "Analysis Items",
        plural: "Analysis Items",
        key: "AITEM",
        description: "IIBA BABOK v3",
        id: "80",
        system: "No"
      },
      {
        icon: "",
        display: "Attachment",
        plural: "Attachments",
        key: "ATT",
        description: "Attachment Type",
        id: "22",
        system: "Yes"
      },
      {
        icon: "",
        display: "Automotive Cause",
        plural: "Automotive Cause",
        key: "CAUS",
        description: "Automotive",
        id: "129",
        system: "No"
      },
      {
        icon: "",
        display: "Automotive Failure Mode",
        plural: "Automotive Failure Mode",
        key: "FM",
        description: "Used in Automotive FMEA",
        id: "128",
        system: "No"
      }
    ],
    columns: [
      {
        title: "Item",
        dataIndex: "icon",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.fullName - b.fullName
      },
      {
        title: "Display",
        dataIndex: "display",
        sorter: (a, b) => a.email.length - b.email.length
      },
      {
        title: "Plural",
        dataIndex: "plural",
        sorter: (a, b) => a.userName.length - b.userName.length
      },
      {
        title: "Key",
        dataIndex: "key",
        sorter: (a, b) => a.key.length - b.key.length
      },
      {
        title: "Description",
        dataIndex: "description",
        sorter: (a, b) => a.description.length - b.description.length
      },
      {
        title: "ID",
        dataIndex: "id",
        sorter: (a, b) => a.id.length - b.id.length
      },
      {
        title: "System",
        dataIndex: "system",
        sorter: (a,b) => a.system.length - b.system.length
      },
      {
        title: "Action",
        dataIndex: "action",
        sorter: (a,b) => a.system.length - b.system.length

      }
    ]
  };
}

  render() {
    const that = this;
    this.dragProps = {
      onDragEnd(fromIndex, toIndex) {
        const columns = that.state.columns;
        const item = columns.splice(fromIndex, 1)[0];
        columns.splice(toIndex, 0, item);
        that.setState({
          columns
        });
      },
      nodeSelector: "th"
    };

    return (
      <div style={{ margin: 20 }}>
        <h2>Item Types</h2>
        <ReactDragListView.DragColumn {...this.dragProps}>
          <Table
            columns={this.state.columns}
            pagination={false}
            dataSource={this.state.data}
            onChange={onChange}
            bordered
          />
        </ReactDragListView.DragColumn>
      </div>
    );
  }
}

export default ItemTypes;