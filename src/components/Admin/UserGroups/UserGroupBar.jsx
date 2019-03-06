import React, { Component } from 'react';
import { Button, Icon, } from 'antd';
import AddUserGroupModal from './AddUserGroupModal';

//#region UserBar


//#region UserGroupBar
export class UserGroupBar extends Component {
    constructor() {
        super();

        this.state = {
            showUserGroupModal: false,
            invalidUserGroup: false,
        }
    }
    showAddUserGroupModal = () => {
        this.setState({
            showUserGroupModal: true,
            invalidUserGroup: false,
        });
    }

    hideAddUserGroupModal = () => {
        this.setState({
            showUserGroupModal: false,
            invalidUserGroup: false,
        });
    }

    handleOkModal = (e) => {
        this.setState({
            showUserGroupModal: false,
        });
    }

    handleCancelUserGroupModal = (e) => {
        this.setState({
            showUserGroupModal: false,
        });
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', margin: 15, marginBottom: 5, justifyContent: 'flex-end' }}>
                <div style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <h2>User Groups</h2>
                </div>
                <Button onClick={this.showAddUserGroupModal}>
                    <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />
                    Add User Group
        </Button>
                {this.state.showUserGroupModal && <AddUserGroupModal handleCancelUserGroupModal={this.handleCancelUserGroupModal} hide={this.hideAddUserGroupModal} accessToken={this.props.accessToken} />}
            </div>
        )
    }
}
// #endregion
