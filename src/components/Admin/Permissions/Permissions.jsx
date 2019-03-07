import React, { Component } from 'react'
import { connect } from "react-redux";
import { Button, Icon, } from 'antd';
import { showEditPermissionModal, showAddPermissionModal } from "../../../actions/permissions";

class Permissions extends Component {
  render() {
    return (
      <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'row', margin: 15, marginBottom: 5, justifyContent: 'flex-end' }}>
          <div style={{ flex: 1, justifyContent: 'flex-start' }}>
            <h2>Permissions</h2>
          </div>
          <Button onClick={() => this.props.showAddPermissionModal()}>
            <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />
            Add Permission
        </Button>
          {/* {this.props.addPermissionModalVisible && <AddPermissionModal />} */}
        </div>
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  editPermissionModalVisible: state.users.editPermissionModalVisibility,
  addPermissionModalVisible: state.users.addPermissionModalVisibility
});

export default connect(
  mapStateToProps,
  { showEditPermissionModal, showAddPermissionModal }
)(Permissions);