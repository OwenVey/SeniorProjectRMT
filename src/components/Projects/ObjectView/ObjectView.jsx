import React, { Component } from 'react';

export default class ObjectView extends Component {

  constructor() {
    super();

    this.state = {
    }
  }

  render() {
    return (
      <div>{this.props.object.title}</div>
    );
  }
}