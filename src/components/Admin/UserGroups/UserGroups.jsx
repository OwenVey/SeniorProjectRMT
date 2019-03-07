import React, { Component } from 'react';
import { connect } from "react-redux";
import { Table, Divider, Button, Icon, Input } from 'antd';
import { getUserGroups, toggleAddUserGroupModal } from '../../../actions/userGroups';
import AddUserGroupModal from './AddUserGroupModal';
import './UserGroups.css'
class UserGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      columns: [
        {
          title: 'Actions',
          key: 'action',
          width: 150,
          render: (text, userGroup) => (
            <span>
              <a href='#none'>Members</a>
              <Divider type='vertical' />
            </span>
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
        {
          title: '# of Users',
          dataIndex: 'numUsers',
          width: 150,
          /*key: 'groupName',*/
          render: text => <span> [Unimplemented] </span>,
        },
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
  };

  componentWillMount() {
    if (this.props.userGroups.length === 0)
      this.props.getUserGroups(this.props.accessToken);
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
      <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'row', margin: 15, marginBottom: 5, justifyContent: 'flex-end' }}>
          <div style={{ flex: 1, justifyContent: 'flex-start' }}>
            <h2>User Groups</h2>
          </div>
          <Button onClick={() => this.props.toggleAddUserGroupModal(true)}>
            <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />
            Add User Group
        </Button>
          {this.props.showAddUserGroupModal && <AddUserGroupModal />}
        </div>
        <Table bordered rowKey={record => record.id} dataSource={this.props.userGroups} columns={this.state.columns} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  showAddUserGroupModal: state.userGroups.showAddUserGroupModal,
  userGroups: state.userGroups.userGroups,
  accessToken: state.authentication.accessToken,
});

export default connect(mapStateToProps, { getUserGroups, toggleAddUserGroupModal })(UserGroups);

