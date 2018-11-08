import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar.jsx';
import TreeView from '../TreeView/TreeView.jsx';
import TableView from '../TableView/TableView.jsx';
import SplitPane from 'react-split-pane';

import './ProjectPage.css';

export default class ProjectPage extends Component {

  constructor() {
    super();

    this.state = {
      currentSelectedItem: []
    }
  }

  onTreeItemSelect = (node) => {
    console.log(node);
    this.setState({ currentSelectedItem: node });
  }

  render() {
    return (
      <div className='projects-page'>
        <SearchBar />
        <div className='splitpane'>
          <SplitPane minSize={200} maxSize={-100} defaultSize={'20%'}>
            <TreeView handleItemSelect={this.onTreeItemSelect} />
            <div className='projectcontent'>
              <TableView currentSelectedItem={this.state.currentSelectedItem} />
            </div>
          </SplitPane>
        </div>

      </div>
    )
  }
}
