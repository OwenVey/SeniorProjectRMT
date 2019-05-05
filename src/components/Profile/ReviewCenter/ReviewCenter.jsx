import React, { Component } from 'react'
import { Checkbox } from 'antd'

class ReviewCenter extends Component {
    state = { checked: false }

    handleCheckboxChange = event =>
        this.setState({ checked: event.target.checked })

    render() {
        return (
            <div>
                <h3>Email me updates to items I'm following: <Checkbox></Checkbox></h3>
                <h3>Automatically follow items I have commented on: <Checkbox></Checkbox></h3>
            </div>
        )
    }
}

export default ReviewCenter;