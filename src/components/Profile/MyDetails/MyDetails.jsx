import React from 'react';
import { Divider, Table, Button, Modal, Icon, Tooltip } from "antd";
import { login, showEditProfileModal, clickCancelEditProfile } from "../../../actions/authentication";
import { connect } from "react-redux";
import EditProfileModal from './EditProfileModal';

const MyDetails = (props) => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', margin: 15, marginBottom: 5, justifyContent: 'flex-end' }}>
        <div style={{ flex: 1, justifyContent: 'flex-start' }}>
          <h2>My Details</h2>
        </div>
        <Button onClick={() => this.props.showEditProfileModal(props.loginUser)}>
          <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />
          Edit My Details
          </Button>
      </div>
      <div><strong>First Name:</strong> {props.loginUser.firstName}</div>
      <div><strong>Last Name:</strong> {props.loginUser.lastName}</div>
      <div><strong>Email:</strong> {props.loginUser.email}</div>
      <div><strong>Account Created:</strong> {props.loginUser.createDate}</div>

      {props.showEditProfileModal && props.clickCancelEditProfile && <EditProfileModal />}
    </>
  );
}

const mapStateToProps = state => ({
  loginUser: state.authentication.loginUser,
  showEditProfileModal: state.authentication.showEditProfileModal,
  clickCancelEditProfile: state.authentication.clickCancelEditProfile,
});

export default connect(mapStateToProps, { showEditProfileModal, clickCancelEditProfile })(MyDetails);