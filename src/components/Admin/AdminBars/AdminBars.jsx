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

