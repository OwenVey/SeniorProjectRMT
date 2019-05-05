import React, { Component } from 'react';
import { Button, Icon } from "antd";
import { showEditProfileModal, showEditPasswordModal } from "../../../actions/authentication";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditProfileModal from './EditProfileModal';
import EditPasswordModal from './EditPasswordModal';
import moment from 'moment';

class MyDetails extends Component {
  render() {
    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'row', margin: 15, marginBottom: 5, justifyContent: 'flex-end' }}>
          <div style={{ flex: 1, justifyContent: 'flex-start' }}>
            <h1>My Details</h1>
          </div>
          <Button onClick={() => this.props.showEditProfileModal()}>
            <Icon><FontAwesomeIcon icon='edit' /></Icon>
            Edit My Details
          </Button>
          <Button onClick={() => this.props.showEditPasswordModal()}>
            <Icon><FontAwesomeIcon icon='edit' /></Icon>
            Change Password
          </Button>
        </div>
        <div style={{ padding: '10px' }}>
          <div> <strong>First Name: </strong>{this.props.loginUser.firstName}</div>
          <div><strong>Last Name: </strong>{this.props.loginUser.lastName}</div>
          <div><strong>Email: </strong>{this.props.loginUser.email}</div>
          <div><strong>Account Created: </strong>{moment(this.props.loginUser.createDate).format('MM-DD-YYYY')}</div>
        </div>
        {this.props.editProfileModalVisibility && <EditProfileModal />}
        {this.props.editPasswordModalVisibility && <EditPasswordModal />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  loginUser: state.authentication.loginUser,
  editProfileModalVisibility: state.authentication.editProfileModalVisibility,
  editPasswordModalVisibility: state.authentication.editPasswordModalVisibility,
});

export default connect(mapStateToProps, { showEditProfileModal, showEditPasswordModal })(MyDetails);
