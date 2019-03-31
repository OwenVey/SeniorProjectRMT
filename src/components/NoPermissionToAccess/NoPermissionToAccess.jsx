import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from "react-redux";


class NoPermissionToAccess extends Component {
    render() {
        return (
            <React.Fragment>
                {!this.props.adminAccess && <div className='centered' style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row', }}>
                    <div style={{ margin: 100 }}>
                        <span className="fa-layers fa-fw" >
                            <FontAwesomeIcon size='8x' icon="circle" color="black" />
                            <FontAwesomeIcon size='9x' icon="exclamation-circle" color='#ffdf00' />
                        </span>
                    </div>
                    <div style={{ marginLeft: 15 }}>
                        <h1 style={{ fontSize: 32, fontWeight: 'bold' }}>Error</h1>
                        <p style={{ fontSize: 24 }}>You do not have sufficient permissions to view this page</p>
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
