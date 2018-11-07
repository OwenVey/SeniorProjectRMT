import React, { Component } from "react";
import AdminSidebar from "../AdminSidebar/AdminSidebar.jsx";
import OrganizationDetails from "../OrganizationDetails/OrganizationDetails.jsx";
import Users from "../Users/Users.jsx";
import UserGroups from "../UserGroups/UserGroups.jsx";
import Permissions from "../Permissions/Permissions.jsx";
import ItemTypes from "../ItemTypes/ItemTypes.jsx";
import ManageAllProjects from "../ManageAllProjects/ManageAllProjects.jsx";
import SplitPane from "react-split-pane";
import InfoBar from "../InfoBar/InfoBar.jsx";

import "./AdminPage.css";

class AdminPage extends Component {
  constructor() {
    super();

    this.state = {
      currentPage: "organizationDetails"
    };
  }

  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };

  render() {
    let selectedPage = null;

    switch (this.state.currentPage) {
      case "organizationDetails":
        selectedPage = <OrganizationDetails />;
        break;
      case "users":
        selectedPage = <Users />;
        break;
      case "userGroups":
        selectedPage = <UserGroups />;
        break;
      case "permissions":
        selectedPage = <Permissions />;
        break;
      case "itemTypes":
        selectedPage = <ItemTypes />;
        break;
      case "manageAllProjects":
        selectedPage = <ManageAllProjects />;
        break;
      default:
        selectedPage = null;
    }

    return (
      <div className="admin-page">
        <SplitPane minSize={200} maxSize={-100} defaultSize={"20%"}>
          <AdminSidebar handlePageChange={this.handlePageChange} />
          {selectedPage}
        </SplitPane>
      </div>
    );
  }
}

export default AdminPage;
