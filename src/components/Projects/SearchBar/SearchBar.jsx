import React, { Component } from "react";
import { Input, Icon } from 'semantic-ui-react'

import './SearchBar.css';

class SearchBar extends Component {

  render() {

    return (
      <div className='searchbar'>
        <div className='bar'>

          <div className='project-name-group'>
            <div className='project-name'>Example Project Name</div>
            <Icon className='gear-icon' name='setting' onClick={() => { alert('open project settings'); }} />
          </div>

          <div className='searchgroup'>
            <Input
              className='searchbox'
              icon={{ name: 'search', link: true }}
              iconPosition='left'
              placeholder='Search all items...'
            />
            <div className='advanced-search' onClick={() => { alert('open advanced search window'); }}>Advanced Search</div>

          </div>
        </div>
      </div>
    )
  }
}

export default SearchBar;