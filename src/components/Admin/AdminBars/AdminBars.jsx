import React, { Component } from 'react';
import { Button, Icon, Modal, Input, Select, } from 'antd';
import AddUserModal from '../AddUserModal/AddUserModal';
import AddProjectModal from '../AddProjectModal/AddProjectModal';
import AddItemTypesModal from '../AddItemTypesModal/AddItemTypesModal';
const Option = Select.Option;

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
      <div style={{ display: 'flex', flexDirection: 'row', margin: 15, marginBottom: 5, justifyContent: 'flex-end' }}>
      <div style={{ flex: 1, justifyContent: 'flex-start' }}> 
          <h2>Users</h2> 
        </div>
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
        {/* {this.state.showUserGroupModal && <AddUserGroupModal addUserGroup={this.props.addUserGroup} handleCancelUserGroupModal={this.handleCancelUserGroupModal} hide={this.hideAddUserGroupModal} />} */}
      </div>
    )
  }
}
// #endregion

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