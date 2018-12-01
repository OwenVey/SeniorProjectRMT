import React, { Component } from 'react';
import { Button, Icon, Modal, Input, Select } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      console.log('Saved!');
    },
    onCancel() {
      console.log('Cancelled');
    },
    iconType: 'setting'
  });
}
// onChangePassword = (e) => {
//   // const {index} = this.state;
//   // this.state.data[index].password = e.target.value 
// };

export class ItemTypeBar extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 20, justifyContent: 'flex-end' }}>
        <Button onClick={showAddItemTypeModal}>
          <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />{/* possibly use a transfer? or checkboxes? https://ant.design/components/transfer/*/}
          Add Item Type
          </Button>
      </div>
    )
  }
}


// #endregion

//#region UserBar
const userGroups = [
  <Option key='red'>red</Option>,
  <Option key='blue'>blue</Option>,
  <Option key='green'>green</Option>,
];

export class UserBar extends Component {
  constructor() {
    super();

    this.state = {
      addUserModalVisible: false,
      newFirstName: '',
      newLastName: '',
      newUsername: '',
      newEmail: '',
      newPassword: '',
      newPasswordConfirm: '',
    }
  }
  showAddUserModal = () => {
    this.setState({
      addUserModalVisible: true,
    });
  }

  handleOkUserModal = (e) => {
    console.log(e);
    this.setState({
      addUserModalVisible: false,
    });
  }

  handleCancelUserModal = (e) => {
    console.log(e);
    this.setState({
      addUserModalVisible: false,
    });
  }

  handleFirstNameChange = (newFirstName) => {
    this.setState({ newFirstName });
  }

  handleLastNameChange = (newLastName) => {
    this.setState({ newLastName });
  }

  handleUsernameChange = (newUsername) => {
    this.setState({ newUsername });
  }

  handleEmailChange = (newEmail) => {
    this.setState({ newEmail });
  }

  handlePasswordChange = (newPassword) => {
    this.setState({ newPassword });
  }

  handlePasswordConfirmChange = (newPasswordConfirm) => {
    this.setState({ newPasswordConfirm });
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 20, justifyContent: 'flex-end' }}>
        <Button onClick={this.showAddUserModal}>
          <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />{/* possibly use a transfer? or checkboxes? https://ant.design/components/transfer/*/}
          Add User
        </Button>
        <Modal
          title={<div><Icon style={{ color: '#1890FF' }}><FontAwesomeIcon icon='user' /></Icon> Add User</div>}
          visible={this.state.addUserModalVisible}
          onOk={this.handleOkUserModal}
          onCancel={this.handleCancelUserModal}
          okText="Save"
          maskClosable={false}
          bodyStyle={{ maxHeight: '60vh', overflow: 'scroll', paddingTop: 5 }}
        >
          <div> First Name: <Input placeholder='First Name' /*value={this.state.newFirstName}*/ /> </div>
          <div> Last Name: <Input placeholder='Last Name' /*value={this.state.newLastName}*/ /> </div>
          <div> Email: <Input placeholder='Email' /*value={this.state.newEmail}*/ /> </div>
          <div> Username: <Input placeholder='Username' /*value={this.state.newUsername}*/ /> </div>
          <div> Password: <Input placeholder='Password' /*value={this.state.newEmail}*/ /> </div>
          <div> Confirm Password: <Input placeholder='Confirm Password' /*value={this.state.newEmail}*/ /> </div>
          <div> License Type: <Select defaultValue="Developer" style={{ width: '100%' }}>
            <Option value="Developer">Developer</Option>
            <Option value="Admin">Admin</Option>
            <Option value="ProductOwner">Product Owner</Option>
            <Option value="ScrumMaster">Scrum Master</Option>
            <Option value="Client">Client</Option>
          </Select>
          </div>
          <div>Status: <Select defaultValue="Active" style={{ width: '100%' }}>
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select></div>
          <div>User Groups: <Select mode="multiple" placeholder="Please Select" style={{ width: '100%' }}>
            {userGroups}
          </Select></div>
        </Modal>
      </div>
    )
  }
}


// #endregion
