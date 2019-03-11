import React from 'react'
import { connect } from "react-redux";

const MyDetails = ({ loginUser }) => {
  return (
    <>
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