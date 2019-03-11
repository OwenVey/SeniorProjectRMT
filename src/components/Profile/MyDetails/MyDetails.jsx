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
            userData:
            {
                firstname: '',
                lastName: '',
            }

        }
    }

    componentWillMount() {
        this.fetchUser();
    }

    fetchUser = async () => {
        console.log(this.props.accessToken);
        const url = `https://senior-design.timblin.org/api/user/me?accessToken=${this.props.accessToken}`;
        const url2 = `https://abortplatteville.com/api/user?accessToken=${this.props.accessToken}`;
        axios
            .get(url)
            .then(response => {
                let users = response.data
                this.setState({ userData: users });
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {

        // const userData = this.state.userData.map((user, index) => ({
        //     ...user,
        //     onHeaderCell: userData => ({
        //         width: userData.width,
        //         onResize: this.handleResize(index),
        //     }),
        // }));

        // const that = this;
        // this.dragProps = {
        //     onDragEnd(fromIndex, toIndex) {
        //         const userData = that.state.userData;
        //         const item = userData.splice(fromIndex, 1)[0];
        //         userData.splice(toIndex, 0, item);
        //         that.setState({
        //             userData,
        //         });
        //     },
        //     nodeSelector: 'th',
        // };

        return (
            <React.Fragment>
                <p>First Name: {this.state.userData.firstName}</p>
                <p>Last Name: {this.state.userData.lastName}</p>
                <p>email: {this.state.userData.email}</p>
                <p>first Name: {this.state.userData.firstName}</p>
                <p>first Name: {this.state.userData.firstName}</p>
            </React.Fragment>
        );
    }
}
export default MyDetails;