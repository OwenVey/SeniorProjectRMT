import React, { Component } from 'react';
import ProfileSidebar from "../ProfileSidebar/ProfileSidebar.jsx";
import MyDetails from "../MyDetails/MyDetails.jsx"
import MySubscriptions from "../MySubscriptions/MySubscriptions.jsx"
import MyLockedItems from "../MyLockedItems/MyLockedItems.jsx"
import SystemLockedItems from "../SystemLockedItems/SystemLockedItems.jsx"
import ReviewCenter from "../ReviewCenter/ReviewCenter.jsx"
import SplitPane from 'react-split-pane';

class ProfilePage extends Component {

  state = {
    currentPage: "myDetails"
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    let selectedPage = null;

    switch (this.state.currentPage) {
      case "myDetails":
        selectedPage = <MyDetails accessToken={this.props.accessToken} />;
        break;
      case "mySubscriptions":
        selectedPage = <MySubscriptions />;
        break;
      case "myLockedItems":
        selectedPage = <MyLockedItems />;
        break;
      case "systemLockedItems":
        selectedPage = <SystemLockedItems />;
        break;
      case "reviewCenter":
        selectedPage = <ReviewCenter />;
        break;
      default:
        selectedPage = null;
    }

    return (
      <div className="profile-page">
        <SplitPane minSize={200} maxSize={-100} defaultSize={'20%'}>
          <ProfileSidebar handlePageChange={this.handlePageChange} />
          {selectedPage}
        </SplitPane>
      </div >
    );
  }
}

export default ProfilePage;