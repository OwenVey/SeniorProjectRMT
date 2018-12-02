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
    },
    //{
    //   title: 'Current Projects',
    //   dataIndex: 'currentProjects',
    //   render: tags => (
    //     <span>
    //       {tags.map(tag => <Tag color='blue' key={tag}>{tag}</Tag>)}
    //     </span>
    //     /*key: 'tags',*/
    //   ),
    // }, 
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>Members</a>
          <Divider type='vertical' />
          <a>Group</a>
          <Divider type='vertical' />
          <Button
            value="default" onClick={() => this.setState({ editModalVisible: true })}>Edit
          </Button>
          <Modal
            title="Edit User Group"
            id='editGroupModal'
            visible={this.state.editModalVisible}
            onOk={() => {
              this.setState({ editModalVisible: false }),
                this.editUserGroup(this.state.groupName, this.state.groupType, this.state.numUsers, this.state.curProjects)
            }}
            onCancel={() => { this.setState({ editModalVisible: false }) }}
            width="80%"
            style={{ top: 20 }}
            className="editGroupModal">
            <Row className="inputRow">
              <Input
                title="editGroupTitle"
                value={document.getElementById('userGroupType')}
              >
              </Input>
            </Row>
            <Row className="inputRow">
              <Form layout="vertical" />
              <Input
                id="editGroupName"
                title="editGroupName"
                value={this.state.groupName}
                placeholder={this.state.groupName}
                onChange={(e) => this.setState({ groupName: e.target.value })}>
              </Input>
            </Row>
            <Row className="inputRow">
              <Input title="editGroupDescription">
              </Input>
            </Row>
            <Divider />
          </Modal>
          <Divider type='vertical' />
          <Button>
            Delete
          </Button>
        </span>
      ),
    }],
    groupType: "",
    groupName: "",
    data: [{
      key: '0',
      groupType: 'Dev',
      groupName: 'Developer Team 2',
      numUsers: '17',
      currentProjects: ['nice', 'developer'],
    }],
    numUsers: "0",
    curProjects: "",
  };



  /*() => {this.setState({editModalVisible:true})}*/

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

  addNewUserGroup = (groupType, groupName, numUsers, curProjects) => {
    //var index = data.length.valueOf();
    //This will be used to determine where to add the data. Currently its adding double.
    var index = this.state.data.length
    this.state.data = [...this.state.data, {
      key: index++,
      groupType: groupType,
      groupName: groupName,
      numUsers: numUsers,
      currentProjects: [curProjects],
    }]
  }

  editUserGroup = () => {

  }

  render() {
    const size = this.state.size;
    ///*onClick={() => {this.setState({addModalVisible: true})}}>Add New User Group</Button>*/
    return (
      <div>
        <Button value="default" onClick={() => this.setState({ addModalVisible: true })}>Add New User Group</Button>
        <Modal
          title="Add User Group"
          visible={this.state.addModalVisible}
          onOk={() => {
            //value => console.log(value)}}
            //alert(value)
            this.setState({ addModalVisible: false }),
              this.addNewUserGroup(this.state.groupName, this.state.groupType, this.state.numUsers, this.state.curProjects)
          }}
          onCancel={() => { this.setState({ addModalVisible: false }) }}
          width="80%"
          style={{ top: 20 }}
          className="userGroupModal">
          <Row className="inputRow">
            <Input
              id="userGroupType"
              title="userGroupType"
              placeholder="New User Group Type"
              onChange={(e) => this.setState({ groupType: e.target.value })}
              value={this.state.groupType}>
            </Input>
          </Row>
          <Row className="inputRow">
            <Input
              id="userGroupName"
              title="userGroupName"
              placeholder="New User Group Name"
              onChange={(e) => this.setState({ groupName: e.target.value })}
              value={this.state.groupName}>
            </Input>
          </Row>
          <Row className="inputRow">
            <Input
              id="groupNumUsers"
              title="groupNumUsers"
              placeholder="0"
              onChange={(e) => this.setState({ numUsers: e.target.value })}
              value={this.state.numUsers}>
            </Input>
          </Row>
          <Divider />
        </Modal>
        <Table bordered dataSource={this.state.data} columns={this.state.columns} />
      </div >
    )
  }
}

export default UserGroups;