import React, { Component } from 'react';
import { Menu, Tree, Input, Dropdown, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { connect } from "react-redux";
import { getTree } from "../../../actions/tree";

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

class TreeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [],//data.projectTreeData,
      expandedKeys: ['0-0'],
      searchValue: '',
      autoExpandParent: true,
      rightClickedTreeNode: null,
    };
    generateList(this.state.treeData);
  }

  componentWillMount() {
    this.props.getTree(this.props.accessToken);
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

  onRightClickTreeNode = ({ node }) => {
    this.setState({ rightClickedTreeNode: node.props.eventKey })
  }

  showDeleteModal = (e) => {
    e.domEvent.stopPropagation();
    let selectedNode = this.getSelectedNode(this.state.rightClickedTreeNode, this.state.treeData);

    Modal.confirm({
      title: 'Delete',
      content: selectedNode.children ? 'Are you sure delete the item "' + selectedNode.title + '" and its children?' : 'Are you sure you want to delete the item "' + selectedNode.title + '"?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => { this.deleteNodeFromTree(this.state.rightClickedTreeNode) },
    });
  }

  deleteNodeFromTree = (keyToDelete) => {
    let newTreeData = this.recursivelyDeleteNode(this.state.treeData, keyToDelete);
    this.setState({ treeData: newTreeData });
  }

  recursivelyDeleteNode = (tree, key) => {
    for (var i = 0; i < tree.length; ++i) {
      var node = tree[i];
      if (node.key === key) {
        tree.splice(i, 1);
        return tree;
      }
      if (node.children) {
        if (this.recursivelyDeleteNode(node.children, key)) {
          if (node.children.length === 0) {
            delete node.children;
          }
          return tree;
        }
      }
    }
  }



  /* This uses an access token and the database URL to retrieve object information.
   * The information is then inserted into the tree and the treeData state.
  */
  fetchTree = () => {
    console.log(this.props.accessToken);
    const projectURL = `https://senior-design.timblin.org/api/project?accessToken=${this.props.accessToken}`;
    axios
      .get(projectURL)
      .then(response => {
        let projects = response.data.projects.map(project => {
          let project_id = project.id;
          const objectForProjectURL = `https://senior-design.timblin.org/api/object/${project_id}?accessToken=${this.props.accessToken}`;
          var objects = null;
          axios
            .get(objectForProjectURL)
            .then(response => {
              objects = this.insertLevel(null, response.data.objects);
            })
            .catch(error => {
              console.log(error);
            });
          return {
            key: project.global_id,
            title: project.name,
            children: objects,
          }
        })
        this.setState({ treeData: projects });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /* This method uses a parentID and an array of objects to determine which objects have a parent.
   * The method inserts the child into the array at the appropriate level.
   * If there are no children, the children field is set to null.
   * If there are children, the correct children, keys, title, and parents are set and pushed to
   * * the appropriate level in the tree.
  */
  insertLevel = (parentID, objects) => {
    var level = []
    objects.forEach(object => {
      if (object.parent === parentID) {
        let children = this.insertLevel(object.id, objects);
        if (children.length === 0)
          children = null;
        level.push({
          ...object,
          children: children,
          key: object.global_id,
          title: object.name,
          parent: parentID
        })
      }
    })
    return level;
  }

  render() {
    const rightClickTreeNodeMenu = (
      <Menu>
        <Menu.Item key="1">Open</Menu.Item>
        <Menu.Item key="2">Edit</Menu.Item>
        <Menu.Item key="3" onClick={this.showDeleteModal}>Delete</Menu.Item>
      </Menu>
    );

    const { searchValue, expandedKeys, autoExpandParent } = this.state;

    const loop = data => data.map((item) => {
      const index = item.title.toLowerCase().indexOf(searchValue.toLowerCase());
      const beforeStr = item.title.substr(0, index);
      const middleStr = item.title.substr(index, searchValue.length);
      const afterStr = item.title.substr(index + searchValue.length);
      const title = index > -1 ? (
        <Dropdown overlay={rightClickTreeNodeMenu} trigger={['contextMenu']}>
          <span style={{ padding: '0px 30px', margin: '0px -30px' }}>
            {beforeStr}
            <span style={{ color: '#f50' }}>{middleStr}</span>
            {afterStr}
          </span>
        </Dropdown>
      ) : <Dropdown overlay={rightClickTreeNodeMenu} trigger={['contextMenu']}><span style={{ padding: '0px 30px', margin: '0px -30px' }}>{item.title}</span></Dropdown>;
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
          defaultSelectedKeys={['0-0']}
          autoExpandParent={autoExpandParent}
          draggable
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}
          showIcon
          onSelect={this.onSelect}
          onRightClick={this.onRightClickTreeNode}
        >
          {loop(this.state.treeData)}
        </Tree.DirectoryTree>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  tree: state.tree.tree,
});

export default connect(mapStateToProps, { getTree })(TreeView);

