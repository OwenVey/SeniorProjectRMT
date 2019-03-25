import React from 'react'
import { connect } from "react-redux";

const MyDetails = ({ loginUser }) => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', margin: 15, marginBottom: 5, justifyContent: 'flex-end' }}>
        <div style={{ flex: 1, justifyContent: 'flex-start' }}>
          <h2>Item Types</h2>
        </div>
        <Button onClick={() => this.props.clickAddItemType()}>
          <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />
          Edit Profile
          </Button>
      </div>
      <div><strong>First Name:</strong> {loginUser.firstName}</div>
      <div><strong>Last Name:</strong> {loginUser.lastName}</div>
      <div><strong>Email:</strong> {loginUser.email}</div>
      <div><strong>Account Created:</strong> {loginUser.createDate}</div>
    </>
  );
}

const mapStateToProps = state => ({
  loginUser: state.authentication.loginUser
});

export default connect(mapStateToProps)(MyDetails);