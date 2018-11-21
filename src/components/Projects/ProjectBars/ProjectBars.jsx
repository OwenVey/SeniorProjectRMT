import React, { Component } from 'react';
import { Tooltip, Button, Menu, Icon, Dropdown, Modal, Radio } from 'antd';

//#region ObjectGroupBar
const groupExportMenu = (
  <Menu>
    <Menu.Item>
      <Icon type="file-pdf" style={{ color: 'red' }} />Export selected to PDF
    </Menu.Item>
    <Menu.Item>
      <Icon type="file-word" style={{ color: 'blue' }} />Export selected to Word
    </Menu.Item>
    <Menu.Item>
      <Icon type="file-excel" style={{ color: 'green' }} />Export selected to Excel
    </Menu.Item>
  </Menu>
)

const groupActionMenu = (
  <Menu>
    <Menu.Item>
      <Icon type="file-add" style={{ color: '#1890FF' }} />Clone
    </Menu.Item>
    <Menu.Item>
      <Icon type="delete" style={{ color: 'red' }} />Delete
    </Menu.Item>
  </Menu>
)

const groupAddMenu = (
  <Menu>
    <Menu.Item>
      <Icon type="plus-circle" style={{ color: '#1890FF' }} />Add Object
    </Menu.Item>
    <Menu.Item>
      <Icon type="file-text" />Add Text
    </Menu.Item>
    <Menu.Item>
      <Icon type="folder" theme='twoTone' twoToneColor='#dd9633' />Add Folder
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
    if (this.props.currentSelectedItem !== []) {
      selectedItemRenderer = (
        <div style={{ flex: 1, justifyContent: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <h2>{this.props.currentSelectedItem.title}</h2>
            <div style={{ cursor: 'pointer', paddingLeft: 15, alignSelf: 'center', alignItems: 'center', alignContent: 'center', color: '#1890FF', paddingBottom: 4 }}>
              View
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {'{X}'} Items
            <div style={{ cursor: 'pointer', paddingLeft: 15, alignSelf: 'center', alignItems: 'center', alignContent: 'center', color: '#1890FF' }} onClick={showFilterModal}>
              <Icon type="filter" theme='filled' /> Filter Items
            </div>
          </div>
        </div>
      )
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 20, justifyContent: 'flex-end' }}>
        {selectedItemRenderer}
        <div style={{ alignItems: 'center', alignSelf: 'center', paddingRight: 20 }}>
          <Tooltip title='Refresh' placement="bottom">
            <Button>
              <Icon type="reload" />
            </Button>
          </Tooltip>
        </div>
        <div style={{ alignItems: 'center', alignSelf: 'center', paddingRight: 20 }}>
          <Radio.Group defaultValue='table' buttonStyle='solid'>
            <Tooltip title='Table View' placement="bottom">
              <Radio.Button value='table'>
                <Icon type='table' />
              </Radio.Button>
            </Tooltip>
            <Tooltip title='Document View' placement="bottom">
              <Radio.Button value='document'>
                <Icon type='file' />
              </Radio.Button>
            </Tooltip>
          </Radio.Group>
        </div>
        <div style={{ alignItems: 'center', alignSelf: 'center', paddingRight: 20 }}>
          <Tooltip title='Select Columns' placement="bottom">
            <Button onClick={showColumnSelectModal}>
              <Icon type="setting" theme='filled' />{/* possibly use a transfer? or checkboxes? https://ant.design/components/transfer/*/}
            </Button>
          </Tooltip>
        </div>
        <div style={{ alignItems: 'center', alignSelf: 'center', paddingRight: 20 }}>
          <Dropdown overlay={groupExportMenu}>
            <a className="ant-dropdown-link">
              Export Selected <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div style={{ alignItems: 'center', alignSelf: 'center', paddingRight: 20 }}>
          <Dropdown overlay={groupActionMenu}>
            <a className="ant-dropdown-link">
              Actions <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div style={{ alignItems: 'center', alignSelf: 'center', paddingRight: 10 }}>
          <Dropdown overlay={groupAddMenu}>
            <a className="ant-dropdown-link">
              Add <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </div>
    )
  }
}


// #endregion

//#region ObjectBar
const objectExportMenu = (
  <Menu>
    <Menu.Item>
      <Icon type="file-pdf" style={{ color: 'red' }} />Export to PDF
    </Menu.Item>
    <Menu.Item>
      <Icon type="file-word" style={{ color: 'blue' }} />Export to Word
    </Menu.Item>
    <Menu.Item>
      <Icon type="file-excel" style={{ color: 'green' }} />Export to Excel
    </Menu.Item>
  </Menu>
)

const objectAddMenu = (
  <Menu>
    <Menu.Item>
      <Icon type="plus-circle" style={{ color: '#1890FF' }} />Add Sub-Object
    </Menu.Item>
    <Menu.Item>
      <Icon type="file-text" />Add Text
    </Menu.Item>
  </Menu>
)

const objectActionMenu = (
  <Menu>
    <Menu.Item>
      <Icon type="file-add" style={{ color: '#1890FF' }} />Clone
    </Menu.Item>
    <Menu.Item>
      <Icon type="delete" style={{ color: 'red' }} />Delete
    </Menu.Item>
  </Menu>
)

export class ObjectBar extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 20, justifyContent: 'flex-end', backgroundColor: '#f7f7f7' }}>
        <div style={{ alignItems: 'center', alignSelf: 'center', paddingRight: 20 }}>
          <Dropdown overlay={objectExportMenu}>
            <a className="ant-dropdown-link">
              Export <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div style={{ alignItems: 'center', alignSelf: 'center', paddingRight: 20 }}>
          <Dropdown overlay={objectActionMenu}>
            <a className="ant-dropdown-link">
              Actions <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div style={{ alignItems: 'center', alignSelf: 'center', paddingRight: 20 }}>
          <Dropdown overlay={objectAddMenu}>
            <a className="ant-dropdown-link">
              Add <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div style={{ cursor: 'pointer', alignItems: 'center', alignSelf: 'center', paddingRight: 10 }}>
          <Icon type="edit" style={{ color: '#1890FF' }} /> Edit
        </div>
      </div>
    )
  }
}
//#endregion