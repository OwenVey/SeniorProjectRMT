import React, { Component } from 'react';
import { Tooltip, Button, Menu, Icon, Dropdown, Modal, Radio} from 'antd';

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

const addMenu = (
  <Menu>
    <Menu.Item>
      <Icon type="plus-circle" style={{color: '#1890dd'}}/>Add Object
    </Menu.Item>
    <Menu.Item>
      <Icon type="file-text" />Add Text
    </Menu.Item>
    <Menu.Item>
      <Icon type="folder" theme='twoTone' twoToneColor='#dd9633'/>Add Folder
    </Menu.Item>
  </Menu>
)

function showColumnSelectModal() {
  Modal.confirm({
    title: 'Select the columns you wish to display',
    content: 'InsertColumnNamesHere',
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

function showFilterModal() {
  Modal.confirm({
    title: 'Apply Filters',
    content: 'InsertFilterOptionsHere',
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
    let selectedItemRenderer;
    if(this.props.currentSelectedItem !== []){
      selectedItemRenderer = (
        <div style={{flex: 1, justifyContent: 'flex-start'}}>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <h2>{this.props.currentSelectedItem.title}</h2>
            <div style={{cursor: 'pointer', paddingLeft: 15, alignSelf: 'center', alignItems: 'center', alignContent: 'center', color: '#1890FF', paddingBottom: 4}}>
              View
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            {'{X}'} Items
            <div style={{cursor: 'pointer', paddingLeft: 15, alignSelf: 'center', alignItems: 'center', alignContent: 'center', color: '#1890FF'}} onClick={showFilterModal}>
            <Icon type="filter" theme='filled' /> Filter Items
            </div>
          </div>
        </div>
        )
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 20, justifyContent: 'flex-end'}}>
        {selectedItemRenderer}
        <div style={{alignItems: 'center', alignSelf: 'center', paddingRight: 20}}>
          <Tooltip title='Refresh' placement="bottom">
            <Button>
              <Icon type="reload" />
            </Button>
          </Tooltip>
        </div>
        <div style={{alignItems: 'center', alignSelf: 'center', paddingRight: 20}}>
          <Radio.Group defaultValue='table' buttonStyle='solid'>
            <Tooltip title='Table View' placement="bottom">
              <Radio.Button value='table'>
                <Icon type='table'/>
              </Radio.Button>
            </Tooltip>
            <Tooltip title='Document View' placement="bottom">
              <Radio.Button value='document'>
                <Icon type='file'/>
              </Radio.Button>
            </Tooltip>
          </Radio.Group>
        </div>
        <div style={{alignItems: 'center', alignSelf: 'center', paddingRight: 20}}>
          <Tooltip title='Select Columns' placement="bottom">
            <Button onClick={showColumnSelectModal}>
              <Icon type="setting" theme='filled'/>{/* possibly use a transfer? or checkboxes? https://ant.design/components/transfer/*/}
            </Button>
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
        <div style={{alignItems: 'center', alignSelf: 'center'}}>
          <Dropdown overlay={addMenu}>
            <a className="ant-dropdown-link">
              Add <Icon type="down" />
            </a>
          </Dropdown>
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
          <Icon type="file-add" style={{color: '#1890dd'}}/> Clone
        </div>
        <div style={{alignItems: 'center', alignSelf: 'center', paddingRight: 20}}>
          <Icon type="delete" style={{color: 'red'}}/> Delete
        </div>
        <div style={{alignItems: 'center', alignSelf: 'center', paddingRight: 20}}>
          <Icon type="edit" style={{color: '#1890dd'}}/> Edit
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