import React, { Component } from 'react';
import { Button, Icon, Modal, Input, Select, } from 'antd';
import AddUserModal from '../AddUserModal/AddUserModal';
import AddProjectModal from '../AddProjectModal/AddProjectModal';
const Option = Select.Option;
//#region ItemTypeBar

function showAddItemTypeModal() {
  Modal.confirm({
    title: 'Add Item Type',
    content: <div>
      {/* <p> field 1: <Input onChange={()=>{alert('hello')}}/> </p> */}
      <p> Display: <Input /> </p>
      <p> Display plural: <Input /> </p>
      <p> Description: <Input /> </p>
      <p> Type key: <Input /> </p>
      <p> Use as: <Select defaultValue="Default">
        <Option value="Default">Default</Option>
        <Option value="TestCase">Test Case</Option>
        <Option value="Defect">Defect</Option>
      </Select>
      </p>
      <p>Icon: <Select defaultValue="File">
        <Option value="File">
          <Icon type="file" theme="filled" style={{ color: "grey" }} />
        </Option>
        <Option value="Folder">
          <Icon type="folder" theme="filled" style={{ color: "#fcd788" }} />
        </Option>
        <Option value="Check">
          <Icon type="check" style={{ color: "green" }} />
        </Option>
        <Option value="Image">
          <Icon type="picture" theme="filled" style={{ color: "#1890FF" }} />
        </Option>
        <Option value="Flag">
          <Icon type="flag" theme="filled" style={{ color: "red" }} />
        </Option>
        <Option value="Bulb">
          <Icon type="bulb" theme="filled" style={{ color: "#ffc64c" }} />
        </Option>
        <Option value="Database">
          <Icon type="database" theme="filled" />
        </Option>
        <Option value="Project">
          <Icon type="layout" theme="filled" />
        </Option>
        <Option value="Setting">
          <Icon type="setting" theme="filled" />
        </Option>
      </Select></p>

    </div>,
    okText: 'Save',
    onOk() {
    },
    onCancel() {
    },
    iconType: 'setting'
  });
}

export class ItemTypeBar extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 20, justifyContent: 'flex-end' }}>
        <Button onClick={showAddItemTypeModal}>
          <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />
          Add Item Type
          </Button>
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