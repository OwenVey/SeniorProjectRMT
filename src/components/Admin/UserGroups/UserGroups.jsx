import React, { Component } from 'react';
import { Table, Divider, Button, Icon, Input, Tooltip} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserGroupBar } from '../AdminBars/AdminBars.jsx';
import EditUserGroupModal from '../EditUserGroupModal/EditUserGroupModal.jsx';
import axios from 'axios';
import './UserGroups.css'

class UserGroups extends Component {
  constructor(props) {
		super(props);
		this.state = {
      showEditUserGroupModal: false,
      searchText: '',
      selectedId: '',
      groupData: [],
      columns: [
  
      {
        title: 'Actions',
        dataIndex: 'id',
        key: 'id',
        width: 75,
        align: 'center',
        render: (id) => (
          <React.Fragment>
							<Tooltip placement="topLeft" title="Edit User Group Info">
								<a href="#none" onClick={() => this.showEditUserGroupModal(id)}>
									<Icon><FontAwesomeIcon icon='edit' /></Icon>
								</a>
							</Tooltip>
							<Divider type='vertical' />
							<Tooltip placement="topLeft" title="Manage Members">
								<a href="#none" onClick={() => {}}>
									<Icon><FontAwesomeIcon icon='users' color='#000000' /></Icon>
								</a>
							</Tooltip>
						</React.Fragment>
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
		this.fetchGroups();
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
				console.log(error);
			});
	};

  showEditUserGroupModal = (id) => {
		this.setState({
			selectedId: id,
			showEditUserGroupModal: true,
		});
	}

	hideEditUserGroupModal = () => {
		this.setState({
			showEditUserGroupModal: false,
		});
	}

	handleOkEditUserGroupModal = (e) => {
		this.setState({
			showEditUserGroupModal: false,
		});
	}

	handleCancelEditUserGroupModal = (e) => {
		this.setState({
			showEditUserGroupModal: false,
		});
	}

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

  render() {

    const columns = this.state.columns.map((col, index) => ({
			...col,
			onHeaderCell: column => ({
				width: column.width,
				onResize: this.handleResize(index),
			}),
		}));

		const that = this;
		this.dragProps = {
			onDragEnd(fromIndex, toIndex) {
				const columns = that.state.columns;
				const item = columns.splice(fromIndex, 1)[0];
				columns.splice(toIndex, 0, item);
				that.setState({
					columns,
				});
			},
			nodeSelector: 'th',
    };
    

    return (
      <React.Fragment>
        <UserGroupBar accessToken={this.props.accessToken} />
        <Table
					components={this.components}
					columns={columns}
					pagination={false}
					dataSource={this.state.groupData}
					scroll={{ y: 500 }}
					bordered
				/>
        {this.state.showEditUserGroupModal && <EditUserGroupModal handleCancelEditUserGroupModal={this.handleCancelEditUserGroupModal} hide={this.hideEditUserGroupModal} accessToken={this.props.accessToken} UserGroupId={this.state.selectedId} />}
      </React.Fragment>
    )
  }
}

export default UserGroups;