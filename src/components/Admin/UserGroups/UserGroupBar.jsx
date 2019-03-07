import React from 'react';
import { Button, Icon, } from 'antd';
import AddUserGroupModal from './AddUserGroupModal';
import { connect } from "react-redux";
import { toggleAddUserGroupModal } from '../../../actions/userGroups.js'

const UserGroupBar = (props) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'row', margin: 15, marginBottom: 5, justifyContent: 'flex-end' }}>
      <div style={{ flex: 1, justifyContent: 'flex-start' }}>
        <h2>User Groups</h2>
      </div>
      <Button onClick={() => props.toggleAddUserGroupModal(true)}>
        <Icon type="plus-circle" theme='filled' style={{ color: '#1890FF' }} />
        Add User Group
        </Button>
      {props.showAddUserGroupModal && <AddUserGroupModal />}
    </div>
  )
}

const mapStateToProps = state => ({
  showAddUserGroupModal: state.userGroups.showAddUserGroupModal,
  accessToken: state.authentication.accessToken,
});

export default connect(mapStateToProps, { toggleAddUserGroupModal })(UserGroupBar);
