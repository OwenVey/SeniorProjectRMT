import React, { Component } from 'react';
import { Modal, Input, Select, Form } from 'antd';
import { connect } from 'react-redux';
import { clickCancelEditPassword, editPassword, checkPassword } from "../../../actions/authentication";

const FormItem = Form.Item;
const { Option } = Select;

class EditPasswordModal extends Component {

    handleSubmit = (e) => {
        const { getFieldDecorator } = this.props.form;
        this.props.form.validateFields((err, values) => {
            if (!err && values.newPassword != values.currentPassword && values.newPassword == values.confirmPassword) {
                // this.props.checkPassword(values.currentPassword);
                this.props.editPassword(this.props.accessToken, this.props.user, values);
                console.log("EDIT_PASSWORD_SUCCESS");
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                <Modal
                    title={"Edit Password"}
                    onOk={this.handleSubmit}
                    visible={true}
                    onCancel={() => this.props.clickCancelEditPassword()}
                    okText="Confirm"
                    maskClosable={false}
                    bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
                >
                    <Form>
                        {/* <FormItem style={{ marginBottom: "0px" }} label="Current Password">
                            {getFieldDecorator('currentPassword', {
                                rules: [
                                    { required: true, message: 'Please enter new password' }
                                ],
                                initialValue: this.props.loginUser.password
                            })
                                (< Input type="password" />)
                            }
                        </FormItem> */}
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
    id: state.authentication.loginUser.id,
    user: state.authentication.loginUser,
});

export default connect(mapStateToProps, { editPassword, clickCancelEditPassword })(Form.create()(EditPasswordModal))