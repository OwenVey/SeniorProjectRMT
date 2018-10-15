import React, { Component } from 'react'
import { List } from 'semantic-ui-react'
import ProjectListItem from '../ProjectListItem/ProjectListItem.jsx'

class ProjectList extends Component {

    filter(projects) {
        if (!this.props.filter) {
            return projects
        }
        return projects.filter((project) => project.name.toLowerCase().indexOf(this.props.filter.toLowerCase()) >= 0)
    }

    render() {
        return (
            <List selection divided relaxed size='large'>
                {this.filter(this.props.projects).map((project) => <ProjectListItem key={project.id} name={project.name} description={project.description}></ProjectListItem>)}
            </List>
        )
    }
};

export default ProjectList;