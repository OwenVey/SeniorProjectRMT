import React, { Component } from 'react';
import { Table, Divider, Modal, Row, Button, Icon, Form, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserGroupBar } from '../AdminBars/AdminBars.jsx';
import { connect } from "react-redux";
import axios from 'axios';
import './UserGroups.css'
import { getUserGroups } from '../../../actions/userGroups';

class UserGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'large',
      //mockData: [],
      //targetKeys: [],
      addModalVisible: false,
      editModalVisible: false,
      deleteModalVisible: false,
      editing: false,
      searchText: '',
      selectedId: '',
      groupData: [],
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
    // groupType: '',
    // groupName: '',
    // userGroups: [{
    //   key: '0',
    //   groupType: 'Development',
    //   groupName: 'Ocean\'s 8',
    //   numUsers: '8',
    //   currentProjects: ['nice', 'developer'],
    // }],
    // curProjects: '',

  };

  componentWillMount() {
    this.props.getUserGroups(this.props.accessToken);
  }

  fetchGroups = async () => {
    console.log(this.props.accessToken);
    const url = `https://senior-design.timblin.org/api/group?accessToken=${this.props.accessToken}`;
    const url2 = `https://abortplatteville.com/api/group?accessToken=${this.props.accessToken}`;
    axios
      .get(url)
      .then(response => {
        let groups = response.data.groups
        this.setState({ groupData: groups });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

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

  deleteGroupModal = (userGroup) => {
    this.setState({
      deleteModalVisible: true,
      addModalVisible: false,
      editModalVisible: false,
    })
    Modal.confirm({
      title: 'Delete User Group',
      content: 'Are you sure you want to delete this user group?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        //this.deleteUserGroup()
        this.setState({ deleteModalVisible: false })
        this.deleteUserGroup(userGroup.key)
      },
      onCancel: () => {
        this.setState({ deleteModalVisible: false })
      }
    });
    /*
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
    */
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
        <UserGroupBar accessToken={this.props.accessToken} />
        <Modal
          title={<div><Icon style={{ color: '#1890FF' }}><FontAwesomeIcon icon='users' /></Icon> Add User Group</div>}
          visible={this.state.addModalVisible}
          onOk={() => {
            this.setState({ addModalVisible: false })
            this.addNewUserGroup(this.state.groupType, this.state.groupName, this.state.numUsers)
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
        <Table bordered dataSource={this.props.userGroups} columns={this.state.columns} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  userGroups: state.userGroups.userGroups,
  accessToken: state.authentication.accessToken,
});

export default connect(mapStateToProps, { getUserGroups })(UserGroups);

