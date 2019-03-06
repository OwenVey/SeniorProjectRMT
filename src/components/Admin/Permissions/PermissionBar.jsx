import React, { Component } from 'react';
import { Button, Icon, } from 'antd';

//#region PermissionBar
export class PermissionBar extends Component {
    constructor() {
        super();

        this.state = {
            showPermissionModal: false,
            invalidPermission: false,
        }
    }
    showAddPermissionModal = () => {
        this.setState({
            showPermissionModal: true,
            invalidPermission: false,
        });
    }

    hideAddPermissionModal = () => {
        this.setState({
            showPermissionModal: false,
            invalidPermission: false,
        });
    }

    handleOkModal = (e) => {
        this.setState({
            showPermissionModal: false,
        });
    }

    handleCancelPermissionModal = (e) => {
        this.setState({
            showPermissionModal: false,
        });
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', margin: 15, marginBottom: 5, justifyContent: 'flex-end' }}>
                <div style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <h2>Permissions</h2>
                </div>
                <Button onClick={this.showAddPermissionModal}>
                    <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />
                    Add Permission
        </Button>
                {/* {this.state.showPermissionModal && <AddPermissionModal addPermission={this.props.addPermission} handleCancelPermissionModal={this.handleCancelPermissionModal} hide={this.hideAddPermissionModal} />} */}
            </div>
        )
    }
}
// #endregion
