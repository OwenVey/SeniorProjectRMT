import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from "react-redux";


class NoPermissionToAccess extends Component {
    render() {
        return (
            <React.Fragment>
                {!this.props.adminAccess && <div className='centered' style={{ display: 'flex', flexDirection: 'row', margin: 15, marginBottom: 5,  border: '#f5f9fa' }}>
                    <div>
                        <FontAwesomeIcon size='9x' color='#eaec38' icon='exclamation-triangle' />
                    </div>
                    <div style ={{ marginLeft: 15}}>
                        <h1 >Error</h1>
                        <p>You do not have sufficient permissions to view this page</p>
                    </div>
                </div>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    adminAccess: state.authentication.loginUser.isAdmin,
})

export default connect(mapStateToProps)(NoPermissionToAccess)
