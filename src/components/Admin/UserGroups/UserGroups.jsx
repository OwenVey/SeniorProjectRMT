import React, { Component } from 'react';
import { Tag, Table, Divider, Modal, Row, Button, Radio, Icon, Alert, Input, Col, Select, InputNumber, DatePicker, AutoComplete, Cascader, Transfer } from 'antd';
import "./UserGroups.css"

const InputGroup = Input.Group;
const Option = Select.Option;

class UserGroups extends Component {
  state = {
    size: 'large',
    mockData: [],
    targetKeys: [],
  };
  edit = e => {
    alert('Edit User Group button has been clicked');
  }
  delete = e => {
    alert('Delete User Group button has been clicked');
  }

  addModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  componentDidMount() {
    this.getMock();
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  }

  filterOption = (inputValue, option) => {
    return option.description.indexOf(inputValue) > -1;
  }

  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
  }

  render() {
    const size = this.state.size;
    
    return (
      <div>
        <Radio.Group value={size}>
          <Radio.Button value="default" onClick={this.addModal}>Add New User Group</Radio.Button>
          <Radio.Button value="default" onClick={this.edit}>Edit Selected User Group</Radio.Button>
          <Radio.Button value="default" onClick={this.delete}>Delete User Group</Radio.Button>
        </Radio.Group>
        <Modal
          title="Add User Group"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          className="userGroupModal">
          <Row className="inputRow">
          <Input 
            title="userGroupTitle"
            placeholder="New User Group Title"
            ></Input></Row>
          <Row className="inputRow"><Input 
            title="userGroupDescription"
            placeholder="New User Group Description"></Input></Row>
          <Divider />
          <Transfer
        dataSource={this.state.mockData}
        showSearch
        filterOption={this.filterOption}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        render={item => item.title}
        listStyle={{
          width: 200,
          height: 300,
        }}
        className="transferUsers"
      />
        </Modal>
      <Table bordered dataSource={data} columns={columns} />
      </div>
    )
  }
}

const columns = [{
  title: 'Group Type',
  dataIndex: 'groupType',
  /*key: 'groupType',*/
  render: text => <a href=''>{text}</a>,
}, {
  title: 'Group Name',
  dataIndex: 'groupName',
  /*key: 'groupName',*/
  render: text => <a href=''>{text}</a>,
}, {
  title: '# of Users',
  dataIndex: 'numUsers',
  /*key: 'groupName',*/
  render: text => <a href=''>{text}</a>,
}, {
  title: 'Current Projects',
  dataIndex: 'currentProjects',
  render: tags => (
    <span>
      {tags.map(tag => <Tag color='blue' key={tag}>{tag}</Tag>)}
    </span>
    /*key: 'tags',*/
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href=''>Members {record.name}</a>
      <Divider type='vertical' />
      <a href=''>Group</a>
      <Divider type='vertical' />
      <a href=''>Subscriptions</a>
      <Divider type='vertical' />
      <a href=''>Delete</a>
    </span>
  ),
}];

const data = [{
  key: '1',
  groupType: 'Development',
  groupName: 'Developer Team 1',
  numUsers: '17',
  currentProjects: ['nice', 'developer'],
}];

export default UserGroups;