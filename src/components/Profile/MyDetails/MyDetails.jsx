import React from 'react';
import { Divider, Table, Button, Modal, Icon, Tooltip } from "antd";
import { getUsers, showEditUserModal } from "../../../actions/users";
import { connect } from "react-redux";

const MyDetails = ({ loginUser }) => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', margin: 15, marginBottom: 5, justifyContent: 'flex-end' }}>
        <div style={{ flex: 1, justifyContent: 'flex-start' }}>
          <h2>My Details</h2>
        </div>
        <Button onClick={() => this.props.showEditUserModal()}>
          <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />
          Edit My Details
          </Button>
      </div>
      <div><strong>First Name:</strong> {loginUser.firstName}</div>
      <div><strong>Last Name:</strong> {loginUser.lastName}</div>
      <div><strong>Email:</strong> {loginUser.email}</div>
      <div><strong>Account Created:</strong> {loginUser.createDate}</div>
      <div>Hello</div>
    </>
  );
}

const mapStateToProps = state => ({
  loginUser: state.authentication.loginUser
});

export default connect(mapStateToProps)(MyDetails);