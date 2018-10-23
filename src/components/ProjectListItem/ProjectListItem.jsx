import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class ProjectListItem extends Component {

  render() {
    return (

      <List.Item onClick={() => { this.props.history.push('/project') }}>
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

export default withRouter(ProjectListItem);
