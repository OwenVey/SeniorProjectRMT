import React, { Component } from 'react';
import { Button, Icon } from "antd";
import { showEditProfileModal } from "../../../actions/authentication";
import { connect } from "react-redux";
import EditProfileModal from './EditProfileModal';

//const MyDetails = (props) => {
class MyDetails extends Component {
  render() {
    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'row', margin: 15, marginBottom: 5, justifyContent: 'flex-end' }}>
          <div style={{ flex: 1, justifyContent: 'flex-start' }}>
            <h2>My Details</h2>
          </div>
          <Button onClick={() => this.props.showEditProfileModal()}>
            <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />
            Edit My Details
          </Button>
        </div>
        <div><strong>First Name:</strong> {this.props.loginUser.firstName}</div>
        <div><strong>Last Name:</strong> {this.props.loginUser.lastName}</div>
        <div><strong>Email:</strong> {this.props.loginUser.email}</div>
        <div><strong>Account Created:</strong> {this.props.loginUser.createDate}</div>

        {this.props.editProfileModalVisibility && <EditProfileModal />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  loginUser: state.authentication.loginUser,
  editProfileModalVisibility: state.authentication.editProfileModalVisibility,
});

export default connect(mapStateToProps, { showEditProfileModal })(MyDetails);