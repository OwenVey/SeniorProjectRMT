import React, { Component } from 'react';
import { Tag, Table, Divider } from 'antd';

const pagination = { position: 'bottom' };

class UserGroups extends Component {
  render() {
    return (
      <Table bordered dataSource={data} columns={columns} />
    )
  }
}

const columns = [{
  title: 'Group Type',
  dataIndex: 'groupType',
  /*key: 'groupType',*/
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Group Name',
  dataIndex: 'groupName',
  /*key: 'groupName',*/
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '# of Users',
  dataIndex: 'numUsers',
  /*key: 'groupName',*/
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Current Projects',
  dataIndex: 'currentProjects',
  render: tags => (
    <span>
      {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
    </span>
  /*key: 'tags',*/
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Members {record.name}</a>
      <Divider type="vertical" />
      <a href="javascript:;">Group</a>
      <Divider type="vertical" />
      <a href="javascript:;">Subscriptions</a>
      <Divider type="vertical" />
      <a href="javascript:;">Delete</a>
    </span>
  ),
}];

const data = [{
  key: '1',
  groupType: 'Development',
  groupName: 'Developer Team 1',
  numUsers: '17',
  currentProjects: ['nice', 'developer'],
}];

export default UserGroups;