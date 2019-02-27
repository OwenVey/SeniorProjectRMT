import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileSidebar from "./ProfileSidebar/ProfileSidebar.jsx";
import TreeView from '../Projects/TreeView/TreeView.jsx';
import SplitPane from 'react-split-pane';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;
// const ProfilePage = () => (
//   <div className='centered'>
//     <h1>Profile Page</h1>
//   </div>
// );

export default class ProfilePage extends Component {
  constructor() {
    super();

    const tabs = [
      { tabName: 'My Details', name: 'Name: ', userName: 'Username: ', 
      email: 'Email Address: ', title: 'Title: ', phone: 'Phone Number: ', key: '1' },
      { tabName: 'My Subscriptions', name: 'You are currently not subscribed to any items', key: '2' },
      { tabName: 'My Locked Items', key: '3' },
      { tabName: 'System Locked Items', key: '4' },
      { tabName: 'Review Center', key: '5' },
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
      const content = node.children

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
      <div className='profile-page'>
        <div className='splitpane'>
          <SplitPane minSize={200} maxSize={-200} defaultSize={'85%'} primary='second'>
            <TreeView handleItemSelect={this.onTreeItemSelect} accessToken={this.props.accessToken}/>
              <Tabs
                hideAdd
                style={{ margin: 0 }}
                onChange={this.onChange}
                activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
              >
                {this.state.tabs.map(tab => <TabPane style={{ margin: 0 }} tab={tab.tabName} key={tab.key}> 
                <br/> {tab.name} <br/> <br/> {tab.userName} <br/> <br/> {tab.email} 
                <br/> <br/> {tab.title} <br/> <br/> {tab.phone} </TabPane>)}
              </Tabs>
          </SplitPane>
        </div >
      </div >
    )
  }
}