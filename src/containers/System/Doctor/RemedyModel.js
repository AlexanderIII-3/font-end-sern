import './RemedyModel.scss'
import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';

import { toast } from 'react-toastify';
import moment from 'moment';

import { CommonUtils } from '../../../utils';
class RemedyModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imageBase64: '',
        };
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            });

        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email

            })
        }

    }

    handleOnchangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    };

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {

            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })

        }

    }
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    }





    render() {
        let { isOpen, dataModal, closeRemedyModal, sendRemedy } = this.props
        return (
            <Modal

                isOpen={isOpen}
                className={'booking-modal-container'}
                size='lg'
                centered
            >
                <div className='modal-header' >

                    <h5 className='modal-title'>Modal title</h5>
                    <button type='button' className='close' aria-label='close'>

                        <span onClick={closeRemedyModal} aria-hidden='true'>x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>

                            <label>Email</label>
                            <input className='form-control' type='email' value={this.state.email}
                                onChange={(event) => this.handleOnchangeEmail(event)}
                            ></input>

                        </div>
                        <div className='col-6 form-group'>

                            <label>Chọn file đơn thuốc</label>
                            <input onChange={(event) => this.handleOnchangeImage(event)} className='form-control-file' type='file' ></input>

                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={() => this.handleSendRemedy()} >Send</Button>
                    <Button color='secondary' onClick={closeRemedyModal}>Cancle</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {

        language: state.app.language,



    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModel);
