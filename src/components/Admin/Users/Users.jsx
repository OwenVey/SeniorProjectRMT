import React, { Component } from "react";
import ReactDragListView from "react-drag-listview";
import { Table } from "antd";
function onChange(pagination, sorter) {
  console.log("params", pagination, sorter);
}
class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          fullName: "Alex Tilot",
          email: "alextilot@gmail.com",
          userName: "Nezzely",
          userGroups: "purple, yellow, orange",
          liscenceType: "Developer",
          userStatus: "ACTIVE"
        },
        {
          fullName: "Jared Bloomfield",
          email: "Jaredbloomfield@gmail.com",
          userName: "Jrod744",
          userGroups: "red, blue, orange",
          liscenceType: "Developer",
          userStatus: "ACTIVE"
        },
        {
          fullName: "Owen Vey",
          email: "owenvey@gmail.com",
          userName: "Slopeur",
          userGroups: "Black, Pink",
          liscenceType: "PO",
          userStatus: "ACTIVE"
        },
        {
          fullName: "Josh Debaets",
          email: "joshdebaets@gmail.com",
          userName: "Debaets",
          userGroups: "green, orange",
          liscenceType: "Developer",
          userStatus: "DEACTIVE"
        }
      ],
      columns: [
        {
          title: "Full Name",
          dataIndex: "fullName",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.fullName - b.fullName
        },
        {
          title: "Email",
          dataIndex: "email",
          sorter: (a, b) => a.email.length - b.email.length
        },
        {
          title: "User Name",
          dataIndex: "userName",
          sorter: (a, b) => a.userName.length - b.userName.length
        },
        {
          title: "User Groups",
          dataIndex: "userGroups",
          sorter: (a, b) => a.userGroups.length - b.userGroups.length
        },
        {
          title: "Liscence Type",
          dataIndex: "liscenceType",
          sorter: (a, b) => a.liscenceType.length - b.liscenceType.length
        },
        {
          title: "User Status",
          dataIndex: "userStatus",
          sorter: (a, b) => a.userStatus.length - b.userStatus.length
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
      nodeSelector: "th"
    };

    return (
      <div style={{ margin: 20 }}>
        <h2>Requirements</h2>
        <ReactDragListView.DragColumn {...this.dragProps}>
          <Table
            columns={this.state.columns}
            pagination={false}
            dataSource={this.state.data}
            onChange={onChange}
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
