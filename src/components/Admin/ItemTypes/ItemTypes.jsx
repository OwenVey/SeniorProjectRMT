import React, { Component } from "react";
import { Divider, Table, Button, Modal } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ItemTypes.css';
import { ItemTypesBar } from '../AdminBars/AdminBars';
import { Resizable } from 'react-resizable';
import axios from 'axios';
const { Option } = Select;
const FormItem = Form.Item;

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
              {/* <Modal
                className="deleteModal"
                title={<div><Icon type='bars' style={{ color: '#1890ff' }}></Icon> Delete Item Type?</div>}
                visible={this.state.deleteModal}
                onCancel={() => this.setState({ deleteModal: false })}
                // onOk={() => this.handleDeleteItem(itemType.id)}
                footer={
                  [
                    <Button key="back" onClick={() => this.setState({ deleteModal: false })}>Cancel</Button>,
                    <Button key="submit" type="primary" onClick={() => this.handleDeleteItem(itemType.id)}>Yes</Button>,
                  ]
                } >Do you really want to delete the selected item type?</Modal > */}
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
    this.fetchItemTypes();
  }

  fetchItemTypes = async () => {
    console.log(this.props.accessToken);
    const url = `https://senior-design.timblin.org/api/objecttype?accessToken=${this.props.accessToken}`;
    const url2 = `https://abortplatteville.com/api/objecttype?accessToken=${this.props.accessToken}`;
    axios
      .get(url)
      .then(response => {
        let itemTypeData = response.data.objectTypes
        this.setState({ itemTypes: itemTypeData });
      })
      .catch(error => {
        console.log(error);
      });
  };

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
        this.deleteItemType(itemType.id)
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
        <ItemTypesBar accessToken={this.props.accessToken} />
        <Table
          components={this.components}
          columns={this.state.columns}
          pagination={false}
          dataSource={this.state.itemTypes}
          scroll={{ y: 500 }}
          icon={<FontAwesomeIcon />}
          bordered
        />
      </React.Fragment>
    );
  }
}

export default ItemTypes;