import React, { Component } from "react";
import ReactDragListView from "react-drag-listview";
import { Table, Tag, Input, Button, Icon, Divider } from "antd";
import { Resizable } from "react-resizable";
import data from "../../../data.js";
import "./Users.css";

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

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      userData: data.userDataJson,
      columns: [
        {
          title: "Full Name",
          dataIndex: "fullName",
          key: "fullname",
          defaultSortOrder: "ascend",
          width: 150,
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div className="custom-filter-dropdown">
              <Input
                ref={ele => this.searchInput = ele}
                placeholder="Search name"
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={this.handleSearch(selectedKeys, confirm)}
              />
              <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>Search</Button>
              <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
            </div>
          ),
          filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#a9a9a9' : '#a9a9a9' }} />, //108ee9
          onFilter: (value, record) => record.fullName.toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
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
                {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
                  fragment.toLowerCase() === searchText.toLowerCase()
                    ? <span key={i} className="highlight">{fragment}</span> : fragment // eslint-disable-line
                ))}
              </span>
            ) : text;
          },
          
        },
        {
          title: "User Name",
          dataIndex: "userName",
          key: "userName",
          width: 150,
          sorter: (a, b) => a.userName.localeCompare(b.userName)
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          width: 250,
          sorter: (a, b) => a.email.localeCompare(b.email)
        },
        {
          title: "User Groups",
          dataIndex: "userGroups",
          key: "userGroups",
          width: 200,
          render: tags => (
            <span>
              {tags.map(tag => (
                <Tag color={tag} key={tag}>
                  {tag}
                </Tag>
              ))}
            </span>
          )
        },
        {
          title: "Liscence Type",
          dataIndex: "liscenceType",
          key: "liscenceType",
          width: 150,
          sorter: (a, b) => a.liscenceType.localeCompare(b.liscenceType)
        },
        {
          title: "User Status",
          dataIndex: "userStatus",
          key: "userStatus",
          width: 100,
          sorter: (a, b) => a.userStatus.localeCompare(b.userStatus)
        }
      ]
    };
  }

  components = {
    header: {
      cell: ResizeableTitle
    }
  };

  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width
      };
      return { columns: nextColumns };
    });
  };

  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index)
      })
    }));

    const that = this;
    this.dragProps = {
      onDragEnd(fromIndex, toIndex) {
        const columns = that.state.columns;
        const item = columns.splice(fromIndex, 1)[0];
        columns.splice(toIndex, 0, item);
        that.setState({
          columns
        });
      },
      nodeSelector: "th"
    };

    return (      
      <div className="userBoxList">
          <Table
            components={this.components}
            columns={columns}
            pagination={false}
            dataSource={this.state.userData}
            scroll={{y: 500}}
            bordered
          />
      </div>
    );
  }
}
//<ReactDragListView.DragColumn {...this.dragProps}>
//</ReactDragListView.DragColumn>
export default Users;
