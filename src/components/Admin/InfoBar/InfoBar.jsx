import React, { Component } from "react";
import { Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./InfoBar.css";

class InfoBar extends Component {
  render() {
    return (
      <div className="searchbar">
        <div className="bar">
          <div className="project-name-group">
            <div className="project-name">Example Project Name</div>
            <FontAwesomeIcon icon="cog" className="gear-icon" />
          </div>

          <div className="searchgroup">
            <div>
              <Input.Search
                style={{ width: "300px" }}
                className="searchbox"
                placeholder="Search..."
              />
            </div>
            <div
              className="advanced-search"
              onClick={() => {
                alert("open advanced search window");
              }}
            >
              Advanced Search
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoBar;
