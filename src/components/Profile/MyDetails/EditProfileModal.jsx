import React, { Component } from 'react';
import { Modal, Input, Select, Form, Alert } from 'antd';
import { connect } from 'react-redux';
import { clickCancelEditProfile, editProfile } from "../../../actions/authentication";


const FormItem = Form.Item;
const { Option } = Select;

class EditProfileModal extends Component {

    handleOkEditProfileModal = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.editProfile(this.props.accessToken, this.props.loginUser.id, values);
                console.log("EDIT_PROFILE_SUCCESS");
            }
        })
    }

    onClose = (e) => {
        console.log(e, 'I was closed.');
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                <Modal
                    title={"Edit Profile Details"}
                    onOk={this.handleOkEditProfileModal}
                    visible={true}
                    onCancel={() => this.props.clickCancelEditProfile()}
                    okText="Confirm"
                    maskClosable={false}
                    bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
                >
                    <Form>
                        <FormItem style={{ marginBottom: "0px" }} label="First Name">
                            {getFieldDecorator('firstName', {
                                rules: [
                                    { required: true, message: 'Please enter first name' }
                                ],
                                initialValue: this.props.loginUser.firstName
                            })
                                (< Input />)
                            }
                        </FormItem>
                        <FormItem style={{ marginBottom: "0px" }} label="Last Name">
                            {getFieldDecorator('lastName', {
                                rules: [
                                    { required: true, message: 'Please enter last name' }
                                ],
                                initialValue: this.props.loginUser.lastName
                            })
                                (< Input />)
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

export default connect(mapStateToProps, { editProfile, clickCancelEditProfile })(Form.create()(EditProfileModal))