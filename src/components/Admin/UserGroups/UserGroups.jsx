import React, { Component } from 'react';
import { Tag, Table, Divider, Modal, Row, Button, Icon, Form, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./UserGroups.css"

class UserGroups extends Component {
  state = {
    size: 'large',
    mockData: [],
    targetKeys: [],
    addModalVisible: false,
    editModalVisible: false,
    editing: false,
    columns: [
      {
        title: 'Group Type',
        dataIndex: 'groupType',
        /*key: 'groupType',*/
        render: text => <span>{text}</span>,
      },
      {
        title: 'Group Name',
        dataIndex: 'groupName',
        /*key: 'groupName',*/
        render: text => <span>{text}</span>,
      },
      {
        title: '# of Users',
        dataIndex: 'numUsers',
        /*key: 'groupName',*/
        render: text => <span>{text}</span>,
      },
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
                  this.editUserGroup(this.state.groupType, this.state.groupName, this.state.numUsers)
              }}
              onCancel={() => { this.setState({ editModalVisible: false }) }}
              width="80%"
              style={{ top: 20 }}
              className="editGroupModal">
              <Row className="inputRow">
                <Input
                  id="editGroupType"
                  title="editGroupType"
                  value={this.state.groupType}
                  onChange={(e) => this.setState({ groupType: e.target.value })}
                >
                </Input>
              </Row>
              <Row className="inputRow">
                <Form layout="vertical" />
                <Input
                  id="editGroupName"
                  title="editGroupName"
                  value={this.state.groupName}
                  onChange={(e) => this.setState({ groupName: e.target.value })}>
                </Input>
              </Row>
              <Row className="inputRow">
                <Form layout="vertical" />
                <Input
                  id="editNumUsers"
                  title="editNumUsers"
                  value={this.state.numUsers}
                  onChange={(e) => this.setState({ numUsers: e.target.value })}>
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
      groupType: 'Development',
      groupName: 'Ocean\'s 8',
      numUsers: '8',
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

  addNewUserGroup = (groupType, groupName, numUsers) => {
    var index = this.state.data.length
    this.state.data = [...this.state.data, {
      key: index++,
      groupType: groupType,
      groupName: groupName,
      numUsers: numUsers,
    }]
  }

  editUserGroup = (groupType, groupName, numUsers) => {
    var index = this.state.data.key
    this.state.data[index] = {
      key: index,
      groupType: groupType,
      groupName: groupName,
      numUsers: numUsers,
    }
  }

  render() {
    const size = this.state.size;
    return (
      <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'row', margin: 15, justifyContent: 'flex-end' }}>
          <Button onClick={() => this.setState({ addModalVisible: true })}>
            <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />
            Add User Group
          </Button>
        </div >
        <Modal
          title={<div><Icon style={{ color: '#1890FF' }}><FontAwesomeIcon icon='users' /></Icon> Add User Group</div>}
          visible={this.state.addModalVisible}
          onOk={() => {
            this.setState({ addModalVisible: false }),
              this.addNewUserGroup(this.state.groupType, this.state.groupName, this.state.numUsers, this.state.curProjects)
          }}
          onCancel={() => { this.setState({ addModalVisible: false }) }}
          width="80%"
          style={{ top: 20 }}
          className="userGroupModal">
          <div className="inputRow">
            <div>User Group Type</div>
            <Input
              id="userGroupType"
              title="userGroupType"
              placeholder="New User Group Type"
              onChange={(e) => this.setState({ groupType: e.target.value })}
              value={this.state.groupType}>
            </Input>
          </div>
          <div className="inputRow">
            <div>Group Name</div>
            <Input
              id="userGroupName"
              title="userGroupName"
              placeholder="New User Group Name"
              onChange={(e) => this.setState({ groupName: e.target.value })}
              value={this.state.groupName}>
            </Input>
          </div>

        </Modal>
        <Table bordered dataSource={this.state.data} columns={this.state.columns} />
      </React.Fragment>
    )
  }
}

export default UserGroups;