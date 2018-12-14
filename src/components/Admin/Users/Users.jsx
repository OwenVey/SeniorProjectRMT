import React, { Component } from 'react';
import { Table, Tag, Modal, Button, Input, Icon, Switch, Tooltip } from 'antd';
import { UserBar } from '../AdminBars/AdminBars.jsx';
import { Resizable } from "react-resizable";
import axios from 'axios';
import data from "../../../data.js";
import "./Users.css";

const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {

      editUser: {
        key: '',
        firstname: '',
        lastname: '',
        userName: '',
        email: '',
        userGroups: '',
        licenseType: '',
        userStatus: ''
      },

      searchText: '',
      userData: [],
      visible: false,

      columns: [
        {
          title: 'First Name',
          dataIndex: 'firstname',
          key: 'firstname',
          defaultSortOrder: 'ascend',
          width: 150,
          sorter: (a, b) => a.firstname.localeCompare(b.firstname),
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div className="custom-filter-dropdown">
              <Input
                ref={ele => this.searchInput = ele}
                placeholder="Search name"
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={this.handleSearch(selectedKeys, confirm)}
              />
              <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>Search</Button>
              <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
            </div>
          ),
          filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#a9a9a9' : '#a9a9a9' }} />, //108ee9
          onFilter: (value, record) => record.firstname.toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
          render: (text) => {
            const { searchText } = this.state;
            return searchText ? (
              <span>
                {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
                  fragment.toLowerCase() === searchText.toLowerCase()
                    ? <span key={i} className="highlight">{fragment}</span> : fragment // eslint-disable-line
                ))}
              </span>
            ) : text;
          },
        },
        {
          title: 'Last Name',
          dataIndex: 'lastname',
          key: 'lastname',
          defaultSortOrder: 'ascend',
          width: 150,
          sorter: (a, b) => a.lastname.localeCompare(b.lastname),
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div className="custom-filter-dropdown">
              <Input
                ref={ele => this.searchInput = ele}
                placeholder="Search name"
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={this.handleSearch(selectedKeys, confirm)}
              />
              <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>Search</Button>
              <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
            </div>
          ),
          filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#a9a9a9' : '#a9a9a9' }} />, //108ee9
          onFilter: (value, record) => record.lastname.toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
          render: (text) => {
            const { searchText } = this.state;
            return searchText ? (
              <span>
                {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
                  fragment.toLowerCase() === searchText.toLowerCase()
                    ? <span key={i} className="highlight">{fragment}</span> : fragment // eslint-disable-line
                ))}
              </span>
            ) : text;
          },
        },
        {
          title: 'User Name',
          dataIndex: 'userName',
          key: 'userName',
          width: 150,
          sorter: (a, b) => a.userName.localeCompare(b.userName),
          render: (userName, user) => <Tooltip placement="topLeft" title="Edit User Info"><a href='#none' onClick={() => this.openEditModal(user)}>{userName}</a> </Tooltip>,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          width: 250,
          sorter: (a, b) => a.email.localeCompare(b.email)
        },
        {
          title: 'User Groups',
          dataIndex: 'userGroups',
          key: 'userGroups',
          render: userGroups => (
            userGroups.map(userGroup => {
              let color;
              switch (userGroup) {
                case 'Developer':
                  color = 'geekblue';
                  break;
                case 'Admin':
                  color = 'red';
                  break;
                case 'Product Owner':
                  color = 'green';
                  break;
                case 'Scrum Master':
                  color = 'purple';
                  break;
                case 'Customer':
                  color = 'gold';
                  break;
                default:
                  color = '';
              }
              return (
                <Tag color={color}>
                  {userGroup}

                </Tag>
              )
            })
          ),
        },
        // {
        //   title: 'License Type',
        //   dataIndex: 'licenseType',
        //   key: 'licenseType',
        //   width: 150,
        //   sorter: (a, b) => a.licenseType.localeCompare(b.licenseType)
        // },
        {
          title: 'User Status',
          dataIndex: 'userStatus',
          key: 'userStatus',
          align: 'center',
          width: 100,
          sorter: (a, b) => a.userStatus.localeCompare(b.userStatus),
          render: (status) => {
            if (status)
              return <Tag color='blue' style={{ width: 57 }}>Active</Tag>
            else
              return <Tag color='red' style={{ width: 57 }}>Inactive</Tag>
          }
        },
      ]
    };
  }

  componentWillMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    console.log(this.props.accessToken);
    const url = `https://senior-design.timblin.org/api/user?accessToken=${this.props.accessToken}`;
    const url2 = `https://abortplatteville.com/api/user?accessToken=${this.props.accessToken}`
    axios.get(url2)
      .then(response => {
        let users = response.data.message.users.map(user => { return { ...user, userGroups: ['Developer'], userName: `${user.firstname}${user.lastname}`, userStatus: true, } })
        this.setState({ userData: users })
      })
      .catch(error => {
        console.log(error);
      });
  }

  addUser = (user) => {
    this.setState({ userData: [...this.state.userData, user] })
  }

  components = {
    header: {
      cell: ResizeableTitle
    }
  };

  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width
      };
      return { columns: nextColumns };
    });
  };

  openEditModal = (user) => {
    this.setState({
      editUser: user,
      visible: true,
    });
  }

  handleSave = () => {
    this.setState({
      userData: this.state.userData.map(user => (user.key === this.state.editUser.key ? Object.assign(this.state.editUser) : user)),
      visible: false
    })
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  render() {
    const { visible, userStatus } = this.state;

    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index)
      })
    }));

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
      <React.Fragment>

        <UserBar addUser={this.addUser} />

        <Table
          components={this.components}
          columns={columns}
          pagination={false}
          dataSource={this.state.userData}
          scroll={{ y: 500 }}
          bordered
        />

        <Modal
          visible={visible}
          onCancel={this.handleCancel}
          userStatus={userStatus}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="update" type="primary" onClick={this.handleSave}>
              Save
            </Button>,
          ]}
        >
          <p>First Name: <Input value={this.state.editUser.firstname} onChange={(e) => this.setState({ editUser: { ...this.state.editUser, firstname: e.target.value } })} placeholder='First Name' /> </p>
          <p>Last Name: <Input value={this.state.editUser.lastname} onChange={(e) => this.setState({ editUser: { ...this.state.editUser, lastname: e.target.value } })} placeholder='Last Name' /> </p>
          <p>Email: <Input value={this.state.editUser.email} onChange={(e) => this.setState({ editUser: { ...this.state.editUser, email: e.target.value } })} placeholder='Email' /></p>
          <p>Username: <Input value={this.state.editUser.userName} onChange={(e) => this.setState({ editUser: { ...this.state.editUser, userName: e.target.value } })} placeholder='Username' /> </p>
          <div>User Status:</div>
          <span>Inactive</span>
          <Switch style={{ margin: '0px 10px' }} checked={this.state.editUser.userStatus} onChange={(value) => this.setState({ editUser: { ...this.state.editUser, userStatus: value } })} />
          <span>Active</span>
        </Modal>
      </React.Fragment>

    );
  }
}


export default Users;
