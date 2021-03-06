import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from '../SearchBar/SearchBar.jsx';
import TreeView from '../TreeView/TreeView.jsx';
import { ObjectGroupBar, ObjectBar } from '../ProjectBars/ProjectBars.jsx';
import ProjectTable from '../ProjectTable/ProjectTable.jsx';
import ObjectView from '../ObjectView/ObjectView.jsx';
import SplitPane from 'react-split-pane';
import { Tabs } from 'antd';
import './ProjectPage.css';
const TabPane = Tabs.TabPane;



export default class ProjectPage extends Component {

  constructor() {
    super();

    this.state = {
      activeKey: '0',
      tabs: [],
    }
  }

  onTreeItemSelect = (node) => {
    this.addTab(node);
  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  addTab = (node) => {
    const tabs = this.state.tabs;
    if (tabs.filter(tab => tab.key === node.id).length > 0) {
      this.setState({ activeKey: String(node.id) });
    }
    else {
      const content = node.children ?

        <div className='projectcontent'>
          <ObjectGroupBar currentSelectedItem={node} accessToken={this.props.accessToken} />
          <ProjectTable currentSelectedItem={node} />
        </div>
        :
        <div className='projectcontent'>
          <ObjectBar currentSelectedItem={node} accessToken={this.props.accessToken} />
          <ObjectView object={node} />
        </div>
      tabs.push({ title: <span><FontAwesomeIcon style={{ marginRight: '5px' }} icon={node.icon} />{node.name}</span>, content: content, key: node.id });
      this.setState({ tabs, activeKey: String(node.id) });
    }
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.tabs.forEach((tab, i) => {
      if (tab.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const tabs = this.state.tabs.filter(tab => tab.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = String(tabs[lastIndex].key);
    }
    this.setState({ tabs, activeKey });
  }

  render() {
    return (
      <div className='projects-page'>
        <SearchBar />

        <div className='splitpane'>
          <SplitPane minSize={200} maxSize={-200} defaultSize={'85%'} primary='second'>

            <TreeView handleItemSelect={this.onTreeItemSelect} accessToken={this.props.accessToken} />

            <Tabs
              hideAdd
              style={{ margin: 0 }}
              onChange={this.onChange}
              activeKey={this.state.activeKey}
              type="editable-card"
              onEdit={this.onEdit}
            >
              {this.state.tabs.map(tab => <TabPane style={{ margin: 0 }} tab={tab.title} key={String(tab.key)}>{tab.content}</TabPane>)}
            </Tabs>

          </SplitPane>
        </div>
      </div >
    )
  }
}
