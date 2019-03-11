import React, { Component } from "react";
import { Divider, Table, Button, Modal, Icon, Tooltip } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ItemTypes.css';
import { connect } from "react-redux";
import { getItemTypes, clickAddItemType, deleteItemType } from '../../../actions/itemTypes';
import { getProjects } from '../../../actions/projects';
import AddItemTypeModal from './AddItemTypeModal';

class ItemTypes extends Component {

  state = {
    columns: [
      {
        title: 'Actions',
        dataIndex: 'id',
        key: 'id',
        width: 75,
        align: 'center',
        render: (id, itemType) => (
          <>
            <Tooltip title="Edit Item Type">
              <Icon onClick={() => { }}>
                <FontAwesomeIcon icon='edit' color='#1890ff' />
              </Icon>
            </Tooltip>
            <Divider type='vertical' />
            <Tooltip title="Delete Item Type">
              <Icon onClick={() => this.handleDeleteItem(itemType)}>
                <FontAwesomeIcon icon='trash-alt' color='#aa0a0a' />
              </Icon>
            </Tooltip>
          </>
        ),
      },
      {
        title: "Item",
        dataIndex: "iconUrl",
        key: "iconUrl",
        align: 'center',
        width: 50,
        render: iconUrl => <Icon><FontAwesomeIcon icon={iconUrl} /></Icon>
      },
      {
        title: "Name",
        dataIndex: "name",
        width: 80,
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: index => <span>{index}</span>,
      },
      {
        title: "Description",
        dataIndex: "description",
        width: 80,
        sorter: (a, b) => a.description.localeCompare(b.description),
        render: index => <span>{index}</span>,
      },
    ]
  }

  componentWillMount() {
    if (this.props.itemTypes.length === 0)
      this.props.getItemTypes(this.props.accessToken);
    if (this.props.projects.length === 0)
      this.props.getProjects(this.props.accessToken);
  }

  handleDeleteItem = (itemType) => {
    Modal.confirm({
      title: 'Delete Item Type',
      content: `Are you sure you want to delete the "${itemType.name}" item type?`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        this.props.deleteItemType(itemType.id)
      },
      onCancel: () => {
      }
    });
  }

  render() {

    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'row', margin: 15, marginBottom: 5, justifyContent: 'flex-end' }}>
          <div style={{ flex: 1, justifyContent: 'flex-start' }}>
            <h2>Item Types</h2>
          </div>
          <Button onClick={() => this.props.clickAddItemType()}>
            <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />
            Add Item Type
          </Button>
        </div>

        <Table
          columns={this.state.columns}
          pagination={false}
          rowKey={record => record.id}
          dataSource={this.props.itemTypes}
          bordered
          loading={this.props.loadingItemTypes}
        />

        {this.props.showAddItemTypeModal && <AddItemTypeModal />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  itemTypes: state.itemTypes.itemTypes,
  showAddItemTypeModal: state.itemTypes.showAddItemTypeModal,
  loadingItemTypes: state.itemTypes.loadingItemTypes,
  projects: state.projects.projects,
});

export default connect(mapStateToProps, { getItemTypes, clickAddItemType, deleteItemType, getProjects })(ItemTypes)