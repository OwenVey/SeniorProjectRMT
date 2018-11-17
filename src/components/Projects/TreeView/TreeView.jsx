import React, { Component } from 'react';
import { Tree, Input, Dropdown, Menu, Icon, Select, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import data from '../../../data.js';

const TreeNode = Tree.TreeNode;

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

const menu = (
  <Menu>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd menu item</Menu.Item>
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

class TreeView extends Component {

  constructor() {
    super();

    this.state = {
      treeData: data.projectTreeData,
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      rightClickNodeTreeItem: null,
    };

    generateList(this.state.treeData);
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
        return getParentKey(item.key, this.state.treeData);
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
    const data = [...this.state.treeData];

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
      treeData: data,
    });
  }

  onSelect = (e) => {
    const selectedKey = e[0];
    let selectedNode = this.getSelectedNode(selectedKey, this.state.treeData);
    this.props.handleItemSelect(selectedNode);
  }

  getSelectedNode = (key, tree) => {
    let selectedNode;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.key === key) {
        selectedNode = node;
      } else if (node.children && this.getSelectedNode(key, node.children)) {
        selectedNode = this.getSelectedNode(key, node.children);
      }
    }
    return selectedNode;
  }

  onTreeNodeRightClick = (e) => {
    this.setState({
      rightClickNodeTreeItem: {
        pageX: e.event.pageX,
        pageY: e.event.pageY,
        id: e.node.props['data-key'],
        categoryName: e.node.props['data-title']
      }
    });
  }


  getNodeTreeRightClickMenu() {
    const { pageX, pageY } = { ...this.state.rightClickNodeTreeItem };
    const tmpStyle = {
      position: 'absolute',
      left: `${pageX + 0}px`,
      top: `${pageY - 90}px`,
      zIndex: 100,
      boxShadow: '0 2px 8px rgba(0,0,0,.15)',
    };
    const menu = (

      <Menu
        onClick={this.handleMenuClick}
        style={tmpStyle}
      >

        <Menu.Item className='ant-dropdown-menu-item' key="1">1st menu item</Menu.Item>
        <Menu.Item className='ant-dropdown-menu-item' key="2">2nd menu item</Menu.Item>
        <Menu.Item className='ant-dropdown-menu-item' key="3">3rd menu item</Menu.Item>

      </Menu>


    );
    return (this.state.rightClickNodeTreeItem == null) ? '' : menu;
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
          onSelect={this.onSelect}
          onRightClick={this.onTreeNodeRightClick}
        >
          {loop(this.state.treeData)}
        </Tree.DirectoryTree>

        {this.getNodeTreeRightClickMenu()}
      </div>
    );
  }
}

export default TreeView;