import React, { Component } from 'react';
import { Modal, Input, Select, Form } from 'antd';
import { connect } from 'react-redux';
import { clickCancelEditPassword, editPassword } from "../../../actions/authentication";

const FormItem = Form.Item;
const { Option } = Select;

class EditPasswordModal extends Component {

    handleOkEditPasswordModal = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.EditPasswordModal(this.props.accessToken, this.props.loginUser.id, values);
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                <Modal
                    title={"Edit Password"}
                    onOk={this.handleOkEditPasswordModal}
                    visible={true}
                    onCancel={() => this.props.clickCancelEditPassword()}
                    okText="Confirm"
                    maskClosable={false}
                    bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
                >
                    <Form>
                        <FormItem style={{ marginBottom: "0px" }} label="Current Password">
                            {getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: 'Please enter new password' }
                                ],
                                initialValue: this.props.loginUser.password
                            })
                                (< Input />)
                            }
                        </FormItem>
                        <FormItem style={{ marginBottom: "0px" }} label="New Password">
                            {getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: 'Please enter new password' }
                                ],
                                //initialValue: this.props.loginUser.password
                            })
                                (< Input />)
                            }
                        </FormItem>
                        <FormItem style={{ marginBottom: "0px" }} label="Verify Password">
                            {getFieldDecorator('password', {
                                rules: [

                                ],
                            })(< Input />)
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