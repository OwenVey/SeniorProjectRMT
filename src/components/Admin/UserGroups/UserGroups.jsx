import React, { Component } from 'react';
import { Tag, Table, Divider } from 'antd';

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
  render: text => <a href=''>{text}</a>,
}, {
  title: 'Group Name',
  dataIndex: 'groupName',
  /*key: 'groupName',*/
  render: text => <a href=''>{text}</a>,
}, {
  title: '# of Users',
  dataIndex: 'numUsers',
  /*key: 'groupName',*/
  render: text => <a href=''>{text}</a>,
}, {
  title: 'Current Projects',
  dataIndex: 'currentProjects',
  render: tags => (
    <span>
      {tags.map(tag => <Tag color='blue' key={tag}>{tag}</Tag>)}
    </span>
    /*key: 'tags',*/
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href=''>Members {record.name}</a>
      <Divider type='vertical' />
      <a href=''>Group</a>
      <Divider type='vertical' />
      <a href=''>Subscriptions</a>
      <Divider type='vertical' />
      <a href=''>Delete</a>
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