import React, { Component } from 'react'
import AdminSidebar from '../AdminSidebar/AdminSidebar.jsx'

import './AdminPage.css'

class AdminPage extends Component {

  render() {
    return (
      <div className='admin-page'>
        <AdminSidebar />
        <div className='admin-content'></div>
      </div>
    )
  }
}

export default AdminPage