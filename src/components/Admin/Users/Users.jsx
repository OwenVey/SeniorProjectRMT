import React, { Component } from "react";
import { Resizable } from "react-resizable";
import { connect } from "react-redux";
import { Table, Tag, Button, Input, Icon, Tooltip } from "antd";
import { UserBar } from "../AdminBars/AdminBars.jsx";
import { getUsers, showEditUserModal } from "../../../actions/users";
import EditUserModal from "./EditUserModal";
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
      columns: [
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
          ), //108ee9
          onFilter: (value, record) =>
            record.lastname.toLowerCase().includes(value.toLowerCase()),
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
          title: "User Name",
          dataIndex: "userName",
          key: "userName",
          width: 150,
          sorter: (a, b) => a.userName.localeCompare(b.userName),
          render: (userName, user) => (
            <Tooltip placement="topLeft" title="Edit User Info">
              <a
                href="#none"
                onClick={() => this.props.showEditUserModal(user)}
              >
                {userName}
              </a>{" "}
            </Tooltip>
          )
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
          render: userGroups =>
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
              return <Tag color={color}>{userGroup}</Tag>;
            })
        },
        // {
        //   title: 'License Type',
        //   dataIndex: 'licenseType',
        //   key: 'licenseType',
        //   width: 150,
        //   sorter: (a, b) => a.licenseType.localeCompare(b.licenseType)
        // },
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
  }

  componentWillMount() {
    if (this.props.userAdminData.length === 0)
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
      <React.Fragment>
        <UserBar />
        <Table
          components={this.components}
          columns={columns}
          pagination={false}
          dataSource={this.props.userAdminData}
          scroll={{ y: 500 }}
          bordered
        />
        {this.props.editModalVisible && <EditUserModal />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  userAdminData: state.users.userData,
  editModalVisible: state.users.showEditUserModal
});

export default connect(
  mapStateToProps,
  { getUsers, showEditUserModal }
)(Users);
