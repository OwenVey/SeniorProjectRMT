import React, { Component } from 'react';
import ReactDragListView from 'react-drag-listview';
import { Table, Tag, Divider } from 'antd';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          fullName: 'Alex Tilot',
          email: 'alextilot@gmail.com',
          userName: 'Nezzely',
          userGroups: ['Purple', 'Blue', 'Brown'],
          liscenceType: 'Developer',
          userStatus: 'ACTIVE',
          actions: ''
        },
        {
          fullName: 'Jared Bloomfield',
          email: 'Jaredbloomfield@gmail.com',
          userName: 'Jrod744',
          userGroups: ['Red', 'White', 'Yellow'],
          liscenceType: 'Developer',
          userStatus: 'ACTIVE',
          actions: ''
        },
        {
          fullName: 'Owen Vey',
          email: 'owenvey@gmail.com',
          userName: 'Slopeur',
          userGroups: ['Black', 'Pink', 'Silver'],
          liscenceType: 'PO',
          userStatus: 'ACTIVE',
          actions: ''
        },
        {
          fullName: 'Josh Debaets',
          email: 'joshdebaets@gmail.com',
          userName: 'Debaets',
          userGroups: ['Green', 'Orange', 'Cyan'],
          liscenceType: 'Developer',
          userStatus: 'DEACTIVE',
          actions: ''
        }
      ],
      columns: [
        {
          title: 'Full Name',
          dataIndex: 'fullName',
          key: 'fullname',
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.fullName.localeCompare(b.fullName)
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
        {
          //Actions-> edit, password, subscriptions, invite deactivate
          title: 'Actions',
          key: 'actions',
          render: () => (
            <span>
              <a href=''>Edit</a>
              <Divider type='vertical' />
              <a href=''>Password</a>
              <Divider type='vertical' />
              <a href=''>Subscriptions</a>
              <Divider type='vertical' />
              <a href=''>Invite</a>
              <Divider type='vertical' />
              <a href=''>Deactivate</a>
            </span>
          ),

        }
      ]
    };
  }

  render() {
    const that = this;
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
      </div>
    );
  }
}
//Bar: ViewInactie users, AddUser, Search ->ClearFunction
//Users: UserName,FullName, Email, LoginName, UserGroups, LiscenceType, UserStatus,
//Actions-> edit, password, subscriptions, invite deactivate
export default Users;
