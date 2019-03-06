import React, { Component } from 'react';
import { Button, Icon, } from 'antd';
import AddItemTypesModal from './AddItemTypesModal';
//#region ItemTypeBar
export class ItemTypesBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddItemTypesModal: false,
        }
    }

    showAddItemTypesModal = () => {
        this.setState({
            showAddItemTypesModal: true,
        });
    }

    hideAddItemTypesModal = () => {
        this.setState({
            showAddItemTypesModal: false,
        });
    }

    handleOkAddItemTypesModal = (e) => {
        this.setState({
            showAddItemTypesModal: false,
        });
    }

    handleCancelAddItemTypesModal = (e) => {
        this.setState({
            showAddItemTypesModal: false,
        });
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', margin: 15, marginBottom: 5, justifyContent: 'flex-end' }}>
                <div style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <h2>Item Types</h2>
                </div>
                <Button onClick={this.showAddItemTypesModal}>
                    <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />
                    Add Item Type
        </Button>
                {this.state.showAddItemTypesModal && <AddItemTypesModal handleCancelAddItemTypesModal={this.handleCancelAddItemTypesModal} hide={this.hideAddItemTypesModal} accessToken={this.props.accessToken} />}
            </div>
        )
    }
}
// #endregion
