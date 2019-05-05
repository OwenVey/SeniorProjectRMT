import React, { Component } from "react";
import { Table, Icon } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SystemLockedItems extends Component {
    state = {
        columns: [
            {
                title: "Locked On",
                dataIndex: "iconUrl",
                key: "iconUrl",
                align: 'center',
                width: 50,
                sorter: (a, b) => a.iconUrl.localeCompare(b.iconUrl),
                render: iconUrl => <Icon><FontAwesomeIcon icon={iconUrl} /></Icon>
            },
            {
                title: "Name",
                dataIndex: "name",
                width: 80,
                sorter: (a, b) => a.name.localeCompare(b.name),
                render: index => <span>{index}</span>,
            },
            {
                title: "ID",
                dataIndex: "id",
                width: 80,
                sorter: (a, b) => a.id.localeCompare(b.id),
                render: index => <span>{index}</span>,
            },
        ]
    }
    render() {
        return (
            <>
                <div>
                    <h2>System Locked Items</h2>
                </div>
                <Table
                    columns={this.state.columns}
                    pagination={false}
                    rowKey={record => record.id}
                    dataSource={this.props.itemTypes}
                    bordered
                    loading={this.props.loading}
                />
            </>
        )
    }
}

const mapStateToProps = state => ({
    accessToken: state.authentication.accessToken,
    loginUser: state.authentication.loginUser,
    id: state.authentication.loginUser.id,
    user: state.authentication.loginUser,
    loading: state.authentication.loading,
});

export default SystemLockedItems;