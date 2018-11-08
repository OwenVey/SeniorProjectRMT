import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar.jsx';
import TreeView from '../TreeView/TreeView.jsx';
import TableView from '../TableView/TableView.jsx';
import SplitPane from 'react-split-pane';

import './ProjectPage.css';

export default class ProjectPage extends Component {

  render() {
    return (
      <div className='projects-page'>
        <SearchBar />
        <div className='splitpane'>
          <SplitPane minSize={200} maxSize={-100} defaultSize={'20%'}>
            <TreeView />
            <div className='projectcontent'>
              <TableView/>
            </div>
          </SplitPane>
        </div>
        
      </div>
    )
  }
}
