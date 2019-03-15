import React, { Component } from "react";
import { Resizable } from "react-resizable";
import { connect } from "react-redux";
import { Table, Tag, Button, Input, Icon, Tooltip } from "antd";
import { getUsers, showEditUserModal, showAddUserModal } from "../../../actions/users";
import EditUserModal from "./EditUserModal";
import AddUserModal from './AddUserModal';
import "./Users.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  state = {
    columns: [
      {
        title: 'Actions',
        dataIndex: 'id',
        key: 'id',
        width: 75,
        fixed: 'left',
        align: 'center',
        render: (id, user) => (
          <Tooltip title="Edit Project Info">
            <Icon onClick={() => this.props.showEditUserModal(user)}>
              <FontAwesomeIcon icon='edit' color='#1890ff' />
            </Icon>
          </Tooltip>
        ),
      },
      {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName",
        defaultSortOrder: "ascend",
        width: 150,
        sorter: (a, b) => a.firstName.localeCompare(b.firstName),
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters
        }) => (
            <div className="custom-filter-dropdown">
              <Input
                ref={ele => (this.searchInput = ele)}
                placeholder="Search name"
                value={selectedKeys[0]}
                onChange={e =>
                  setSelectedKeys(e.target.value ? [e.target.value] : [])
                }
                onPressEnter={this.handleSearch(selectedKeys, confirm)}
              />
              <Button
                type="primary"
                onClick={this.handleSearch(selectedKeys, confirm)}
              >
                Search
              </Button>
              <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
            </div>
          ),
        filterIcon: filtered => (
          <Icon
            type="search"
            style={{ color: filtered ? "#a9a9a9" : "#a9a9a9" }}
          />
        ), //108ee9
        onFilter: (value, record) =>
          record.firstName.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            });
          }
        },
        render: text => {
          const { searchText } = this.state;
          return searchText ? (
            <span>
              {text
                .split(
                  new RegExp(`(?<=${searchText})|(?=${searchText})`, "i")
                )
                .map(
                  (fragment, i) =>
                    fragment.toLowerCase() === searchText.toLowerCase() ? (
                      <span key={i} className="highlight">
                        {fragment}
                      </span>
                    ) : (
                        fragment
                      ) // eslint-disable-line
                )}
            </span>
          ) : (
              text
            );
        }
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
        defaultSortOrder: "ascend",
        width: 150,
        sorter: (a, b) => a.lastName.localeCompare(b.lastName),
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters
        }) => (
            <div className="custom-filter-dropdown">
              <Input
                ref={ele => (this.searchInput = ele)}
                placeholder="Search name"
                value={selectedKeys[0]}
                onChange={e =>
                  setSelectedKeys(e.target.value ? [e.target.value] : [])
                }
                onPressEnter={this.handleSearch(selectedKeys, confirm)}
              />
              <Button
                type="primary"
                onClick={this.handleSearch(selectedKeys, confirm)}
              >
                Search
              </Button>
              <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
            </div>
          ),
        filterIcon: filtered => (
          <Icon
            type="search"
            style={{ color: filtered ? "#a9a9a9" : "#a9a9a9" }}
          />
        ),
        onFilter: (value, record) =>
          record.lastName.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            });
          }
        },
        render: text => {
          const { searchText } = this.state;
          return searchText ? (
            <span>
              {text
                .split(
                  new RegExp(`(?<=${searchText})|(?=${searchText})`, "i")
                )
                .map(
                  (fragment, i) =>
                    fragment.toLowerCase() === searchText.toLowerCase() ? (
                      <span key={i} className="highlight">
                        {fragment}
                      </span>
                    ) : (
                        fragment
                      )
                )}
            </span>
          ) : (
              text
            );
        }
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 250,
        sorter: (a, b) => a.email.localeCompare(b.email)
      },
      {
        title: "User Groups",
        dataIndex: "userGroups",
        key: "userGroups",
        render: userGroups => {
          if (userGroups)
            return (
              userGroups.map(userGroup => {
                let color;
                switch (userGroup) {
                  case "Developer":
                    color = "geekblue";
                    break;
                  case "Admin":
                    color = "red";
                    break;
                  case "Product Owner":
                    color = "green";
                    break;
                  case "Scrum Master":
                    color = "purple";
                    break;
                  case "Customer":
                    color = "gold";
                    break;
                  default:
                    color = "";
                }
                return <Tag key={color} color={color}>{userGroup}</Tag>;
              })
            )
        }
      },
      {
        title: "User Status",
        dataIndex: "isActive",
        key: "isActive",
        align: "center",
        width: 100,
        sorter: (a, b) => +a.isActive - +b.isActive,
        render: status => {
          if (status)
            return (
              <Tag color="blue" style={{ width: 57 }}>
                Active
                </Tag>
            );
          else
            return (
              <Tag color="red" style={{ width: 57 }}>
                Inactive
                </Tag>
            );
        }
      }
    ]
  };

  componentWillMount() {
    if (this.props.users.length === 0)
      this.props.getUsers(this.props.accessToken);
  }

  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchText: "" });
  };

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

  components = {
    header: {
      cell: ResizeableTitle
    }
  };

  render() {
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
      nodeSelector: "th"
    };

    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'row', margin: 15, marginBottom: 5, justifyContent: 'flex-end' }}>
          <div style={{ flex: 1, justifyContent: 'flex-start' }}>
            <h2>Users</h2>
          </div>
          <Button onClick={() => this.props.showAddUserModal()}>
            <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />
            Add User
        </Button>
          {this.props.addUserModalVisible && <AddUserModal />}
        </div>
        <Table
          rowKey={record => record.id}
          components={this.components}
          columns={columns}
          dataSource={this.props.users}
          bordered
          loading={this.props.loadingUsers}
        />
        {this.props.editUserModalVisible && <EditUserModal />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  users: state.users.users,
  editUserModalVisible: state.users.editUserModalVisibility,
  addUserModalVisible: state.users.addUserModalVisibility,
  loadingUsers: state.users.loadingUsers,
});

export default connect(mapStateToProps, { getUsers, showEditUserModal, showAddUserModal })(Users);