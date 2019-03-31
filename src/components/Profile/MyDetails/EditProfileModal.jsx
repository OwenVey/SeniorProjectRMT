import React, { Component } from 'react';
import { Icon, Modal, Input, Select, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { clickCancelEditProfile, confirmEditProfile } from "../../../actions/authentication";

const FormItem = Form.Item;
const { Option } = Select;

class EditProfileModal extends Component {
    handleOk = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.addItemType(this.props.accessToken, values);
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                <Modal
                    title={"Hello"}
                    onOk={this.props.confirmEditProfile()}
                    visible={true}
                    onCancel={() => this.props.clickCancelEditProfile()}
                    okText="Confirm"
                    maskClosable={false}
                    bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
                >
                    <Form>
                        <FormItem style={{ marginBottom: "0px" }} label="First Name">
                            <Input text={this.props.loginUser.firstName} />
                        </FormItem>
                        <FormItem style={{ marginBottom: "0px" }} label="Last Name">
                            <Input text={this.props.loginUser.lastName} />
                        </FormItem>
                        <FormItem style={{ marginBottom: "0px" }} label="Email">
                            <Input text={this.props.loginUser.email} />
                        </FormItem>
                        <FormItem style={{ marginBottom: "0px" }} label="Password">
                            <Input text={this.props.loginUser.password} />
                        </FormItem>
                        <FormItem style={{ marginBottom: "0px" }} label="Verify Password">
                            <Input text={this.props.loginUser.password} />
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
    editProfileModalVisibility: state.authentication.editProfileModalVisibility,
    clickCancelEditProfile: state.authentication.clickCancelEditProfile,
});

//export default connect(mapStateToProps, { showEditProfileModal, clickCancelEditProfile })(Form.create()(EditProfileModal))
export default connect(mapStateToProps, { confirmEditProfile, clickCancelEditProfile })(Form.create()(EditProfileModal))