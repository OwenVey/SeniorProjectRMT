import React, { Component } from 'react'

class ReviewCenter extends Component {
    state = { checked: false }

    handleCheckboxChange = event =>
        this.setState({ checked: event.target.checked })

    render() {
        return (
            <div>
                <h1>Email me updates to items I'm following: </h1>
                <h2>Automatically follow items I have commented on: </h2>
            </div>
        )
    }
}

export default ReviewCenter;