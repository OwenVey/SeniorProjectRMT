import React, { Component } from 'react';
import { Table, Tag } from 'antd';

import ReactDragListView from "react-drag-listview";


function onChange(pagination, sorter) {
    console.log('params', pagination, sorter);
}

class TableView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {
                    title: "ID",
                    dataIndex: "key",
                    defaultSortOrder: 'ascend',
                    sorter: (a, b) => a.key.localeCompare(b.key)
                },
                {
                    title: "Name",
                    dataIndex: "title",
                    sorter: (a, b) => a.title.localeCompare(b.title)
                },
                {
                    title: "Description",
                    dataIndex: "description",
                },
                {
                    title: "Status",
                    dataIndex: "status",
                    sorter: (a, b) => a.status.localeCompare(b.status),
                    render: status => {
                        let color;
                        switch (status) {
                            case 'Draft':
                                color = '';
                                break;
                            case 'Approved':
                                color = 'green';
                                break;
                            case 'Completed':
                                color = 'blue';
                                break;
                            case 'Rejected':
                                color = 'red';
                                break;
                            default:
                                color = '';
                        }
                        return (
                            <Tag color={color}>
                                {status}
                            </Tag>
                        )
                    },
                }
            ],
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
                <ReactDragListView.DragColumn {...this.dragProps}>
                    <Table
                        columns={this.state.columns}
                        pagination={false}
                        dataSource={this.props.currentSelectedItem.children}
                        onChange={onChange}
                        bordered
                    />
                </ReactDragListView.DragColumn>
                {this.props.currentSelectedItem && <h4>{this.props.currentSelectedItem.title}</h4>}
            </div>
        );
    }
}
export default TableView;