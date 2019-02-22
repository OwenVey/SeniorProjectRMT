import React, { Component } from 'react';
import { Button, Icon, Modal, Input, Select, } from 'antd';
import AddUserModal from '../AddUserModal/AddUserModal';
import AddProjectModal from '../AddProjectModal/AddProjectModal';
import AddItemTypesModal from '../AddItemTypesModal/AddItemTypesModal';
const Option = Select.Option;
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
      <div style={{ display: 'flex', flexDirection: 'row', margin: 15, justifyContent: 'flex-end' }}>
        <h1>Item Types</h1>
        <AddItemTypesModal></AddItemTypesModal>
        {this.state.showAddItemTypesModal && <AddItemTypesModal handleCancelAddItemTypesModal={this.handleCancelAddItemTypesModal} hide={this.hideAddItemTypesModal} accessToken={this.props.accessToken} />}
      </div>
    )
  }
}

// #endregion

//#region UserBar
export class UserBar extends Component {
  constructor() {
    super();

    this.state = {
      showUserModal: false,
      invalidUser: false,
    }
  }
  showAddUserModal = () => {
    this.setState({
      showUserModal: true,
      invalidUser: false,
    });
  }

  hideAddUserModal = () => {
    this.setState({
      showUserModal: false,
      invalidUser: false,
    });
  }

  handleOkModal = (e) => {
    this.setState({
      showUserModal: false,
    });
  }

  handleCancelUserModal = (e) => {
    this.setState({
      showUserModal: false,
    });
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', margin: 15, justifyContent: 'flex-end' }}>
        <Button onClick={this.showAddUserModal}>
          <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />
          Add User
        </Button>
        {this.state.showUserModal && <AddUserModal addUser={this.props.addUser} handleCancelUserModal={this.handleCancelUserModal} hide={this.hideAddUserModal} />}
      </div>
    )
  }
}
// #endregion

//#region ManageProjectBar
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
      <div style={{ display: 'flex', flexDirection: 'row', margin: 15, justifyContent: 'flex-end' }}>
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