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

    const tabs = [
      { title: 'Project Name', content: 'Content of Tab 1', key: '1' },
    ];

    this.state = {
      activeKey: tabs[0].key,
      tabs,
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
    if (tabs.filter(tab => tab.key === node.key).length > 0) {
      this.setState({ activeKey: node.key });
    }
    else {
      const content = node.children ?

        <div className='projectcontent'>
          <ObjectGroupBar currentSelectedItem={node} />
          <ProjectTable currentSelectedItem={node} />
        </div>
        :
        <div className='projectcontent'>
          <ObjectBar currentSelectedItem={node} />
          <ObjectView object={node} />
        </div>
      tabs.push({ title: <span><FontAwesomeIcon style={{ marginRight: '5px' }} icon={node.icon} />{node.title}</span>, content: content, key: node.key });
      this.setState({ tabs, activeKey: node.key });
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
      activeKey = tabs[lastIndex].key;
    }
    this.setState({ tabs, activeKey });
  }

  render() {
    return (
      <div className='projects-page'>
        <SearchBar />

        <div className='splitpane'>
          <SplitPane minSize={200} maxSize={-200} defaultSize={'85%'} primary='second'>

            <TreeView handleItemSelect={this.onTreeItemSelect} />

            <Tabs
              hideAdd
              style={{ margin: 0 }}
              onChange={this.onChange}
              activeKey={this.state.activeKey}
              type="editable-card"
              onEdit={this.onEdit}
            >
              {this.state.tabs.map(tab => <TabPane style={{ margin: 0 }} tab={tab.title} key={tab.key}>{tab.content}</TabPane>)}
            </Tabs>

          </SplitPane>
        </div>
      </div >
    )
  }
}
