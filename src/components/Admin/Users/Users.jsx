import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import ReactDragListView from 'react-drag-listview';
import { Table, Tag, Modal, Button, Radio, Input } from 'antd';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false, 
      visible: false,
      index: 0,
      name: "FirstName LastName",
      title:  'FirstName LastName - username',
      email: 'email@email.com',
      userName: 'username',
      userGroups: 'UserGroups',
      liscenceType: 'liscenceType',
      userStatus: 'ACTIVE',

      data: [
        {
          index: 0,
          name: 'Alex Tilot',
          fullName:  <Link to='/admin' onClick={this.setAlex}> Alex Tilot </Link>,
          email: 'alextilot@gmail.com',
          userName: 'Nezzely',
          password: '1234',
          userGroups: ['Purple', 'Blue', 'Brown'],
          liscenceType: 'Developer',
          userStatus: 'ACTIVE',
          actions: ''
        },
        {
          index: 1,
          name: 'Jared Bloomfield',
          fullName: <Link to='/admin'onClick={this.setJared}> Jared Bloomfield </Link>,
          
          email: 'Jaredbloomfield@gmail.com',
          userName: 'Jrod744',
          password: '1234',
          userGroups: ['Red', 'White', 'Yellow'],
          liscenceType: 'Developer',
          userStatus: 'ACTIVE',
          actions: ''
          
        },
        {
          index: 2,
          name: 'Owen Vey',
          fullName: <Link to='/admin'onClick={this.setOwen}> Owen Vey </Link>,
          email: 'owenvey@gmail.com',
          userName: 'Slopeur',
          password: '1234',
          userGroups: ['Black', 'Pink', 'Silver'],
          liscenceType: 'PO',
          userStatus: 'ACTIVE',
          actions: ''
        },
        {
          index: 3,
          name: 'Josh Debaets',
          fullName: <Link to='/admin'onClick={this.setJosh}> Josh Debaets </Link>,
          email: 'joshdebaets@gmail.com',
          userName: 'Debaets',
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
          sorter: (a, b) => a.name.localeCompare(b.fullName)
        },
        {
          title: 'User Name',
          dataIndex: 'userName',
          key: 'userName',
          sorter: (a, b) => a.userName.localeCompare(b.userName)
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
  setAlex = () => this.setState( { index: 0},
  this.showModal
  );

  setJared = () => this.setState( { index: 1},
  this.showModal
  );
  setOwen = () => this.setState( { index: 2},
  this.showModal
  );
  setJosh = () => this.setState( { index: 3},
  this.showModal
  );

  showModal = () => this.setState( { visible: true });

    handleOk = () => {
      this.setState({ loading: true })
      setTimeout(() => {
        this.setState({ loading: false, visible: false });
      }, 0);
    }

    handleCancel = () => { this.setState({ visible: false })
    ;}

    onChangeUserName = (e) => {
      const {index} = this.state;
      this.state.data[index].userName = e.target.value };
    onChangeName = (e) => {
      const {index} = this.state;
      this.state.data[index].name = e.target.value };
    onChangeEmail = (e) => {
      const {index} = this.state;
      this.state.data[index].email = e.target.value };
    onChangePassword = (e) => {
      const {index} = this.state;
      this.state.data[index].password = e.target.value };
    
    activate = () => {
      const {index} = this.state;
      this.setState({ })
      this.state.data[index].userStatus = 'ACTIVE'};

    deactivate = () => {
       const {index} = this.state;
       this.setState({})
      this.state.data[index].userStatus = 'INACTIVE'};
      

  render() {
    const that = this;

    const { visible, loading, userStatus, index} = this.state;

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
          title= {this.state.data[index].username}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          userStatus = {userStatus}
          footer={[
            //<Button key="back" onClick={this.handleCancel}> Cancel</Button>,
            <Button key="update" type="primary" loading={loading} onClick={this.handleOk}>
              Update
            </Button>,
          ]}
        >
          <p> Name: <Input  deafultValue = "" placeholder= {this.state.data[index].name} onChange={this.onChangeName} /> </p>
          <p> Password: <Input placeholder= {this.state.data[index].password} onChange={this.onChangePassword}/> </p>
          <p> Email: <Input placeholder= {this.state.data[index].email} onChange={this.onChangeEmail} /></p>
          <p> Username: <Input placeholder= {this.state.data[index].userName} onChange={this.onChangeUserName}/> </p>
          <p> Current Status: {this.state.data[index].userStatus} </p>
            <Button key="activate" type="primary" onClick={this.activate}>ACTIVATE</Button>,
            <Button key="deactivate" type="primary" onClick={this.deactivate}>DEACTIVATE</Button>,
        </Modal>
      </div>
      
    );
  }
}
//Bar: ViewInactive users, AddUser, Search ->ClearFunction
//Users: UserName,FullName, Email, LoginName, UserGroups, LiscenceType, UserStatus,
//Actions-> edit, password, subscriptions, invite deactivate
export default Users;
