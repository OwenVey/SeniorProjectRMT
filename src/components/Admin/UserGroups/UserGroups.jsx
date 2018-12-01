import React, { Component } from 'react';
import { Tag, Table, Divider, Modal, Row, Button, Radio, Icon, Alert, Popconfirm, Form, Input, Col, Select, InputNumber, DatePicker, AutoComplete, Cascader, Transfer } from 'antd';
import "./UserGroups.css"

const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const EditableContext = React.createContext();

class UserGroups extends Component {
  state = {
    size: 'large',
    mockData: [],
    targetKeys: [],
    addModalVisible: false,
    editModalVisible: false,
    editing: false,
    columns: [{
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
          <Button onClick={() => {this.setState({editModalVisible: true})}} title="Edit">Edit
          <Modal
            title="Edit User Group"
            visible={this.state.editModalVisible}
            onOk={this.editGroup()}
//            onOk={() => {this.setState({editModalVisible:false})}}
            onCancel={() => {this.setState({editModalVisible:false})}}
            width="80%"
            style={{
              top: 20
            }}
            className="editGroupModal">
            <Row className="inputRow">
              <Form layout="vertical"/>
              <FormItem label="Title"/>
              <Input title="editGroupTitle"></Input></Row>
            <Row className="inputRow">
              <Input title="editGroupDescription"></Input></Row>
              <Divider/>
            </Modal></Button>
          <Divider type='vertical' />
          <a href=''>Delete</a>
        </span>
      ),
    }],
  };

  editGroup = () => {
    // alert("Edit Modal Opened")
  }

  addModal = () => {
    this.setState({
      addModalVisible: true,
      editModalVisible: false,
    });
  }

  loadEditModal = () => {
    this.setState({
      addModalVisible: false,
      editModalVisible: true,
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

  addNewUserGroup = () => {
    //var index = data.length.valueOf();
    //This will be used to determine where to add the data. Currently its adding double.
    data[1] = {
      key: '3',
      groupType: 'Test2',
      groupName: 'Test2',
      numUsers: '2',
      currentProjects: ['developer'],
    }
    data[2] = {
      key: '4',
      groupType: 'Test3',
      groupName: 'Test3',
      numUsers: '3',
      currentProjects: ['dev'],
    }
  }

  render() {
    const size = this.state.size;
  ///*onClick={() => {this.setState({addModalVisible: true})}}>Add New User Group</Button>*/
    return (
      <div>
        <Button value="default" onClick={() => {this.setState({addModalVisible: true})}}>Add New User Group</Button>
        <Modal
          title="Add User Group"
          visible={this.state.addModalVisible}
          onOk={this.addNewUserGroup()}
          onCancel={() => {this.setState({addModalVisible:false})}}
          width="80%"
          style={{ top: 20 }}
          className="userGroupModal">
          <Row className="inputRow">
          <Input
            id="userGroupType"
            title="userGroupType"
            placeholder="New User Group Type"></Input></Row>
          <Row className="inputRow"><Input 
            id="userGroupName"
            title="userGroupName"
            placeholder="New User Group Name"></Input></Row>
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
          /></Modal>
      <Table bordered dataSource={data} columns={this.state.columns} />
      </div>
    )
  }
}

var data = [{
  key: '1',
  groupType: 'Development',
  groupName: 'Developer Team 2',
  numUsers: '17',
  currentProjects: ['nice', 'developer'],
}];

export default UserGroups;