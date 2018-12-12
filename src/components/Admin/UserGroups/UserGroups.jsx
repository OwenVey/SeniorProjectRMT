import React, { Component } from 'react';
import { Table, Divider, Modal, Row, Button, Icon, Form, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './UserGroups.css'

class UserGroups extends Component {
  state = {
    editedUserGroup: {
      key: '',
      groupType: '',
      groupName: '',
      numUsers: '',
      currentProjects: [],
    },
    size: 'large',
    mockData: [],
    targetKeys: [],
    addModalVisible: false,
    editModalVisible: false,
    deleteModalVisible: false,
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
        render: (text, userGroup) => (
          <span>
            <a href='#none'>Members</a>
            <Divider type='vertical' />
            <a href='#none'>Group</a>
            <Divider type='vertical' />
            <Button
              value='default'
              onClick={() => this.setState({ editModalVisible: true, editedUserGroup: userGroup })}>
              Edit
            </Button>
            <Modal
              className='editGroupModal'
              title='Edit User Group'
              id='editGroupModal'
              visible={this.state.editModalVisible}
              onCancel={() => { this.setState({ editModalVisible: false }) }}
              onOk={() => {
                this.setState({ editModalVisible: false })
                this.editUserGroup()
              }}
            >
              <Row className='inputRow'>
                <Input
                  id='editGroupType'
                  title='editGroupType'
                  value={this.state.editedUserGroup.groupType}
                  onChange={(e) => this.setState({ editedUserGroup: { ...this.state.editedUserGroup, groupType: e.target.value } })}
                >
                </Input>
              </Row>
              <Row className='inputRow'>
                <Form layout='vertical' />
                <Input
                  id='editGroupName'
                  title='editGroupName'
                  value={this.state.editedUserGroup.groupName}
                  onChange={(e) => this.setState({ editedUserGroup: { ...this.state.editedUserGroup, groupName: e.target.value } })}
                >
                </Input>
              </Row>
            </Modal>
            <Divider type='vertical' />
            <Button
              value='default'
              onClick={() => {this.setState({deleteModalVisible: true})}}>
              Delete
            </Button>
            <Modal
              className='deleteGroupModal'
              title='Delete User Group'
              id='deleteUserGroup'
              visible={this.state.deleteModalVisible}
              onCancel={() => {this.setState({deleteModalVisible: false})}}
              onOk={() => {
                this.setState({deleteModalVisible: false})
                this.deleteUserGroup(userGroup.key)
              }}
              >
              <Row>Are you sure you want to delete?</Row>

            </Modal>
          </span>
        ),
      }],
    groupType: '',
    groupName: '',
    userGroups: [{
      key: '0',
      groupType: 'Development',
      groupName: 'Ocean\'s 8',
      numUsers: '8',
      currentProjects: ['nice', 'developer'],
    }],
    curProjects: '',
  };



  /*() => {this.setState({editModalVisible:true})}*/

  addModal = () => {
    this.setState({
      addModalVisible: true,
      editModalVisible: false,
      deleteModalVisible: false,
    });
  }

  loadEditModal = () => {
    this.setState({
      addModalVisible: false,
      editModalVisible: true,
      deleteModalVisible: false,
    });
  }

  deleteGroupModal = () => {
    this.setState({
      deleteModalVisible: true,
      addModalVisible: false,
      editModalVisible: false,
    })
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
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
    var key = this.state.userGroups.length;

    let newUserGroup = {
      key,
      groupType,
      groupName,
      numUsers,
    }

    this.setState({ userGroups: [...this.state.userGroups, newUserGroup] });
  }

  editUserGroup = () => {
    var index = this.state.editedUserGroup.key;
    this.setState({
      userGroups: this.state.userGroups.map(group => (group.key === index ? Object.assign(this.state.editedUserGroup) : group)),
    });
  }

  // showDeleteModal = (key) => {
  //   Modal.confirm({
  //     title: 'Do you Want to delete these items?',
  //     content: 'Some descriptions',
  //     onOk={() => {
  //       //this.deleteUserGroup(key);
  //       this.setState({
  //         userGroups: this.state.userGroups.filter((userGroup) => userGroup.key !== key)
  //       });
  //     }
  //     },
  //     onCancel() {},
  //   });
  // }

  deleteUserGroup = (key) => {
    this.setState({
      userGroups: this.state.userGroups.filter((userGroup) => userGroup.key !== key)
    })
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'row', margin: 15, justifyContent: 'flex-end' }}>
          <Button onClick={() => this.setState({ addModalVisible: true })}>
            <Icon type='plus-circle' theme='filled' style={{ color: '#1890FF' }} />
            Add User Group
          </Button>
        </div >
        <Modal
          title={<div><Icon style={{ color: '#1890FF' }}><FontAwesomeIcon icon='users' /></Icon> Add User Group</div>}
          visible={this.state.addModalVisible}
          onOk={() => {
            this.setState({ addModalVisible: false })
            this.addNewUserGroup(this.state.groupType, this.state.groupName, this.state.numUsers, this.state.curProjects)
          }}
          onCancel={() => { this.setState({ addModalVisible: false }) }}
          className='userGroupModal'
        >
          <div className='inputRow'>
            <div>User Group Type</div>
            <Input
              id='userGroupType'
              title='userGroupType'
              placeholder='User Group Type'
              onChange={(e) => this.setState({ groupType: e.target.value })}
              value={this.state.groupType}>
            </Input>
          </div>
          <div className='inputRow'>
            <div>Group Name</div>
            <Input
              id='userGroupName'
              title='userGroupName'
              placeholder='User Group Name'
              onChange={(e) => this.setState({ groupName: e.target.value })}
              value={this.state.groupName}>
            </Input>
          </div>

        </Modal>
        <Table bordered dataSource={this.state.userGroups} columns={this.state.columns} />
      </React.Fragment>
    )
  }
}

export default UserGroups;