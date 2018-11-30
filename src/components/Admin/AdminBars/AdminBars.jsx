import React, { Component } from 'react';
import { Button, Icon, Modal, Input, Select} from 'antd';
const Option = Select.Option;
//#region ItemTypeBar

function showAddItemTypeModal() {
  Modal.confirm({
    title: 'Add Item Type',
    content: <div>
      {/* <p> field 1: <Input onChange={()=>{alert('hello')}}/> </p> */}
      <p> Display: <Input/> </p>
      <p> Display plural: <Input/> </p>
      <p> Description: <Input/> </p>
      <p> Type key: <Input/> </p>
      <p> Use as: <Select defaultValue= "Default">
          <Option value="Default">Default</Option>
          <Option value="TestCase">Test Case</Option>    
          <Option value="Defect">Defect</Option>
        </Select>
      </p>
      <p>Icon: <Select defaultValue= "File">
          <Option value="File">
            <Icon type="file" theme="filled" style={{color: "grey"}}/>
          </Option>
          <Option value="Folder">
            <Icon type="folder" theme="filled" style={{color: "#fcd788"}}/>
          </Option>
          <Option value="Check">
            <Icon type="check" style={{color: "green"}} />
          </Option>    
          <Option value="Image">
            <Icon type="picture" theme="filled" style={{color: "#1890FF"}}/>
          </Option>
          <Option value="Flag">
            <Icon type="flag" theme="filled" style={{color: "red"}}/>
          </Option>
          <Option value="Bulb">
            <Icon type="bulb"theme="filled" style={{color: "#ffc64c"}}/>
          </Option>
          <Option value="Database">
            <Icon type="database" theme="filled" />
          </Option>
          <Option value="Project">
            <Icon type="layout" theme="filled"/>
          </Option>
          <Option value="Setting">
            <Icon type="setting" theme="filled"/>
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

function showAddUserModal() {
  Modal.confirm({
    title: 'Add User',
    content: <div>
      {/* <p> field 1: <Input onChange={()=>{alert('hello')}}/> </p> */}
      <p> First Name: <Input/> </p>
      <p> Last Name: <Input/> </p>
      <p> Username: <Input/> </p>
      <p> Email: <Input/> </p>
      <p> Liscense Type: <Select defaultValue= "Developer" style={{ width: '100%' }}>
          <Option value="Developer">Developer</Option>
          <Option value="Admin">Admin</Option>    
          <Option value="ProductOwner">Product Owner</Option>
          <Option value="ScrumMaster">Scrum Master</Option>
          <Option value="Client">Client</Option>
        </Select>
      </p>
      <p>Status: <Select defaultValue= "Active" style={{ width: '100%' }}>
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
        </Select></p>
      <p>User Groups: <Select mode= "multiple" placeholder="Please Select" style={{ width: '100%' }}>
        {userGroups}
      </Select></p>
    </div>,
    okText: 'Save',
    onOk() {
      console.log('Saved!');
    },
    onCancel() {
      console.log('Cancelled');
    },
    iconType: 'user'
  });
}
// onChangePassword = (e) => {
//   // const {index} = this.state;
//   // this.state.data[index].password = e.target.value 
// };

export class UserBar extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 20, justifyContent: 'flex-end' }}>
          <Button onClick={showAddUserModal}>
            <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />{/* possibly use a transfer? or checkboxes? https://ant.design/components/transfer/*/}
            Add User
          </Button>
      </div>
    )
  }
}


// #endregion