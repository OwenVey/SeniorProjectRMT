import React, { Component } from 'react'
import { connect } from "react-redux";
import { Table, Button, Icon, Modal, Input, Tooltip, Divider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getProjects } from '../../../actions/projects';
import { getUsers } from '../../../actions/users';
import { getUserGroups } from '../../../actions/userGroups';
import AddPermissionModal from './AddPermissionModal.jsx';
import EditPermissionModal from './EditPermissionModal.jsx';
import { getProjectPermissions, showEditPermissionModal, deletePermission, showAddPermissionModal } from "../../../actions/permissions";
import { Resizable } from 'react-resizable';
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

class Permissions extends Component {

	state = {
		searchText: '',
		columns: [
			{
				title: 'Actions',
				dataIndex: 'id',
				rowKey: 'id',
				width: 75,
				align: 'center',
				render: (id, permission) => (
					<>
						<Tooltip title="Edit Project Permission">
							<Icon onClick={() => this.props.showEditPermissionModal(permission)}>
								<FontAwesomeIcon icon='edit' color='#1890ff' />
							</Icon>
						</Tooltip>
						<Divider type='vertical' />
						<Tooltip title="Delete Project Permission">
							<Icon onClick={() => this.props.deletePermission(this.props.accessToken, permission)}>
								<FontAwesomeIcon icon='trash-alt' color='#aa0a0a' />
							</Icon>
						</Tooltip>
					</>
				),
			},
			{
				title: 'User/Group',
				key: 'userGroup',
				dataIndex: 'userGroup',
				align: 'center',
				width: 100,
				render: (id, permission) => {
					let name = ''
					if(permission && permission.userId) {
						if (this.props.users.length !== 0) {
							let user = this.lookupUser(permission.userId)
							name = `${user.firstName} ${user.lastName}`
						}
						return (
							`${name} (${permission.userId})`
						)
					}
					else if(permission && permission.groupId){
						if (this.props.groups.length !== 0) {
							let group = this.lookupGroup(permission.groupId)
							name = group.name
						}
						return (
							`${name} (${permission.groupId})`
						)
					}
					return ""
				},
			},
			{
				title: 'Project',
				dataIndex: 'projectId',
				key: 'projectId',
				align: 'center',
				width: 100,
				render: projectId => {
					let name = ''
					if (this.props.projects.length !== 0)
						name = this.lookupProject(projectId).name
					return (
						name
					)
				},
			},
			{
				title: 'Permission',
				dataIndex: 'permission',
				key: 'permission',
				defaultSortOrder: 'ascend',
				width: 150,
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
				title: 'End Date',
				dataIndex: 'endDate',
				key: 'endDate',
				defaultSortOrder: 'ascend',
				width: 150,
				sorter: (a, b) => a.endDate.localeCompare(b.endDate),
				filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
					<div className="custom-filter-dropdown">
						<Input
							ref={ele => (this.searchInput = ele)}
							placeholder="Search End Date"
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
				onFilter: (value, record) => record.endDate.toLowerCase().includes(value.toLowerCase()),
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
		]
	};

	lookupProject(projectId) {
		return this.props.projects.filter(project => project.id === projectId)[0]
	}

	lookupUser(userId) {
		return this.props.users.filter(user => user.id === userId)[0]
	}

	lookupGroup(groupId) {
		return this.props.groups.filter(group => group.id === groupId)[0]
	}

	componentWillMount() {
		if (this.props.projects.length === 0)
			this.props.getProjects(this.props.accessToken);
		if (this.props.users.length === 0)
			this.props.getUsers(this.props.accessToken);
		if (this.props.groups.length === 0)
			this.props.getUserGroups(this.props.accessToken);
		if (this.props.userProjectPermissions.length === 0 && this.props.groupProjectPermissions.length == 0)
			this.props.getProjectPermissions(this.props.accessToken)
	}

	handleDeleteUserProjectPermission = (userProjectPermission) => {
		Modal.confirm({
			title: 'Delete Project Permission',
			content: `Are you sure you want to delete the project permission?`,
			okText: 'Delete',
			okType: 'danger',
			cancelText: 'Cancel',
			onOk: () => {
				this.props.deleteUserProjectPermission(this.props.accessToken, userProjectPermission.userId, userProjectPermission.projectId)
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
		return (
			<>
				<div style={{ display: 'flex', flexDirection: 'row', margin: 15, marginBottom: 5, justifyContent: 'flex-end' }}>
					<div style={{ flex: 1, justifyContent: 'flex-start' }}>
						<h2>Permissions</h2>
					</div>
					<Button onClick={() => this.props.showAddPermissionModal()}>
						<Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />
						Add Permission
          </Button>
				</div>
				<Table
					bordered
					rowKey={record => record.userId}
					dataSource={this.props.userProjectPermissions.concat(this.props.groupProjectPermissions)}
					columns={this.state.columns}
					loading={this.props.loadingPermissions}
				/>
				{this.props.editPermissionModalVisible && <EditPermissionModal />}
				{this.props.addPermissionModalVisible && <AddPermissionModal />}
			</>
		)
	}
}

const mapStateToProps = state => ({
	accessToken: state.authentication.accessToken,
	userProjectPermissions: state.permissions.userProjectPermissions,
	groupProjectPermissions: state.permissions.groupProjectPermissions,
	editPermissionModalVisible: state.permissions.editPermissionModalVisibility,
	addPermissionModalVisible: state.permissions.addPermissionModalVisibility,
	loadingPermissions: state.permissions.loadingPermissions,
	projects: state.projects.projects,
	users: state.users.users,
	groups: state.userGroups.userGroups,
});

export default connect(
	mapStateToProps,
	{ getProjectPermissions, showAddPermissionModal, showEditPermissionModal, deletePermission, getProjects, getUsers, getUserGroups }
)(Permissions);