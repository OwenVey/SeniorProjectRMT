import React, { Component } from 'react'
import {ManageProjectBar} from '../AdminBars/AdminBars.jsx'
class ManageAllProjects extends Component {
  constructor(props) {
    super(props); 
  }
  render() {
    console.log(this.props.accessToken)
    return (
      <div>
        <ManageProjectBar accessToken = {this.props.accessToken} />
      </div>
    )
  }
}

export default ManageAllProjects;