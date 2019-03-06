import React, { Component } from 'react';
import { Button, Icon, } from 'antd';
import AddProjectModal from './AddProjectModal';

export class ManageProjectBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddProjectModal: false,
        }
    }
    showAddProjectModal = () => {
        this.setState({
            showAddProjectModal: true,
        });
    }

    hideAddProjectModal = () => {
        this.setState({
            showAddProjectModal: false,
        });
    }

    handleOkAddProjectModal = (e) => {
        this.setState({
            showAddProjectModal: false,
        });
    }

    handleCancelAddProjectModal = (e) => {
        this.setState({
            showAddProjectModal: false,
        });
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', margin: 15, marginBottom: 5, justifyContent: 'flex-end' }}>
                <div style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <h2>Projects</h2>
                </div>
                <Button onClick={this.showAddProjectModal}>
                    <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />
                    Add Project
        </Button>
                {this.state.showAddProjectModal && <AddProjectModal handleCancelAddProjectModal={this.handleCancelAddProjectModal} hide={this.hideAddProjectModal} accessToken={this.props.accessToken} />}
            </div>
        )
    }
}
// #endregion