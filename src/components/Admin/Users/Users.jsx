import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactDragListView from 'react-drag-listview';
import { Table, Tag, Modal, Button, Radio, Input } from 'antd';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      email: '',
      username: '',
      visible: false,
      data: [
        {
          index: 0,
          name: 'Alex Tilot',
          fullName: 'Alex Tilot',
          email: 'alextilot@gmail.com',
          username: 'Nezzely',
          password: '1234',
          userGroups: ['Purple', 'Blue', 'Brown'],
          liscenceType: 'Developer',
          userStatus: 'ACTIVE',
          actions: ''
        },
        {
          index: 1,
          name: 'Jared Bloomfield',
          fullName: 'Jared Bloomfield',
          email: 'Jaredbloomfield@gmail.com',
          username: 'Jrod744',
          password: '1234',
          userGroups: ['Red', 'White', 'Yellow'],
          liscenceType: 'Developer',
          userStatus: 'ACTIVE',
          actions: ''

        },
        {
          index: 2,
          name: 'Owen Vey',
          fullName: 'Owen Vey',
          email: 'owenvey@gmail.com',
          username: 'Slopeur',
          password: '1234',
          userGroups: ['Black', 'Pink', 'Silver'],
          liscenceType: 'PO',
          userStatus: 'ACTIVE',
          actions: ''
        },
        {
          index: 3,
          name: 'Josh Debaets',
          fullName: 'Josh Debaets',
          email: 'joshdebaets@gmail.com',
          username: 'Debaets',
          password: '1234',
          userGroups: ['Green', 'Orange', 'Cyan'],
          liscenceType: 'Developer',
          userStatus: 'INACTIVE',
          actions: ''
        }
      ],
      columns: [
        {
          title: 'Full Name',
          dataIndex: 'fullName',
          key: 'fullname',
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.fullName.localeCompare(b.fullName),
          render: (fullName, user) => <a onClick={() => this.openEditModal(user)}>{fullName}</a>
        },
        {
          title: 'User Name',
          dataIndex: 'username',
          key: 'username',
          sorter: (a, b) => a.username.localeCompare(b.username)
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          sorter: (a, b) => a.email.localeCompare(b.email)
        },
        {
          title: 'User Groups',
          dataIndex: 'userGroups',
          key: 'userGroups',
          render: tags => (
            <span>
              {tags.map(tag => (
                <Tag color={tag} key={tag}>
                  {tag}
                </Tag>
              ))}
            </span>
          ),

        },
        {
          title: 'Liscence Type',
          dataIndex: 'liscenceType',
          key: 'liscenceType',
          sorter: (a, b) => a.liscenceType.localeCompare(b.liscenceType)
        },
        {
          title: 'User Status',
          dataIndex: 'userStatus',
          key: 'userStatus',
          sorter: (a, b) => a.userStatus.localeCompare(b.userStatus)
        },
        // {
        //   //Actions-> edit, password, subscriptions, invite deactivate
        //   title: 'Actions' ,
        //   key: 'actions',
        //   render: () => (
        //     <span>
        //       <a href=''>Edit</a>
        //       <Divider type='vertical' />
        //       <a href=''>Password</a>
        //       <Divider type='vertical' />
        //       <a href=''>Subscriptions</a>
        //       <Divider type='vertical' />
        //       <a href=''>Invite</a>
        //       <Divider type='vertical' />
        //       <a href=''>Deactivate</a>
        //     </span>
        //   ),

        // }
      ]
    };
  }


  openEditModal = (user) => {
    this.setState({
      name: user.name,
      password: user.password,
      email: user.email,
      username: user.username,
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({ visible: false })
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  activate = () => {
    const { index } = this.state;
    this.setState({})
    this.state.data[index].userStatus = 'ACTIVE'
  };

  deactivate = () => {
    const { index } = this.state;
    this.setState({})
    this.state.data[index].userStatus = 'INACTIVE'
  };


  render() {
    const that = this;

    const { visible, userStatus } = this.state;

    this.dragProps = {
      onDragEnd(fromIndex, toIndex) {
        const columns = that.state.columns;
        const item = columns.splice(fromIndex, 1)[0];
        columns.splice(toIndex, 0, item);
        that.setState({
          columns
        });
      },
      nodeSelector: 'th'
    };

    return (
      <div className='userBoxList'>
        <ReactDragListView.DragColumn {...this.dragProps}>
          <Table
            columns={this.state.columns}
            pagination={false}
            dataSource={this.state.data}
            bordered
          />
        </ReactDragListView.DragColumn>

        <Modal
          visible={visible}
          onCancel={this.handleCancel}
          userStatus={userStatus}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="update" type="primary" onClick={this.handleOk}>
              Update
            </Button>,
          ]}
        >
          <p>Name: <Input value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} placeholder='Name' /> </p>
          <p>Password: <Input value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} placeholder='Password' /> </p>
          <p>Email: <Input value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} placeholder='Email' /></p>
          <p>Username: <Input value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} placeholder='Username' /> </p>
          <p>Current Status: {

          } </p>
          <Button key="activate" type="primary" onClick={this.activate}>ACTIVATE</Button>,
            <Button key="deactivate" type="primary" onClick={this.deactivate}>DEACTIVATE</Button>,
        </Modal>
      </div>

    );
  }
}

export default Users;
