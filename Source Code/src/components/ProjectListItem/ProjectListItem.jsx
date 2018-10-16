import React, { Component } from 'react';
import { List } from 'semantic-ui-react'

class ProjectListItem extends Component {
  render() {
    return (

      <List.Item onClick={function () { alert('hello') }}>
        <List.Content floated='right' verticalAlign='middle'>
          {'Due Date: ' + this.props.project.dueDate}
        </List.Content>
        <List.Content>
          <List.Header>{this.props.project.name}</List.Header>
          {this.props.project.description}
        </List.Content>
      </List.Item>

    );
  }
}

export default ProjectListItem;
