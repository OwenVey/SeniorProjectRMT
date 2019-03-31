import React, { Component } from "react";
import { connect } from "react-redux";


class NoPermissionToAccess extends Component {
    render() {
        return (
            <div className='centered'>
                {!this.props.adminAccess && <h1 >You do not have sufficient permissions to view this page</h1>}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    adminAccess: state.authentication.loginUser.isAdmin,
})

export default connect(mapStateToProps)(NoPermissionToAccess)
