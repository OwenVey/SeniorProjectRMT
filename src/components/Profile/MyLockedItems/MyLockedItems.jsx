import React, { Component } from "react";
import { Divider, Table, Button, Modal, Icon, Tooltip } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { lock } from '@fortawesome/react-fontawesome';

class MyLockedItems extends Component {

    state = {
        columns: [
            {
                width: 50,
                filterIcon: filtered => (
                    <Icon
                        type="lock-alt"
                        style={{ color: filtered ? "#a9a9a9" : "#a9a9a9" }}
                    />
                ),
            },
            {
                title: "Locked On",
                dataIndex: "iconUrl",
                key: "iconUrl",
                align: 'center',
                width: 50,
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
        ]
    }
    render() {
        return (
            <>
                <div>
                    <h1>My Locked Items</h1>
                    <h2>If fully implemented, this page will show information on what objects a user is currently editing and other users do not have access to edit.</h2>
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