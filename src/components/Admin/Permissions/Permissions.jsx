import React, { Component } from 'react'
import { connect } from "react-redux";
import { Button, Icon, Input, Modal, Tooltip } from 'antd';
import { getUserProjectPermissions, showEditPermissionModal, showAddPermissionModal } from "../../../actions/permissions";
import { Resizable } from 'react-resizable';

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
	// 	userProjectPermissionColumns: [
	// // 		{
	// // 			title: 'Actions',
	// // 			dataIndex: 'id',
	// // 			key: 'id',
	// // 			width: 75,
	// // 			align: 'center',
	// // 			render: (id, permission) => (
	// // 				<>
	// // 					<Tooltip title="Edit Project Permission">
	// // 						<Icon onClick={() => this.props.clickEdit(permission)}>
	// // 							<FontAwesomeIcon icon='edit' color='#1890ff' />
	// // 						</Icon>
	// // 					</Tooltip>
	// // 					<Divider type='vertical' />
	// // 					<Tooltip title="Delete Project Permission">
	// // 						<Icon onClick={() => this.handleDeleteUserProjectPermission(permission)}>
	// // 							<FontAwesomeIcon icon='trash-alt' color='#aa0a0a' />
	// // 						</Icon>
	// // 					</Tooltip>
	// // 				</>
	// // 			),
    // //   },	
    //   {
	// 			title: 'User ID',
	// 			dataIndex: 'userId',
	// 			key: 'userId',
	// 			align: 'center',
	// 			width: 100,
	// 			render: userId => {
	// 				return (
    //         userId
    //       )
	// 			},
    //   },
    //   {
	// 			title: 'Project ID',
	// 			dataIndex: 'projectId',
	// 			key: 'projectId',
	// 			align: 'center',
	// 			width: 100,
	// 			render: projectId => {
	// 				return (
    //         projectId
    //       )
	// 			},
	// 		},
	// 		{
	// 			title: 'permission',
	// 			dataIndex: 'permission',
	// 			key: 'permission',
	// 			defaultSortOrder: 'ascend',
	// 			width: 150,
	// 			render: text => {
	// 				const { searchText } = this.state;
	// 				return searchText ? (
	// 					<span>
	// 						{text
	// 							.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))
	// 							.map((fragment, i) =>
	// 								fragment.toLowerCase() === searchText.toLowerCase() ? (
	// 									<span key={i} className="highlight">
	// 										{fragment}
	// 									</span>
	// 								) : (
	// 										fragment
	// 									) // eslint-disable-line
	// 							)}
	// 					</span>
	// 				) : (
	// 						text
	// 					);
	// 			},
	// 		},
	// 		{
	// 			title: 'End Date',
	// 			dataIndex: 'endDate',
	// 			key: 'endDate',
	// 			defaultSortOrder: 'ascend',
	// 			width: 150,
	// 			sorter: (a, b) => a.endDate.localeCompare(b.endDate),
	// 			filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
	// 				<div className="custom-filter-dropdown">
	// 					<Input
	// 						ref={ele => (this.searchInput = ele)}
	// 						placeholder="Search End Date"
	// 						value={selectedKeys[0]}
	// 						onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
	// 						onPressEnter={this.handleSearch(selectedKeys, confirm)}
	// 					/>
	// 					<Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>
	// 						Search
	// 						</Button>
	// 					<Button onClick={this.handleReset(clearFilters)}>Reset</Button>
	// 				</div>
	// 			),
	// 			filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#a9a9a9' : '#a9a9a9' }} />, //108ee9
	// 			onFilter: (value, record) => record.endDate.toLowerCase().includes(value.toLowerCase()),
	// 			onFilterDropdownVisibleChange: visible => {
	// 				if (visible) {
	// 					setTimeout(() => {
	// 						this.searchInput.focus();
	// 					});
	// 				}
	// 			},
	// 			render: text => {
	// 				const { searchText } = this.state;
	// 				return searchText ? (
	// 					<span>
	// 						{text
	// 							.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))
	// 							.map((fragment, i) =>
	// 								fragment.toLowerCase() === searchText.toLowerCase() ? (
	// 									<span key={i} className="highlight">
	// 										{fragment}
	// 									</span>
	// 								) : (
	// 										fragment
	// 									) // eslint-disable-line
	// 							)}
	// 					</span>
	// 				) : (
	// 						text
	// 					);
	// 			},
	// 		},
	// 	]
  };
  
  componentWillMount() {
		if (this.props.userProjectPermissions.length === 0)
			this.props.getUserProjectPermissions(this.props.accessToken)
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
          {/* {this.props.addPermissionModalVisible && <AddPermissionModal />} */}
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  userProjectPermissions: state.permissions.userProjectPermissions,
  editPermissionModalVisible: state.permissions.editPermissionModalVisibility,
  addPermissionModalVisible: state.permissions.addPermissionModalVisibility
});

export default connect(
  mapStateToProps,
  { getUserProjectPermissions, showEditPermissionModal, showAddPermissionModal }
)(Permissions);