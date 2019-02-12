import React, { Component } from 'react';
import { Table, Tag, Modal, Button, Input, Icon, Switch, Tooltip } from 'antd';
import { UserBar } from '../AdminBars/AdminBars.jsx';
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
			projectData: [],
			columns: [
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
					onFilter: (value, record) => record.Name.toLowerCase().includes(value.toLowerCase()),
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
				// {
				//   title: 'License Type',
				//   dataIndex: 'licenseType',
				//   key: 'licenseType',
				//   width: 150,
				//   sorter: (a, b) => a.licenseType.localeCompare(b.licenseType)
				// },
				{
					title: 'Is Active',
					dataIndex: 'isActive',
					key: 'isActive',
					align: 'center',
					width: 100,
					sorter: (a, b) => a.isActive.localeCompare(b.isActive),
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
			.get(url2)
			.then(response => {
				let projects = response.data.message.projects
				this.setState({ projectData: projects });
			})
			.catch(error => {
				console.log(error);
			});
	};

	addProject = project => {
		this.setState({ projectData: [...this.state.projectData, project] });
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

				<Table
					components={this.components}
					columns={columns}
					pagination={false}
					dataSource={this.state.projectData}
					scroll={{ y: 500 }}
					bordered
				/>
			</React.Fragment>
		);
	}
}

export default ManageAllProjects;
