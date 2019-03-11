import React, { Component } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { ManageProjectBar } from '../Admin/AdminBars/AdminBars.jsx';
import { Table } from 'antd';
// import EditProjectModal from '../EditProjectModal/EditProjectModal.jsx';

class MyDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userData: [
                {
                    firstname: '',
                    lastName: '',
                }
            ],
        }
    }

    componentWillMount() {
        this.fetchProjects();
    }

    fetchProjects = async () => {
        console.log(this.props.accessToken);
        const url = `https://senior-design.timblin.org/api/user/me?accessToken=${this.props.accessToken}`;
        const url2 = `https://abortplatteville.com/api/user?accessToken=${this.props.accessToken}`;
        axios
            .get(url)
            .then(response => {
                let users = response.data.users.map(user => {
                    return {
                        ...user,
                        firstName: user.dueDate.substring(0, 10),
                        lastName: user.lastName.substring(0, 10),
                        isAdmin: user.isAdmin,
                        // completeDate: user.completeDate.substring(0, 10) == '9999-12-31' ? 'In Progress' : user.completeDate.substring(0, 10),
                        // createDate: user.createDate.substring(0, 10)
                    }
                })
                this.setState({ userData: users });
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {

        const userData = this.state.userData.map((user, index) => ({
            ...user,
            onHeaderCell: userData => ({
                width: userData.width,
                onResize: this.handleResize(index),
            }),
        }));

        const that = this;
        this.dragProps = {
            onDragEnd(fromIndex, toIndex) {
                const userData = that.state.userData;
                const item = userData.splice(fromIndex, 1)[0];
                userData.splice(toIndex, 0, item);
                that.setState({
                    userData,
                });
            },
            nodeSelector: 'th',
        };

        return (
            <React.Fragment>
                {/* <ManageProjectBar accessToken={this.props.accessToken} /> */}
                <Table
                    components={this.components}
                    userData={userData}
                    pagination={false}
                    dataSource={this.state.projectData}
                    scroll={{ y: 500 }}
                    bordered
                />
                {/* {this.state.showEditProjectModal && <EditProjectModal handleCancelEditProjectModal={this.handleCancelEditProjectModal} hide={this.hideEditProjectModal} accessToken={this.props.accessToken} projectId={this.state.selectedId} />} */}

            </React.Fragment>
        );
    }
}
export default MyDetails;