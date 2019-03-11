import React, { Component } from 'react'
import { connect } from "react-redux";
import { } from "../../../actions/permissions";
class OrganizationDetails extends Component {
  render() {
    return (
      <div style={{ margin: 15 }}>
        <h2>Organization Details</h2>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
});

export default connect(
  mapStateToProps,
  {}
)(OrganizationDetails);
