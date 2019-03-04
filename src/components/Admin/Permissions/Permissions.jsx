import React, { Component } from 'react'
import { PermissionBar } from '../AdminBars/AdminBars.jsx';

class Permissions extends Component {
  render() {
    return (
      <React.Fragment>
        <PermissionBar accessToken={this.props.accessToken} />
      </React.Fragment>
    )
  }
}

export default Permissions;