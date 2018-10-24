import React, {Component} from 'react';
import SortableTree from 'react-sortable-tree';
class TreeView extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        treeData: [{ title: 'Chicken', children: [{ title: 'Egg' }] }],
      };
    }
  
    render() {
      return (
        <div style={{ height: 400 }}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
          />
        </div>
      );
    }
  }

export default TreeView