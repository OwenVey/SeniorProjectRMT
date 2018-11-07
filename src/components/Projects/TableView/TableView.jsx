import React, { Component } from 'react';
import { Table } from 'antd';

import ReactDragListView from "react-drag-listview";

class TableView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    id: "357665",
                    summary: "Branch Requirements",
                    description: "Allow users to branch requirements",
                    att1: "purple",
                },
                {
                    id: "346577",
                    summary: "Merge Requirements",
                    description: "Allow users to merge requirements",
                    att1: "9 3/4",
                },
                {
                    id: "385794",
                    summary: "Add Users",
                    description: "Allow admins to create new users",
                    att1: "admin access only",
                },
            ],
            columns: [
                {
                    title: "ID",
                    dataIndex: "id"
                },
                {
                    title: "Summary",
                    dataIndex: "summary"
                },
                {
                    title: "Description",
                    dataIndex: "description"
                },
                {
                    title: "Attribute 1",
                    dataIndex: "att1"
                },
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
          <h2>Requirements</h2>
          <ReactDragListView {...this.dragProps}>
              <Table
                  columns={this.state.columns}
                  pagination={false}
                  dataSource={this.state.data}
                  bordered
              />
          </ReactDragListView>
      </div>
  );
  }
}
export default TableView;