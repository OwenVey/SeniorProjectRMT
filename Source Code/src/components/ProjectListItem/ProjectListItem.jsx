import React, { Component } from 'react';
import { List } from 'semantic-ui-react'

class ProjectListItem extends Component {
  render() {
    return (

      <List.Item onClick={function () { alert('hello') }}>
        <List.Content floated='right' verticalAlign='middle'>
          1.0
        </List.Content>
        <List.Content>
          <List.Header>{this.props.name}</List.Header>
          {this.props.description}
        </List.Content>
      </List.Item>

    );
  }
}

export default ProjectListItem;
