import React from 'react';
import PropTypes from 'prop-types';
import './ItemTypes.css';

class Modal extends React.Component {
    render() {
        if (!this.props.show) {
            return null
        }

        // The gray background
        const backdropStyle = {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50
        };

        // The modal "window"
        const modalStyle = {
            backgroundColor: '#fff',
            borderRadius: 5,
            maxWidth: 500,
            minHeight: 300,
            margin: '10 auto',
            padding: 30,
        };

        return (
            <div class="backdrop" style={{ backdropStyle }}>
                <div class="modal" style={{ modalStyle }}>
                    {this.props.children}
                    <form class="modal-content">
                        <input placeholder="Display" />
                        <input placeholder="Plural" />
                        <input placeholder="Key" />
                        <textarea placeholder="Description" />
                        <input placeholder="id" />
                        <input placeholder="system" />
                        <div className="footer">
                            <button class="foot">
                                Add
                            </button>
                            <button class="foot" onClick={this.props.onClose}>
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};


export default Modal;