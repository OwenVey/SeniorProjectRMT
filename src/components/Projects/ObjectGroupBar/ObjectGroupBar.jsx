import React, { Component } from 'react';
import { Button, Menu, Icon, Dropdown} from 'antd';

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

class ObjectGroupBar extends Component {

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 20, aligntItems: 'centered', justifyContent: 'flex-end', backgroundColor:'#f7f7f7'}}>
        <div style={{paddingRight: 20}}>
          <Dropdown overlay={exportMenu}>
            <a className="ant-dropdown-link">
              Export Selected <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div style={{paddingRight: 20}}>
          <Dropdown overlay={actionMenu}>
            <a className="ant-dropdown-link">
              Actions <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div style={{paddingRight: 20}}>
          <Button type="primary">
          <Icon type="filter" />
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

export default ObjectGroupBar;