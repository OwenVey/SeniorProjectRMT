import React, {Component} from 'react';

import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';

class TreeView extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        treeData: [{ title: 'Chicken', expanded: true, children: [{ title: 'Egg' }] },
            {title: 'Samantha', expanded: true, children: [{title: 'dog'}]},
            {title: 'Samantha', expanded: true, children: [{title: 'dog'}]},
            {title: 'Samantha', expanded: true, children: [{title: 'dog'}]}],
      };
    }
  
    render() {
      return (
        <div style={{
            height: 1600,
            marginTop: '200px',
            }}>
        <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            theme={FileExplorerTheme}
          />
        </div>
      );
    }
  }

export default TreeView