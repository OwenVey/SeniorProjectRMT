
import React, { Component } from 'react';
import { Table, Tag, Divider, Button, Input, Icon, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ManageProjectBar } from '../AdminBars/AdminBars.jsx';
import EditProjectModal from './EditProjectModal.jsx';
import { Resizable } from 'react-resizable';
import axios from 'axios';
import './ManageAllProjects.css';

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
	constructor(props) {
		super(props);

		this.state = {
			searchText: '',
			selectedId: '',
			projectData: [],
			columns: [
				{
					title: 'Actions',
					dataIndex: 'id',
					key: 'id',
					width: 75,
					align: 'center',
					render: (id) => (
						<React.Fragment>
							<Tooltip placement="topLeft" title="Edit Project Info">
								<a href="#none" onClick={() => this.showEditProjectModal(id)}>
									<Icon><FontAwesomeIcon icon='edit' /></Icon>
								</a>
							</Tooltip>
							<Divider type='vertical' />
							<Tooltip placement="topLeft" title="Delete Project">
								<a href="#none" onClick={() => this.deleteProject(id)}>
									<Icon><FontAwesomeIcon icon='trash-alt' color='#aa0a0a' /></Icon>
								</a>
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
	}

	componentWillMount() {
		this.fetchProjects();
	}

	fetchProjects = async () => {
		console.log(this.props.accessToken);
		const url = `https://senior-design.timblin.org/api/project?accessToken=${this.props.accessToken}`;
		const url2 = `https://abortplatteville.com/api/project?accessToken=${this.props.accessToken}`;
		axios
			.get(url)
			.then(response => {
				let projects = response.data.projects.map(project => {
					return {
						...project,
						dueDate: project.dueDate.substring(0, 10),
						completeDate: project.completeDate.substring(0, 10) == '9999-12-31' ? 'In Progress' : project.completeDate.substring(0, 10),
						createDate: project.createDate.substring(0, 10)
					}
				})
				this.setState({ projectData: projects });
			})
			.catch(error => {
				console.log(error);
			});
	};

	showEditProjectModal = (id) => {
		this.setState({
			selectedId: id,
			showEditProjectModal: true,
		});
	}

	hideEditProjectModal = () => {
		this.setState({
			showEditProjectModal: false,
		});
	}

	handleOkEditProjectModal = (e) => {
		this.setState({
			showEditProjectModal: false,
		});
	}

	handleCancelEditProjectModal = (e) => {
		this.setState({
			showEditProjectModal: false,
		});
	}

	deleteProject = async (projectId) => {
		console.log(this.props.accessToken);
		const url = `https://senior-design.timblin.org/api/project/${projectId}?accessToken=${this.props.accessToken}`;
		const url2 = `https://abortplatteville.com/api/project/${projectId}?accessToken=${this.props.accessToken}`;
		axios
			.delete(url)
			.catch(error => {
				console.log(error);
			});
	};

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
				<ManageProjectBar accessToken={this.props.accessToken} />
				<Table
					components={this.components}
					columns={columns}
					pagination={false}
					dataSource={this.state.projectData}
					scroll={{ y: 500 }}
					bordered
				/>
				{this.state.showEditProjectModal && <EditProjectModal handleCancelEditProjectModal={this.handleCancelEditProjectModal} hide={this.hideEditProjectModal} accessToken={this.props.accessToken} projectId={this.state.selectedId} />}
			</React.Fragment>
		);
	}
}

export default ManageAllProjects;
