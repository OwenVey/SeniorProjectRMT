import React, { Component } from 'react'
import SearchBar from '../SearchBar/SearchBar.jsx';
import TreeView from '../TreeView/TreeView.jsx';

import './ProjectPage.css';

export default class ProjectPage extends Component {

  render() {
    return (
      <div className='projects-page'>
        <SearchBar />
        <TreeView />
        <div className='projectcontent'>content</div>
      </div>
    )
  }
}
