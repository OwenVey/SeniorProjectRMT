
import React, { Component } from 'react';
import { Table, Tag, Divider, Button, Input, Icon, Tooltip, Modal, Dropdown, Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditProjectModal from './EditProjectModal.jsx';
import AddProjectModal from './AddProjectModal.jsx';
import AddBranchProjectModal from './AddBranchProjectModal.jsx';
import { Resizable } from 'react-resizable';
import { getUsers } from '../../../actions/users';
import './ManageAllProjects.css';
import { connect } from "react-redux";
import { getProjects, getBranches, clickEditProject, deleteProject, clickAddProject, clickAddBranchProject} from '../../../actions/projects'
import moment from 'moment';

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

class ManageAllProjects extends Component {

	state = {
		searchText: '',
		columns: [
			{
				title: 'Actions',
				dataIndex: 'id',
				key: 'id',
				width: 110,
				align: 'center',
				render: (id, project) => (
					<>
						<Tooltip title="Edit Project Info">
							<Icon onClick={() => this.props.clickEditProject(project)}>
								<FontAwesomeIcon icon='edit' color='#1890ff' />
							</Icon>
						</Tooltip>
						<Divider type='vertical' />
						<Tooltip title="Delete Project">
							<Icon onClick={() => this.handleDeleteProject(project)}>
								<FontAwesomeIcon icon='trash-alt' color='#aa0a0a' />
							</Icon>
						</Tooltip>
						{/* <Tooltip title="Branch Project">
							<Icon onClick={() => this.props.clickAddBranchProject(project)}>
								<FontAwesomeIcon icon='code-branch' color='#370682' />
							</Icon>
						</Tooltip> */}
					</>
				),
			},
			{
				title: 'Global ID',
				dataIndex: 'globalId',
				key: 'globalId',
				defaultSortOrder: 'ascend',
				width: 150,
				sorter: (a, b) => a.globalId.localeCompare(b.globalId),
				filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
					<div className="custom-filter-dropdown">
						<Input
							ref={ele => (this.searchInput = ele)}
							placeholder="Search Global ID"
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
				onFilter: (value, record) => record.globalId.toLowerCase().includes(value.toLowerCase()),
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
				render: text => {
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
				render: text => {
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
				title: 'Due Date',
				dataIndex: 'dueDate',
				key: 'dueDate',
				defaultSortOrder: 'ascend',
				width: 150,
				sorter: (a, b) => a.dueDate.localeCompare(b.dueDate),
				filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
					<div className="custom-filter-dropdown">
						<Input
							ref={ele => (this.searchInput = ele)}
							placeholder="Search Due Date"
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
				onFilter: (value, record) => record.dueDate.toLowerCase().includes(value.toLowerCase()),
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
							moment(text).format('MM-DD-YYYY')
						);
				},
			},
			{
				title: 'Date Created',
				dataIndex: 'createDate',
				key: 'createDate',
				defaultSortOrder: 'ascend',
				width: 150,
				sorter: (a, b) => a.createDate.localeCompare(b.createDate),
				filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
					<div className="custom-filter-dropdown">
						<Input
							ref={ele => (this.searchInput = ele)}
							placeholder="Search Date Created"
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
				onFilter: (value, record) => record.createDate.toLowerCase().includes(value.toLowerCase()),
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
							moment(text).format('MM-DD-YYYY')
						);
				},
			},
			{
				title: 'Date Completed',
				dataIndex: 'completeDate',
				key: 'completeDate',
				defaultSortOrder: 'ascend',
				width: 150,
				sorter: (a, b) => a.completeDate.localeCompare(b.completeDate),
				filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
					<div className="custom-filter-dropdown">
						<Input
							ref={ele => (this.searchInput = ele)}
							placeholder="Search Date Completed"
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
				onFilter: (value, record) => record.completeDate.toLowerCase().includes(value.toLowerCase()),
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
							text == '0001-01-01T00:00:00' ? "Not Yet Completed" : moment(text).format('MM-DD-YYYY')
						);
				},
			},
			{
				title: 'Is Active',
				dataIndex: 'isActive',
				key: 'isActive',
				align: 'center',
				sorter: (a, b) => (+a.isActive) - (+b.isActive),
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
				},
			},
		],
	};

  lookupUser(userId) {
		return this.props.users.filter(user => user.id === userId)[0]
  }

  branchMenuDropdown = (
    <Menu>
      <Menu.Item onClick={(branch) => this.props.clickAddBranchProject(branch)}> 
        <FontAwesomeIcon  icon='code-branch' color='#370682' /> Branch
      </Menu.Item>
      <Menu.Item>
      <FontAwesomeIcon icon='code-branch' color='#1aa526' /> Merge
      </Menu.Item>
      <Menu.Item>
      <FontAwesomeIcon icon='trash-alt' color='#aa0a0a' /> Delete
      </Menu.Item>
    </Menu>
  )
  
  expandedRowRender = (projectId) => {
	  const columns = [
      {
				title: 'Actions',
				dataIndex: 'id',
				key: 'id',
				width: 110,
				align: 'center',
				render: (id, branch) => (
					<>
						<Tooltip title="Edit Project Info">
							<Icon /*onClick={() => this.props.clickEditProject(branch)}*/>
								<FontAwesomeIcon icon='edit' color='#1890ff' />
							</Icon>
						</Tooltip>
						<Divider type='vertical' />
            <Dropdown 
            overlay={<Menu>
              <Menu.Item onClick={() => this.props.clickAddBranchProject(branch)}> 
                <FontAwesomeIcon  icon='code-branch' color='#370682' /> Branch
              </Menu.Item>
              <Menu.Item>
              <FontAwesomeIcon icon='code-branch' color='#1aa526' /> Merge
              </Menu.Item>
              <Menu.Item>
              <FontAwesomeIcon icon='trash-alt' color='#aa0a0a' /> Delete
              </Menu.Item>
              </Menu>}>
              <a href='#none' className="ant-dropdown-link">
                  <Icon type="down" />
              </a>
            </Dropdown>
					</>
				),
			},
		{ title: 'Global ID', dataIndex: 'globalId', key: 'globalId' },
		{ title: 'Name',  dataIndex: 'name', key: 'name' },
		{ 
			title: 'Owner ',  
			dataIndex: 'ownerId', 
			key: 'ownerId', 
		  render: ownerId => {
        let name = ''
        if (this.props.users.length !== 0)
        {
          let user = this.lookupUser(ownerId)
          name = `${user.firstName} ${user.lastName}`
        }
        return (
          `${name} (${ownerId})`)
      }, 
    },

    { 
      title: 'Create Date',  
      dataIndex: 'createDate', 
      key: 'createDate',
      render: text => {
        return moment(text).format('MM-DD-YYYY')
      }
    },

    //{ title: 'Is Locked', dataIndex: 'isLocked', key: 'isLocked' },
    //{ title: 'Locked By', dataIndex: 'lockedById', key: 'lockedById' },

    { title: 'Trunk ID',  dataIndex: 'trunkId', key: 'trunkId' },
	  ];
  
	  return (
		<Table
		  pagination={{ pageSize: 10 }}
		  //scroll={{ y: 240 }}
		  columns={columns}
		  dataSource={this.props.branches.filter(branch => branch.projectId == projectId)}
		/>
	  );
  };
  
	componentWillMount() {
		if (this.props.projects.length === 0)
      this.props.getProjects(this.props.accessToken)
    if (this.props.users.length === 0)
			this.props.getUsers(this.props.accessToken);
		if (this.props.branches.length === 0)
			this.props.getBranches(this.props.accessToken)	
	}

	handleDeleteProject = (project) => {
		Modal.confirm({
			title: 'Delete Project',
			content: `Are you sure you want to delete the project: "${project.name}"?`,
			okText: 'Delete',
			okType: 'danger',
			cancelText: 'Cancel',
			onOk: () => {
				this.props.deleteProject(this.props.accessToken, project.id)
			},
			onCancel: () => {
			}
		});
	}

	components = {
		header: {
			cell: ResizeableTitle,
		},
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

	render() {

		const columns = this.state.columns.map((col, index) => ({
			...col,
			onHeaderCell: column => ({
				width: column.width,
				onResize: this.handleResize(index),
			}),
		}));

		return (
			<>

				<div style={{ display: 'flex', flexDirection: 'row', margin: 15, marginBottom: 5, justifyContent: 'flex-end' }}>
					<div style={{ flex: 1, justifyContent: 'flex-start' }}>
						<h2>Projects</h2>
					</div>
					<Button onClick={() => this.props.clickAddProject()}>
						<Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />
						Add Project
        			</Button>
				</div>

				<Table
					scroll={{ x: 400, y: 600 }}
					rowKey={record => record.id}
					pagination={{ pageSize: 10 }}
					components={this.components}
					columns={columns}
          			dataSource={this.props.projects}
          			expandedRowRender={record => this.expandedRowRender(record.id)}
					bordered
					loading={this.props.loadingProjects}
				/>
				{this.props.showEditProjectModal && <EditProjectModal />}
				{this.props.showAddProjectModal && <AddProjectModal />}
				{this.props.showAddBranchProjectModal && <AddBranchProjectModal />}
				{}
			</>
		);
	}
}

const mapStateToProps = state => ({
	accessToken: state.authentication.accessToken,
	projects: state.projects.projects,
  branches: state.projects.branches,
  users: state.users.users,
	showEditProjectModal: state.projects.showEditProjectModal,
	showAddProjectModal: state.projects.showAddProjectModal,
	showAddBranchProjectModal: state.projects.showAddBranchProjectModal,
	loadingProjects: state.projects.loadingProjects,
});

export default connect(mapStateToProps, { getProjects, getUsers, getBranches, clickEditProject, deleteProject, clickAddProject, clickAddBranchProject})(ManageAllProjects);
