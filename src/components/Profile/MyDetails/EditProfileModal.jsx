import React, { Component } from 'react';
import { Icon, Modal, Input, Select, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { login, showEditProfileModal, clickCancelEditProfile } from "../../../actions/authentication";

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
            <Modal
                title={"Hello"}
                onOk={this.handleOk}
                visible={true}
                onCancel={() => this.props.clickCancelEditProfile()}
                okText="Add"
                maskClosable={false}
                bodyStyle={{ maxHeight: '60vh', overflowY: 'scroll', paddingTop: 5 }}
            >
                <Form>

                </Form>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    accessToken: state.authentication.accessToken,
    loginUser: state.authentication.loginUser,
    showEditProfileModal: state.authentication.showEditProfileModal,
    clickCancelEditProfile: state.authentication.clickCancelEditProfile,
});

export default connect(mapStateToProps, { showEditProfileModal, clickCancelEditProfile })(Form.create()(EditProfileModal))