import React, { Component } from 'react';
import { Tooltip, Button, Menu, Icon, Dropdown, Modal} from 'antd';

const exportMenu = (
  <Menu>
    <Menu.Item>
      <Icon type="file-pdf" style={{color: 'red'}}/>Export selected to PDF
    </Menu.Item>
    <Menu.Item>
      <Icon type="file-word" style={{color: 'blue'}}/>Export selected to Word
    </Menu.Item>
    <Menu.Item>
      <Icon type="file-excel" style={{color: 'green'}}/>Export selected to Excel
    </Menu.Item>
  </Menu>
)

const actionMenu = (
  <Menu>
    <Menu.Item>
      <Icon type="file-add" style={{color: '#1890dd'}}/>Clone
    </Menu.Item>
    <Menu.Item>
      <Icon type="delete" style={{color: 'red'}}/>Delete
    </Menu.Item>
  </Menu>
)

function showColumnSelectModal() {
  Modal.info({
    title: 'Select the columns you wish to display',
    content: 'InsertColumnNamesHere',
    okText: 'Save',
    onOk() {
      console.log('Saved!');
    },
    onCancel() {
      console.log('Cancelled');
    },
    iconType: 'filter'
  });
}

export class ObjectGroupBar extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 20, justifyContent: 'flex-end', backgroundColor:'#f7f7f7'}}>
        <div style={{alignItems: 'center', alignSelf: 'center', paddingRight: 20}}>
          <Tooltip title='Refresh'>
            <Icon type="reload" />
          </Tooltip>
        </div>
        <div style={{alignItems: 'center', alignSelf: 'center', paddingRight: 20}}>
          <Dropdown overlay={exportMenu}>
            <a className="ant-dropdown-link">
              Export Selected <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div style={{alignItems: 'center', alignSelf: 'center', paddingRight: 20}}>
          <Dropdown overlay={actionMenu}>
            <a className="ant-dropdown-link">
              Actions <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div style={{alignItems: 'center', alignSelf: 'center', paddingRight: 20}}>
          <Button type="primary" onClick={showColumnSelectModal}>
            <Icon type="filter" /> {/* possibly use a transfer? or checkboxes? https://ant.design/components/transfer/*/}
          </Button>
        </div>
        <div>
          <Button type="primary">
            <Icon type="plus-circle" />Add Object
          </Button>
        </div>
      </div>
    )
  }
}

export class ObjectBar extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 20, justifyContent: 'flex-end', backgroundColor:'#f7f7f7'}}>
        <div style={{alignItems: 'center', alignSelf: 'center', paddingRight: 20}}>
          <Dropdown overlay={exportMenu}>
            <a className="ant-dropdown-link">
              Export Selected <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div style={{alignItems: 'center', alignSelf: 'center', paddingRight: 20}}>
          <Icon type="file-add" style={{color: '#1890dd'}}/>Clone
        </div>
        <div style={{alignItems: 'center', alignSelf: 'center', paddingRight: 20}}>
          <Icon type="delete" style={{color: 'red'}}/>Delete
        </div>
        <div style={{alignItems: 'center', alignSelf: 'center', paddingRight: 20}}>
          <Icon type="edit" style={{color: '#1890dd'}}/>Edit
        </div>
        <div>
          <Button type="primary">
            <Icon type="plus-circle" />Add Object
          </Button>
        </div>
      </div>
    )
  }
}