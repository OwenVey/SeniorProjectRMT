import React, { Component } from 'react';
import { Modal, Input, Select, Form } from 'antd';
import { connect } from 'react-redux';
import { clickCancelEditPassword, editPassword } from "../../../actions/authentication";

const FormItem = Form.Item;
const { Option } = Select;

class EditPasswordModal extends Component {

    state = {
        newPassword: '',
        confirmPassword: '',
    }

    // handleSubmit = () => {
    //     const { password, confirmPassword } = this.state;
    //     // perform all neccassary validations
    //     if (password !== confirmPassword) {
    //         alert("Passwords don't match");
    //     } else {
    //         // make API call
    //     }
    // }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                <Modal
                    title={"Edit Password"}
                    onOk={this.editPassword}
                    visible={true}
                    onCancel={() => this.props.clickCancelEditPassword()}
                    okText="Confirm"
                    maskClosable={false}
                    bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
                >
                    <Form>
                        <FormItem style={{ marginBottom: "0px" }} label="Current Password">
                            {getFieldDecorator('currentPassword', {
                                rules: [
                                    { required: true, message: 'Please enter new password' }
                                ],
                                initialValue: this.props.loginUser.password
                            })
                                (< Input type="password" />)
                            }
                        </FormItem>
                        <FormItem style={{ marginBottom: "0px" }} label="New Password">
                            {getFieldDecorator('newPassword', {
                                rules: [
                                    { required: true, message: 'Please enter new password' }
                                ],
                            })
                                (< Input type="password" />)
                            }
                        </FormItem>
                        <FormItem style={{ marginBottom: "0px" }} label="Verify Password">
                            {getFieldDecorator('confirmPassword', {
                                rules: [
                                    { required: true, message: 'Please enter new password' }
                                ],
                            })
                                (< Input type="password" />)
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
    accessToken: state.authentication.accessToken,
    loginUser: state.authentication.loginUser,
    id: state.authentication.loginUser,
});

export default connect(mapStateToProps, { editPassword, clickCancelEditPassword })(Form.create()(EditPasswordModal))