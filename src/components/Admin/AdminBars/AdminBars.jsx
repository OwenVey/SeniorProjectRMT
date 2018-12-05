import React, { Component } from 'react';
import { Button, Icon, Modal, Input, Select, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddUserModal from '../AddUserModal/AddUserModal';

const Option = Select.Option;
const FormItem = Form.Item;
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
          <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />{/* possibly use a transfer? or checkboxes? https://ant.design/components/transfer/*/}
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
      addUserModalVisible: false,
      invalidUser: false,
    }
  }
  showAddUserModal = () => {
    this.setState({
      addUserModalVisible: true,
      invalidUser: false,
    });
  }

  // handleOkUserModal = (e) => {
  //   const { newFirstName, newLastName, newUsername, newEmail, newStatus, newLicenseType, newUserGroups } = this.state;

  //   let user = {
  //     fullName: `${newFirstName} ${newLastName}`,
  //     email: newEmail,
  //     userName: newUsername,
  //     userStatus: newStatus === 'ACTIVE' ? true : false,
  //     liscenceType: newLicenseType,
  //     userGroups: newUserGroups,
  //     actions: ''
  //   }

  //   if (this.validateForm()) {
  //     this.setState({ addUserModalVisible: false, });
  //     this.props.addUser(user);
  //   }
  //   else {
  //     alert('Form is invalid!');
  //   }
  // }

  handleOkModal = (e) => {
    this.setState({
      addUserModalVisible: false,
    });
  }

  handleCancelUserModal = (e) => {
    this.setState({
      addUserModalVisible: false,
    });
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', margin: 15, justifyContent: 'flex-end' }}>
        <Button onClick={this.showAddUserModal}>
          <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />{/* possibly use a transfer? or checkboxes? https://ant.design/components/transfer/*/}
          Add User
        </Button>
        <AddUserModal showModal={this.state.addUserModalVisible} handleCancelUserModal={this.handleCancelUserModal}/>
      </div>
    )
  }
}
// #endregion
