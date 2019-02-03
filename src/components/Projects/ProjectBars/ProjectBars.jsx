import React, { Component } from 'react';
import { Tooltip, Button, Menu, Icon, Dropdown, Modal, Radio } from 'antd';
import AddObjectModal from '../AddObjectModal/AddObjectModal';

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

function showColumnSelectModal() {
  Modal.confirm({
    title: 'Select the columns you wish to display',
    content: 'InsertColumnNamesHere',
    okText: 'Save',
    onOk() {
    },
    onCancel() {
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
    },
    onCancel() {
    },
    iconType: 'filter'
  });
}

export class ObjectGroupBar extends Component {
  constructor() {
    super();

    this.state = {
      showAddObjectModal: false,
    }
  }

  showAddObjectModal = () => {
    this.setState({
      showAddObjectModal: true,
    });
  }

  hideAddObjectModal = () => {
    this.setState({
      showAddObjectModal: false,
    });
  }

  handleAddObjectOkModal = (e) => {
    this.setState({
      showAddObjectModal: false,
    });
  }

  handleCancelAddObjectModal = (e) => {
    this.setState({
      showAddObjectModal: false,
    });
  }

  groupAddMenu = (
    <Menu>
      <Menu.Item onClick={this.showAddObjectModal}>
        <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />Add Object
      </Menu.Item>
      <Menu.Item onClick={this.showAddObjectModal}>
        <Icon type="file-text" theme='filled' />Add Text
      </Menu.Item>
      <Menu.Item>
        <Icon type="folder" theme='filled' style={{ color: '#dd9633' }} />Add Folder
      </Menu.Item>
    </Menu>
  )

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 20px', marginBottom: 5, justifyContent: 'flex-end' }}>
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
            <a href='#none' className="ant-dropdown-link" >
              Export Selected <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div style={{ alignItems: 'center', alignSelf: 'center', paddingRight: 20 }}>
          <Dropdown overlay={groupActionMenu}>
            <a href='#none' className="ant-dropdown-link">
              Actions <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div style={{ alignItems: 'center', alignSelf: 'center', paddingRight: 10 }}>
          <Dropdown overlay={this.groupAddMenu}>
            <a href='#none' className="ant-dropdown-link">
              Add <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        {/* {this.state.showAddObjectModal && <AddObjectModal addUser={this.props.addUser} handleCancelAddObjectModal={this.handleCancelAddObjectModal} hide={this.hideAddObjectModal} />}  */}
        {this.state.showAddObjectModal && <AddObjectModal handleCancelAddObjectModal={this.handleCancelAddObjectModal} hide={this.hideAddObjectModal} />}
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
  constructor() {
    super();

    this.state = {
      showAddObjectModal: false,
    }
  }

  showAddObjectModal = () => {
    this.setState({
      showAddObjectModal: true,
    });
  }

  hideAddObjectModal = () => {
    this.setState({
      showAddObjectModal: false,
    });
  }

  handleAddObjectOkModal = (e) => {
    this.setState({
      showAddObjectModal: false,
    });
  }

  handleCancelAddObjectModal = (e) => {
    this.setState({
      showAddObjectModal: false,
    });
  }

  objectAddMenu = (
    <Menu>
      <Menu.Item onClick={this.showAddObjectModal}>
        <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />Add Sub-Object
      </Menu.Item>
      <Menu.Item onClick={this.showAddObjectModal}>
        <Icon type="file-text" theme='filled' />Add Text
      </Menu.Item>
    </Menu>
  )

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 20px', marginBottom: 5, justifyContent: 'flex-end' }}>
        <div style={{ flex: 1, justifyContent: 'flex-start', marginLeft: 20, marginRight: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <h2>{this.props.currentSelectedItem.title}</h2>
            <div style={{ paddingLeft: 15, alignSelf: 'center', alignItems: 'center', alignContent: 'center', paddingBottom: 4 }}>
              Version - V
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {/* {'${projectID} - ${ItemType}'} */}
            <div style={{ paddingLeft: 15, alignSelf: 'center', alignItems: 'center', alignContent: 'center', }}>
              Parent Node 1 > Parent Node 2
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 20, justifyContent: 'flex-end' }}>
          <div style={{ alignItems: 'center', alignSelf: 'center', paddingRight: 20, paddingBottom: 4 }}>
            <Dropdown overlay={objectExportMenu}>
              <a href='#none' className="ant-dropdown-link">
                Export <Icon type="down" />
              </a>
            </Dropdown>
          </div>
          <div style={{ alignItems: 'center', alignSelf: 'center', paddingRight: 20, paddingBottom: 4 }}>
            <Dropdown overlay={objectActionMenu}>
              <a href='#none' className="ant-dropdown-link">
                Actions <Icon type="down" />
              </a>
            </Dropdown>
          </div>
          <div style={{ alignItems: 'center', alignSelf: 'center', paddingRight: 20, paddingBottom: 4 }}>
            <Dropdown overlay={this.objectAddMenu}>
              <a href='#none' className="ant-dropdown-link">
                Add <Icon type="down" />
              </a>
            </Dropdown>
          </div>
          <div style={{ cursor: 'pointer', alignItems: 'center', alignSelf: 'center', paddingRight: 10, paddingBottom: 4 }}>
            <Icon type="edit" theme='filled' style={{ color: '#1890FF' }} /> Edit
          </div>
        </div>
        {this.state.showAddObjectModal && <AddObjectModal handleCancelAddObjectModal={this.handleCancelAddObjectModal} hide={this.hideAddObjectModal} />}
      </div>
    )
  }
}
//#endregion