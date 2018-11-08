import React, { Component } from 'react';
import { Tree, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TreeNode = Tree.TreeNode;

const treeData = [{
  title: 'Project Name',
  key: '0-0',
  icon: 'archive',
  children: [{
    title: 'Component 1',
    key: '0-0-0',
    icon: 'sitemap',
    children: [
      { title: 'Requirement 0001', key: '0-0-0-0', icon: 'file-alt' },
      { title: 'Requirement 0002', key: '0-0-0-1', icon: 'file-alt' },
      { title: 'Requirement 0003', key: '0-0-0-2', icon: 'file-alt' },
    ],
  }, {
    title: 'Component 2',
    key: '0-0-1',
    icon: 'sitemap',
    children: [
      { title: 'Requirement 0001', key: '0-0-1-0', icon: 'file-alt' },
      { title: 'Requirement 0002', key: '0-0-1-1', icon: 'file-alt' },
      { title: 'Requirement 0003', key: '0-0-1-2', icon: 'file-alt' },
    ],
  }, {
    title: 'Component 3',
    key: '0-0-2',
    icon: 'sitemap',
    children: [
      { title: 'Requirement 0001', key: '0-0-2-0', icon: 'file-alt' },
      { title: 'Requirement 0002', key: '0-0-2-1', icon: 'file-alt' },
      { title: 'Requirement 0003', key: '0-0-2-2', icon: 'file-alt' },
      {
        title: 'Requirement 0004', key: '0-0-2-3', icon: 'file-alt',
        children: [
          { title: 'Note 1', key: '0-0-2-3-0', icon: 'file-signature' },
        ]
      },
    ],
  }],
}];

const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    const title = node.title.toLowerCase();
    dataList.push({ key, title: title });
    if (node.children) {
      generateList(node.children, node.key);
    }
  }
};
generateList(treeData);


const getParentKey = (key, tree) => {

  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

class TreeView extends Component {
  state = {
    gData: treeData,
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
  }

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onChange = (e) => {
    const value = e.target.value;
    const expandedKeys = dataList.map((item) => {
      if (item.title.toLowerCase().indexOf(value.toLowerCase()) > -1) {
        return getParentKey(item.key, treeData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  }

  onDragEnter = (info) => {
  }

  onDrop = (info) => {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.state.gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 // Has children
      && info.node.props.expanded // Is expanded
      && dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({
      gData: data,
    });
  }




  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;

    const loop = data => data.map((item) => {
      const index = item.title.toLowerCase().indexOf(searchValue.toLowerCase());
      const beforeStr = item.title.substr(0, index);
      const middleStr = item.title.substr(index, searchValue.length);
      const afterStr = item.title.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{middleStr}</span>
          {afterStr}
        </span>
      ) : <span>{item.title}</span>;
      if (item.children) {
        return (
          <TreeNode key={item.key} title={title} icon={<FontAwesomeIcon icon={item.icon} />}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={title} icon={<FontAwesomeIcon icon={item.icon} />} />;
    });

    return (
      <div>
        <div style={{ margin: '10px 10px 0px' }}><Input.Search placeholder="Search" onChange={this.onChange} /></div>
        <Tree.DirectoryTree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          draggable
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}
          showIcon
        >
          {loop(this.state.gData)}
        </Tree.DirectoryTree>
      </div>
    );
  }
}

export default TreeView;