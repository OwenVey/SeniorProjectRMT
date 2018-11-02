import React, { Component } from 'react'
import AdminSidebar from '../AdminSidebar/AdminSidebar.jsx'
import SplitPane from 'react-split-pane'

import './AdminPage.css'

class AdminPage extends Component {
  constructor() {
    super()

    this.state = {
      currentPage: 'organizationDetail'
    }
  }

  handlePageChange = (page) => {
    this.setState({
      currentPage: page
    });
  }

  render() {
    return (
      <div className='admin-page'>
        <SplitPane minSize={200} maxSize={-100} defaultSize={'20%'}>
          <AdminSidebar handlePageChange={this.handlePageChange} />

          <div style={{ background: 'lightgray', height: '100%' }}>{this.state.currentPage}</div>

        </SplitPane>
      </div>
    )
  }
}

export default AdminPage