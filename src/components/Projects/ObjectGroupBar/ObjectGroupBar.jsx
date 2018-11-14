import React, { Component } from 'react';
import { Button, Menu, Icon, Dropdown, Row, Col} from 'antd';

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
      <Icon type="file-add" />Clone
    </Menu.Item>
    <Menu.Item>
      <Icon type="delete" /> Delete
    </Menu.Item>
  </Menu>
)

class ObjectGroupBar extends Component {

  render() {
    return (
      <div style={{ flex: 1, flexDirection: 'row', margin: 20, justifyContent: 'space-between', backgroundColor:'#eee'}}>
        <div>
          <Dropdown overlay={exportMenu}>
            <a className="ant-dropdown-link" href="#">
              Export Selected <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div>
          <Dropdown overlay={actionMenu}>
            <a className="ant-dropdown-link" href="#">
              Actions <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div>
          <Button type="primary">
          <Icon type="filter" /> Select Columns
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