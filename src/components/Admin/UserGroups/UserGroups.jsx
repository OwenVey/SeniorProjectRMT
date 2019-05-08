import React, { Component } from 'react';
import { connect } from "react-redux";
import { Table, Divider, Button, Icon, Input, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUserGroups, clickAddUserGroup, clickEditUserGroup } from '../../../actions/userGroups';
import { getProjects } from '../../../actions/projects';
import AddUserGroupModal from './AddUserGroupModal';
import EditUserGroupModal from './EditUserGroupModal.jsx';
import './UserGroups.css'

class UserGroups extends Component {

  state = {
    searchText: '',
    columns: [
      {
        title: 'Actions',
        dataIndex: 'id',
        key: 'id',
        width: 75,
        align: 'center',
        render: (id, userGroup) => (
          <>
            <Tooltip title="Edit User Group Info">
              <Icon onClick={() => this.props.clickEditUserGroup(userGroup)}>
                <FontAwesomeIcon icon='edit' color='#1890ff' />
              </Icon>
            </Tooltip>
            <Divider type='vertical' />
            <Tooltip title="Manage Members">
              <Icon onClick={() => { }}>
                <FontAwesomeIcon icon='users' color='#000000' />
              </Icon>
            </Tooltip>
          </>
        ),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        defaultSortOrder: 'ascend',
        width: 150,
        sorter: (a, b) => a.name.localeCompare(b.name),
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => (this.searchInput = ele)}
              placeholder="Search Name"
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={this.handleSearch(selectedKeys, confirm)}
            />
            <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>
              Search
            </Button>
            <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
          </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#a9a9a9' : '#a9a9a9' }} />, //108ee9
        onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
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
              {text
                .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))
                .map((fragment, i) =>
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
        },
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        defaultSortOrder: 'ascend',
        width: 150,
        sorter: (a, b) => a.description.localeCompare(b.description),
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => (this.searchInput = ele)}
              placeholder="Search Description"
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={this.handleSearch(selectedKeys, confirm)}
            />
            <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>
              Search
            </Button>
            <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
          </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#a9a9a9' : '#a9a9a9' }} />, //108ee9
        onFilter: (value, record) => record.description.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
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
              {text
                .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))
                .map((fragment, i) =>
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
        },
      },
      // {
      //   title: '# of Users',
      //   dataIndex: 'numUsers',
      //   width: 150,
      //   /*key: 'groupName',*/
      //   render: text => <span> [Unimplemented] </span>,
      // },
      {
        title: 'ProjectId',
        dataIndex: 'projectId',
        key: 'projectId',
        defaultSortOrder: 'ascend',
        width: 150,
        sorter: (a, b) => a.projectId.localeCompare(b.projectId),
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => (this.searchInput = ele)}
              placeholder="Search Project Id"
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={this.handleSearch(selectedKeys, confirm)}
            />
            <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>
              Search
            </Button>
            <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
          </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#a9a9a9' : '#a9a9a9' }} />, //108ee9
        onFilter: (value, record) => record.projectId.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
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
              {text
                .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))
                .map((fragment, i) =>
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
        },
      }],
  };

  componentWillMount() {
    if (this.props.userGroups.length === 0)
      this.props.getUserGroups(this.props.accessToken);
    if (this.props.projects.length === 0)
      this.props.getProjects(this.props.accessToken);
  }

  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    return (
      <>

        <div style={{ display: 'flex', flexDirection: 'row', margin: 15, marginBottom: 5, justifyContent: 'flex-end' }}>
          <div style={{ flex: 1, justifyContent: 'flex-start' }}>
            <h2>User Groups</h2>
          </div>
          <Button onClick={() => this.props.clickAddUserGroup()}>
            <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />
            Add User Group
        </Button>
        </div>

        <Table
          bordered
          rowKey={record => record.id}
          dataSource={this.props.userGroups}
          columns={this.state.columns}
          loading={this.props.loadingUserGroups}
        />
        {this.props.showAddUserGroupModal && <AddUserGroupModal />}
        {this.props.showEditUserGroupModal && <EditUserGroupModal />}
      </ >
    )
  }
}

const mapStateToProps = state => ({
  showAddUserGroupModal: state.userGroups.showAddUserGroupModal,
  showEditUserGroupModal: state.userGroups.showEditUserGroupModal,
  userGroups: state.userGroups.userGroups,
  accessToken: state.authentication.accessToken,
  loadingUserGroups: state.userGroups.loadingUserGroups,
  projects: state.projects.projects,
});

export default connect(mapStateToProps, { getUserGroups, clickAddUserGroup, clickEditUserGroup, getProjects })(UserGroups);

