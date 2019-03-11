import React, { Component } from "react";
import { Divider, Table, Button, Modal, Icon } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ItemTypes.css';
import { connect } from "react-redux";
import { getItemTypes, clickAddItemType, deleteItemType } from '../../../actions/itemTypes';
import AddItemTypeModal from './AddItemTypeModal';

class ItemTypes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemTypes: [],
      columns: [
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
        {
          title: "Action",
          dataIndex: "action",
          width: 150,
          render: (index, itemType) => (
            <span>
              <a href='#none' >Edit</a>
              <Divider type='vertical' />
              <a href='#none'>Fields</a>
              <Divider type='vertical' />
              <a href='#none'>Views</a>
              <Divider type='vertical' />
              <Button onClick={() => this.handleDeleteItem(itemType)}>Delete</Button>
            </span >
          )
        }
      ],
      visible: false,
      icon: <div></div>,
      display: "",
      description: "",
      id: "",
      system: "",
    };
  }

  componentWillMount() {
    if (this.props.itemTypes.length === 0)
      this.props.getItemTypes(this.props.accessToken);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleDeleteItem = (itemType) => {
    this.setState({
      handleCancelModal: true,
    })
    Modal.confirm({
      title: 'Delete Item Type',
      content: 'Are you sure you want to delete this item type?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        //this.deleteUserGroup()
        this.setState({ handleCancelModal: false })
        this.props.deleteItemType(itemType.id)
      },
      onCancel: () => {
        this.setState({ handleCancelModal: false })
      }
    });
  }

  deleteItemType = (id) => {
    this.setState({
      itemTypes: this.state.itemTypes.filter((itemType) => itemType.id !== id)
    })
  }

  handleDeleteCancel = () => {
    this.setState({
      deleteModal: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleChange = (value) => {
    this.setState({
      icon: value.label,
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



  render() {

    return (
      <React.Fragment>

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
          dataSource={this.props.itemTypes}
          scroll={{ y: 500 }}
          icon={<FontAwesomeIcon />}
          bordered
          loading={this.props.loadingItemTypes}
        />

        {this.props.showAddItemTypeModal && <AddItemTypeModal />}

      </React.Fragment >
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  itemTypes: state.itemTypes.itemTypes,
  showAddItemTypeModal: state.itemTypes.showAddItemTypeModal,
  loadingItemTypes: state.itemTypes.loadingItemTypes,
});

export default connect(mapStateToProps, { getItemTypes, clickAddItemType, deleteItemType })(ItemTypes)