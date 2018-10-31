import React, { Component } from 'react'
import { Menu, Container, Input } from 'semantic-ui-react'
import RecentlyViewedList from '../RecentlyViewedList/RecentlyViewedList.jsx'
import data from '../Home/data.js'

class Home extends Component {

  constructor() {
    super();
    const RECENTLY_VIEWED = data.recentlyViewedItems;

    this.state = {
      filter: null,
      recentlyViewedItems: RECENTLY_VIEWED,
    };
  }

  updateSearch = (event) => {
    this.setState({
      filter: event.target.value
    });
  }

  render() {
    return (
      <Container className='center' style={{ paddingTop: '8em' }}>

        <Menu pointing secondary>
          <Menu.Menu position='left'>
            <Menu.Item name='Recently Viewed' style={{ fontSize: '18px' }} active />
            <Menu.Item>
              <Input
                icon={{ name: 'search', link: true }}
                style={{ width: '300px' }}
                iconPosition='left'
                placeholder='Search all items...'
                onChange={this.updateSearch}
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <RecentlyViewedList filter={this.state.filter} recentlyViewedItems={this.state.recentlyViewedItems}></RecentlyViewedList>
      </Container>
    )
  }
}
export default Home