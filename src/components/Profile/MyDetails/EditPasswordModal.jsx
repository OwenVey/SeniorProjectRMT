import React, { Component } from 'react';
import { Modal, Input, Form } from 'antd';
import { connect } from 'react-redux';
import { clickCancelEditPassword, editPassword } from "../../../actions/authentication";

const FormItem = Form.Item;

class EditPasswordModal extends Component {

    state = {
        confirmDirty: false
    };

    handleSubmit = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.editPassword(this.props.accessToken, this.props.user, values);
            }
        })
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue("newPassword")) {
            callback("The two passwords that you entered are inconsistent!");
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(["confirmPassword"], { force: true });
        }
        callback();
    };

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
                                    { required: true, message: 'Please enter new password' },
                                    { validator: this.validateToNextPassword }
                                ],
                            })
                                (< Input type="password" />)
                            }
                        </FormItem>
                        <FormItem style={{ marginBottom: "0px" }} label="Verify Password">
                            {getFieldDecorator('confirmPassword', {
                                rules: [
                                    { required: true, message: 'Please enter new password' },
                                    { validator: this.compareToFirstPassword }
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