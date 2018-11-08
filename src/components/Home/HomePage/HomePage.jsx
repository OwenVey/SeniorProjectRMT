import React, { Component } from 'react';
import { Input } from 'antd';
import RecentlyViewedList from '../RecentlyViewedList/RecentlyViewedList.jsx';
import data from '../../../data.js';
import './HomePage.css';

class HomePage extends Component {

  constructor() {
    super();

    this.state = {
      filter: null,
      recentlyViewedItems: data.recentlyViewedItems,
    };
  }

  updateSearch = (event) => {
    this.setState({
      filter: event.target.value
    });
  }

  render() {
    return (
      <div className='center-card'>
        <div>
          <div className='title-bar'>
            <h3 style={{ marginBottom: '0px' }}>Recently Viewed Items</h3>
            <Input.Search
              style={{ width: '300px' }}
              placeholder='Search all items...'
              onChange={this.updateSearch}
            />
          </div>
          <RecentlyViewedList filter={this.state.filter} recentlyViewedItems={this.state.recentlyViewedItems}></RecentlyViewedList>
        </div>
      </div>

    )
  }
}

export default HomePage