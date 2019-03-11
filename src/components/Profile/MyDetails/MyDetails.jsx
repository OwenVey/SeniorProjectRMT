import React, { Component } from 'react'
import axios from 'axios'

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
        return (
            <React.Fragment>
                <p><strong>First Name:</strong> {this.state.userData.firstName}</p>
                <p><strong>Last Name:</strong> {this.state.userData.lastName}</p>
                <p><strong>email:</strong> {this.state.userData.email}</p>
                <p><strong>Date account created:</strong> {this.state.userData.createDate}</p>
            </React.Fragment>
        );
    }
}
export default MyDetails;