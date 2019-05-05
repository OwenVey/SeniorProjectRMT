import React, { Component } from "react";
import { Table, Icon, Checkbox } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./MyLockedItems.css";

class MyLockedItems extends Component {

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
                title: "Locked By",
                dataIndex: "name",
                width: 80,
                sorter: (a, b) => a.name.localeCompare(b.name),
                render: index => <span>{index}</span>,
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
                    <h2>My Locked Items <Checkbox className="lockedItems">Show All Locked Items</Checkbox></h2>
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

export default MyLockedItems;