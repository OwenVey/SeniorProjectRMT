
import React, { Component } from 'react';
import { Table, Tag, Divider, Button, Input, Icon, Tooltip, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditProjectModal from './EditProjectModal.jsx';
import AddProjectModal from './AddProjectModal.jsx';
import { Resizable } from 'react-resizable';
import './ManageAllProjects.css';
import { connect } from "react-redux";
import { getProjects, clickEditProject, deleteProject, clickAddProject } from '../../../actions/projects'

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
				width: 75,
				align: 'center',
				render: (id, project) => (
					<React.Fragment>
						<Tooltip placement="topLeft" title="Edit Project Info">
							<Icon onClick={() => this.props.clickEditProject(project)}>
								<FontAwesomeIcon icon='edit' color='#1890ff' />
							</Icon>
						</Tooltip>
						<Divider type='vertical' />
						<Tooltip placement="topLeft" title="Delete Project">
							<Icon onClick={() => this.handleDeleteProject(project)}>
								<FontAwesomeIcon icon='trash-alt' color='#aa0a0a' />
							</Icon>
						</Tooltip>
					</React.Fragment>
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
							text
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
							text
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
							text
						);
				},
			},
			{
				title: 'Is Active',
				dataIndex: 'isActive',
				key: 'isActive',
				align: 'center',
				width: 100,
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

	componentWillMount() {
		if (this.props.projects.length === 0)
			this.props.getProjects(this.props.accessToken)
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
			<React.Fragment>

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
					rowKey={record => record.id}
					components={this.components}
					columns={columns}
					dataSource={this.props.projects}
					bordered
					loading={this.props.loadingProjects}
				/>
				{this.props.showEditProjectModal && <EditProjectModal />}
				{this.props.showAddProjectModal && <AddProjectModal />}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	accessToken: state.authentication.accessToken,
	projects: state.projects.projects,
	showEditProjectModal: state.projects.showEditProjectModal,
	showAddProjectModal: state.projects.showAddProjectModal,
	loadingProjects: state.projects.loadingProjects,
});

export default connect(mapStateToProps, { getProjects, clickEditProject, deleteProject, clickAddProject })(ManageAllProjects);
